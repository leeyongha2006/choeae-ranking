(function () {
const { Button, Input, Image } = window.DesignSystem_8db18d;

const DEMO_TOP5 = [
  { rank: 1, medal: "🥇", name: "김민지", score: 98, kakaoCount: 987, avgResponseMin: 6, delta: "—" },
  { rank: 2, medal: "🥈", name: "이준호", score: 87, kakaoCount: 842, avgResponseMin: 11, delta: "▼ 1" },
  { rank: 3, medal: "🥉", name: "박서연", score: 79, kakaoCount: 761, avgResponseMin: 8, delta: "▲ 2" },
  { rank: 4, medal: "4️⃣", name: "최다인", score: 68, kakaoCount: 698, avgResponseMin: 15, delta: "NEW" },
  { rank: 5, medal: "5️⃣", name: "정하늘", score: 55, kakaoCount: 512, avgResponseMin: 20, delta: "▲ 1" },
];

function DashboardScreen({ onNavigate, appData }) {
  const { AppShell, SectionLabel, Well, Card } = window;

  const hasData = appData && appData.rankings && appData.rankings.length > 0;
  const top5 = hasData ? appData.rankings : DEMO_TOP5;
  const totalMessages = hasData ? appData.totalMessages : 3800;
  const totalContacts = hasData ? appData.totalContacts : 38;
  const isDemo = appData && appData.isDemo;
  const uploadedAt = (appData && appData.uploadedAt) || "2026.07";

  return (
    <AppShell activeNav="result" onNavigate={onNavigate}>
      {isDemo && (
        <div style={{ background: "var(--violet-100)", borderRadius: "var(--radius-md)", padding: "10px 16px", fontSize: 13, color: "var(--violet-700)" }}>
          📊 데모 모드 — 샘플 데이터 기준 결과입니다
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <SectionLabel>이번 달 랭킹 결과</SectionLabel>
          <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 2 }}>{uploadedAt} 기준 분석</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Button variant="primary" onClick={() => onNavigate("top5")}>TOP 5 상세 보기</Button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Well style={{ flex: "1 1 200px" }}>
          <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>분석된 총 대화 상대</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--violet-600)" }}>{totalContacts}명</span>
        </Well>
        <Well style={{ flex: "1 1 200px" }}>
          <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>총 소통 횟수</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--pink-500)" }}>{totalMessages.toLocaleString()}회</span>
        </Well>
        <Card style={{ flex: "1 1 200px", background: "var(--gradient-holo-soft)", border: "none" }}>
          <span style={{ fontSize: 12, color: "var(--ink-700)" }}>이번 달 최애 친구</span>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--ink-900)", marginTop: 6 }}>
            {top5[0]?.name || "—"} 👑
          </div>
        </Card>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <SectionLabel>TOP 5 친구 미리보기</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {top5.map((f) => (
            <div
              key={f.name}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                background: "var(--surface-card)", border: "1px solid var(--border-soft)",
                borderRadius: "var(--radius-md)", padding: "10px 16px",
                boxShadow: f.rank === 1 ? "var(--shadow-pop-yellow)" : "var(--shadow-card)",
              }}
            >
              <span style={{ fontSize: 20, width: 28 }}>{f.medal}</span>
              <Image shape="round" size={36} initials={f.name.slice(0, 1)} />
              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>{f.name}</span>
                <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                  대화 횟수 {(f.kakaoCount || f.score || 0).toLocaleString()}회
                  {f.avgResponseMin ? ` · 평균 응답 ${f.avgResponseMin}분` : ""}
                </span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: (f.delta || "").startsWith("▲") ? "var(--color-success)" : (f.delta || "").startsWith("▼") ? "var(--color-danger)" : "var(--violet-600)" }}>
                {f.delta || "—"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="default" onClick={() => onNavigate("mypage")}>마이페이지 / 설정</Button>
        <Button variant="primary" size="lg" onClick={() => onNavigate("top5")}>TOP 5 상세 분석 보기</Button>
      </div>
    </AppShell>
  );
}

window.DashboardScreen = DashboardScreen;
})();
