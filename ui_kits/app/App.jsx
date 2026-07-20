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

function Toast({ message }) {
  if (!message) return null;
  return (
    <div style={{
      position: "fixed", bottom: 96, left: "50%", transform: "translateX(-50%)",
      background: "#22c55e", color: "#fff",
      padding: "13px 22px", borderRadius: 99,
      fontSize: 14, fontWeight: 700,
      zIndex: 9999, whiteSpace: "nowrap",
      boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
      pointerEvents: "none",
      animation: "fadeSlideUp 0.3s cubic-bezier(0.22,1,0.36,1) both",
    }}>
      {message}
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState("onboarding");
  const [appData, setAppData] = useState(EMPTY_DATA);
  const [isPaid, setIsPaidState] = useState(loadIsPaid);
  const [toast, setToast] = useState("");

  function setIsPaid(v) {
    setIsPaidState(v);
    saveIsPaid(v);
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
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
      showToast("결제 완료 · 전체 랭킹이 열렸어요");
    }
  }, []);

  const Screen = SCREENS[screen]();

  return (
    <>
      <Screen onNavigate={setScreen} appData={appData} setAppData={setAppData} isPaid={isPaid} setIsPaid={setIsPaid} showToast={showToast} />
      <Toast message={toast} />
    </>
  );
}

window.App = App;
})();
