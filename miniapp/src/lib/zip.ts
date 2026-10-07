// 최소 ZIP 리더 — 중앙 디렉터리(파일 목록)만 읽고, 필요한 항목만 골라 압축을 풀어요.
// 인스타 export zip은 사진·영상이 대부분이라 전체를 읽지 않는 게 핵심이에요. ZIP64 지원.
import { inflateSync } from "fflate";

export interface ZipEntry {
  name: string;
  method: number;
  compressedSize: number;
  localHeaderOffset: number;
}

const SIG_EOCD = 0x06054b50;
const SIG_ZIP64_LOCATOR = 0x07064b50;
const SIG_ZIP64_EOCD = 0x06064b50;
const SIG_CENTRAL = 0x02014b50;
const SIG_LOCAL = 0x04034b50;

async function readBytes(blob: Blob, start: number, end: number) {
  return new Uint8Array(await blob.slice(start, end).arrayBuffer());
}

function u64(view: DataView, off: number) {
  return Number(view.getBigUint64(off, true));
}

async function findCentralDirectory(blob: Blob) {
  // EOCD(22B) + 최대 주석(65535B) + ZIP64 locator(20B)
  const tailStart = Math.max(0, blob.size - (22 + 0xffff + 20));
  const tail = await readBytes(blob, tailStart, blob.size);
  const view = new DataView(tail.buffer);

  let eocd = -1;
  for (let i = tail.length - 22; i >= 0; i--) {
    if (view.getUint32(i, true) === SIG_EOCD) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error("NOT_ZIP");

  let count = view.getUint16(eocd + 10, true);
  let size = view.getUint32(eocd + 12, true);
  let offset = view.getUint32(eocd + 16, true);

  const loc = eocd - 20;
  if (loc >= 0 && view.getUint32(loc, true) === SIG_ZIP64_LOCATOR) {
    const z64Offset = u64(view, loc + 8);
    const z64 = new DataView((await readBytes(blob, z64Offset, z64Offset + 56)).buffer);
    if (z64.getUint32(0, true) !== SIG_ZIP64_EOCD) throw new Error("BAD_ZIP64");
    count = u64(z64, 32);
    size = u64(z64, 40);
    offset = u64(z64, 48);
  }
  return { count, size, offset };
}

export async function listEntries(blob: Blob): Promise<ZipEntry[]> {
  const cd = await findCentralDirectory(blob);
  const buf = await readBytes(blob, cd.offset, cd.offset + cd.size);
  const view = new DataView(buf.buffer);
  const utf8 = new TextDecoder();
  const entries: ZipEntry[] = [];

  let p = 0;
  for (let n = 0; n < cd.count; n++) {
    if (view.getUint32(p, true) !== SIG_CENTRAL) throw new Error("BAD_CENTRAL_DIR");
    const method = view.getUint16(p + 10, true);
    let compressedSize = view.getUint32(p + 20, true);
    let uncompressedSize = view.getUint32(p + 24, true);
    const nameLen = view.getUint16(p + 28, true);
    const extraLen = view.getUint16(p + 30, true);
    const commentLen = view.getUint16(p + 32, true);
    let localHeaderOffset = view.getUint32(p + 42, true);
    const name = utf8.decode(buf.subarray(p + 46, p + 46 + nameLen));

    // ZIP64 확장 필드: 0xFFFFFFFF인 값만 순서대로 담겨 있어요
    let e = p + 46 + nameLen;
    const extraEnd = e + extraLen;
    while (e + 4 <= extraEnd) {
      const id = view.getUint16(e, true);
      const len = view.getUint16(e + 2, true);
      if (id === 0x0001) {
        let q = e + 4;
        if (uncompressedSize === 0xffffffff) { uncompressedSize = u64(view, q); q += 8; }
        if (compressedSize === 0xffffffff) { compressedSize = u64(view, q); q += 8; }
        if (localHeaderOffset === 0xffffffff) { localHeaderOffset = u64(view, q); }
      }
      e += 4 + len;
    }

    entries.push({ name, method, compressedSize, localHeaderOffset });
    p = extraEnd + commentLen;
  }
  return entries;
}

export async function readEntry(blob: Blob, entry: ZipEntry): Promise<Uint8Array> {
  const header = await readBytes(blob, entry.localHeaderOffset, entry.localHeaderOffset + 30);
  const hv = new DataView(header.buffer);
  if (hv.getUint32(0, true) !== SIG_LOCAL) throw new Error("BAD_LOCAL_HEADER");
  const dataStart = entry.localHeaderOffset + 30 + hv.getUint16(26, true) + hv.getUint16(28, true);
  const raw = await readBytes(blob, dataStart, dataStart + entry.compressedSize);
  if (entry.method === 0) return raw;
  if (entry.method === 8) return inflateSync(raw);
  throw new Error("UNSUPPORTED_COMPRESSION");
}
