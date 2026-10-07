// 화면 전환을 브라우저 history와 연결해요.
// 토스 내비게이션 바의 뒤로가기 / 안드로이드 백버튼이 history.back()으로 동작하고,
// 첫 화면에서 뒤로가면 미니앱이 종료돼요 (앱인토스 검수 항목).
import { useCallback, useEffect, useState } from "react";

export type Route =
  | { name: "onboarding" }
  | { name: "upload"; step: number }
  | { name: "analyzing" }
  | { name: "ranking" }
  | { name: "share" };

export type Navigate = (route: Route, opts?: { replace?: boolean }) => void;

export function useRouter(initial: Route | null) {
  const [route, setRoute] = useState<Route | null>(null);

  useEffect(() => {
    if (!initial) return;
    window.history.replaceState(initial, "");
    setRoute(initial);
    const onPop = (e: PopStateEvent) => setRoute((e.state as Route | null) ?? initial);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [initial]);

  const navigate = useCallback<Navigate>((next, opts) => {
    if (opts?.replace) window.history.replaceState(next, "");
    else window.history.pushState(next, "");
    setRoute(next);
    window.scrollTo(0, 0);
  }, []);

  return { route, navigate };
}
