(function () {
const { useEffect, useState, useRef } = React;

const STEPS = [
  { label: "파일 읽기 중…", key: "read" },
  { label: "대화 데이터 파싱 중…", key: "parse" },
  { label: "소통 점수 계산 중…", key: "score" },
  { label: "랭킹 생성 완료", key: "done" },
];

function AnalyzingScreen({ onNavigate, appData, setAppData }) {
  const { AppShell } = window;
  const [step, setStep] = useState(0);
  const [pct, setPct] = useState(0);
  const [error, setError] = useState(null);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    runAnalysis();
  }, []);

  async function readFileAsJSON(file) {
    return new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onload = (e) => { try { res(JSON.parse(e.target.result)); } catch (err) { rej(err); } };
      fr.onerror = rej;
      fr.readAsText(file, "utf-8");
    });
  }

  function advance(newStep, newPct) { setStep(newStep); setPct(newPct); }

  async function runAnalysis() {
    try {
      const { parseInstagram, addConversation, computeAllRankings } = window.DataParser;

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
            const friendName = Object.keys(result.counts).find(n => n !== detectedMyName);
            if (friendName) addConversation(instaData, friendName, result);
          }
        } else {
          const json = await readFileAsJSON(file);
          const result = parseInstagram(json);
          if (!result) continue;
          if (!myName && result.myName) myName = result.myName;
          const friendName = Object.keys(result.counts).find(n => n !== myName);
          if (friendName) addConversation(instaData, friendName, result);
        }
      }

      advance(2, 75);
      await delay(500);

      const rankingsByPeriod = computeAllRankings(instaData, myName);
      // 최근 3개월 대화가 없으면 전체 기준으로 시작
      const period = rankingsByPeriod.recent.length > 0 ? "recent" : "all";
      const rankings = rankingsByPeriod[period];
      const totalMessages = Object.values(instaData).reduce((a, e) => a + e.total, 0);
      const totalContacts = Object.keys(instaData).length;

      advance(3, 100);
      await delay(600);

      setAppData((prev) => ({
        ...prev, instaData, rankings, rankingsByPeriod, period, totalMessages, totalContacts,
        uploadedAt: new Date().toLocaleDateString("ko-KR"),
      }));

      await delay(700);
      onNavigate("top5");
    } catch (e) {
      setError("파일을 읽는 중 오류가 발생했어요: " + e.message);
    }
  }

  function delay(ms) { return new Promise((r) => setTimeout(r, ms)); }

  return (
    <AppShell activeNav="upload" onNavigate={onNavigate} hideNav>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 40, paddingTop: 48, minHeight: "70vh" }}>
        {/* 헤딩 */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#e1306c", letterSpacing: "0.08em", marginBottom: 10 }}>
            분석 중
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            찐친 찾는 중<br />잠깐만요…
          </div>
        </div>

        {/* 진행률 바 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "#555" }}>진행률</span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 900, color: pct === 100 ? "#4ade80" : "#e1306c" }}>
              {pct}%
            </span>
          </div>
          <div style={{ height: 6, background: "#1e1e1e", borderRadius: 99, overflow: "hidden" }}>
            <div style={{
              width: `${pct}%`, height: "100%",
              background: pct === 100
                ? "linear-gradient(90deg, #22c55e, #16a34a)"
                : "linear-gradient(90deg, #f09433, #e1306c)",
              borderRadius: 99,
              transition: "width 500ms cubic-bezier(0.22,1,0.36,1)",
            }} />
          </div>
        </div>

        {/* 스텝 리스트 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {STEPS.map((s, i) => {
            const done = i < step || (i === step && pct >= 100);
            const active = i === step && pct < 100;
            return (
              <div key={s.key} style={{
                display: "flex", alignItems: "center", gap: 14,
                opacity: done ? 1 : active ? 1 : 0.3,
                transition: "opacity 300ms",
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                  background: done ? "#22c55e" : active ? "#e1306c" : "#1e1e1e",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, color: "#fff", fontWeight: 900,
                }}>
                  {done ? "✓" : i + 1}
                </div>
                <span style={{
                  fontSize: 15, fontWeight: active ? 800 : done ? 700 : 400,
                  color: done ? "#fff" : active ? "#e1306c" : "#555",
                }}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {error && (
          <div style={{
            background: "rgba(240,148,51,0.1)", border: "1px solid rgba(240,148,51,0.2)",
            borderRadius: 14, padding: "18px",
          }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: "#f09433", marginBottom: 8 }}>⚠️ 오류가 발생했어요</div>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 14 }}>{error}</div>
            <button
              onClick={() => onNavigate("upload")}
              style={{
                padding: "10px 18px", background: "#1e1e1e", border: "none",
                borderRadius: 10, fontFamily: "var(--font-body)",
                fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer",
              }}
            >파일 업로드로 돌아가기</button>
          </div>
        )}
      </div>
    </AppShell>
  );
}

window.AnalyzingScreen = AnalyzingScreen;
})();
