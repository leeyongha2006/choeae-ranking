(function () {
const { Button } = window.DesignSystem_8db18d;
const { useEffect, useState, useRef } = React;

const STEPS = [
  { label: "파일 읽기 중…", key: "read" },
  { label: "대화 데이터 파싱 중…", key: "parse" },
  { label: "소통 점수 계산 중…", key: "score" },
  { label: "랭킹 생성 완료 🎉", key: "done" },
];

function AnalyzingScreen({ onNavigate, appData, setAppData }) {
  const { AppShell, SectionLabel, Well } = window;
  const [step, setStep] = useState(0);
  const [pct, setPct] = useState(0);
  const [error, setError] = useState(null);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    runAnalysis();
  }, []);

  async function readFileAsText(file) {
    return new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onload = (e) => res(e.target.result);
      fr.onerror = rej;
      fr.readAsText(file, "utf-8");
    });
  }

  async function readFileAsJSON(file) {
    const text = await readFileAsText(file);
    return JSON.parse(text);
  }

  function advance(newStep, newPct) {
    setStep(newStep);
    setPct(newPct);
  }

  async function runAnalysis() {
    try {
      const { parseKakaoFile, parseInstagram, computeRankings, getDemoData } = window.DataParser;

      advance(0, 15);
      await delay(400);

      let kakaoData = null;
      let instaData = null;

      if (appData.isDemo) {
        advance(1, 40);
        await delay(600);
        const demo = getDemoData();
        kakaoData = demo.kakao;
        instaData = demo.insta;
      } else {
        // KakaoTalk: multiple files, one per friend's chat room
        if (appData.kakaoFiles && appData.kakaoFiles.length > 0) {
          advance(1, 30);
          kakaoData = {};
          for (const file of appData.kakaoFiles) {
            const text = await readFileAsText(file);
            const { friendName, count } = parseKakaoFile(file.name, text);
            kakaoData[friendName] = (kakaoData[friendName] || 0) + count;
          }
        }
        if (appData.instaFile) {
          advance(1, 55);
          const json = await readFileAsJSON(appData.instaFile);
          instaData = parseInstagram(json);
        }
      }

      advance(2, 75);
      await delay(500);

      const rankings = computeRankings(kakaoData, instaData, null);

      const totalMessages = Object.values(kakaoData || {}).reduce((a, b) => a + b, 0)
        + Object.values(instaData || {}).reduce((a, b) => a + b, 0);
      const totalContacts = new Set([
        ...Object.keys(kakaoData || {}),
        ...Object.keys(instaData || {}),
      ]).size;

      advance(3, 100);
      await delay(600);

      setAppData((prev) => ({
        ...prev,
        kakaoData,
        instaData,
        rankings,
        totalMessages,
        totalContacts,
        uploadedAt: new Date().toLocaleDateString("ko-KR"),
      }));

      await delay(700);
      onNavigate("dashboard");
    } catch (e) {
      setError("파일을 읽는 중 오류가 발생했어요: " + e.message);
    }
  }

  function delay(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  return (
    <AppShell activeNav="upload" onNavigate={onNavigate}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--ink-900)" }}>
        {appData.isDemo ? "데모 데이터 분석 중" : "파일 분석 중입니다"}
      </span>

      {appData.isDemo && (
        <div style={{ background: "var(--violet-100)", borderRadius: "var(--radius-md)", padding: "10px 16px", fontSize: 13, color: "var(--violet-700)" }}>
          💡 데모 모드 — 샘플 데이터로 실제 서비스 경험을 미리 확인해보세요
        </div>
      )}

      <Well>
        <span style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>
          업로드된 데이터를 열심히 분석하고 있어요 🔍
        </span>
        <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>잠시만 기다려주세요.</span>
      </Well>

      <Well>
        <SectionLabel>처리 진행률</SectionLabel>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 14, borderRadius: "var(--radius-pill)", background: "var(--paper-200)", overflow: "hidden" }}>
            <div style={{
              width: `${pct}%`, height: "100%",
              background: pct === 100 ? "var(--gradient-mint-violet)" : "var(--gradient-holo)",
              borderRadius: "var(--radius-pill)",
              transition: "width 500ms var(--ease-out)",
            }} />
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)", minWidth: 42, textAlign: "right" }}>{pct}%</span>
        </div>
      </Well>

      <Well>
        {STEPS.map((s, i) => {
          const done = i < step || (i === step && pct >= 100);
          const active = i === step && pct < 100;
          return (
            <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: done ? "var(--text-primary)" : active ? "var(--violet-600)" : "var(--text-tertiary)" }}>
              <span>{done ? "✅" : active ? "⏳" : "○"}</span>
              <span style={{ fontWeight: active ? 700 : 400 }}>{s.label}</span>
            </div>
          );
        })}
      </Well>

      {error && (
        <Well style={{ background: "var(--orange-100)", border: "1px solid var(--color-warning)" }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: "var(--ink-900)" }}>⚠️ 오류가 발생했어요</span>
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{error}</span>
          <Button variant="secondary" size="sm" onClick={() => onNavigate("upload")}>파일 업로드로 돌아가기</Button>
        </Well>
      )}
    </AppShell>
  );
}

window.AnalyzingScreen = AnalyzingScreen;
})();
