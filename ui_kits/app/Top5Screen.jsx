(function () {
const { Button, Image } = window.DesignSystem_8db18d;
const { useState } = React;

const DEMO_RANK = [
  { rank: 1, medal: "🥇", name: "김민지", score: 98, kakaoCount: 987, instaCount: 42, avgResponseMin: 6, delta: "전월 대비 유지" },
  { rank: 2, medal: "🥈", name: "이준호", score: 87, kakaoCount: 842, instaCount: 18, avgResponseMin: 11, delta: "전월 대비 ▲1" },
  { rank: 3, medal: "🥉", name: "박서연", score: 79, kakaoCount: 761, instaCount: 31, avgResponseMin: 8, delta: "전월 대비 ▼2" },
  { rank: 4, medal: "4️⃣", name: "최다인", score: 68, kakaoCount: 698, instaCount: 8, avgResponseMin: 15, delta: "전월 대비 0" },
  { rank: 5, medal: "5️⃣", name: "정하늘", score: 55, kakaoCount: 512, instaCount: 0, avgResponseMin: 20, delta: "전월 대비 ▲5" },
];

function ScoreBar({ value, max }) {
  return (
    <div style={{ height: 6, borderRadius: "var(--radius-pill)", background: "var(--paper-200)", overflow: "hidden", flex: 1 }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: "var(--gradient-mint-violet)", borderRadius: "var(--radius-pill)" }} />
    </div>
  );
}

function Top5Screen({ onNavigate, appData }) {
  const { AppShell, SectionLabel, Well } = window;
  const [selected, setSelected] = useState(null);

  const hasData = appData && appData.rankings && appData.rankings.length > 0;
  const rank = hasData ? appData.rankings : DEMO_RANK;
  const isDemo = appData && appData.isDemo;

  const totalMsgs = rank.reduce((s, f) => s + (f.kakaoCount || 0) + (f.instaCount || 0), 0);
  const topFriend = rank[0];
  const maxScore = Math.max(...rank.map((f) => f.score || f.kakaoCount || 1));

  return (
    <AppShell activeNav="result" onNavigate={onNavigate}>
      {isDemo && (
        <div style={{ background: "var(--violet-100)", borderRadius: "var(--radius-md)", padding: "10px 16px", fontSize: 13, color: "var(--violet-700)" }}>
          📊 데모 모드 — 샘플 데이터 기준 결과입니다
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--ink-900)" }}>TOP 5 랭킹 결과 🏆</span>
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
          <span style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--ink-900)" }}>{appData?.totalContacts || 38}명</span>
        </Well>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <SectionLabel>나의 최애 친구 순위</SectionLabel>
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
                      {((f.kakaoCount || 0) + (f.instaCount || 0)).toLocaleString()}회
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
                    <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>💬 카카오톡 대화</span>
                    <span style={{ fontWeight: 700, fontSize: 18, color: "var(--ink-900)" }}>{(f.kakaoCount || 0).toLocaleString()}건</span>
                  </div>
                  {f.instaCount > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: "1 1 140px" }}>
                      <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>📷 인스타그램 활동</span>
                      <span style={{ fontWeight: 700, fontSize: 18, color: "var(--ink-900)" }}>{f.instaCount}건</span>
                    </div>
                  )}
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
