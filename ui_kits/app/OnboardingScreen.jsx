(function () {

function OnboardingScreen({ onNavigate }) {
  return (
    <div style={{
      minHeight: "100dvh",
      background: "#0d0d0d",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "space-between",
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

      {/* 티저 카드 */}
      <div style={{ width: "100%", maxWidth: 380, display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { rank: "1", medal: "🥇", name: "???", msg: "987회", top: true },
          { rank: "2", medal: "🥈", name: "???", msg: "842회" },
          { rank: "3", medal: "🥉", name: "???", msg: "761회" },
        ].map((f) => (
          <div key={f.rank} style={{
            display: "flex", alignItems: "center", gap: 14,
            background: f.top ? "rgba(225,48,108,0.12)" : "rgba(255,255,255,0.05)",
            border: f.top ? "1px solid rgba(225,48,108,0.3)" : "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16, padding: "14px 18px",
            filter: "blur(3px)",
            userSelect: "none",
          }}>
            <span style={{ fontSize: 22 }}>{f.medal}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: "#fff", fontFamily: "var(--font-display)" }}>{f.name}</div>
              <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{f.msg} 대화</div>
            </div>
            <div style={{ fontWeight: 900, fontSize: 22, color: f.top ? "#e1306c" : "#555", fontFamily: "var(--font-display)" }}>
              {f.top ? "100" : "—"}
            </div>
          </div>
        ))}
        <div style={{
          marginTop: 4, textAlign: "center",
          fontSize: 12, color: "#555",
        }}>파일 올리면 바로 공개돼요 👇</div>
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
