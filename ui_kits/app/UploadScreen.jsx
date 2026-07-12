(function () {
const { useState, useRef } = React;

const INSTA_STEPS = [
  {
    num: 1,
    title: "계정 센터 열기",
    desc: "인스타그램에서 ☰ → '설정 및 개인정보'를 탭해요. 화면 위쪽 '계정 센터'를 탭해요.",
    img: "./guide_imgs/insta_step1_settings.png",
  },
  {
    num: 2,
    title: "'내 정보 및 권한' 탭하기",
    desc: "계정 설정 화면에서 '내 정보 및 권한'을 탭해요.",
    img: "./guide_imgs/insta_step2_account.png",
  },
  {
    num: 3,
    title: "'내 정보 내보내기' 탭하기",
    desc: "'내 정보 내보내기'를 탭해요. 바로 아래 나오는 '내보내기 만들기' 버튼을 탭해요.",
    img: "./guide_imgs/insta_step3_myinfo.png",
  },
  {
    num: 4,
    title: "계정 선택하기",
    desc: "'내보내기 만들기' 팝업이 뜨면 버튼을 탭해요. 계정 선택 화면에서 내 계정을 선택해요.",
    img: "./guide_imgs/insta_step4_export.png",
  },
  {
    num: 5,
    title: "'기기로 내보내기' 선택",
    desc: "내보낼 위치 선택 화면에서 '기기로 내보내기'를 탭해요.",
    img: "./guide_imgs/insta_step5_location.png",
  },
  {
    num: 6,
    title: "형식 JSON · 기간 선택",
    desc: "'정보 맞춤 설정'에서 '메시지'만 체크하고 나머지는 해제해요. '기간'을 원하는 범위로, '형식'을 JSON으로 바꾼 뒤 '내보내기 시작'을 탭해요.",
    tip: "형식을 반드시 JSON으로! 기간은 아무거나 선택 가능해요.",
    img: "./guide_imgs/insta_step6_config.svg",
  },
  {
    num: 7,
    title: "zip 파일 그대로 올리기",
    desc: "파일이 준비되면 알림이 와요. 다운로드된 .zip 파일을 풀지 말고 그대로 아래에 올려주세요.",
    tip: "압축을 직접 풀 필요 없어요. zip 파일 그대로 올리면 돼요!",
    isUploadStep: true,
    img: "./guide_imgs/insta_step6_file.svg",
  },
];

function UploadScreen({ onNavigate, appData, setAppData }) {
  const { AppShell } = window;
  const [current, setCurrent] = useState(0);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const fileRef = useRef();

  const step = INSTA_STEPS[current];
  const total = INSTA_STEPS.length;
  const isLast = current === total - 1;

  function handleAddFiles(newFiles) {
    const invalid = newFiles.filter(f => {
      const n = f.name.toLowerCase();
      return !n.endsWith(".zip") && !n.endsWith(".json");
    });
    if (invalid.length > 0) { setError("zip 또는 json 파일만 선택해주세요"); return; }
    setError("");
    setFiles(prev => {
      const existing = new Set(prev.map(f => f.name));
      return [...prev, ...newFiles.filter(f => !existing.has(f.name))];
    });
  }

  function handleStart() {
    setAppData(prev => ({ ...prev, instaFiles: files, isDemo: false }));
    onNavigate("analyzing");
  }

  return (
    <AppShell activeNav="upload" onNavigate={onNavigate}>
      {/* 헤더 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#e1306c", letterSpacing: "0.06em", marginBottom: 4 }}>
            STEP {current + 1} / {total}
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>
            파일 가져오기
          </div>
        </div>
        <button
          onClick={() => onNavigate("onboarding")}
          style={{
            padding: "8px 14px", background: "#1e1e1e", border: "none",
            borderRadius: 99, fontSize: 13, fontWeight: 600, color: "#888", cursor: "pointer",
          }}
        >
          ← 뒤로
        </button>
      </div>

      {/* 진행 바 */}
      <div style={{ display: "flex", gap: 4 }}>
        {INSTA_STEPS.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              flex: 1, height: 3, borderRadius: 99, cursor: "pointer",
              background: i <= current
                ? "linear-gradient(90deg, #f09433, #e1306c)"
                : "#2a2a2a",
              transition: "background 200ms",
            }}
          />
        ))}
      </div>

      {/* 스텝 콘텐츠 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 900, color: "#fff", marginBottom: 8 }}>
            {step.title}
          </div>
          <div style={{ fontSize: 14, color: "#888", lineHeight: 1.7 }}>
            {step.desc}
          </div>
        </div>

        {step.tip && (
          <div style={{
            padding: "12px 14px",
            background: "rgba(240,148,51,0.1)", border: "1px solid rgba(240,148,51,0.2)",
            borderRadius: 12, fontSize: 13, color: "#f09433", lineHeight: 1.6,
          }}>
            💡 {step.tip}
          </div>
        )}

        {step.img && (
          <div style={{ borderRadius: 16, overflow: "hidden", border: "1.5px solid rgba(255,255,255,0.15)", background: "#111" }}>
            <img
              src={step.img}
              alt={step.title}
              style={{ width: "100%", display: "block", maxHeight: 220, objectFit: "contain" }}
            />
          </div>
        )}

        {step.isUploadStep && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {files.map((f, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px",
                background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
                borderRadius: 12,
              }}>
                <span style={{ fontSize: 16 }}>✅</span>
                <div style={{ flex: 1, minWidth: 0, fontSize: 13, fontWeight: 700, color: "#4ade80", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {f.name}
                </div>
                <button onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))} style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 14, color: "#555", padding: "2px",
                }}>✕</button>
              </div>
            ))}
            <button
              onClick={() => fileRef.current.click()}
              style={{
                width: "100%", padding: "16px",
                background: "transparent",
                border: "2px dashed rgba(225,48,108,0.4)",
                borderRadius: 14, cursor: "pointer",
                fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700,
                color: "#e1306c",
              }}
            >
              {files.length === 0 ? "📂  zip 파일 선택하기" : `+ 파일 추가 (현재 ${files.length}개)`}
            </button>
            <input
              ref={fileRef} type="file" accept=".zip,.json" multiple style={{ display: "none" }}
              onChange={e => { handleAddFiles(Array.from(e.target.files)); e.target.value = ""; }}
            />
            {error && <div style={{ fontSize: 12, color: "#e1306c" }}>⚠️ {error}</div>}
          </div>
        )}
      </div>

      {/* 네비게이션 버튼 */}
      <div style={{ display: "flex", gap: 10, marginTop: "auto" }}>
        <button
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
          disabled={current === 0}
          style={{
            flex: 1, padding: "14px",
            background: "#1e1e1e", border: "none",
            borderRadius: 14,
            fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700,
            color: current === 0 ? "#333" : "#888",
            cursor: current === 0 ? "default" : "pointer",
          }}
        >← 이전</button>

        {!isLast ? (
          <button
            onClick={() => setCurrent(c => c + 1)}
            style={{
              flex: 2, padding: "14px",
              background: "linear-gradient(135deg, #f09433, #e1306c)",
              border: "none", borderRadius: 14,
              fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 900,
              color: "#fff", cursor: "pointer",
            }}
          >다음 →</button>
        ) : (
          <button
            onClick={files.length > 0 ? handleStart : undefined}
            style={{
              flex: 2, padding: "14px",
              background: files.length > 0
                ? "linear-gradient(135deg, #f09433, #e1306c)"
                : "#1e1e1e",
              border: "none", borderRadius: 14,
              fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 900,
              color: files.length > 0 ? "#fff" : "#444",
              cursor: files.length > 0 ? "pointer" : "default",
            }}
          >
            {files.length > 0 ? `분석 시작 (${files.length}개) →` : "파일을 선택해주세요"}
          </button>
        )}
      </div>
    </AppShell>
  );
}

window.UploadScreen = UploadScreen;
})();
