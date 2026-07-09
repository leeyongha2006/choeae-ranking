(function () {
const { Button } = window.DesignSystem_8db18d;
const { useState, useRef, useEffect } = React;

const KAKAO_STEPS = [
  { num: "1", title: "채팅방 열기", desc: "랭킹에 넣고 싶은 친구와의 채팅방을 열어요", tip: "1:1, 단체 채팅방 모두 OK" },
  { num: "2", title: "우측 메뉴 → 채팅방 설정", desc: "화면 우측 상단 ☰ 아이콘을 눌러요", tip: "Android는 하단 메뉴에 있을 수 있어요" },
  { num: "3", title: "대화 내보내기", desc: "'대화 내보내기' → '내 파일에 저장' 선택", tip: "미디어 포함 여부는 아무거나 선택해도 돼요" },
  { num: "4", title: ".txt 파일 올리기", desc: "저장된 KakaoTalk_날짜.txt 파일을 아래에 올려요", tip: "파일이 안 보이면 내 파일 앱 → Download 폴더 확인" },
];

const INSTA_STEPS = [
  { num: "1", title: "인스타 설정 열기", desc: "프로필 → 우측 상단 ☰ → '설정 및 활동' 탭", tip: null },
  { num: "2", title: "정보 다운로드 요청", desc: "'내 활동' → '정보 다운로드' → 형식을 JSON으로 선택!", tip: "형식을 꼭 JSON으로 바꿔주세요 (기본값이 HTML이에요)" },
  { num: "3", title: "이메일로 받기", desc: "1~3일 내 이메일로 다운로드 링크가 와요", tip: "스팸함도 확인해보세요" },
  { num: "4", title: "message_1.json 올리기", desc: "압축 해제 → messages → inbox → 친구이름 폴더 안 파일", tip: "친구별 폴더가 따로 있어요. 여러 파일 올릴수록 정확해요!" },
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

function MiniStep({ step }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <div style={{
        width: 22, height: 22, borderRadius: "50%", flexShrink: 0, marginTop: 1,
        background: "var(--gradient-holo)", display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff",
      }}>{step.num}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)" }}>
          {step.title}
        </span>
        <span style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.4 }}>{step.desc}</span>
        {step.tip && (
          <span style={{
            fontSize: 10, color: "var(--violet-600)", background: "var(--violet-100)",
            borderRadius: "var(--radius-sm)", padding: "2px 6px", display: "inline-block", marginTop: 1,
          }}>💡 {step.tip}</span>
        )}
      </div>
    </div>
  );
}

function PlatformSection({ platform, file, onSelect, error, isMobile }) {
  const ref = useRef();
  const [dragging, setDragging] = useState(false);
  const isKakao = platform === "kakao";
  const steps = isKakao ? KAKAO_STEPS : INSTA_STEPS;
  const accept = isKakao ? ".txt" : ".json";
  const accentColor = isKakao ? "#f59e0b" : "#e1306c";
  const accentBg = isKakao ? "#fef3c7" : "#fce7f0";
  const hint = isKakao ? "KakaoTalk_날짜.txt" : "message_1.json";
  const LogoIcon = isKakao ? KakaoLogo : InstaLogo;

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) onSelect(f);
  }

  const dropZone = (
    <div
      onClick={() => ref.current.click()}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      style={{
        border: `2px dashed ${dragging ? accentColor : file ? "var(--color-success)" : "var(--border-strong)"}`,
        borderRadius: "var(--radius-lg)",
        padding: isMobile ? "20px 16px" : "24px 16px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        cursor: "pointer", textAlign: "center",
        background: file ? "var(--mint-100)" : dragging ? accentBg : "var(--surface-sunken)",
        transition: "all 200ms var(--ease-out)",
      }}
    >
      {file ? <span style={{ fontSize: isMobile ? 28 : 32 }}>✅</span> : <LogoIcon size={isMobile ? 28 : 32} />}
      {file ? (
        <>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--color-success)", wordBreak: "break-all" }}>{file.name}</span>
          <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{(file.size / 1024).toFixed(1)} KB</span>
          <Button variant="secondary" size="sm" onClick={e => { e.stopPropagation(); ref.current.click(); }}>파일 교체</Button>
        </>
      ) : (
        <>
          <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{hint}</span>
          <Button variant="secondary" size="sm" onClick={e => { e.stopPropagation(); ref.current.click(); }}>파일 선택</Button>
          {!isMobile && <span style={{ fontSize: 10, color: "var(--text-tertiary)" }}>또는 여기에 드래그</span>}
        </>
      )}
      <input ref={ref} type="file" accept={accept} style={{ display: "none" }} onChange={e => onSelect(e.target.files[0])} />
    </div>
  );

  const guideSteps = (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        파일 꺼내는 법
      </div>
      {steps.map(s => <MiniStep key={s.num} step={s} />)}
    </div>
  );

  return (
    <div style={{
      background: "var(--surface-card)", border: "1px solid var(--border-soft)",
      borderRadius: "var(--radius-xl)", overflow: "hidden",
    }}>
      {/* 헤더 */}
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
            {isKakao ? "채팅방 → 대화 내보내기 → .txt 파일" : "설정 → 정보 다운로드 → .json 파일"}
          </div>
        </div>
      </div>

      {isMobile ? (
        /* 모바일: 세로 스택 (업로드 존 → 가이드) */
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 16 }}>
          {dropZone}
          {error && <div style={{ fontSize: 11, color: "var(--color-danger)" }}>⚠️ {error}</div>}
          {guideSteps}
        </div>
      ) : (
        /* 데스크톱: 좌우 분할 */
        <div style={{ display: "flex" }}>
          <div style={{ flex: "0 0 220px", padding: "16px", borderRight: "1px solid var(--border-soft)" }}>
            {dropZone}
            {error && <div style={{ fontSize: 11, color: "var(--color-danger)", marginTop: 6 }}>⚠️ {error}</div>}
          </div>
          <div style={{ flex: 1, padding: "16px 20px" }}>
            {guideSteps}
          </div>
        </div>
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

  const [kakaoFile, setKakaoFile] = useState(null);
  const [instaFile, setInstaFile] = useState(null);
  const [kakaoError, setKakaoError] = useState("");
  const [instaError, setInstaError] = useState("");

  function handleKakao(file) {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".txt")) {
      setKakaoError("카카오톡 파일은 .txt 형식이어야 해요");
      return;
    }
    setKakaoError("");
    setKakaoFile(file);
  }

  function handleInsta(file) {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".json")) {
      setInstaError("인스타그램 파일은 .json 형식이어야 해요");
      return;
    }
    setInstaError("");
    setInstaFile(file);
  }

  function handleStart() {
    setAppData(prev => ({ ...prev, kakaoFile, instaFile, isDemo: false }));
    onNavigate("analyzing");
  }

  function handleDemo() {
    setAppData(prev => ({ ...prev, kakaoFile: null, instaFile: null, isDemo: true }));
    onNavigate("analyzing");
  }

  const canStart = (showKakao && kakaoFile) || (showInsta && instaFile);
  const platformLabel = choice === "kakao" ? "카카오톡" : "인스타그램";

  return (
    <AppShell activeNav="upload" onNavigate={onNavigate}>
      {/* 상단 */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: isMobile ? 22 : 26, color: "var(--ink-900)", margin: 0 }}>
            파일 올리기
          </h2>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0" }}>
            <strong>{platformLabel}</strong> 파일을 올리면 바로 분석이 시작돼요
          </p>
        </div>
        <Button variant="default" size="sm" onClick={() => onNavigate("onboarding")}>← 다시 선택</Button>
      </div>

      {/* 업로드 섹션들 */}
      <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 12 : 16 }}>
        {showKakao && (
          <PlatformSection
            platform="kakao"
            file={kakaoFile}
            onSelect={handleKakao}
            error={kakaoError}
            isMobile={isMobile}
          />
        )}
        {showInsta && (
          <PlatformSection
            platform="insta"
            file={instaFile}
            onSelect={handleInsta}
            error={instaError}
            isMobile={isMobile}
          />
        )}
      </div>

      {/* 하단 CTA */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: isMobile ? "center" : "space-between",
        flexDirection: isMobile ? "column" : "row",
        gap: 12,
      }}>
        {!isMobile && (
          <button
            onClick={handleDemo}
            style={{
              fontSize: 13, color: "var(--text-tertiary)", background: "none",
              border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: "var(--font-body)",
            }}
          >
            파일 없이 데모로 먼저 볼게요
          </button>
        )}
        <Button
          variant="primary" size="lg"
          onClick={canStart ? handleStart : handleDemo}
          style={{ width: isMobile ? "100%" : "auto", opacity: 1 }}
        >
          {canStart ? "분석 시작 →" : "데모로 먼저 볼게요"}
        </Button>
      </div>
    </AppShell>
  );
}

window.UploadScreen = UploadScreen;
})();
