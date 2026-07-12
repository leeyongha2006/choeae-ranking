(function () {
const { useState, useEffect } = React;

const SCREENS = {
  onboarding: () => window.OnboardingScreen,
  upload: () => window.UploadScreen,
  analyzing: () => window.AnalyzingScreen,
  dashboard: () => window.DashboardScreen,
  top5: () => window.Top5Screen,
  share: () => window.ShareCardScreen,
};

const EMPTY_DATA = {
  instaFiles: [],
  instaData: null,
  rankings: [],
  totalMessages: 0,
  totalContacts: 0,
  isDemo: false,
  uploadedAt: null,
};

function loadIsPaid() {
  try { return localStorage.getItem("isPaid") === "true"; } catch { return false; }
}
function saveIsPaid(v) {
  try { localStorage.setItem("isPaid", v ? "true" : "false"); } catch {}
}

function App() {
  const [screen, setScreen] = useState("onboarding");
  const [appData, setAppData] = useState(EMPTY_DATA);
  const [isPaid, setIsPaidState] = useState(loadIsPaid);

  function setIsPaid(v) {
    setIsPaidState(v);
    saveIsPaid(v);
  }

  // 토스 결제 성공 리다이렉트 처리
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") {
      try {
        const saved = sessionStorage.getItem("rankingAppData");
        if (saved) {
          setAppData(JSON.parse(saved));
          sessionStorage.removeItem("rankingAppData");
        }
      } catch {}
      setIsPaid(true);
      window.history.replaceState({}, "", window.location.pathname);
      setScreen("top5");
    }
  }, []);

  const Screen = SCREENS[screen]();

  return (
    <Screen onNavigate={setScreen} appData={appData} setAppData={setAppData} isPaid={isPaid} setIsPaid={setIsPaid} />
  );
}

window.App = App;
})();
