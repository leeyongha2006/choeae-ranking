(function () {
const { useState, useRef } = React;

const THEMES = [
  { label: "다크 그라디언트", value: "dark", bg: "linear-gradient(135deg, #1a0a00, #2d0d18, #1a0020)", textColor: "#fff" },
  { label: "인스타 핑크", value: "insta", bg: "linear-gradient(135deg, #f09433, #e1306c, #bc1888)", textColor: "#fff" },
  { label: "모노 블랙", value: "mono", bg: "#111", textColor: "#fff" },
  { label: "미드나잇", value: "midnight", bg: "linear-gradient(135deg, #0f0f1a, #1a1a3a)", textColor: "#fff" },
];

const AI_COMMENTS = [
  "이번 달 소통왕은 바로 이 친구",
  "이 케미, 심상치 않은데요",
  "대화량으로 증명된 찐우정",
  "응답 속도 보면 관계가 보인다",
  "알림음이 제일 반가운 사람",
];

function Toggle({ checked, onChange, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => onChange(!checked)}>
      <div style={{
        width: 44, height: 24, borderRadius: 99,
        background: checked ? "#e1306c" : "#2a2a2a",
        position: "relative", transition: "background 200ms", flexShrink: 0,
      }}>
        <div style={{
          position: "absolute", top: 3, left: checked ? 23 : 3,
          width: 18, height: 18, borderRadius: "50%",
          background: "#fff", transition: "left 200ms",
          boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
        }} />
      </div>
      <span style={{ fontSize: 14, color: "#888" }}>{label}</span>
    </div>
  );
}

const APP_URL = "https://jjinchinfriend-ranking.vercel.app";

function ShareCardScreen({ onNavigate, appData }) {
  const { AppShell } = window;

  const hasData = !!(appData && (appData.rankingsByPeriod || (appData.rankings && appData.rankings.length > 0)));
  const top5Names = hasData
    ? appData.rankings.slice(0, 5).map((f) => f.name)
    : ["김민지", "이준호", "박서연", "최다인", "정하늘"];
  const top1 = top5Names[0] || "친구";

  const [title, setTitle] = useState("나의 찐친 순위");
  const [nickname, setNickname] = useState("나");
  const [showNames, setShowNames] = useState(true);
  const [commentIdx, setCommentIdx] = useState(0);
  const [themeIdx, setThemeIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [shareErr, setShareErr] = useState("");
  const [saving, setSaving] = useState(false);
  const cardRef = useRef(null);

  function buildShareText() {
    return `내 인스타 찐친 1위는 ${top1} 🥇\n너의 찐친은 누구야?\n👉 ${APP_URL}`;
  }

  async function handleShare() {
    setShareErr("");
    const shareData = {
      title: "최애친구랭킹",
      text: buildShareText(),
      url: APP_URL,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); }
      catch (e) { if (e.name !== "AbortError") setShareErr("공유에 실패했어요."); }
    } else {
      handleCopy();
    }
  }

  async function handleSave() {
    if (!cardRef.current || saving) return;
    setSaving(true);
    try {
      const canvas = await html2canvas(cardRef.current, { scale: 3, useCORS: true, backgroundColor: null });
      const link = document.createElement("a");
      link.download = "찐친랭킹.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      setShareErr("이미지 저장에 실패했어요.");
    } finally {
      setSaving(false);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(APP_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setShareErr("클립보드 복사에 실패했어요.");
    }
  }

  const theme = THEMES[themeIdx];
  const comment = AI_COMMENTS[commentIdx];
  const medals = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];

  const inputStyle = {
    padding: "12px 14px", border: "1px solid #2a2a2a",
    background: "#161616", borderRadius: 12,
    fontFamily: "var(--font-body)", fontSize: 14, color: "#fff",
    outline: "none", width: "100%", boxSizing: "border-box",
  };

  return (
    <AppShell activeNav="share" onNavigate={onNavigate}>
      {/* 헤더 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>
          공유 카드 💌
        </div>
        <button
          onClick={() => onNavigate("top5")}
          style={{
            padding: "8px 14px", background: "#1e1e1e", border: "none",
            borderRadius: 99, fontSize: 13, fontWeight: 600, color: "#888", cursor: "pointer",
          }}
        >← 랭킹</button>
      </div>

      {/* 미리보기 카드 */}
      <div ref={cardRef} style={{
        width: "100%", aspectRatio: "3/4", maxHeight: 360,
        borderRadius: 24, background: theme.bg,
        boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
        position: "relative", overflow: "hidden", padding: "24px 20px",
        boxSizing: "border-box", display: "flex", flexDirection: "column",
        justifyContent: "space-between", color: theme.textColor,
      }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", opacity: 0.5 }}>최애친구랭킹</span>
          <span style={{ fontSize: 11, opacity: 0.4 }}>2026</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.4 }}>{title}</div>
          <div style={{ fontSize: 11, opacity: 0.5 }}>@{nickname}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 4 }}>
            {top5Names.map((name, i) => (
              <div key={name} style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "5px 10px",
              }}>
                <span style={{ fontSize: 14 }}>{medals[i]}</span>
                <span style={{ fontSize: 12, fontWeight: i === 0 ? 800 : 600 }}>
                  {showNames ? name : `친구 ${i + 1}`}
                </span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, opacity: 0.7, fontStyle: "italic", marginTop: 4 }}>"{comment}"</div>
        </div>
      </div>

      {/* 설정 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* 테마 */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "0.08em", marginBottom: 10 }}>테마</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {THEMES.map((t, i) => (
              <button
                key={t.value}
                onClick={() => setThemeIdx(i)}
                style={{
                  padding: "12px",
                  background: t.bg, borderRadius: 12,
                  border: themeIdx === i ? "2px solid #e1306c" : "2px solid transparent",
                  color: t.textColor, fontSize: 12, fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* 텍스트 */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "0.08em", marginBottom: 10 }}>카드 내용</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="카드 제목" style={inputStyle} />
            <input value={nickname} onChange={e => setNickname(e.target.value)} placeholder="공개 닉네임" style={inputStyle} />
          </div>
        </div>

        {/* 옵션 */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "0.08em", marginBottom: 10 }}>공개 옵션</div>
          <Toggle checked={showNames} onChange={setShowNames} label="친구 이름 표시" />
        </div>

        {/* 코멘트 */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "0.08em", marginBottom: 10 }}>코멘트</div>
          <div style={{
            padding: "12px 14px", background: "#161616", border: "1px solid #2a2a2a",
            borderRadius: 12, fontSize: 14, color: "#888", lineHeight: 1.6, marginBottom: 8,
          }}>
            "{comment}"
          </div>
          <button
            onClick={() => setCommentIdx(i => (i + 1) % AI_COMMENTS.length)}
            style={{
              width: "100%", padding: "11px", background: "#1e1e1e", border: "none",
              borderRadius: 10, fontFamily: "var(--font-body)",
              fontSize: 13, fontWeight: 700, color: "#666", cursor: "pointer",
            }}
          >🔄 다른 코멘트로</button>
        </div>
      </div>

      {/* 공유 버튼 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          onClick={handleShare}
          style={{
            width: "100%", padding: "16px",
            background: "linear-gradient(135deg, #f09433, #e1306c, #bc1888)",
            border: "none", borderRadius: 14,
            fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 900,
            color: "#fff", cursor: "pointer",
          }}
        >
          공유하기
        </button>
        <button
          onClick={handleCopy}
          style={{
            width: "100%", padding: "14px",
            background: copied ? "rgba(34,197,94,0.15)" : "#1e1e1e",
            border: copied ? "1px solid rgba(34,197,94,0.4)" : "1px solid #2a2a2a",
            borderRadius: 14,
            fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700,
            color: copied ? "#4ade80" : "#888", cursor: "pointer",
            transition: "all 200ms",
          }}
        >
          {copied ? "복사됨" : "링크 복사"}
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            width: "100%", padding: "14px",
            background: "#1e1e1e",
            border: "1px solid #2a2a2a",
            borderRadius: 14,
            fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700,
            color: saving ? "#444" : "#888", cursor: saving ? "default" : "pointer",
            transition: "all 200ms",
          }}
        >
          {saving ? "저장 중…" : "이미지로 저장"}
        </button>
        {shareErr && (
          <div style={{ fontSize: 12, color: "#e1306c", textAlign: "center" }}>{shareErr}</div>
        )}
      </div>
    </AppShell>
  );
}

window.ShareCardScreen = ShareCardScreen;
})();
