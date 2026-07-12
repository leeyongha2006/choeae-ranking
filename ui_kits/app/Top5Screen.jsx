(function () {
const { Button, Image } = window.DesignSystem_8db18d;
const { useState } = React;

const DEMO_RANK = [
  { rank: 1, medal: "🥇", name: "김민지", score: 100, instaCount: 987, delta: "전월 대비 유지" },
  { rank: 2, medal: "🥈", name: "이준호", score: 85, instaCount: 842, delta: "전월 대비 ▲1" },
  { rank: 3, medal: "🥉", name: "박서연", score: 77, instaCount: 761, delta: "전월 대비 ▼2" },
  { rank: 4, medal: "4️⃣", name: "최다인", score: 71, instaCount: 698, delta: "전월 대비 0" },
  { rank: 5, medal: "5️⃣", name: "정하늘", score: 52, instaCount: 512, delta: "전월 대비 ▲5" },
  { rank: 6, medal: "6️⃣", name: "홍성진", score: 41, instaCount: 401, delta: "전월 대비 ▼1" },
  { rank: 7, medal: "7️⃣", name: "류지원", score: 32, instaCount: 312, delta: "전월 대비 유지" },
];

function ScoreBar({ value, max }) {
  return (
    <div style={{ height: 6, borderRadius: "var(--radius-pill)", background: "var(--paper-200)", overflow: "hidden", flex: 1 }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: "var(--gradient-mint-violet)", borderRadius: "var(--radius-pill)" }} />
    </div>
  );
}

// 토스페이먼츠 클라이언트 키 — 대시보드(https://developers.tosspayments.com)에서 발급 후 교체
const TOSS_CLIENT_KEY = "test_ck_6BYq7GWPVvyLLogZM5YI3NE5vbo1";

function PaywallModal({ totalLocked, appData, onPay, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handlePay() {
    setLoading(true);
    setError(null);

    try {
      // 결제 후 돌아왔을 때 데이터 복원용
      sessionStorage.setItem("rankingAppData", JSON.stringify(appData));
    } catch {}

    const orderId = "order_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7);
    const baseUrl = window.location.origin + window.location.pathname;

    const tossPayments = TossPayments(TOSS_CLIENT_KEY);
    tossPayments.requestPayment("카드", {
      amount: 990,
      orderId,
      orderName: "최애친구 랭킹 전체 보기",
      customerName: "사용자",
      successUrl: baseUrl + "?payment=success",
      failUrl: baseUrl + "?payment=fail",
    }).catch((e) => {
      setLoading(false);
      if (e.code !== "USER_CANCEL") {
        setError("결제 중 오류가 발생했어요: " + e.message);
      }
    });
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "var(--surface-card)", borderRadius: 24,
        padding: "28px 24px", maxWidth: 340, width: "100%",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        display: "flex", flexDirection: "column", gap: 18, textAlign: "center",
      }}>
        <div style={{ fontSize: 40 }}>🔓</div>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--ink-900)", marginBottom: 6 }}>
            전체 랭킹 보기
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
            4위부터 {3 + totalLocked}위까지<br/>
            나머지 <strong style={{ color: "var(--violet-600)" }}>{totalLocked}명</strong>의 순위를 모두 확인해요
          </div>
        </div>
        <div style={{
          background: "var(--gradient-holo-soft)", borderRadius: 14,
          padding: "14px 16px",
        }}>
          <div style={{ fontSize: 28, fontFamily: "var(--font-display)", color: "var(--ink-900)", fontWeight: 800 }}>₩990</div>
          <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 2 }}>1회 결제 · 평생 열람</div>
        </div>
        {error && (
          <div style={{ fontSize: 12, color: "#e53e3e", background: "#fff5f5", borderRadius: 10, padding: "10px 14px" }}>
            {error}
          </div>
        )}
        <Button
          variant="primary" size="lg"
          onClick={handlePay}
          disabled={loading}
          style={{ width: "100%", background: "linear-gradient(135deg, var(--violet-600), var(--pink-500))", opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "결제창 열리는 중…" : "990원으로 전체 보기 💳"}
        </Button>
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 12, color: "var(--text-tertiary)", cursor: "pointer" }}>
          나중에
        </button>
      </div>
    </div>
  );
}

function Top5Screen({ onNavigate, appData, isPaid, setIsPaid }) {
  const { AppShell, SectionLabel, Well } = window;
  const [selected, setSelected] = useState(null);
  const [showPaywall, setShowPaywall] = useState(false);

  const hasData = appData && appData.rankings && appData.rankings.length > 0;
  const allRank = hasData ? appData.rankings : DEMO_RANK;
  const isDemo = appData && appData.isDemo;

  const freeRank = allRank.slice(0, 3);
  const lockedRank = allRank.slice(3);
  const rank = isPaid ? allRank : freeRank;

  const totalMsgs = allRank.reduce((s, f) => s + (f.instaCount || 0), 0);
  const topFriend = allRank[0];
  const maxScore = Math.max(...allRank.map((f) => f.score || f.kakaoCount || 1));

  return (
    <AppShell activeNav="top5" onNavigate={onNavigate}>
      {showPaywall && (
        <PaywallModal
          totalLocked={lockedRank.length}
          appData={appData}
          onPay={() => { setIsPaid(true); setShowPaywall(false); }}
          onClose={() => setShowPaywall(false)}
        />
      )}

      {isDemo && (
        <div style={{ background: "var(--violet-100)", borderRadius: "var(--radius-md)", padding: "10px 16px", fontSize: 13, color: "var(--violet-700)" }}>
          📊 데모 모드 — 샘플 데이터 기준 결과입니다
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--ink-900)" }}>랭킹 결과 🏆</span>
        <Button variant="primary" size="lg" onClick={() => onNavigate("share")}>공유 카드 만들기 💌</Button>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Well style={{ flex: "1 1 160px" }}>
          <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>총 소통 횟수</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--violet-600)" }}>{totalMsgs.toLocaleString()}회</span>
        </Well>
        <Well style={{ flex: "1 1 160px" }}>
          <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>이번 달 최애</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--pink-600)" }}>{topFriend?.name || "—"}</span>
        </Well>
        <Well style={{ flex: "1 1 160px" }}>
          <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>분석된 대화 상대</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--ink-900)" }}>{appData?.totalContacts || allRank.length}명</span>
        </Well>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <SectionLabel>나의 최애 친구 TOP 3</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {rank.map((f, i) => (
            <div key={f.name}>
              <div
                onClick={() => setSelected(selected === f.name ? null : f.name)}
                style={{
                  display: "flex", alignItems: "center", gap: 16, cursor: "pointer",
                  background: i === 0 ? "var(--gradient-holo-soft)" : "var(--surface-card)",
                  border: i === 0 ? "none" : "1px solid var(--border-soft)",
                  boxShadow: i === 0 ? "var(--shadow-pop-yellow)" : "var(--shadow-card)",
                  borderRadius: selected === f.name ? "var(--radius-lg) var(--radius-lg) 0 0" : "var(--radius-lg)",
                  padding: "14px 18px",
                  transition: "box-shadow 200ms var(--ease-out)",
                }}
              >
                <span style={{ fontSize: 24, width: 34 }}>{f.medal}</span>
                <Image shape="round" size={44} initials={f.name.slice(0, 1)} />
                <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 4 }}>
                  <span style={{ fontWeight: 800, fontSize: 15, color: "var(--text-primary)" }}>{f.name}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <ScoreBar value={f.score || f.kakaoCount} max={maxScore} />
                    <span style={{ fontSize: 11, color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
                      {(f.instaCount || 0).toLocaleString()}회
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--violet-600)" }}>{f.score || f.kakaoCount}</span>
                  <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{f.delta}</span>
                </div>
              </div>

              {selected === f.name && (
                <div style={{
                  background: "var(--surface-card)", border: "1px solid var(--border-soft)",
                  borderTop: "none", borderRadius: "0 0 var(--radius-lg) var(--radius-lg)",
                  padding: "14px 18px 16px", display: "flex", gap: 20, flexWrap: "wrap",
                }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: "1 1 140px" }}>
                    <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>📷 인스타그램 메시지</span>
                    <span style={{ fontWeight: 700, fontSize: 18, color: "var(--ink-900)" }}>{(f.instaCount || 0).toLocaleString()}건</span>
                  </div>
                  {f.avgResponseMin && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: "1 1 140px" }}>
                      <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>⚡ 평균 응답 시간</span>
                      <span style={{ fontWeight: 700, fontSize: 18, color: "var(--ink-900)" }}>{f.avgResponseMin}분</span>
                    </div>
                  )}
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: "1 1 140px" }}>
                    <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>🏆 소통 점수</span>
                    <span style={{ fontWeight: 700, fontSize: 18, color: "var(--violet-600)" }}>{f.score || f.kakaoCount}점</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 잠긴 영역 */}
        {!isPaid && lockedRank.length > 0 && (
          <div style={{ position: "relative" }}>
            {/* 블러 미리보기 */}
            <div style={{ filter: "blur(6px)", pointerEvents: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {lockedRank.slice(0, 3).map((f) => (
                <div key={f.name} style={{
                  display: "flex", alignItems: "center", gap: 16,
                  background: "var(--surface-card)", border: "1px solid var(--border-soft)",
                  borderRadius: "var(--radius-lg)", padding: "14px 18px",
                }}>
                  <span style={{ fontSize: 24, width: 34 }}>{f.medal}</span>
                  <Image shape="round" size={44} initials={f.name.slice(0, 1)} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 15, color: "var(--text-primary)" }}>{f.name}</div>
                    <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                      {(f.instaCount || 0).toLocaleString()}회
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* 잠금 오버레이 */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 12, background: "rgba(255,255,255,0.5)", backdropFilter: "blur(2px)",
              borderRadius: "var(--radius-lg)",
            }}>
              <span style={{ fontSize: 32 }}>🔒</span>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: "var(--ink-900)" }}>4위~{3 + lockedRank.length}위 잠김</div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>나머지 {lockedRank.length}명의 순위를 확인하려면</div>
              </div>
              <Button
                variant="primary" size="lg"
                onClick={() => setShowPaywall(true)}
                style={{ background: "linear-gradient(135deg, var(--violet-600), var(--pink-500))" }}
              >
                990원으로 전체 보기 🔓
              </Button>
            </div>
          </div>
        )}

        {isPaid && (
          <div style={{ textAlign: "center", fontSize: 12, color: "var(--text-tertiary)" }}>
            ✅ 전체 랭킹 열람 중
          </div>
        )}

        <span style={{ fontSize: 11, color: "var(--text-tertiary)", textAlign: "center" }}>친구 행을 클릭하면 상세 소통 정보를 확인할 수 있어요</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <SectionLabel>지난 랭킹 미리보기</SectionLabel>
        <Well style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>2026년 6월 기준 · 랭킹 점수 87</span>
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>2026년 5월 기준 · 랭킹 점수 74</span>
          <Button variant="default">전체 히스토리 보기</Button>
        </Well>
      </div>
    </AppShell>
  );
}

window.Top5Screen = Top5Screen;
})();
