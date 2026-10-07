/// <reference lib="webworker" />
// 업로드 파일을 메인 스레드 밖에서 분석해요.
import { analyze } from "./analyze-core";
import type { ConversationResult } from "./parser";

export type WorkerRequest = { files: File[] };
export type WorkerErrorCode = "NO_DM_JSON" | "NOT_ZIP" | "READ_FAILED";
export type WorkerResponse =
  | { type: "progress"; pct: number }
  | { type: "done"; results: ConversationResult[] }
  | { type: "error"; code: WorkerErrorCode; message: string };

declare const self: DedicatedWorkerGlobalScope;

self.onmessage = async (e: MessageEvent<WorkerRequest>) => {
  try {
    const results = await analyze(e.data.files, (pct) => self.postMessage({ type: "progress", pct } satisfies WorkerResponse));
    self.postMessage({ type: "done", results } satisfies WorkerResponse);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const code: WorkerErrorCode = message === "NO_DM_JSON" || message === "NOT_ZIP" ? message : "READ_FAILED";
    self.postMessage({ type: "error", code, message } satisfies WorkerResponse);
  }
};
