import { useRef, useState } from "react";
import { Button, FixedBottomCTA, Switch } from "@toss/tds-mobile";
import { displayNames, PERIODS } from "../lib/parser";
import { saveImage, shareResult } from "../lib/share";
import type { SavedResult } from "../lib/storage";

const THEMES = [
  { label: "인스타 핑크", bg: "linear-gradient(135deg, #f09433, #e1306c, #bc1888)", text: "#fff" },
  { label: "선셋", bg: "linear-gradient(135deg, #ffd3a5, #fd6585)", text: "#fff" },
  { label: "라벤더", bg: "linear-gradient(135deg, #e0c3fc, #8ec5fc)", text: "#191f28" },
  { label: "화이트", bg: "#ffffff", text: "#191f28" },
];

const COMMENTS = [
  "가장 많이 이야기 나눈 친구",
  "대화량으로 증명된 우정",
  "알림이 제일 반가운 사람",
  "오늘도 DM 하러 가볼까요",
];

export default function ShareScreen({ result }: { result: SavedResult }) {
  const period = PERIODS.find((p) => p.key === result.period) ?? PERIODS[0];
  const ranking = result.rankingsByPeriod[period.key];
  const names = displayNames(ranking);
  const top5 = ranking.slice(0, 5).map((f) => names[f.key]);

  const [title, setTitle] = useState("나의 최애 친구 순위");
  const [nickname, setNickname] = useState("");
  const [showNames, setShowNames] = useState(true);
  const [commentIdx, setCommentIdx] = useState(0);
  const [themeIdx, setThemeIdx] = useState(0);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const theme = THEMES[themeIdx];
  const comment = COMMENTS[commentIdx];
  const label = (i: number) => (showNames ? top5[i] : `친구 ${i + 1}`);

  async function handleShare() {
    setMessage("");
    try {
      const first = top5[0] ? label(0) : null;
      const text = first
        ? `${period.label} 내 인스타 DM 최애 친구 1위는 ${first}! 내 최애 친구도 확인해 보세요.`
        : "인스타 DM으로 내 최애 친구 랭킹을 확인해 보세요.";
      await shareResult(text);
    } catch (e) {
      if ((e as Error)?.name !== "AbortError") setMessage("공유하지 못했어요. 다시 시도해 주세요.");
    }
  }

  async function handleSave() {
    if (!cardRef.current || saving) return;
    setSaving(true);
    setMessage("");
    try {
      // 저장할 때만 불러와서 첫 화면 로딩을 가볍게
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(cardRef.current, { scale: 3, backgroundColor: null });
      await saveImage(canvas.toDataURL("image/png"), "최애친구랭킹.png");
      setMessage("이미지를 저장했어요.");
    } catch {
      setMessage("이미지를 저장하지 못했어요.");
    } finally {
      setSaving(false);
    }
  }

  const inputStyle = {
    width: "100%", padding: "14px 16px", fontSize: 16, fontFamily: "inherit",
    border: "1px solid var(--line)", borderRadius: "var(--radius-s)",
    background: "var(--bg-sub-2)", color: "var(--text)", outline: "none",
  } as const;

  return (
    <div className="page">
      <h1 className="title">공유 카드</h1>

      <div
        ref={cardRef}
        style={{
          width: "100%", aspectRatio: "3 / 4", maxHeight: 400, borderRadius: 24,
          background: theme.bg, color: theme.text, padding: "24px 22px",
          border: theme.bg === "#ffffff" ? "1px solid var(--line)" : "none",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, opacity: 0.7 }}>
          <span>최애친구랭킹</span>
          <span>{period.label}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{title}</div>
          {nickname && <div style={{ fontSize: 12, opacity: 0.7 }}>@{nickname}</div>}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 6 }}>
            {top5.map((_, i) => (
              <div
                key={i}
                style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "7px 12px", borderRadius: 10,
                  background: theme.text === "#fff" ? "rgba(255,255,255,0.18)" : "rgba(25,31,40,0.06)",
                }}
              >
                <span style={{ width: 16, fontSize: 13, fontWeight: 700, opacity: 0.8 }}>{i + 1}</span>
                <span style={{ fontSize: 14, fontWeight: i === 0 ? 700 : 500 }}>{label(i)}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>{comment}</div>
        </div>
      </div>

      <Section title="테마">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {THEMES.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setThemeIdx(i)}
              aria-pressed={themeIdx === i}
              style={{
                padding: 12, background: t.bg, color: t.text, fontSize: 13, fontWeight: 700,
                borderRadius: "var(--radius-s)", cursor: "pointer",
                border: themeIdx === i ? "2px solid var(--text)" : "2px solid var(--line)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="카드 내용">
        <input value={title} maxLength={20} onChange={(e) => setTitle(e.target.value)} placeholder="카드 제목" style={inputStyle} />
        <input value={nickname} maxLength={20} onChange={(e) => setNickname(e.target.value)} placeholder="닉네임 (선택)" style={inputStyle} />
        <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 2px" }}>
          <span style={{ fontSize: 15, color: "var(--text-2)" }}>친구 이름 보이기</span>
          <Switch checked={showNames} onChange={(_, checked) => setShowNames(checked)} />
        </label>
        <Button display="full" size="medium" variant="weak" color="dark" onClick={() => setCommentIdx((i) => (i + 1) % COMMENTS.length)}>
          다른 문구로 바꾸기
        </Button>
      </Section>

      <Button display="full" size="large" variant="weak" loading={saving} onClick={handleSave}>
        이미지로 저장하기
      </Button>
      {message && <p className="caption" style={{ textAlign: "center" }}>{message}</p>}

      <FixedBottomCTA onClick={handleShare}>공유하기</FixedBottomCTA>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-3)" }}>{title}</span>
      {children}
    </div>
  );
}
