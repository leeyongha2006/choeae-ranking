import { useEffect, useRef, useState } from "react";
import { FixedBottomCTA, ProgressBar } from "@toss/tds-mobile";
import { AnalyzeError, runAnalysis } from "../lib/analyze";
import type { SavedResult } from "../lib/storage";

const ERROR_MESSAGES: Record<string, string> = {
  NO_DM_JSON: "파일에서 DM 기록을 찾지 못했어요. 내보내기 형식을 JSON으로, 항목에 '메시지'를 선택했는지 확인해 주세요.",
  NOT_ZIP: "zip 파일을 열 수 없어요. 다운로드가 끝까지 완료됐는지 확인해 주세요.",
  READ_FAILED: "파일을 읽는 중 문제가 생겼어요. 다시 시도해 주세요.",
};

interface Props {
  files: File[];
  onDone: (result: SavedResult) => void;
}

export default function AnalyzingScreen({ files, onDone }: Props) {
  const [pct, setPct] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    // 뒤로가기로 화면을 벗어나면 워커도 함께 종료돼요
    const { promise, cancel } = runAnalysis(files, setPct);
    let active = true;
    promise
      .then((result) => {
        if (!active) return;
        const totalRanked = result.rankingsByPeriod.all.length;
        if (totalRanked === 0) setError("1:1 DM 대화를 찾지 못했어요. 단체 대화방은 분석에서 제외돼요.");
        else onDoneRef.current(result);
      })
      .catch((e) => {
        if (!active) return;
        setError(ERROR_MESSAGES[e instanceof AnalyzeError ? e.code : "READ_FAILED"]);
      });
    return () => {
      active = false;
      cancel();
    };
  }, [files]);

  return (
    <div className="page" style={{ justifyContent: "center" }}>
      {error ? (
        <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h2 className="title">분석하지 못했어요</h2>
          <p className="desc">{error}</p>
          <FixedBottomCTA onClick={() => window.history.back()}>파일 다시 선택하기</FixedBottomCTA>
        </div>
      ) : (
        <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span className="eyebrow">분석 중</span>
            <h2 className="title">
              DM 기록을 살펴보고 있어요
            </h2>
            <p className="caption">파일 크기에 따라 조금 걸릴 수 있어요.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <ProgressBar progress={pct / 100} size="bold" color="#E1306C" animate />
            <span style={{ fontSize: 15, fontWeight: 700, color: "var(--brand)", alignSelf: "flex-end" }}>{pct}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
