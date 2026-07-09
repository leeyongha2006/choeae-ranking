(function () {
const { useState } = React;

const SCREENS = {
  onboarding: () => window.OnboardingScreen,
  upload: () => window.UploadScreen,
  analyzing: () => window.AnalyzingScreen,
  dashboard: () => window.DashboardScreen,
  top5: () => window.Top5Screen,
  share: () => window.ShareCardScreen,
  mypage: () => window.MyPageScreen,
};

const TABS = [
  { key: "onboarding", label: "온보딩" },
  { key: "upload", label: "업로드" },
  { key: "analyzing", label: "분석 중" },
  { key: "dashboard", label: "대시보드" },
  { key: "top5", label: "TOP 5" },
  { key: "share", label: "공유 카드" },
  { key: "mypage", label: "마이페이지" },
];

const EMPTY_DATA = {
  kakaoFile: null,
  instaFile: null,
  kakaoData: null,
  instaData: null,
  rankings: [],
  totalMessages: 0,
  totalContacts: 0,
  isDemo: false,
  uploadedAt: null,
};

function App() {
  const [screen, setScreen] = useState("onboarding");
  const [appData, setAppData] = useState(EMPTY_DATA);

  const Screen = SCREENS[screen]();

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{
        display: "flex", gap: 4, padding: "10px 16px", background: "var(--ink-900)",
        overflowX: "auto", position: "sticky", top: 0, zIndex: 20,
      }}>
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setScreen(t.key)}
            style={{
              fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700,
              padding: "7px 14px", borderRadius: "var(--radius-pill)", border: "none",
              cursor: "pointer", whiteSpace: "nowrap",
              background: screen === t.key ? "var(--gradient-mint-violet)" : "rgba(255,255,255,0.08)",
              color: "#fff",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <Screen onNavigate={setScreen} appData={appData} setAppData={setAppData} />
    </div>
  );
}

window.App = App;
})();
