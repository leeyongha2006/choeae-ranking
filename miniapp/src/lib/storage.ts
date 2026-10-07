// 분석 결과 저장 — 앱을 닫았다 다시 열어도 결과가 남아 있어야 해요 (앱인토스 검수 항목).
// 원본 대화는 저장하지 않고 랭킹 숫자만 저장해요.
import { Storage } from "@apps-in-toss/web-framework";
import type { PeriodKey, RankingsByPeriod } from "./parser";

export interface SavedResult {
  rankingsByPeriod: RankingsByPeriod;
  totalMessages: number;
  totalContacts: number;
  analyzedAt: string; // ISO
  period: PeriodKey;
}

// v2: 친구별 상세 지표 추가 (v1 결과는 다시 분석해야 해요)
const RESULT_KEY = "result.v2";
const PAID_KEY = "isPaid";

export async function loadResult(): Promise<SavedResult | null> {
  try {
    const raw = await Storage.getItem(RESULT_KEY);
    return raw ? (JSON.parse(raw) as SavedResult) : null;
  } catch {
    return null;
  }
}

export async function saveResult(result: SavedResult) {
  try {
    await Storage.setItem(RESULT_KEY, JSON.stringify(result));
  } catch {
    // 저장 실패해도 현재 화면은 그대로 동작
  }
}

export async function clearResult() {
  try {
    await Storage.removeItem(RESULT_KEY);
  } catch {}
}

// TODO(결제): 사업자 등록 후 앱인토스 결제 연동 시 서버 검증 값으로 교체
export async function loadIsPaid() {
  try {
    return (await Storage.getItem(PAID_KEY)) === "true";
  } catch {
    return false;
  }
}

export async function saveIsPaid(v: boolean) {
  try {
    await Storage.setItem(PAID_KEY, v ? "true" : "false");
  } catch {}
}
