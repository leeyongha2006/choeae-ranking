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
      const { parseInstagram, computeRankings } = window.DataParser;

      advance(0, 15);
      await delay(400);

      let instaData = {};
      let myName = null;

      advance(1, 40);

      for (const file of appData.instaFiles || []) {
        if (file.name.toLowerCase().endsWith(".zip")) {
          const zip = await JSZip.loadAsync(file);
          const zipEntries = Object.values(zip.files).filter(f =>
            !f.dir && /messages\/inbox\/[^/]+\/message_\d+\.json$/i.test(f.name)
          );

          const allResults = [];
          for (const zipEntry of zipEntries) {
            const text = await zipEntry.async("string");
            const json = JSON.parse(text);
            const folderMatch = zipEntry.name.match(/messages\/inbox\/([^/]+)\//i);
            const folderName = folderMatch ? folderMatch[1] : null;
            const result = parseInstagram(json, folderName);
            if (result) allResults.push(result);
          }

          // 본인 이름 감지: 가장 많은 파일에 sender로 등장하는 이름
          const senderFileCounts = {};
          for (const result of allResults) {
            for (const name of Object.keys(result.counts)) {
              senderFileCounts[name] = (senderFileCounts[name] || 0) + 1;
            }
          }
          const detectedMyName = Object.entries(senderFileCounts)
            .sort(([, a], [, b]) => b - a)[0]?.[0] || null;
          if (!myName && detectedMyName) myName = detectedMyName;

          for (const result of allResults) {
            const totalInFile = Object.values(result.counts).reduce((a, b) => a + b, 0);
            const friendName = Object.keys(result.counts).find(n => n !== detectedMyName);
            if (friendName) {
              instaData[friendName] = (instaData[friendName] || 0) + totalInFile;
            }
          }
        } else {
          const json = await readFileAsJSON(file);
          const result = parseInstagram(json);
          if (!result) continue;
          if (!myName && result.myName) myName = result.myName;
          const totalInFile = Object.values(result.counts).reduce((a, b) => a + b, 0);
          const friendName = Object.keys(result.counts).find(n => n !== myName);
          if (friendName) {
            instaData[friendName] = (instaData[friendName] || 0) + totalInFile;
          }
        }
      }

      advance(2, 75);
      await delay(500);

      const rankings = computeRankings(instaData, myName);

      const totalMessages = Object.values(instaData).reduce((a, b) => a + b, 0);
      const totalContacts = Object.keys(instaData).length;

      advance(3, 100);
      await delay(600);

      setAppData((prev) => ({
        ...prev,
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
    <AppShell activeNav="upload" onNavigate={onNavigate} hideNav>
      <span style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--ink-900)" }}>
        파일 분석 중입니다
      </span>

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
