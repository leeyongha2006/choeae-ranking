// TODO(결제): 사업자 등록 후 앱인토스 인앱결제/토스페이로 연동해야 해요.
// 앱인토스에서는 토스페이 외 결제 수단을 제공할 수 없고, 결제 승인은 서버에서 검증해야 해요.
export const PRICE = 990;

export type PaymentResult = { ok: true } | { ok: false; reason: "NOT_READY" | "CANCELLED" | "FAILED" };

export async function requestUnlockPayment(): Promise<PaymentResult> {
  // 개발 중에는 전체 랭킹 화면을 확인할 수 있게 바로 열어줘요
  if (import.meta.env.DEV) return { ok: true };
  return { ok: false, reason: "NOT_READY" };
}
