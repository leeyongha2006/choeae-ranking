(function () {
const { Button } = window.DesignSystem_8db18d;
const { useState, useRef, useEffect } = React;

const KAKAO_STEPS = [
  {
    num: 1,
    title: "비교할 친구 정하기",
    desc: "랭킹에 올릴 친구들을 정해요. 각 친구마다 채팅방에서 파일을 하나씩 꺼내야 해요.",
    tip: "친구가 많을수록 랭킹이 정확해요. 5명 이상 추천!",
    img: "./guide_imgs/kakao_step1_friends.svg",
  },
  {
    num: 2,
    title: "채팅방 열고 ☰ 탭하기",
    desc: "친구와의 채팅방을 열고 오른쪽 위 ☰ 버튼 → 아래로 내려서 '채팅방 설정'을 탭해요.",
    tip: "안드로이드는 화면 아래 메뉴에 ☰가 있을 수 있어요.",
    img: "./guide_imgs/kakao_step2_menu.svg",
  },
  {
    num: 3,
    title: "'대화 내보내기' 탭하기",
    desc: "'대화 내보내기' → '내 파일에 저장'을 탭해요. 비교할 친구 수만큼 반복해요.",
    tip: "사진·동영상 포함 여부는 아무거나 선택해도 돼요.",
    img: "./guide_imgs/kakao_step3_export.svg",
  },
  {
    num: 4,
    title: "파일 모두 한 번에 올리기",
    desc: "내보낸 파일들을 모두 선택해서 아래 버튼으로 올려요. 여러 파일을 한 번에 선택해도 돼요.",
    tip: "파일이 안 보이면 '내 파일 앱 → 다운로드 폴더'를 확인해보세요.",
    isUploadStep: true,
    multiple: true,
  },
];

const INSTA_STEPS = [
  {
    num: 1,
    title: "프로필 화면 열기",
    desc: "인스타그램 하단 오른쪽 내 프로필 아이콘을 탭해요.",
    tip: null,
    img: "./guide_imgs/insta_step1_home.svg",
  },
  {
    num: 2,
    title: "설정 들어가기",
    desc: "프로필 화면 오른쪽 위 ☰ 탭 → '설정' 탭 → 화면 아래로 내려서 '계정 센터'를 탭해요.",
    tip: null,
    img: "./guide_imgs/insta_step2_settings.svg",
  },
  {
    num: 3,
    title: "내 정보 다운로드 열기",
    desc: "'내 정보 및 권한' → '내 정보 다운로드' → '정보 다운로드 또는 전송'을 탭해요.",
    tip: null,
    img: "./guide_imgs/insta_step3_info.svg",
  },
  {
    num: 4,
    title: "'파일 만들기' 탭하기",
    desc: "계정 선택 → '사용 가능한 모든 정보' → '기기에 다운로드' → 형식을 'JSON'으로 꼭 바꾼 뒤 '파일 만들기'를 탭해요.",
    tip: "형식이 처음엔 HTML로 되어 있어요. 반드시 JSON으로 바꿔주세요!",
    img: "./guide_imgs/insta_step4_download.svg",
  },
  {
    num: 5,
    title: "이메일로 받기",
    desc: "파일 준비가 되면 Instagram에서 이메일로 알려줘요. 이메일의 다운로드 링크를 탭하면 파일이 저장돼요.",
    tip: "스팸 메일함도 확인해보세요. 계정 크기에 따라 수 분~수 시간 걸릴 수 있어요.",
    img: "./guide_imgs/insta_step5_email.svg",
  },
  {
    num: 6,
    title: "대화 파일 올리기",
    desc: "받은 압축 파일을 풀면 폴더가 생겨요. messages → inbox → 친구 이름 폴더 안에 있는 파일을 아래 버튼으로 올려요.",
    tip: "친구마다 폴더가 따로 있어요. 'message_1'로 시작하는 파일이에요.",
    isUploadStep: true,
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

function KakaoLogo({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="7" fill="#FEE500"/>
      <path d="M14 5.5C8.75 5.5 4.5 8.96 4.5 13.22c0 2.66 1.59 5.01 4.01 6.47l-.88 3.26 3.9-2.1c.77.15 1.57.23 2.47.23 5.25 0 9.5-3.46 9.5-7.72S19.25 5.5 14 5.5z" fill="#3C1E1E"/>
    </svg>
  );
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

function MultiFileZone({ files, onAdd, onRemove, accentColor, accentBg }) {
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
          fontSize: 13, fontWeight: 700, color: "#92400e",
        }}
      >
        {files.length === 0 ? "파일 선택하기" : `+ 친구 추가 (현재 ${files.length}명)`}
      </button>
      <input
        ref={ref} type="file" accept=".txt" multiple style={{ display: "none" }}
        onChange={e => { onAdd(Array.from(e.target.files)); e.target.value = ""; }}
      />
    </div>
  );
}

function SingleFileZone({ file, onSelect, accentColor, accentBg }) {
  const ref = useRef();
  return (
    <div>
      {file ? (
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "12px 14px", background: "#f0fdf4",
          border: "1.5px solid #22c55e", borderRadius: "var(--radius-lg)",
        }}>
          <span style={{ fontSize: 20 }}>✅</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#15803d", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</div>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{(file.size / 1024).toFixed(1)} KB</div>
          </div>
          <Button variant="secondary" size="sm" onClick={() => ref.current.click()}>교체</Button>
        </div>
      ) : (
        <button
          onClick={() => ref.current.click()}
          style={{
            width: "100%", padding: "14px", border: `2px dashed ${accentColor}`,
            borderRadius: "var(--radius-lg)", background: accentBg,
            cursor: "pointer", fontFamily: "var(--font-body)",
            fontSize: 14, fontWeight: 700, color: "#9d174d",
          }}
        >파일 선택하기</button>
      )}
      <input ref={ref} type="file" accept=".json" style={{ display: "none" }} onChange={e => onSelect(e.target.files[0])} />
    </div>
  );
}

function StepGuide({ steps, accentColor, accentBg, files, file, onAddFiles, onRemoveFile, onSelectFile }) {
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
        <div style={{ fontSize: 11, fontWeight: 700, color: accentColor === "#f59e0b" ? "#92400e" : "#9d174d", marginBottom: 6 }}>
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
          {step.multiple
            ? <MultiFileZone files={files || []} onAdd={onAddFiles} onRemove={onRemoveFile} accentColor={accentColor} accentBg={accentBg} />
            : <SingleFileZone file={file} onSelect={onSelectFile} accentColor={accentColor} accentBg={accentBg} />
          }
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
            background: isLast ? "var(--surface-sunken)" : accentColor === "#f59e0b" ? "#FEE500" : "linear-gradient(135deg, #f09433, #bc1888)",
            fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 700,
            color: isLast ? "var(--text-tertiary)" : accentColor === "#f59e0b" ? "#3C1E1E" : "#fff",
            cursor: isLast ? "default" : "pointer",
          }}
        >{isLast ? "파일을 선택해주세요" : "다음 →"}</button>
      </div>
    </div>
  );
}

function PlatformSection({ platform, files, file, onAddFiles, onRemoveFile, onSelectFile, error }) {
  const isKakao = platform === "kakao";
  const steps = isKakao ? KAKAO_STEPS : INSTA_STEPS;
  const accentColor = isKakao ? "#f59e0b" : "#e1306c";
  const accentBg = isKakao ? "#fef3c7" : "#fce7f0";
  const LogoIcon = isKakao ? KakaoLogo : InstaLogo;

  return (
    <div style={{
      background: "var(--surface-card)", border: "1px solid var(--border-soft)",
      borderRadius: "var(--radius-xl)", overflow: "hidden",
    }}>
      <div style={{
        padding: "12px 16px", background: accentBg,
        display: "flex", alignItems: "center", gap: 10,
        borderBottom: "1px solid var(--border-soft)",
      }}>
        <LogoIcon size={22} />
        <div>
          <div style={{ fontWeight: 800, fontSize: 14, color: "var(--text-primary)" }}>
            {isKakao ? "카카오톡" : "인스타그램"} 파일 올리기
          </div>
          <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>
            {isKakao
              ? `총 ${KAKAO_STEPS.length}단계 · 친구마다 채팅방 파일 하나씩`
              : `총 ${INSTA_STEPS.length}단계 · 인스타 설정에서 대화 파일 받기`}
          </div>
        </div>
      </div>

      <StepGuide
        steps={steps}
        accentColor={accentColor}
        accentBg={accentBg}
        files={files}
        file={file}
        onAddFiles={onAddFiles}
        onRemoveFile={onRemoveFile}
        onSelectFile={onSelectFile}
      />

      {error && (
        <div style={{ padding: "0 16px 12px", fontSize: 12, color: "var(--color-danger)" }}>⚠️ {error}</div>
      )}
    </div>
  );
}

function UploadScreen({ onNavigate, appData, setAppData }) {
  const { AppShell } = window;
  const isMobile = useIsMobile();

  const choice = appData?.platformChoice || "kakao";
  const showKakao = choice === "kakao";
  const showInsta = choice === "insta";

  const [kakaoFiles, setKakaoFiles] = useState([]);
  const [instaFile, setInstaFile] = useState(null);
  const [kakaoError, setKakaoError] = useState("");
  const [instaError, setInstaError] = useState("");

  function handleAddKakao(newFiles) {
    const invalid = newFiles.filter(f => !f.name.toLowerCase().endsWith(".txt"));
    if (invalid.length > 0) {
      setKakaoError("카카오톡 대화 내보내기 파일만 선택해주세요");
      return;
    }
    setKakaoError("");
    setKakaoFiles(prev => {
      const existingNames = new Set(prev.map(f => f.name));
      return [...prev, ...newFiles.filter(f => !existingNames.has(f.name))];
    });
  }

  function handleRemoveKakao(index) {
    setKakaoFiles(prev => prev.filter((_, i) => i !== index));
  }

  function handleInsta(file) {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".json")) {
      setInstaError("인스타에서 내려받은 대화 파일을 선택해주세요");
      return;
    }
    setInstaError("");
    setInstaFile(file);
  }

  function handleStart() {
    setAppData(prev => ({ ...prev, kakaoFiles, instaFile, isDemo: false }));
    onNavigate("analyzing");
  }

  function handleDemo() {
    setAppData(prev => ({ ...prev, kakaoFiles: [], instaFile: null, isDemo: true }));
    onNavigate("analyzing");
  }

  const canStart = (showKakao && kakaoFiles.length > 0) || (showInsta && instaFile);

  return (
    <AppShell activeNav="upload" onNavigate={onNavigate}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: isMobile ? 22 : 26, color: "var(--ink-900)", margin: 0 }}>
            파일 올리기
          </h2>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0" }}>
            {showKakao ? "친구마다 채팅방 파일을 하나씩 꺼내서 한 번에 올려요" : "인스타 설정에서 대화 파일 받는 법을 안내해드려요"}
          </p>
        </div>
        <Button variant="default" size="sm" onClick={() => onNavigate("onboarding")}>← 다시 선택</Button>
      </div>

      {showKakao && (
        <PlatformSection
          platform="kakao"
          files={kakaoFiles}
          onAddFiles={handleAddKakao}
          onRemoveFile={handleRemoveKakao}
          error={kakaoError}
        />
      )}
      {showInsta && (
        <PlatformSection
          platform="insta"
          file={instaFile}
          onSelectFile={handleInsta}
          error={instaError}
        />
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <button
          onClick={handleDemo}
          style={{
            fontSize: 13, color: "var(--text-tertiary)", background: "none",
            border: "none", cursor: "pointer", textDecoration: "underline",
            fontFamily: "var(--font-body)",
          }}
        >
          데모로 먼저 볼게요
        </button>
        <Button
          variant="primary" size="lg"
          onClick={canStart ? handleStart : undefined}
          style={{ opacity: canStart ? 1 : 0.4 }}
        >
          {canStart
            ? showKakao ? `${kakaoFiles.length}명 분석 시작 →` : "분석 시작 →"
            : "파일을 먼저 선택해주세요"}
        </Button>
      </div>
    </AppShell>
  );
}

window.UploadScreen = UploadScreen;
})();
