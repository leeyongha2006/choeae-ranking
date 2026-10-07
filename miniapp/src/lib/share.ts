// 공유 — 토스 앱에서는 intoss:// 딥링크 기반 공유 링크를 써야 해요 (검수 항목)
import { Environment, File as AitFile, Share } from "@apps-in-toss/web-framework";

const APP_SCHEME = "intoss://choeae-friend-ranking";

function isInToss() {
  try {
    return !!Environment.environment;
  } catch {
    return false;
  }
}

export async function shareResult(text: string) {
  if (isInToss()) {
    const link = await Share.createLink({ path: APP_SCHEME });
    await Share.sendMessage({ message: `${text}\n${link}` });
    return;
  }
  if (navigator.share) {
    await navigator.share({ title: "최애친구랭킹", text });
    return;
  }
  await navigator.clipboard.writeText(text);
}

export async function saveImage(dataUrl: string, fileName: string) {
  if (AitFile.saveBase64.isSupported()) {
    await AitFile.saveBase64({ data: dataUrl.split(",")[1], fileName, mimeType: "image/png" });
    return;
  }
  const a = document.createElement("a");
  a.download = fileName;
  a.href = dataUrl;
  a.click();
}
