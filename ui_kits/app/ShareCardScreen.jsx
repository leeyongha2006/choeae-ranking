(function () {
const { useState } = React;

const THEMES = [
  { label: "다크 그라디언트", value: "dark", bg: "linear-gradient(135deg, #1a0a00, #2d0d18, #1a0020)", textColor: "#fff" },
  { label: "인스타 핑크", value: "insta", bg: "linear-gradient(135deg, #f09433, #e1306c, #bc1888)", textColor: "#fff" },
  { label: "모노 블랙", value: "mono", bg: "#111", textColor: "#fff" },
  { label: "아이보리", value: "light", bg: "#f7f3ef", textColor: "#111" },
];

const AI_COMMENTS = [
  "이번 달 소통왕은 바로 이 친구! 🔥",
  "이 케미, 심상치 않은데요? 👀",
  "대화량으로 증명된 찐우정, 부럽습니다 💜",
  "응답 속도 보면 관계가 보인다… 👁️",
  "알림음이 제일 반가운 사람 🔔",
];

function ShareCardScreen({ onNavigate, appData }) {
  const { AppShell } = window;

  const hasData = appData && appData.rankings && appData.rankings.length > 0;
  const top5Names = hasData
    ? appData.rankings.slice(0, 5).map((f) => f.name)
    : ["김민지", "이준호", "박서연", "최다인", "정하늘"];

  const [title, setTitle] = useState("이번 달 나의 최애 친구는?");
  const [nickname, setNickname] = useState("나");
  const [showNames, setShowNames] = useState(true);
  const [commentIdx, setCommentIdx] = useState(0);
  const [themeIdx, setThemeIdx] = useState(0);

  const theme = THEMES[themeIdx];
  const comment = AI_COMMENTS[commentIdx];
  const medals = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];

  function Toggle({ checked, onChange, label, id }) {
    return (
      <label htmlFor={id} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
        <div style={{
          width: 44, height: 24, borderRadius: 99,
          background: checked ? "#e1306c" : "#e5e5e5",
          position: "relative", transition: "background 200ms", flexShrink: 0,
        }} onClick={() => onChange(!checked)}>
          <div style={{
            position: "absolute", top: 3, left: checked ? 23 : 3,
            width: 18, height: 18, borderRadius: "50%",
            background: "#fff", transition: "left 200ms",
            boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          }} />
        </div>
        <span style={{ fontSize: 14, color: "#333" }}>{label}</span>
        <input id={id} type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} style={{ display: "none" }} />
      </label>
    );
  }

  return (
    <AppShell activeNav="share" onNavigate={onNavigate}>
      {/* 헤더 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 900, color: "#111", letterSpacing: "-0.02em" }}>
          공유 카드 💌
        </div>
        <button
          onClick={() => onNavigate("top5")}
          style={{
            padding: "8px 14px", background: "#f5f5f5", border: "none",
            borderRadius: 99, fontSize: 13, fontWeight: 600, color: "#666", cursor: "pointer",
          }}
        >← 랭킹</button>
      </div>

      {/* 미리보기 카드 */}
      <div style={{
        width: "100%", aspectRatio: "3/4", maxHeight: 360,
        borderRadius: 24, background: theme.bg,
        boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
        position: "relative", overflow: "hidden", padding: "24px 20px",
        boxSizing: "border-box", display: "flex", flexDirection: "column",
        justifyContent: "space-between", color: theme.textColor,
      }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", opacity: 0.7 }}>최애친구랭킹</span>
          <span style={{ fontSize: 11, opacity: 0.5 }}>2026</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.4 }}>{title}</div>
          <div style={{ fontSize: 11, opacity: 0.6 }}>@{nickname}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 4 }}>
            {top5Names.map((name, i) => (
              <div key={name} style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,0.12)", borderRadius: 10, padding: "5px 10px",
              }}>
                <span style={{ fontSize: 14 }}>{medals[i]}</span>
                <span style={{ fontSize: 12, fontWeight: i === 0 ? 800 : 600 }}>
                  {showNames ? name : `친구 ${i + 1}`}
                </span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, opacity: 0.8, fontStyle: "italic", marginTop: 4 }}>"{comment}"</div>
        </div>
      </div>

      {/* 설정 영역 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* 테마 */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#999", letterSpacing: "0.06em", marginBottom: 10 }}>테마</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {THEMES.map((t, i) => (
              <button
                key={t.value}
                onClick={() => setThemeIdx(i)}
                style={{
                  padding: "10px 12px",
                  background: t.bg, borderRadius: 12,
                  border: themeIdx === i ? "2px solid #e1306c" : "2px solid transparent",
                  color: t.textColor, fontSize: 12, fontWeight: 700,
                  cursor: "pointer", transition: "border 150ms",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* 텍스트 편집 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#999", letterSpacing: "0.06em" }}>카드 내용</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <input
              value={title} onChange={e => setTitle(e.target.value)}
              placeholder="카드 제목"
              style={{
                padding: "12px 14px", border: "1.5px solid #eee", borderRadius: 12,
                fontFamily: "var(--font-body)", fontSize: 14, color: "#111",
                outline: "none", background: "#fff",
              }}
            />
            <input
              value={nickname} onChange={e => setNickname(e.target.value)}
              placeholder="공개 닉네임"
              style={{
                padding: "12px 14px", border: "1.5px solid #eee", borderRadius: 12,
                fontFamily: "var(--font-body)", fontSize: 14, color: "#111",
                outline: "none", background: "#fff",
              }}
            />
          </div>
        </div>

        {/* 옵션 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#999", letterSpacing: "0.06em" }}>공개 옵션</div>
          <Toggle checked={showNames} onChange={setShowNames} label="친구 이름 표시" id="showNames" />
        </div>

        {/* AI 코멘트 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#999", letterSpacing: "0.06em" }}>코멘트</div>
          <div style={{
            padding: "12px 14px", background: "#fafafa", border: "1.5px solid #f0f0f0",
            borderRadius: 12, fontSize: 14, color: "#333", lineHeight: 1.6,
          }}>
            "{comment}"
          </div>
          <button
            onClick={() => setCommentIdx(i => (i + 1) % AI_COMMENTS.length)}
            style={{
              padding: "10px", background: "#f5f5f5", border: "none",
              borderRadius: 10, fontFamily: "var(--font-body)",
              fontSize: 13, fontWeight: 700, color: "#555", cursor: "pointer",
            }}
          >🔄 다른 코멘트로</button>
        </div>
      </div>

      {/* 공유 버튼 */}
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={() => alert("인스타그램 공유는 Web Share API로 구현됩니다.")}
          style={{
            flex: 1, padding: "14px",
            background: "linear-gradient(135deg, #f09433, #e1306c)",
            border: "none", borderRadius: 14,
            fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 900,
            color: "#fff", cursor: "pointer",
          }}
        >📷 인스타 공유</button>
        <button
          onClick={() => alert("카드 이미지 다운로드 기능은 html2canvas로 구현됩니다.")}
          style={{
            padding: "14px 18px",
            background: "#111", border: "none", borderRadius: 14,
            fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700,
            color: "#fff", cursor: "pointer",
          }}
        >⬇</button>
      </div>
    </AppShell>
  );
}

window.ShareCardScreen = ShareCardScreen;
})();
