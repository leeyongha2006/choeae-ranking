(function () {
const { useState } = React;

const DEMO_RANK = [
  { rank: 1, medal: "🥇", name: "김민지", score: 100, instaCount: 987 },
  { rank: 2, medal: "🥈", name: "이준호", score: 85, instaCount: 842 },
  { rank: 3, medal: "🥉", name: "박서연", score: 77, instaCount: 761 },
  { rank: 4, medal: "4️⃣", name: "최다인", score: 71, instaCount: 698 },
  { rank: 5, medal: "5️⃣", name: "정하늘", score: 52, instaCount: 512 },
  { rank: 6, medal: "6️⃣", name: "홍성진", score: 41, instaCount: 401 },
  { rank: 7, medal: "7️⃣", name: "류지원", score: 32, instaCount: 312 },
];

const TOSS_CLIENT_KEY = "test_ck_6BYq7GWPVvyLLogZM5YI3NE5vbo1";

function PaywallModal({ totalLocked, appData, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handlePay() {
    setLoading(true);
    setError(null);
    try { sessionStorage.setItem("rankingAppData", JSON.stringify(appData)); } catch {}
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
      if (e.code !== "USER_CANCEL") setError("결제 중 오류가 발생했어요: " + e.message);
    });
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#161616", borderRadius: "24px 24px 0 0",
        border: "1px solid #2a2a2a", borderBottom: "none",
        padding: "32px 24px 48px", width: "100%", maxWidth: 480,
        display: "flex", flexDirection: "column", gap: 20,
      }}>
        <div style={{ width: 40, height: 4, background: "#2a2a2a", borderRadius: 99, margin: "0 auto 4px" }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 14 }}>🔓</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#fff", fontWeight: 900, marginBottom: 8 }}>
            나머지 {totalLocked}명 순위 보기
          </div>
          <div style={{ fontSize: 14, color: "#666", lineHeight: 1.7 }}>
            4위부터 {3 + totalLocked}위까지<br/>전체 랭킹을 확인해요
          </div>
        </div>
        <div style={{
          background: "rgba(225,48,108,0.08)", border: "1px solid rgba(225,48,108,0.15)",
          borderRadius: 16, padding: "20px", textAlign: "center",
        }}>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#fff", fontFamily: "var(--font-display)" }}>₩990</div>
          <div style={{ fontSize: 12, color: "#555", marginTop: 4 }}>1회 결제 · 평생 열람</div>
        </div>
        {error && (
          <div style={{ fontSize: 12, color: "#e1306c", textAlign: "center" }}>{error}</div>
        )}
        <button
          onClick={handlePay}
          disabled={loading}
          style={{
            width: "100%", padding: "18px",
            background: loading ? "#1e1e1e" : "linear-gradient(135deg, #f09433, #e1306c, #bc1888)",
            border: "none", borderRadius: 14,
            fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 900,
            color: loading ? "#555" : "#fff", cursor: loading ? "default" : "pointer",
          }}
        >
          {loading ? "결제창 여는 중…" : "990원으로 전체 보기 💳"}
        </button>
        <button onClick={onClose} style={{
          background: "none", border: "none", fontSize: 13,
          color: "#444", cursor: "pointer", padding: "4px",
        }}>
          나중에
        </button>
      </div>
    </div>
  );
}

function RankCard({ f, i, maxScore, selected, onSelect }) {
  const isFirst = i === 0;
  const isOpen = selected === f.name;

  if (isFirst) {
    return (
      <div style={{ marginBottom: 4 }}>
        <div
          onClick={() => onSelect(f.name)}
          style={{
            borderRadius: isOpen ? "20px 20px 0 0" : 20,
            background: "linear-gradient(135deg, #1a0a00, #2d0d18, #1a0020)",
            border: "1px solid rgba(225,48,108,0.25)",
            padding: "24px 20px",
            cursor: "pointer",
            position: "relative", overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", top: -40, right: -40,
            width: 160, height: 160, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(225,48,108,0.2) 0%, transparent 70%)",
          }} />
          <div style={{ fontSize: 11, fontWeight: 700, color: "#e1306c", letterSpacing: "0.1em", marginBottom: 12 }}>
            👑 BEST FRIEND
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 900, color: "#fff", marginBottom: 6, letterSpacing: "-0.02em" }}>
            {f.name}
          </div>
          <div style={{ fontSize: 13, color: "#555", marginBottom: 16 }}>
            총 {(f.instaCount || 0).toLocaleString()}회 대화
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 99, marginRight: 12, overflow: "hidden" }}>
              <div style={{ width: "100%", height: "100%", background: "linear-gradient(90deg, #f09433, #e1306c)", borderRadius: 99 }} />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 900, color: "#e1306c" }}>{f.score}</span>
          </div>
        </div>
        {isOpen && (
          <div style={{
            background: "#111", border: "1px solid rgba(225,48,108,0.15)", borderTop: "none",
            borderRadius: "0 0 20px 20px", padding: "16px 20px",
            display: "flex", gap: 16,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "#444", marginBottom: 4 }}>📷 인스타 DM</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{(f.instaCount || 0).toLocaleString()}건</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "#444", marginBottom: 4 }}>🏆 소통 점수</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#e1306c" }}>{f.score}점</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div
        onClick={() => onSelect(f.name)}
        style={{
          display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
          background: "#161616", border: "1px solid #1e1e1e",
          borderRadius: isOpen ? "16px 16px 0 0" : 16,
          padding: "14px 16px",
        }}
      >
        <span style={{ fontSize: 20, width: 28, textAlign: "center", opacity: 0.6 }}>{f.medal}</span>
        <div style={{
          width: 38, height: 38, borderRadius: "50%",
          background: "linear-gradient(135deg, #f09433, #bc1888)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 15, fontWeight: 800, color: "#fff", flexShrink: 0,
        }}>
          {f.name.slice(0, 1)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#fff", marginBottom: 5 }}>{f.name}</div>
          <div style={{ height: 3, background: "#1e1e1e", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ width: `${(f.score / maxScore) * 100}%`, height: "100%", background: "#2a2a2a", borderRadius: 99 }} />
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 900, color: "#fff" }}>{f.score}</div>
          <div style={{ fontSize: 10, color: "#444", marginTop: 1 }}>{(f.instaCount || 0).toLocaleString()}회</div>
        </div>
      </div>
      {isOpen && (
        <div style={{
          background: "#111", border: "1px solid #1e1e1e", borderTop: "none",
          borderRadius: "0 0 16px 16px", padding: "14px 16px",
          display: "flex", gap: 16,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "#444", marginBottom: 4 }}>📷 인스타 DM</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{(f.instaCount || 0).toLocaleString()}건</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "#444", marginBottom: 4 }}>🏆 소통 점수</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#e1306c" }}>{f.score}점</div>
          </div>
        </div>
      )}
    </div>
  );
}

function Top5Screen({ onNavigate, appData, isPaid, setIsPaid }) {
  const { AppShell } = window;
  const [selected, setSelected] = useState(null);
  const [showPaywall, setShowPaywall] = useState(false);

  const hasData = appData && appData.rankings && appData.rankings.length > 0;
  const allRank = hasData ? appData.rankings : DEMO_RANK;

  const freeRank = allRank.slice(0, 3);
  const lockedRank = allRank.slice(3);
  const rank = isPaid ? allRank : freeRank;

  const totalMsgs = allRank.reduce((s, f) => s + (f.instaCount || 0), 0);
  const topFriend = allRank[0];
  const maxScore = Math.max(...allRank.map((f) => f.score || 1));

  function onSelect(name) {
    setSelected(prev => prev === name ? null : name);
  }

  return (
    <AppShell activeNav="top5" onNavigate={onNavigate}>
      {showPaywall && (
        <PaywallModal
          totalLocked={lockedRank.length}
          appData={appData}
          onClose={() => setShowPaywall(false)}
        />
      )}

      {/* 헤더 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#e1306c", letterSpacing: "0.06em", marginBottom: 4 }}>
            INSTAGRAM DM 분석
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>
            내 찐친 랭킹 🏆
          </div>
        </div>
        <button
          onClick={() => onNavigate("share")}
          style={{
            padding: "8px 14px", background: "#1e1e1e", border: "none",
            borderRadius: 99, fontFamily: "var(--font-body)",
            fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer",
          }}
        >
          공유 💌
        </button>
      </div>

      {/* 요약 스탯 */}
      <div style={{
        background: "#161616", border: "1px solid #1e1e1e",
        borderRadius: 16, padding: "16px 18px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", fontFamily: "var(--font-display)" }}>
            {totalMsgs.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>총 대화 수</div>
        </div>
        <div style={{ width: 1, height: 32, background: "#2a2a2a" }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#e1306c", fontFamily: "var(--font-display)" }}>
            {topFriend?.name || "—"}
          </div>
          <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>이달의 최애</div>
        </div>
        <div style={{ width: 1, height: 32, background: "#2a2a2a" }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", fontFamily: "var(--font-display)" }}>
            {appData?.totalContacts || allRank.length}명
          </div>
          <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>분석 대상</div>
        </div>
      </div>

      {/* 랭킹 리스트 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#444", letterSpacing: "0.06em", marginBottom: 4 }}>
          TOP {isPaid ? allRank.length : 3}
        </div>
        {rank.map((f, i) => (
          <RankCard key={f.name} f={f} i={i} maxScore={maxScore} selected={selected} onSelect={onSelect} />
        ))}

        {!isPaid && lockedRank.length > 0 && (
          <div
            onClick={() => setShowPaywall(true)}
            style={{
              marginTop: 4,
              background: "#111", border: "1px dashed #2a2a2a",
              borderRadius: 16, padding: "20px",
              display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 28 }}>🔒</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: "#fff" }}>
                4위~{3 + lockedRank.length}위 잠김
              </div>
              <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>
                나머지 {lockedRank.length}명 · 990원으로 열기
              </div>
            </div>
            <div style={{
              padding: "8px 14px", background: "linear-gradient(135deg, #f09433, #e1306c)",
              borderRadius: 99, fontSize: 13, fontWeight: 800, color: "#fff",
            }}>
              열기
            </div>
          </div>
        )}

        {isPaid && (
          <div style={{ textAlign: "center", fontSize: 12, color: "#444", paddingTop: 4 }}>
            ✅ 전체 랭킹 열람 중
          </div>
        )}
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: "#333" }}>
        카드를 탭하면 상세 정보를 볼 수 있어요
      </div>
    </AppShell>
  );
}

window.Top5Screen = Top5Screen;
})();
