// 분석 워커 실행 래퍼
import { aggregateFriends, computeAllRankings, detectMyName } from "./parser";
import type { SavedResult } from "./storage";
import type { WorkerErrorCode, WorkerRequest, WorkerResponse } from "./analyze.worker";

export class AnalyzeError extends Error {
  constructor(public code: WorkerErrorCode) {
    super(code);
  }
}

export function runAnalysis(files: File[], onProgress: (pct: number) => void) {
  const worker = new Worker(new URL("./analyze.worker.ts", import.meta.url), { type: "module" });

  const promise = new Promise<SavedResult>((resolve, reject) => {
    worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
      const msg = e.data;
      if (msg.type === "progress") return onProgress(msg.pct);
      worker.terminate();
      if (msg.type === "error") return reject(new AnalyzeError(msg.code));

      const myName = detectMyName(msg.results);
      const friends = aggregateFriends(msg.results, myName);
      const rankingsByPeriod = computeAllRankings(friends);
      resolve({
        rankingsByPeriod,
        // 최근 3개월 대화가 없으면 전체 기준으로 시작
        period: rankingsByPeriod.recent.length > 0 ? "recent" : "all",
        totalMessages: rankingsByPeriod.all.reduce((s, f) => s + f.count, 0),
        totalContacts: Object.keys(friends).length,
        analyzedAt: new Date().toISOString(),
      });
    };
    worker.onerror = () => {
      worker.terminate();
      reject(new AnalyzeError("READ_FAILED"));
    };
    worker.postMessage({ files } satisfies WorkerRequest);
  });

  return { promise, cancel: () => worker.terminate() };
}
