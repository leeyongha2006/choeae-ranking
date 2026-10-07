import { useRef, useState } from "react";
import { FixedBottomCTA, ProgressBar } from "@toss/tds-mobile";
import type { Navigate } from "../router";

interface GuideStep {
  title: string;
  desc: string;
  tip?: string;
  img?: string;
  highlights?: { top: string; left: string; width: string; height: string; borderRadius?: number }[];
}

const STEPS: GuideStep[] = [
  {
    title: "계정 센터 열기",
    desc: "인스타그램에서 ☰ → '설정 및 개인정보'를 누르고, 화면 위쪽 '계정 센터'를 눌러요.",
    img: "/guide/insta_step1_settings.png",
    highlights: [{ top: "4%", left: "2%", width: "96%", height: "88%" }],
  },
  {
    title: "'내 정보 및 권한' 누르기",
    desc: "계정 설정 화면에서 '내 정보 및 권한'을 눌러요.",
    img: "/guide/insta_step2_account.png",
    highlights: [{ top: "43%", left: "2%", width: "96%", height: "21%" }],
  },
  {
    title: "'내 정보 내보내기' 누르기",
    desc: "'내 정보 내보내기'를 누르고, 바로 아래 '내보내기 만들기' 버튼을 눌러요.",
    img: "/guide/insta_step3_myinfo.png",
    highlights: [{ top: "40%", left: "2%", width: "96%", height: "21%" }],
  },
  {
    title: "계정 선택하기",
    desc: "'내보내기 만들기' 팝업에서 버튼을 누르고, 내 계정을 선택해요.",
    img: "/guide/insta_step4_export.png",
    highlights: [{ top: "82%", left: "4%", width: "92%", height: "16%", borderRadius: 14 }],
  },
  {
    title: "'기기로 내보내기' 선택하기",
    desc: "내보낼 위치 선택 화면에서 '기기로 내보내기'를 눌러요.",
    img: "/guide/insta_step5_location.png",
    highlights: [{ top: "43%", left: "2%", width: "96%", height: "23%" }],
  },
  {
    title: "형식은 JSON으로 선택하기",
    desc: "'정보 맞춤 설정'에서 '메시지'만 체크하고, '형식'을 JSON으로 바꾼 뒤 '내보내기 시작'을 눌러요.",
    tip: "형식을 꼭 JSON으로 선택해 주세요. 기간은 원하는 대로 골라도 돼요.",
    img: "/guide/insta_step6_config.png",
    highlights: [
      { top: "16%", left: "2%", width: "96%", height: "12%" },
      { top: "29%", left: "2%", width: "96%", height: "12%" },
      { top: "81%", left: "3%", width: "94%", height: "11%", borderRadius: 12 },
    ],
  },
  {
    title: "zip 파일 그대로 올리기",
    desc: "파일이 준비되기까지 몇 시간이 걸릴 수 있어요. 알림을 받으면 다운로드한 뒤 아래에서 선택해 주세요.",
    tip: "파일 이름은 instagram-로 시작하는 .zip이에요. 압축을 풀지 않고 그대로 올리면 돼요.",
  },
];

interface Props {
  step: number;
  navigate: Navigate;
  files: File[];
  setFiles: (updater: (prev: File[]) => File[]) => void;
}

export default function UploadScreen({ step, navigate, files, setFiles }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const current = STEPS[Math.min(step, STEPS.length - 1)];
  const isLast = step >= STEPS.length - 1;

  function handleAddFiles(newFiles: File[]) {
    const invalid = newFiles.some((f) => !/\.(zip|json)$/i.test(f.name));
    if (invalid) {
      setError("zip 또는 json 파일만 선택할 수 있어요.");
      return;
    }
    setError("");
    setFiles((prev) => {
      const existing = new Set(prev.map((f) => f.name));
      return [...prev, ...newFiles.filter((f) => !existing.has(f.name))];
    });
  }

  return (
    <div className="page">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <span className="eyebrow">
          {step + 1} / {STEPS.length}
        </span>
        <ProgressBar progress={(step + 1) / STEPS.length} size="normal" color="#E1306C" animate />
      </div>

      <div key={step} className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <h2 className="title" style={{ fontSize: 22 }}>{current.title}</h2>
        <p className="desc">{current.desc}</p>

        {step === 0 && (
          <button
            className="text-button"
            style={{ alignSelf: "flex-start", padding: 0, color: "var(--brand)" }}
            onClick={() => navigate({ name: "upload", step: STEPS.length - 1 })}
          >
            이미 파일이 있어요
          </button>
        )}

        {current.tip && (
          <div style={{ padding: "12px 14px", background: "var(--warning-bg)", borderRadius: "var(--radius-s)", fontSize: 14, color: "var(--warning)", lineHeight: 1.6 }}>
            {current.tip}
          </div>
        )}

        {current.img && (
          <div style={{ position: "relative", borderRadius: "var(--radius-m)", overflow: "hidden", border: "1px solid var(--line)", background: "var(--bg-sub)" }}>
            <img src={current.img} alt={current.title} style={{ width: "100%", display: "block" }} />
            {current.highlights?.map((h, i) => (
              <div key={i} className="highlight-overlay" style={{ ...h, borderRadius: h.borderRadius ?? 8 }} />
            ))}
          </div>
        )}

        {isLast && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {files.map((f, i) => (
              <div
                key={f.name}
                style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "12px 14px",
                  background: "var(--bg-sub)", borderRadius: "var(--radius-s)",
                }}
              >
                <span style={{ flex: 1, minWidth: 0, fontSize: 14, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {f.name}
                </span>
                <span className="caption">{formatSize(f.size)}</span>
                <button
                  className="text-button"
                  aria-label={`${f.name} 삭제`}
                  onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                >
                  삭제
                </button>
              </div>
            ))}
            <button
              onClick={() => fileRef.current?.click()}
              style={{
                width: "100%", padding: 16, background: "var(--bg)",
                border: "1.5px dashed var(--brand)", borderRadius: "var(--radius-m)",
                fontSize: 15, fontWeight: 700, color: "var(--brand)", cursor: "pointer",
              }}
            >
              {files.length === 0 ? "zip 파일 선택하기" : "파일 추가하기"}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".zip,.json,application/zip,application/json"
              multiple
              hidden
              onChange={(e) => {
                handleAddFiles(Array.from(e.target.files ?? []));
                e.target.value = "";
              }}
            />
            {error && <p className="caption" style={{ color: "var(--brand)" }}>{error}</p>}
            <p className="caption">파일은 이 기기 안에서만 분석되고, 대화 내용은 저장하지 않아요.</p>
          </div>
        )}
      </div>

      {isLast ? (
        <FixedBottomCTA disabled={files.length === 0} onClick={() => navigate({ name: "analyzing" })}>
          {files.length === 0 ? "파일을 선택해 주세요" : "분석 시작하기"}
        </FixedBottomCTA>
      ) : (
        <FixedBottomCTA onClick={() => navigate({ name: "upload", step: step + 1 })}>다음</FixedBottomCTA>
      )}
    </div>
  );
}

function formatSize(bytes: number) {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(1)}GB`;
  if (bytes >= 1024 ** 2) return `${Math.round(bytes / 1024 ** 2)}MB`;
  return `${Math.max(1, Math.round(bytes / 1024))}KB`;
}
