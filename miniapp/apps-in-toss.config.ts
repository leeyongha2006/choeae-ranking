import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  // 앱인토스 콘솔에 등록한 앱 이름과 같아야 해요 (intoss://choeae-friend-ranking)
  appName: "choeae-friend-ranking",
  brand: {
    primaryColor: "#E1306C",
  },
  permissions: [],
  navigationBar: {
    withBackButton: true,
    withHomeButton: true,
    withTitle: true,
    theme: "light",
  },
  webBundleDir: "dist",
});
