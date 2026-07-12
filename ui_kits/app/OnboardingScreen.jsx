(function () {

function OnboardingScreen({ onNavigate }) {
  return (
    <div style={{
      minHeight: "100vh",
      minHeight: "100dvh",
      background: "linear-gradient(160deg, #fff5f7 0%, #fff8f0 50%, #fdf5ff 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "48px 24px 56px",
      boxSizing: "border-box",
    }}>
      <div style={{
        width: "100%", maxWidth: 380,
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 28,
      }}>

        {/* 이모지 */}
        <div style={{ fontSize: 56, lineHeight: 1 }}>👑</div>

        {/* 타이틀 */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(26px, 8vw, 34px)",
            lineHeight: 1.25, fontWeight: 900,
            color: "#111", margin: "0 0 12px",
            letterSpacing: "-0.02em",
          }}>
            나랑 제일 친한 친구<br />
            <span style={{
              background: "linear-gradient(135deg, #f09433 0%, #e1306c 50%, #bc1888 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              진짜로 누구일까?
            </span>
          </h1>
          <p style={{
            fontSize: 15, color: "#666",
            margin: 0, lineHeight: 1.65,
          }}>
            인스타그램 DM 기록으로<br />
            자주 연락한 친구 순위를 뽑아드려요
          </p>
        </div>

        {/* 기능 카드 */}
        <div style={{
          width: "100%",
          borderRadius: 22,
          background: "linear-gradient(145deg, #f09433 0%, #e1306c 55%, #bc1888 100%)",
          padding: "22px 20px",
          color: "#fff",
          boxShadow: "0 16px 48px rgba(220,39,67,0.22), 0 4px 12px rgba(220,39,67,0.12)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <div style={{
              width: 46, height: 46, borderRadius: 13,
              background: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                <rect x="5" y="5" width="18" height="18" rx="5.5" fill="none" stroke="white" strokeWidth="1.8"/>
                <circle cx="14" cy="14" r="4.5" fill="none" stroke="white" strokeWidth="1.8"/>
                <circle cx="19.5" cy="8.5" r="1.1" fill="white"/>
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-0.02em" }}>인스타그램 DM</div>
              <div style={{ fontSize: 12, opacity: 0.8, marginTop: 1 }}>자동으로 분석해드려요</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {[
              ["💬", "대화를 가장 많이 나눈 친구 순위"],
              ["📅", "원하는 기간만 골라서 분석"],
              ["🔒", "파일이 내 기기 밖으로 나가지 않아요"],
            ].map(([emoji, text]) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                <span style={{ fontSize: 18, width: 24, textAlign: "center" }}>{emoji}</span>
                <span style={{ opacity: 0.92 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            onClick={() => onNavigate("upload")}
            style={{
              width: "100%", padding: "17px",
              background: "linear-gradient(135deg, #f09433 0%, #e1306c 50%, #bc1888 100%)",
              border: "none", borderRadius: 16,
              fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 800,
              color: "#fff", cursor: "pointer",
              boxShadow: "0 8px 28px rgba(220,39,67,0.32)",
              WebkitTapHighlightColor: "transparent",
              letterSpacing: "-0.01em",
            }}
          >
            시작하기 →
          </button>
          <p style={{ margin: 0, fontSize: 12, color: "#aaa", textAlign: "center", lineHeight: 1.5 }}>
            인스타 파일 신청 후 1~3일 후에 받을 수 있어요
          </p>
        </div>

      </div>
    </div>
  );
}

window.OnboardingScreen = OnboardingScreen;
})();
