(function () {
const { Button } = window.DesignSystem_8db18d;
const { useState } = React;

function KakaoLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="7" fill="#FEE500"/>
      <path d="M14 5.5C8.75 5.5 4.5 8.96 4.5 13.22c0 2.66 1.59 5.01 4.01 6.47l-.88 3.26 3.9-2.1c.77.15 1.57.23 2.47.23 5.25 0 9.5-3.46 9.5-7.72S19.25 5.5 14 5.5z" fill="#3C1E1E"/>
    </svg>
  );
}

function InstaLogo({ size = 28 }) {
  const id = "igG" + size;
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#f09433"/>
          <stop offset="40%" stopColor="#dc2743"/>
          <stop offset="100%" stopColor="#bc1888"/>
        </linearGradient>
      </defs>
      <rect width="28" height="28" rx="7" fill={`url(#${id})`}/>
      <rect x="5" y="5" width="18" height="18" rx="5.5" fill="none" stroke="white" strokeWidth="1.8"/>
      <circle cx="14" cy="14" r="4.5" fill="none" stroke="white" strokeWidth="1.8"/>
      <circle cx="19.5" cy="8.5" r="1.1" fill="white"/>
    </svg>
  );
}

const PLATFORMS = [
  {
    key: "kakao",
    logo: () => <KakaoLogo />,
    label: "카카오톡",
    desc: "누구랑 얼마나 많이 대화했는지로 친한 순서를 뽑아요",
    sub: "채팅방에서 파일 꺼내면 바로 OK",
  },
  {
    key: "insta",
    logo: () => <InstaLogo />,
    label: "인스타그램",
    desc: "DM, 게시물 좋아요, 댓글로 제일 자주 소통한 친구를 찾아요",
    sub: "인스타 설정에서 파일 받는 데 1~3일 걸려요",
  },
];

function OnboardingScreen({ onNavigate, appData, setAppData }) {
  const { AppShell } = window;
  const isMobile = window.useIsMobile ? window.useIsMobile() : false;
  const [selected, setSelected] = useState("kakao");

  function handleStart() {
    setAppData(prev => ({ ...prev, platformChoice: selected }));
    onNavigate("upload");
  }

  return (
    <AppShell activeNav="onboarding" activeHeader="intro" onNavigate={onNavigate}>
      {/* 히어로 */}
      <div style={{ textAlign: "center", padding: isMobile ? "8px 0 4px" : "16px 0 8px" }}>
        <div style={{
          display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
          color: "var(--violet-600)", background: "var(--violet-100)",
          borderRadius: "var(--radius-pill)", padding: "4px 12px", marginBottom: 14,
        }}>내 대화 데이터 100% 로컬 분석 · 서버 전송 없음</div>

        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: isMobile ? 26 : 34, lineHeight: 1.25,
          color: "var(--ink-900)", margin: "0 0 12px",
        }}>
          나랑 제일 친한 친구가<br />
          <span style={{ background: "var(--gradient-holo)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            진짜로 누구인지
          </span>{" "}알아봐요 👑
        </h1>

        <p style={{ fontSize: isMobile ? 13 : 14, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
          카카오톡·인스타 파일을 올리면 AI가 대화량, 응답속도, 반응도를<br />
          분석해서 친밀도 순위를 뽑아줘요
        </p>
      </div>

      {/* 플랫폼 선택 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)" }}>어떤 데이터로 분석할까요?</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {PLATFORMS.map(p => {
            const Logo = p.logo;
            return (
              <div
                key={p.key}
                onClick={() => setSelected(p.key)}
                style={{
                  flex: "1 1 160px", padding: "16px", borderRadius: "var(--radius-lg)", cursor: "pointer",
                  border: selected === p.key ? "2px solid var(--violet-600)" : "1.5px solid var(--border-soft)",
                  background: selected === p.key ? "var(--violet-100)" : "var(--surface-card)",
                  boxShadow: selected === p.key ? "0 0 0 3px rgba(124,58,237,0.12)" : "none",
                  transition: "all 160ms var(--ease-out)",
                  display: "flex", flexDirection: "column", gap: 6, position: "relative",
                }}
              >
                {selected === p.key && (
                  <div style={{
                    position: "absolute", top: 10, right: 10,
                    width: 18, height: 18, borderRadius: "50%",
                    background: "var(--violet-600)", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 800,
                  }}>✓</div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Logo />
                  <span style={{ fontWeight: 800, fontSize: 14, color: "var(--text-primary)" }}>{p.label}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5, marginTop: 4 }}>{p.desc}</div>
                <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 4 }}>{p.sub}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <Button variant="primary" size="lg" onClick={handleStart} style={{ width: isMobile ? "100%" : "auto" }}>
          {selected === "kakao" ? "카카오톡으로 시작" : "인스타그램으로 시작"} →
        </Button>
        <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>
          파일은 내 브라우저에서만 처리돼요 — 어디에도 저장되지 않아요
        </span>
      </div>
    </AppShell>
  );
}

window.OnboardingScreen = OnboardingScreen;
})();
