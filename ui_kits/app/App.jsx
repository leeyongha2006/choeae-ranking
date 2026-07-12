(function () {
const { useState } = React;

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

  const Screen = SCREENS[screen]();

  return (
    <Screen onNavigate={setScreen} appData={appData} setAppData={setAppData} isPaid={isPaid} setIsPaid={setIsPaid} />
  );
}

window.App = App;
})();
