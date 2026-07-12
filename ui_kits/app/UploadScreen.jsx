(function () {
const { Button } = window.DesignSystem_8db18d;
const { useState, useRef, useEffect } = React;

const INSTA_STEPS = [
  {
    num: 1,
    title: "계정 센터 열기",
    desc: "인스타그램에서 ☰ → '설정 및 개인정보'를 탭해요. 화면 위쪽 '계정 센터'를 탭해요.",
    tip: null,
    img: "./guide_imgs/insta_step1_settings.png",
  },
  {
    num: 2,
    title: "'내 정보 및 권한' 탭하기",
    desc: "계정 설정 화면에서 '내 정보 및 권한'을 탭해요.",
    tip: null,
    img: "./guide_imgs/insta_step2_account.png",
  },
  {
    num: 3,
    title: "'내 정보 내보내기' 탭하기",
    desc: "'내 정보 내보내기'를 탭해요. 바로 아래 나오는 '내보내기 만들기' 버튼을 탭해요.",
    tip: null,
    img: "./guide_imgs/insta_step3_myinfo.png",
  },
  {
    num: 4,
    title: "계정 선택하기",
    desc: "'내보내기 만들기' 팝업이 뜨면 버튼을 탭해요. 계정 선택 화면에서 내 계정을 선택해요.",
    tip: null,
    img: "./guide_imgs/insta_step4_export.png",
  },
  {
    num: 5,
    title: "'기기로 내보내기' 선택",
    desc: "내보낼 위치 선택 화면에서 '기기로 내보내기'를 탭해요.",
    tip: null,
    img: "./guide_imgs/insta_step5_location.png",
  },
  {
    num: 6,
    title: "정보 맞춤 설정 · 기간·형식 변경",
    desc: "'정보 맞춤 설정'에서 '메시지'만 체크하고 나머지는 해제해요. 그 다음 '기간'을 원하는 범위로, '형식'을 'JSON'으로 바꾼 뒤 '내보내기 시작'을 탭해요.",
    tip: "기간은 아무 기간이나 선택해도 돼요 — 그 기간 기준으로 랭킹이 나와요. 형식은 반드시 JSON으로!",
    img: "./guide_imgs/insta_step6_config.svg",
  },
  {
    num: 7,
    title: "압축 파일 그대로 올리기",
    desc: "파일이 준비되면 알림이 와요. 다운로드된 압축 파일(.zip)을 풀지 말고 그대로 아래 버튼으로 올려주세요. 앱이 안에서 대화 파일을 자동으로 찾아줘요.",
    tip: "압축을 직접 풀 필요 없어요. zip 파일 그대로 올리면 돼요!",
    isUploadStep: true,
    multiple: true,
    img: "./guide_imgs/insta_step6_file.svg",
  },
];

function useIsMobile() {
  const [v, setV] = useState(window.innerWidth < 700);
  useEffect(() => {
    function fn() { setV(window.innerWidth < 700); }
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return v;
}

function InstaLogo({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <defs>
        <linearGradient id="igUpload" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#f09433"/>
          <stop offset="40%" stopColor="#dc2743"/>
          <stop offset="100%" stopColor="#bc1888"/>
        </linearGradient>
      </defs>
      <rect width="28" height="28" rx="7" fill="url(#igUpload)"/>
      <rect x="5" y="5" width="18" height="18" rx="5.5" fill="none" stroke="white" strokeWidth="1.8"/>
      <circle cx="14" cy="14" r="4.5" fill="none" stroke="white" strokeWidth="1.8"/>
      <circle cx="19.5" cy="8.5" r="1.1" fill="white"/>
    </svg>
  );
}

function MultiFileZone({ files, onAdd, onRemove, accentColor, accentBg, accept = ".zip,.json", labelColor = "#9d174d" }) {
  const ref = useRef();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {files.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {files.map((f, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 12px", background: "#f0fdf4",
              border: "1.5px solid #22c55e", borderRadius: "var(--radius-md)",
            }}>
              <span style={{ fontSize: 14 }}>✅</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#15803d", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
              </div>
              <button onClick={() => onRemove(i)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 14, color: "#94a3b8", padding: "2px 4px",
              }}>✕</button>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => ref.current.click()}
        style={{
          width: "100%", padding: "12px", border: `2px dashed ${accentColor}`,
          borderRadius: "var(--radius-lg)", background: accentBg,
          cursor: "pointer", fontFamily: "var(--font-body)",
          fontSize: 13, fontWeight: 700, color: labelColor,
        }}
      >
        {files.length === 0 ? "파일 선택하기" : `+ 파일 추가 (현재 ${files.length}개)`}
      </button>
      <input
        ref={ref} type="file" accept={accept} multiple style={{ display: "none" }}
        onChange={e => { onAdd(Array.from(e.target.files)); e.target.value = ""; }}
      />
    </div>
  );
}

function StepGuide({ steps, accentColor, accentBg, files, onAddFiles, onRemoveFile, accept, labelColor }) {
  const [current, setCurrent] = useState(0);
  const step = steps[current];
  const total = steps.length;
  const isLast = current === total - 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <div style={{ display: "flex", gap: 4, padding: "14px 16px 0" }}>
        {steps.map((s, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              flex: 1, height: 3, borderRadius: 99, cursor: "pointer",
              background: i <= current ? accentColor : "var(--border-soft)",
              transition: "background 200ms",
            }}
          />
        ))}
      </div>

      <div style={{ padding: "16px 16px 0", minHeight: 150 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9d174d", marginBottom: 6 }}>
          STEP {step.num} / {total}
        </div>
        <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text-primary)", marginBottom: 8 }}>
          {step.title}
        </div>
        <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
          {step.desc}
        </div>
        {step.tip && (
          <div style={{
            marginTop: 10, padding: "8px 12px",
            background: accentBg, borderRadius: "var(--radius-md)",
            fontSize: 12, color: "var(--text-primary)", lineHeight: 1.5,
          }}>
            💡 {step.tip}
          </div>
        )}
        {step.img && (
          <div style={{ marginTop: 14, borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--border-soft)" }}>
            <img
              src={step.img}
              alt={step.title}
              style={{ width: "100%", display: "block", maxHeight: 200, objectFit: "contain", background: "#111" }}
            />
          </div>
        )}
      </div>

      {step.isUploadStep && (
        <div style={{ padding: "14px 16px 0" }}>
          <MultiFileZone
            files={files || []} onAdd={onAddFiles} onRemove={onRemoveFile}
            accentColor={accentColor} accentBg={accentBg} accept={accept} labelColor={labelColor}
          />
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px 16px", gap: 8 }}>
        <button
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
          disabled={current === 0}
          style={{
            flex: 1, padding: "10px", border: "1.5px solid var(--border-soft)",
            borderRadius: "var(--radius-md)", background: "none",
            fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 700,
            color: current === 0 ? "var(--text-tertiary)" : "var(--text-primary)",
            cursor: current === 0 ? "default" : "pointer",
          }}
        >← 이전</button>
        <button
          onClick={() => !isLast && setCurrent(c => c + 1)}
          disabled={isLast}
          style={{
            flex: 2, padding: "10px",
            border: "none", borderRadius: "var(--radius-md)",
            background: isLast ? "var(--surface-sunken)" : "linear-gradient(135deg, #f09433, #bc1888)",
            fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 700,
            color: isLast ? "var(--text-tertiary)" : "#fff",
            cursor: isLast ? "default" : "pointer",
          }}
        >{isLast ? "파일을 선택해주세요" : "다음 →"}</button>
      </div>
    </div>
  );
}

function UploadScreen({ onNavigate, appData, setAppData }) {
  const { AppShell } = window;
  const isMobile = useIsMobile();

  const [instaFiles, setInstaFiles] = useState([]);
  const [instaError, setInstaError] = useState("");

  function handleAddInsta(newFiles) {
    const invalid = newFiles.filter(f => {
      const n = f.name.toLowerCase();
      return !n.endsWith(".zip") && !n.endsWith(".json");
    });
    if (invalid.length > 0) {
      setInstaError("인스타 압축 파일(.zip) 또는 대화 파일(.json)만 선택해주세요");
      return;
    }
    setInstaError("");
    setInstaFiles(prev => {
      const existingNames = new Set(prev.map(f => f.name));
      return [...prev, ...newFiles.filter(f => !existingNames.has(f.name))];
    });
  }

  function handleRemoveInsta(index) {
    setInstaFiles(prev => prev.filter((_, i) => i !== index));
  }

  function handleStart() {
    setAppData(prev => ({ ...prev, instaFiles, isDemo: false }));
    onNavigate("analyzing");
  }

  return (
    <AppShell activeNav="upload" onNavigate={onNavigate}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: isMobile ? 22 : 26, color: "var(--ink-900)", margin: 0 }}>
            파일 올리기
          </h2>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0" }}>
            인스타그램 파일을 올려주세요
          </p>
        </div>
        <Button variant="default" size="sm" onClick={() => onNavigate("onboarding")}>← 뒤로</Button>
      </div>

      <div style={{
        borderRadius: 20, overflow: "hidden",
        boxShadow: "0 4px 20px rgba(220,39,67,0.15)",
      }}>
        <div style={{
          padding: "16px 18px",
          background: "linear-gradient(135deg, #f09433 0%, #e1306c 55%, #bc1888 100%)",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{
            width: 42, height: 42, borderRadius: 11,
            background: "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <InstaLogo size={26} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>인스타그램 파일 올리기</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 1 }}>
              총 {INSTA_STEPS.length}단계 가이드
            </div>
          </div>
        </div>
        <div style={{ background: "var(--surface-card)", border: "1.5px solid #e1306c", borderTop: "none", borderRadius: "0 0 20px 20px" }}>
          <StepGuide
            steps={INSTA_STEPS} accentColor="#e1306c" accentBg="#fce7f0"
            files={instaFiles} onAddFiles={handleAddInsta} onRemoveFile={handleRemoveInsta}
            accept=".zip,.json" labelColor="#9d174d"
          />
          {instaError && <div style={{ padding: "0 16px 12px", fontSize: 12, color: "var(--color-danger)" }}>⚠️ {instaError}</div>}
        </div>
      </div>

      {instaFiles.length > 0 && (
        <Button variant="primary" size="lg" onClick={handleStart} style={{ width: "100%" }}>
          분석 시작 ({instaFiles.length}개 파일) →
        </Button>
      )}
    </AppShell>
  );
}

window.UploadScreen = UploadScreen;
})();
