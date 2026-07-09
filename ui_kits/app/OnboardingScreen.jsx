(function () {
const { Button } = window.DesignSystem_8db18d;

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

function OnboardingScreen({ onNavigate, appData, setAppData }) {
  const { AppShell } = window;
  const isMobile = window.useIsMobile ? window.useIsMobile() : false;

  function handleStart() {
    onNavigate("upload");
  }

  return (
    <AppShell activeNav="onboarding" activeHeader="intro" onNavigate={onNavigate}>
      {/* 히어로 */}
      <div className="anim-slide-up" style={{ textAlign: "center", padding: isMobile ? "8px 0 4px" : "16px 0 8px" }}>
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
      </div>

      {/* 인스타 히어로 카드 */}
      <div className="anim-slide-up-2" style={{
        borderRadius: 24,
        background: "linear-gradient(135deg, #f09433 0%, #e1306c 50%, #bc1888 100%)",
        padding: "28px 24px",
        color: "#fff",
        boxShadow: "0 8px 32px rgba(220,39,67,0.28)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(4px)",
          }}>
            <InstaLogo size={32} />
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>
              인스타그램
            </div>
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 1 }}>메인 분석 소스</div>
          </div>
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.95 }}>
          DM · 게시물 좋아요 · 댓글 — 모든 소통 데이터로<br />
          <strong>제일 자주 연락한 친구</strong>를 정확하게 찾아요
        </div>
        <div style={{
          marginTop: 14, padding: "8px 12px",
          background: "rgba(255,255,255,0.15)", borderRadius: 10,
          fontSize: 12, opacity: 0.9,
        }}>
          💡 인스타 설정에서 파일 신청 후 1~3일 후 도착해요
        </div>
      </div>

      {/* 카카오 작은 보조 */}
      <div className="anim-slide-up-3" style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "12px 16px",
        background: "var(--surface-card)", borderRadius: 14,
        border: "1px solid var(--border-soft)",
      }}>
        <KakaoLogo size={22} />
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>카카오톡도 같이 올리면 더 정확해져요</span>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 1 }}>파일 올리기 단계에서 선택할 수 있어요</div>
        </div>
      </div>

      {/* CTA */}
      <div className="anim-slide-up-4" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <Button variant="primary" size="lg" onClick={handleStart} style={{ width: isMobile ? "100%" : "auto" }}>
          시작하기 →
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
