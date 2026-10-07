// 업로드 파일 분석 — 워커와 테스트에서 함께 써요.
// zip은 파일 목록만 읽고 DM JSON 항목만 꺼내 읽어요 (사진·영상은 읽지 않음).
import { parseInstagram, type ConversationResult } from "./parser";
import { listEntries, readEntry } from "./zip";

const DM_JSON = /messages\/inbox\/([^/]+)\/message_\d+\.json$/i;

export async function analyze(files: File[], onProgress: (pct: number) => void) {
  const decoder = new TextDecoder();
  const results: ConversationResult[] = [];

  // 1) 읽을 항목 목록 만들기
  const jobs: { file: Blob; read: () => Promise<Uint8Array>; folder: string | null; size: number }[] = [];
  for (const file of files) {
    if (file.name.toLowerCase().endsWith(".json")) {
      jobs.push({ file, read: async () => new Uint8Array(await file.arrayBuffer()), folder: null, size: file.size });
      continue;
    }
    for (const entry of await listEntries(file)) {
      const m = entry.name.match(DM_JSON);
      if (m) jobs.push({ file, read: () => readEntry(file, entry), folder: m[1], size: entry.compressedSize });
    }
  }
  if (jobs.length === 0) throw new Error("NO_DM_JSON");

  // 2) 하나씩 읽어서 집계만 남기기
  const total = jobs.reduce((s, j) => s + j.size, 0) || 1;
  let done = 0;
  let lastPct = -1;
  for (const job of jobs) {
    const r = parseInstagram(JSON.parse(decoder.decode(await job.read())), job.folder);
    if (r) results.push(r);
    done += job.size;
    const pct = Math.floor((done / total) * 100);
    if (pct !== lastPct) onProgress((lastPct = pct));
  }
  return results;
}
