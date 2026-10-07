import { useEffect, useState } from "react";
import { useRouter, type Route } from "./router";
import { clearResult, loadIsPaid, loadResult, saveIsPaid, saveResult, type SavedResult } from "./lib/storage";
import type { PeriodKey } from "./lib/parser";
import OnboardingScreen from "./screens/OnboardingScreen";
import UploadScreen from "./screens/UploadScreen";
import AnalyzingScreen from "./screens/AnalyzingScreen";
import RankingScreen from "./screens/RankingScreen";
import ShareScreen from "./screens/ShareScreen";

export default function App() {
  const [initial, setInitial] = useState<Route | null>(null);
  const [result, setResult] = useState<SavedResult | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { route, navigate } = useRouter(initial);

  // 저장된 결과가 있으면 바로 랭킹 화면으로 시작
  useEffect(() => {
    Promise.all([loadResult(), loadIsPaid()]).then(([saved, paid]) => {
      setResult(saved);
      setIsPaid(paid);
      setInitial(saved ? { name: "ranking" } : { name: "onboarding" });
    });
  }, []);

  function handleAnalyzed(next: SavedResult) {
    setResult(next);
    saveResult(next);
    navigate({ name: "ranking" }, { replace: true });
  }

  function handlePeriodChange(period: PeriodKey) {
    if (!result) return;
    const next = { ...result, period };
    setResult(next);
    saveResult(next);
  }

  function handleUnlock() {
    setIsPaid(true);
    saveIsPaid(true);
  }

  function handleDelete() {
    setResult(null);
    setFiles([]);
    clearResult();
    navigate({ name: "onboarding" }, { replace: true });
  }

  if (!route) return null;

  switch (route.name) {
    case "onboarding":
      return <OnboardingScreen navigate={navigate} />;
    case "upload":
      return <UploadScreen step={route.step} navigate={navigate} files={files} setFiles={setFiles} />;
    case "analyzing":
      return <AnalyzingScreen files={files} onDone={handleAnalyzed} />;
    case "ranking":
      if (!result) return <OnboardingScreen navigate={navigate} />;
      return (
        <RankingScreen
          result={result}
          isPaid={isPaid}
          navigate={navigate}
          onPeriodChange={handlePeriodChange}
          onUnlock={handleUnlock}
          onDelete={handleDelete}
        />
      );
    case "share":
      if (!result) return <OnboardingScreen navigate={navigate} />;
      return <ShareScreen result={result} />;
  }
}
