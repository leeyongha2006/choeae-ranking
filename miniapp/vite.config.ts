import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import aitDevtools from "@apps-in-toss/devtools/unplugin";

export default defineConfig({
  // aitDevtools: 일반 브라우저에서 SDK를 mock으로 대체 (프로덕션 빌드에서는 비활성화)
  plugins: [react(), aitDevtools.vite()],
  server: { host: "localhost", port: 5173 },
  // 워커/동적 import 의존성을 미리 최적화 (개발 중 분석 도중 새로고침 방지)
  optimizeDeps: { include: ["fflate", "html2canvas"] },
  build: { outDir: "dist" },
});
