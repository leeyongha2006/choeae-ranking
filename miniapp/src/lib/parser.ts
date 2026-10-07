// ── Instagram DM export 파서 ─────────────────────────────────────────
// 원본 메시지는 보관하지 않고, 발신자별·월별 집계와 대화한 날짜만 남겨요.

/** [메시지 수, 심야(0~5시) 메시지 수, 공유(게시물·릴스) 수] */
export type MonthCounts = [number, number, number];

export interface SenderStats {
  months: Record<number, MonthCounts>;
  /** 상대 메시지에 이어 이 발신자가 답장하기까지 걸린 시간 합계(분)와 횟수 — 6시간 이내만 */
  replySum: number;
  replyN: number;
}

export interface ConversationResult {
  /** 대화방 폴더명 (예: "john_smith_123456789") — 친구 구분 키. json 단독 업로드면 null */
  folder: string | null;
  /** 상대 이름을 특정 못 할 때 쓰는 이름 (대화방 제목 또는 폴더명) */
  fallbackName: string;
  participants: string[];
  senders: Record<string, SenderStats>;
  /** 메시지가 오간 날짜 (로컬 기준 day index, 오름차순) */
  days: number[];
}

export interface FriendStats {
  name: string;
  /** 동명이인 구분용 계정명 (폴더명에서 추출) */
  handle: string | null;
  /** monthIndex → [내 메시지, 친구 메시지, 심야, 공유] */
  months: Record<number, [number, number, number, number]>;
  replySum: number;
  replyN: number;
  maxStreak: number;
}

export type FriendData = Record<string, FriendStats>;

export interface RankedFriend {
  rank: number;
  key: string;
  name: string;
  handle: string | null;
  score: number;
  count: number;
  mine: number;
  theirs: number;
  lateNight: number;
  shares: number;
  /** 친구의 평균 답장 시간(분) — 전체 기간 기준, 표본이 적으면 null */
  avgReplyMin: number | null;
  /** 최장 연속 대화 일수 — 전체 기간 기준 */
  maxStreak: number;
  /** 대화한 첫해·마지막 해 — 같은 이름의 친구 구분용 */
  firstYear: number;
  lastYear: number;
}

export type PeriodKey = "recent" | "year" | "all";

export const PERIODS: { key: PeriodKey; label: string; topLabel: string; months: number | null }[] = [
  { key: "recent", label: "최근 3개월", topLabel: "요즘 최애", months: 3 },
  { key: "year", label: "최근 1년", topLabel: "1년간 최애", months: 12 },
  { key: "all", label: "전체", topLabel: "역대 최애", months: null },
];

export type RankingsByPeriod = Record<PeriodKey, RankedFriend[]>;

const REPLY_WINDOW_MIN = 6 * 60;
const MIN_REPLY_SAMPLES = 10;
const DAY_MS = 86_400_000;

// Instagram은 비ASCII 문자를 UTF-8 바이트를 Latin-1 문자로 담아 내보내요.
function fixInstaEncoding(str: string): string;
function fixInstaEncoding(str: string | null | undefined): string | null;
function fixInstaEncoding(str: string | null | undefined) {
  if (!str) return str ?? null;
  // 이미 정상 유니코드(0xFF 초과 문자 포함)면 그대로
  if (/[^\u0000-ÿ]/.test(str)) return str;
  try {
    const bytes = Uint8Array.from(str, (c) => c.charCodeAt(0) & 0xff);
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return str;
  }
}

const INSTA_PLACEHOLDER = "Instagram 사용자";
export const UNNAMED = "이름 없는 계정";

// 공백·보이지 않는 문자(점자 공백, 제로폭 등)만 있는 이름
function isBlankName(name: string | null): boolean {
  return !name || !name.replace(/[\s\u2800\u200b-\u200d\u3164\ufeff]/g, "");
}

interface InstaMessage {
  sender_name?: string;
  timestamp_ms?: number;
  share?: unknown;
}

interface InstaConversation {
  participants?: { name: string }[];
  messages?: InstaMessage[];
  title?: string;
}

function monthIndex(d: Date) {
  return d.getFullYear() * 12 + d.getMonth();
}

function dayIndex(d: Date) {
  return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / DAY_MS);
}

// folderName: ZIP 내 폴더명 (예: "john_smith_123456789")
export function parseInstagram(data: InstaConversation, folderName?: string | null): ConversationResult | null {
  // 그룹DM: 참여자 3명 이상 → 스킵
  if (data.participants && data.participants.length > 2) return null;

  const title = fixInstaEncoding(data.title);
  const handle = handleFromFolder(folderName ?? null);
  const usableTitle = title && title !== INSTA_PLACEHOLDER && !isBlankName(title) ? title : null;
  const fallbackName = usableTitle || (handle && !/^\d+$/.test(handle) ? handle : null) || UNNAMED;

  // 삭제·비활성화 계정 폴더는 누구인지 알 수 없어서 스킵
  if (folderName && !handle) return null;

  const fixName = (raw: string) => {
    const name = fixInstaEncoding(raw);
    return name === INSTA_PLACEHOLDER || isBlankName(name) ? fallbackName : name;
  };

  // export는 최신순이라 시간순으로 정렬해서 답장 간격을 계산해요
  const messages = (data.messages ?? [])
    .filter((m) => m.sender_name && m.timestamp_ms)
    .sort((a, b) => a.timestamp_ms! - b.timestamp_ms!);

  const senders: Record<string, SenderStats> = {};
  const days = new Set<number>();
  let prevSender: string | null = null;
  let prevTs = 0;

  for (const msg of messages) {
    const name = fixName(msg.sender_name!);
    const ts = msg.timestamp_ms!;
    const d = new Date(ts);
    const s = senders[name] || (senders[name] = { months: {}, replySum: 0, replyN: 0 });

    const m = monthIndex(d);
    const mc = s.months[m] || (s.months[m] = [0, 0, 0]);
    mc[0]++;
    if (d.getHours() < 5) mc[1]++;
    if (msg.share) mc[2]++;

    if (prevSender && prevSender !== name) {
      const gapMin = (ts - prevTs) / 60_000;
      if (gapMin <= REPLY_WINDOW_MIN) {
        s.replySum += gapMin;
        s.replyN++;
      }
    }
    prevSender = name;
    prevTs = ts;
    days.add(dayIndex(d));
  }

  const participants = (data.participants ?? []).map((p) => fixName(p.name));

  return {
    folder: folderName ?? null,
    fallbackName,
    participants,
    senders,
    days: [...days].sort((a, b) => a - b),
  };
}

// "john_smith_123456789" → "john_smith", 삭제 계정 폴더("instagramsayongja")는 null
function handleFromFolder(folder: string | null) {
  if (!folder) return null;
  const base = folder.replace(/_\d+$/, "");
  return base && base !== "instagramsayongja" ? base : null;
}

// 여러 대화방에 공통으로 등장하는 사람 = 나
export function detectMyName(results: ConversationResult[]): string | null {
  if (results.length === 1) {
    const p = results[0].participants;
    return p[p.length - 1] ?? null;
  }
  const seen: Record<string, number> = {};
  for (const r of results) {
    for (const name of new Set([...r.participants, ...Object.keys(r.senders)])) seen[name] = (seen[name] || 0) + 1;
  }
  return Object.entries(seen).sort(([, a], [, b]) => b - a)[0]?.[0] ?? null;
}

// 친구 구분 키 = 대화방 폴더 (같은 이름의 다른 친구가 합쳐지지 않도록)
export function aggregateFriends(results: ConversationResult[], myName: string | null): FriendData {
  const data: FriendData = {};
  const daysByKey: Record<string, Set<number>> = {};

  for (const r of results) {
    const friendName = r.participants.find((n) => n !== myName) ?? Object.keys(r.senders).find((n) => n !== myName);
    // 나와의 채팅(메모용 대화방)은 제외
    if (!friendName) continue;
    const key = r.folder ?? `name:${friendName}`;
    const f =
      data[key] ||
      (data[key] = { name: friendName, handle: handleFromFolder(r.folder), months: {}, replySum: 0, replyN: 0, maxStreak: 0 });

    for (const [sender, s] of Object.entries(r.senders)) {
      const isMe = sender === myName;
      for (const m in s.months) {
        const [n, late, share] = s.months[m];
        const fm = f.months[m] || (f.months[m] = [0, 0, 0, 0]);
        fm[isMe ? 0 : 1] += n;
        fm[2] += late;
        fm[3] += share;
      }
      if (!isMe) {
        f.replySum += s.replySum;
        f.replyN += s.replyN;
      }
    }
    const days = daysByKey[key] || (daysByKey[key] = new Set());
    for (const d of r.days) days.add(d);
  }

  for (const key in data) data[key].maxStreak = longestStreak(daysByKey[key]);
  return data;
}

function longestStreak(days: Set<number>) {
  let best = 0;
  for (const d of days) {
    if (days.has(d - 1)) continue; // 연속 구간의 시작에서만 센다
    let len = 1;
    while (days.has(d + len)) len++;
    best = Math.max(best, len);
  }
  return best;
}

// 주고받은 양 기준 점수 — 한쪽만 보내는 대화는 덜 쳐줘요.
// 균형 잡힌 부분은 2배, 한쪽으로 넘치는 부분은 0.5배로 계산
// 예) 나 100 · 친구 100 → 200, 나 190 · 친구 10 → 110
function balancedVolume(mine: number, theirs: number) {
  const low = Math.min(mine, theirs);
  return 2 * low + 0.5 * (Math.max(mine, theirs) - low);
}

function computeRankings(data: FriendData, months: number | null, refMonth: number): RankedFriend[] {
  const from = months ? refMonth - months + 1 : -Infinity;
  const rows: (Omit<RankedFriend, "rank" | "score"> & { raw: number })[] = [];

  for (const [key, f] of Object.entries(data)) {
    let mine = 0, theirs = 0, lateNight = 0, shares = 0;
    for (const m in f.months) {
      if (+m < from) continue;
      const [a, b, c, d] = f.months[m];
      mine += a; theirs += b; lateNight += c; shares += d;
    }
    const count = mine + theirs;
    if (count === 0) continue;
    rows.push({
      key,
      name: f.name,
      handle: f.handle,
      count, mine, theirs, lateNight, shares,
      avgReplyMin: f.replyN >= MIN_REPLY_SAMPLES ? Math.round(f.replySum / f.replyN) : null,
      maxStreak: f.maxStreak,
      ...activeYears(f),
      raw: balancedVolume(mine, theirs),
    });
  }

  rows.sort((a, b) => b.raw - a.raw);
  const max = Math.max(1, rows[0]?.raw ?? 1);
  return rows.map(({ raw, ...r }, i) => ({ ...r, rank: i + 1, score: Math.round((raw / max) * 100) }));
}

// 기준 월 = 데이터에서 가장 최근 메시지가 있는 달 (내보내기 시점 기준)
export function computeAllRankings(data: FriendData): RankingsByPeriod {
  let refMonth = -Infinity;
  for (const f of Object.values(data)) {
    for (const m in f.months) if (+m > refMonth) refMonth = +m;
  }
  const byPeriod = {} as RankingsByPeriod;
  for (const p of PERIODS) byPeriod[p.key] = computeRankings(data, p.months, refMonth);
  return byPeriod;
}

function activeYears(f: FriendStats) {
  const months = Object.keys(f.months).map(Number);
  return { firstYear: Math.floor(Math.min(...months) / 12), lastYear: Math.floor(Math.max(...months) / 12) };
}

/**
 * 화면 표시 이름 — 같은 이름의 대화방이 여럿이면 대화한 연도를 붙여 구분해요.
 * 인스타 export에는 사용자 고유 ID가 없어서, 같은 사람의 다른 대화방인지
 * 동명이인인지 알 수 없어요. 그래서 합치지 않고 따로 보여줘요.
 */
export function displayNames(list: RankedFriend[]): Record<string, string> {
  const groups: Record<string, RankedFriend[]> = {};
  for (const f of list) (groups[f.name] ||= []).push(f);
  const out: Record<string, string> = {};
  for (const [name, fs] of Object.entries(groups)) {
    if (fs.length === 1) {
      out[fs[0].key] = name;
      continue;
    }
    const labels = fs.map((f) => (f.firstYear === f.lastYear ? `${f.firstYear}` : `${f.firstYear}~${f.lastYear}`));
    fs.forEach((f, i) => {
      const dupLabel = labels.filter((l) => l === labels[i]).length > 1;
      out[f.key] = `${name} · ${labels[i]}${dupLabel ? ` #${i + 1}` : ""}`;
    });
  }
  return out;
}
