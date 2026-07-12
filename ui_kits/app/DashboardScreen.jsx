(function () {

const DEMO_TOP5 = [
  { rank: 1, medal: "🥇", name: "김민지", score: 98, instaCount: 987, delta: "—" },
  { rank: 2, medal: "🥈", name: "이준호", score: 87, instaCount: 842, delta: "▼ 1" },
  { rank: 3, medal: "🥉", name: "박서연", score: 79, instaCount: 761, delta: "▲ 2" },
];

function DashboardScreen({ onNavigate, appData }) {
  const { AppShell } = window;

  const hasData = appData && appData.rankings && appData.rankings.length > 0;
  const top5 = hasData ? appData.rankings : DEMO_TOP5;
  const totalMessages = hasData ? appData.totalMessages : 3800;
  const totalContacts = hasData ? appData.totalContacts : 38;
  const uploadedAt = (appData && appData.uploadedAt) || "2026.07";

  return (
    <AppShell activeNav="top5" onNavigate={onNavigate}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#e1306c", letterSpacing: "0.06em", marginBottom: 4 }}>
            {uploadedAt} 기준 분석
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>
            이번 달 랭킹
          </div>
        </div>
        <button
          onClick={() => onNavigate("top5")}
          style={{
            padding: "8px 14px",
            background: "linear-gradient(135deg, #f09433, #e1306c)",
            border: "none", borderRadius: 99,
            fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 700,
            color: "#fff", cursor: "pointer",
          }}
        >전체 보기 →</button>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <div style={{
          flex: 1, background: "#161616", border: "1px solid #1e1e1e",
          borderRadius: 16, padding: "16px", display: "flex", flexDirection: "column", gap: 4,
        }}>
          <span style={{ fontSize: 11, color: "#555" }}>대화 상대</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 900, color: "#fff" }}>{totalContacts}명</span>
        </div>
        <div style={{
          flex: 1, background: "#161616", border: "1px solid #1e1e1e",
          borderRadius: 16, padding: "16px", display: "flex", flexDirection: "column", gap: 4,
        }}>
          <span style={{ fontSize: 11, color: "#555" }}>총 소통 횟수</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 900, color: "#e1306c" }}>{totalMessages.toLocaleString()}</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#444", letterSpacing: "0.06em" }}>TOP 3 미리보기</div>
        {top5.slice(0, 3).map((f) => (
          <div key={f.name} style={{
            display: "flex", alignItems: "center", gap: 14,
            background: f.rank === 1 ? "linear-gradient(135deg, #1a0a00, #2d0d18)" : "#161616",
            border: f.rank === 1 ? "1px solid rgba(225,48,108,0.2)" : "1px solid #1e1e1e",
            borderRadius: 16, padding: "12px 16px",
          }}>
            <span style={{ fontSize: 20, width: 28 }}>{f.medal}</span>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg, #f09433, #bc1888)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 800, color: "#fff", flexShrink: 0,
            }}>
              {f.name.slice(0, 1)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>{f.name}</div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>
                {((f.instaCount || 0)).toLocaleString()}회 대화
              </div>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: (f.delta || "").startsWith("▲") ? "#4ade80" : (f.delta || "").startsWith("▼") ? "#e1306c" : "#555" }}>
              {f.delta || "—"}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => onNavigate("top5")}
        style={{
          width: "100%", padding: "15px",
          background: "#161616", border: "1px solid #2a2a2a",
          borderRadius: 14, fontFamily: "var(--font-body)",
          fontSize: 14, fontWeight: 700, color: "#888", cursor: "pointer",
        }}
      >전체 랭킹 확인하기 →</button>
    </AppShell>
  );
}

window.DashboardScreen = DashboardScreen;
})();
