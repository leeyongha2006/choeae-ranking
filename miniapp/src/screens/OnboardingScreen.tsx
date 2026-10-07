import { FixedBottomCTA } from "@toss/tds-mobile";
import type { Navigate } from "../router";

const FEATURES = [
  { title: "인스타그램 DM 기록으로 분석", desc: "내보내기한 zip 파일 하나면 충분해요" },
  { title: "기간별 랭킹", desc: "최근 3개월 · 최근 1년 · 전체로 나눠 볼 수 있어요" },
  { title: "기기 안에서만 분석", desc: "대화 내용은 서버로 전송되지 않아요" },
];

export default function OnboardingScreen({ navigate }: { navigate: Navigate }) {
  return (
    <div className="page">
      <div className="fade-up" style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
        <span className="eyebrow">인스타그램 DM 분석</span>
        <h1 className="title" style={{ fontSize: 30 }}>
          내 최애 친구는
          <br />
          <span style={{ background: "var(--brand-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            누구일까요?
          </span>
        </h1>
        <p className="desc">DM을 가장 많이 주고받은 친구 순서대로 보여드려요.</p>
      </div>

      <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
        {FEATURES.map((f, i) => (
          <div key={f.title} className="card" style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span
              style={{
                width: 24, height: 24, borderRadius: 12, flexShrink: 0,
                background: "var(--brand-weak)", color: "var(--brand)",
                fontSize: 13, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {i + 1}
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>{f.title}</span>
              <span className="caption">{f.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <FixedBottomCTA onClick={() => navigate({ name: "upload", step: 0 })}>내 순위 확인하기</FixedBottomCTA>
    </div>
  );
}
