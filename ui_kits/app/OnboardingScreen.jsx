(function () {

function OnboardingScreen({ onNavigate }) {
  return (
    <div style={{
      minHeight: "100dvh",
      background: "#0d0d0d",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "flex-end", gap: 48,
      padding: "60px 24px 48px",
      boxSizing: "border-box",
      position: "relative", overflow: "hidden",
    }}>
      {/* 배경 글로우 */}
      <div style={{
        position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(225,48,108,0.18) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* 상단 영역 */}
      <div style={{ width: "100%", maxWidth: 380, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#e1306c", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
          Instagram DM 분석
        </span>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(38px, 11vw, 52px)",
          lineHeight: 1.1, fontWeight: 900,
          color: "#fff", margin: "0 0 20px",
          letterSpacing: "-0.03em",
        }}>
          내 찐친은<br />
          <span style={{
            background: "linear-gradient(135deg, #f09433, #e1306c, #bc1888)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>진짜 몇 명?</span>
        </h1>
        <p style={{ fontSize: 15, color: "#888", margin: 0, lineHeight: 1.7 }}>
          인스타 DM 기록 하나면<br />소통 순위가 딱 나와요
        </p>
      </div>

      {/* 기능 요약 */}
      <div style={{ width: "100%", maxWidth: 380, display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { icon: "📂", text: "zip 파일 하나면 충분" },
          { icon: "📊", text: "DM 기반 소통 점수 계산" },
          { icon: "🏆", text: "친구 순위 TOP 10" },
        ].map((item) => (
          <div key={item.text} style={{
            display: "flex", alignItems: "center", gap: 14,
            padding: "14px 18px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 14,
          }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#ccc" }}>{item.text}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ width: "100%", maxWidth: 380, display: "flex", flexDirection: "column", gap: 12 }}>
        <button
          onClick={() => onNavigate("upload")}
          style={{
            width: "100%", padding: "18px",
            background: "#fff",
            border: "none", borderRadius: 16,
            fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 900,
            color: "#0d0d0d", cursor: "pointer",
            letterSpacing: "-0.02em",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          내 순위 확인하기 →
        </button>
        <p style={{ margin: 0, fontSize: 12, color: "#444", textAlign: "center" }}>
          파일이 서버로 전송되지 않아요 · 완전 로컬 분석
        </p>
      </div>
    </div>
  );
}

window.OnboardingScreen = OnboardingScreen;
})();
