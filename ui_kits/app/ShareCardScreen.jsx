(function () {
const { Button, Input } = window.DesignSystem_8db18d;
const { useState } = React;

const AI_COMMENTS = [
  "이번 달 소통왕은 바로 이 친구! 🔥",
  "이 케미, 심상치 않은데요? 👀",
  "대화량으로 증명된 찐우정, 부럽습니다 💜",
  "카카오톡 알림음이 제일 반가운 사람 🔔",
  "응답 속도 보면 관계가 보인다… 👁️",
];

const THEMES = [
  { label: "홀로그램 (기본)", value: "holo", bg: "var(--gradient-holo)" },
  { label: "민트 바이올렛", value: "mint", bg: "var(--gradient-mint-violet)" },
  { label: "다크 카드", value: "dark", bg: "var(--gradient-card-dark)" },
  { label: "소프트 홀로", value: "soft", bg: "var(--gradient-holo-soft)", textColor: "var(--ink-900)" },
];

function ShareCardScreen({ onNavigate, appData }) {
  const { AppShell, SectionLabel, Well } = window;

  const hasData = appData && appData.rankings && appData.rankings.length > 0;
  const topFriend = hasData ? appData.rankings[0]?.name : "김민지";
  const top5Names = hasData
    ? appData.rankings.map((f) => f.name)
    : ["김민지", "이준호", "박서연", "최다인", "정하늘"];
  const isDemo = appData && appData.isDemo;

  const [title, setTitle] = useState("이번 달 나의 최애 친구는?");
  const [nickname, setNickname] = useState("나");
  const [showScore, setShowScore] = useState(true);
  const [showNames, setShowNames] = useState(true);
  const [commentIdx, setCommentIdx] = useState(0);
  const [themeIdx, setThemeIdx] = useState(0);

  const theme = THEMES[themeIdx];
  const comment = AI_COMMENTS[commentIdx];
  const textColor = theme.textColor || "#fff";
  const medals = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];

  function cycleComment() {
    setCommentIdx((i) => (i + 1) % AI_COMMENTS.length);
  }

  function downloadCard() {
    alert("카드 이미지 다운로드 기능은 실제 서비스에서 html2canvas로 구현됩니다.");
  }

  return (
    <AppShell activeNav="share" onNavigate={onNavigate}>
      {isDemo && (
        <div style={{ background: "var(--violet-100)", borderRadius: "var(--radius-md)", padding: "10px 16px", fontSize: 13, color: "var(--violet-700)" }}>
          📊 데모 모드 — 샘플 데이터 기준 공유 카드입니다
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--ink-900)" }}>공유 카드 생성 💌</span>
        <Button variant="default" onClick={() => onNavigate("top5")}>TOP 5 결과로 돌아가기</Button>
      </div>

      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
        {/* 설정 패널 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: "1 1 320px" }}>
          <Well>
            <SectionLabel>기본 정보 입력</SectionLabel>
            <Input type="text" label="카드 제목" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input type="text" label="공개 닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} />
          </Well>

          <Well>
            <SectionLabel>카드 테마 선택</SectionLabel>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {THEMES.map((t, i) => (
                <button
                  key={t.value}
                  onClick={() => setThemeIdx(i)}
                  style={{
                    flex: "1 1 120px", padding: "8px 10px", borderRadius: "var(--radius-md)",
                    border: themeIdx === i ? "2px solid var(--violet-600)" : "1px solid var(--border-soft)",
                    background: t.bg, color: t.textColor || "#fff",
                    fontSize: 11, fontWeight: 700, cursor: "pointer",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Well>

          <Well>
            <SectionLabel>공개 옵션</SectionLabel>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input type="checkbox" checked={showNames} onChange={(e) => setShowNames(e.target.checked)} id="showNames" />
              <label htmlFor="showNames" style={{ fontSize: 13, color: "var(--text-primary)", cursor: "pointer" }}>친구 이름 표시</label>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input type="checkbox" checked={showScore} onChange={(e) => setShowScore(e.target.checked)} id="showScore" />
              <label htmlFor="showScore" style={{ fontSize: 13, color: "var(--text-primary)", cursor: "pointer" }}>소통 횟수 공개</label>
            </div>
          </Well>

          <Well>
            <SectionLabel>AI 코멘트</SectionLabel>
            <div style={{ fontFamily: "var(--font-accent)", fontSize: 16, color: "var(--violet-600)", padding: "8px 12px", background: "var(--violet-100)", borderRadius: "var(--radius-md)" }}>
              "{comment}"
            </div>
            <Button variant="secondary" size="sm" onClick={cycleComment}>🔄 다른 코멘트로 바꾸기</Button>
          </Well>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="default" size="sm" onClick={() => alert("카카오톡 공유는 Kakao SDK로 구현됩니다.")}>카카오 공유</Button>
              <Button variant="default" size="sm" onClick={() => alert("인스타그램 공유는 Web Share API로 구현됩니다.")}>인스타 공유</Button>
            </div>
            <Button variant="primary" size="lg" onClick={downloadCard}>⬇ 카드 다운로드</Button>
          </div>
        </div>

        {/* 미리보기 카드 */}
        <Well style={{ flex: "0 0 300px", alignItems: "center" }}>
          <SectionLabel>미리보기</SectionLabel>
          <div style={{
            width: "100%", aspectRatio: "3/4", borderRadius: "var(--radius-xl)",
            background: theme.bg, boxShadow: "var(--shadow-pop)",
            position: "relative", overflow: "hidden", padding: "22px 18px", boxSizing: "border-box",
            display: "flex", flexDirection: "column", justifyContent: "space-between", color: textColor,
          }}>
            {/* 홀로 포일 shimmer */}
            <div style={{ position: "absolute", top: "-40%", left: "-20%", width: "60%", height: "180%", background: "rgba(255,255,255,.18)", transform: "rotate(18deg)", pointerEvents: "none" }} />

            <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 12 }}>최애친구랭킹</span>
              <span style={{ fontSize: 11, opacity: 0.8 }}>2026.07</span>
            </div>

            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: 16, lineHeight: 1.3 }}>{title}</div>
              <div style={{ fontSize: 11, opacity: 0.85 }}>@{nickname}</div>

              <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 6 }}>
                {top5Names.slice(0, 5).map((name, i) => (
                  <div key={name} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.15)", borderRadius: "var(--radius-md)", padding: "4px 8px" }}>
                    <span style={{ fontSize: 14 }}>{medals[i]}</span>
                    <span style={{ fontSize: 12, fontWeight: i === 0 ? 800 : 600 }}>
                      {showNames ? name : `친구 ${i + 1}`}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ fontFamily: "var(--font-accent)", fontSize: 13, marginTop: 6, opacity: 0.95 }}>
                "{comment}"
              </div>
            </div>
          </div>
          <span style={{ fontSize: 11, color: "var(--text-tertiary)", textAlign: "center" }}>옵션을 변경하면 미리보기가 업데이트됩니다.</span>
        </Well>
      </div>
    </AppShell>
  );
}

window.ShareCardScreen = ShareCardScreen;
})();
