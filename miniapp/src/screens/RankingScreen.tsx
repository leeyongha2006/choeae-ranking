import { useState } from "react";
import { Button, FixedBottomCTA, SegmentedControl } from "@toss/tds-mobile";
import Sheet from "../components/Sheet";
import { displayNames, PERIODS, type PeriodKey, type RankedFriend } from "../lib/parser";
import { PRICE, requestUnlockPayment } from "../lib/payment";
import type { SavedResult } from "../lib/storage";
import type { Navigate } from "../router";

const FREE_COUNT = 3;

interface Props {
  result: SavedResult;
  isPaid: boolean;
  navigate: Navigate;
  onPeriodChange: (p: PeriodKey) => void;
  onUnlock: () => void;
  onDelete: () => void;
}

export default function RankingScreen({ result, isPaid, navigate, onPeriodChange, onUnlock, onDelete }: Props) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [sheet, setSheet] = useState<"paywall" | "delete" | null>(null);
  const [payMessage, setPayMessage] = useState("");

  const period = PERIODS.find((p) => p.key === result.period) ?? PERIODS[0];
  const ranking = result.rankingsByPeriod[period.key];
  const visible = isPaid ? ranking : ranking.slice(0, FREE_COUNT);
  const lockedCount = Math.max(0, ranking.length - FREE_COUNT);
  const periodTotal = ranking.reduce((s, f) => s + f.count, 0);
  const names = displayNames(ranking);

  async function handlePay() {
    setPayMessage("");
    const res = await requestUnlockPayment();
    if (res.ok) {
      onUnlock();
      setSheet(null);
    } else if (res.reason === "NOT_READY") {
      setPayMessage("결제 기능은 준비 중이에요.");
    } else if (res.reason === "FAILED") {
      setPayMessage("결제에 실패했어요. 잠시 후 다시 시도해 주세요.");
    }
  }

  return (
    <div className="page">
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span className="eyebrow">인스타그램 DM 분석</span>
        <h1 className="title">내 최애 친구 랭킹</h1>
        <p className="caption">{formatDate(result.analyzedAt)} 분석</p>
      </div>

      <SegmentedControl value={period.key} onChange={(v) => { setOpenKey(null); onPeriodChange(v as PeriodKey); }}>
        {PERIODS.map((p) => (
          <SegmentedControl.Item key={p.key} value={p.key}>
            {p.label}
          </SegmentedControl.Item>
        ))}
      </SegmentedControl>

      <div className="card" style={{ display: "flex", justifyContent: "space-around", textAlign: "center", padding: "16px 8px" }}>
        <Stat value={periodTotal.toLocaleString()} label="대화 수" />
        <Divider />
        <Stat value={ranking[0] ? names[ranking[0].key] : "-"} label={period.topLabel} highlight />
        <Divider />
        <Stat value={`${ranking.length}명`} label="대화한 친구" />
      </div>

      {ranking.length === 0 ? (
        <p className="desc" style={{ textAlign: "center", padding: "32px 0" }}>
          {period.label} 동안 주고받은 DM이 없어요.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {visible.map((f) => (
            <RankRow
              key={f.key}
              f={f}
              name={names[f.key]}
              periodLabel={period.label}
              isPaid={isPaid}
              open={openKey === f.key}
              onToggle={() => setOpenKey((prev) => (prev === f.key ? null : f.key))}
            />
          ))}

          {!isPaid && lockedCount > 0 && (
            <button
              onClick={() => setSheet("paywall")}
              style={{
                display: "flex", alignItems: "center", gap: 12, textAlign: "left",
                padding: "18px", marginTop: 4, cursor: "pointer",
                background: "var(--bg-sub-2)", border: "1px dashed var(--text-4)", borderRadius: "var(--radius-m)",
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>
                  {FREE_COUNT + 1}위부터 {FREE_COUNT + lockedCount}위까지 보기
                </div>
                <div className="caption" style={{ marginTop: 2 }}>나머지 친구 {lockedCount}명의 순위가 가려져 있어요</div>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: "var(--brand)" }}>열기</span>
            </button>
          )}
        </div>
      )}

      {ranking.length > 0 && (
        <Awards ranking={ranking} names={names} periodLabel={period.label} isPaid={isPaid} onLocked={() => setSheet("paywall")} />
      )}

      <div style={{ display: "flex", justifyContent: "center", gap: 4 }}>
        <button className="text-button" onClick={() => navigate({ name: "upload", step: 0 })}>다시 분석하기</button>
        <button className="text-button" onClick={() => setSheet("delete")}>분석 결과 삭제</button>
      </div>

      <FixedBottomCTA onClick={() => navigate({ name: "share" })}>공유 카드 만들기</FixedBottomCTA>

      <Sheet open={sheet === "paywall"} onClose={() => setSheet(null)}>
        <h2 className="title" style={{ fontSize: 22 }}>전체 랭킹과 상세 분석 보기</h2>
        <p className="desc">
          {lockedCount > 0 ? `${FREE_COUNT + 1}위부터 ${FREE_COUNT + lockedCount}위까지 전체 순위와 ` : ""}
          친구별 심야 대화·공유·답장 속도·연속 대화 분석, 어워드를 볼 수 있어요. 한 번 결제하면 계속 볼 수 있어요.
        </p>
        <div className="card" style={{ textAlign: "center", fontSize: 26, fontWeight: 700 }}>{PRICE.toLocaleString()}원</div>
        {payMessage && <p className="caption" style={{ textAlign: "center", color: "var(--brand)" }}>{payMessage}</p>}
        <Button display="full" size="large" onClick={handlePay}>{PRICE.toLocaleString()}원 결제하기</Button>
        <Button display="full" size="large" variant="weak" color="dark" onClick={() => setSheet(null)}>닫기</Button>
      </Sheet>

      <Sheet open={sheet === "delete"} onClose={() => setSheet(null)}>
        <h2 className="title" style={{ fontSize: 22 }}>분석 결과를 삭제할까요?</h2>
        <p className="desc">이 기기에 저장된 랭킹이 삭제돼요. 다시 보려면 파일을 새로 분석해야 해요.</p>
        <Button display="full" size="large" color="danger" onClick={() => { setSheet(null); onDelete(); }}>삭제하기</Button>
        <Button display="full" size="large" variant="weak" color="dark" onClick={() => setSheet(null)}>취소</Button>
      </Sheet>
    </div>
  );
}

function RankRow({ f, name, periodLabel, isPaid, open, onToggle }: {
  f: RankedFriend; name: string; periodLabel: string; isPaid: boolean; open: boolean; onToggle: () => void;
}) {
  const first = f.rank === 1;
  return (
    <div
      style={{
        borderRadius: "var(--radius-m)",
        border: first ? "1px solid #f6c3d4" : "1px solid var(--line)",
        background: first ? "var(--brand-weak)" : "var(--bg)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: 14,
          padding: first ? "20px 18px" : "14px 16px",
          background: "none", border: "none", cursor: "pointer", textAlign: "left",
        }}
      >
        <span style={{ width: 22, fontSize: first ? 20 : 16, fontWeight: 700, color: first ? "var(--brand)" : "var(--text-3)", textAlign: "center" }}>
          {f.rank}
        </span>
        <span
          style={{
            width: first ? 44 : 38, height: first ? 44 : 38, borderRadius: "50%", flexShrink: 0,
            background: "var(--brand-gradient)", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: first ? 17 : 15, fontWeight: 700,
          }}
        >
          {name.slice(0, 1)}
        </span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: "block", fontSize: first ? 19 : 16, fontWeight: 700, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {name}
          </span>
          <span style={{ display: "block", height: 4, background: first ? "#f8d5e1" : "var(--bg-sub)", borderRadius: 2, marginTop: 8, overflow: "hidden" }}>
            <span style={{ display: "block", width: `${f.score}%`, height: "100%", background: first ? "var(--brand)" : "var(--text-4)", borderRadius: 2 }} />
          </span>
        </span>
        <span style={{ textAlign: "right", flexShrink: 0 }}>
          <span style={{ display: "block", fontSize: first ? 22 : 17, fontWeight: 700, color: first ? "var(--brand)" : "var(--text)" }}>{f.score}</span>
          <span className="caption" style={{ display: "block", fontSize: 11 }}>점</span>
        </span>
      </button>
      {open && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 16px", padding: "0 18px 18px" }}>
          <Detail label={`${periodLabel} DM`} value={`${f.count.toLocaleString()}건`} hint={`나 ${f.mine.toLocaleString()} · 친구 ${f.theirs.toLocaleString()}`} />
          <Detail label="대화 균형" value={balanceLabel(f)} hint="한쪽만 보낸 대화는 점수가 낮아요" />
          {isPaid ? (
            <>
              <Detail label="심야 대화 (0~5시)" value={`${f.lateNight.toLocaleString()}건`} />
              <Detail label="공유한 게시물·릴스" value={`${f.shares.toLocaleString()}건`} />
              <Detail label="친구 평균 답장" value={f.avgReplyMin == null ? "-" : formatMinutes(f.avgReplyMin)} hint="전체 기간 기준" />
              <Detail label="최장 연속 대화" value={`${f.maxStreak}일`} hint="전체 기간 기준" />
            </>
          ) : (
            <div className="caption" style={{ gridColumn: "1 / -1" }}>
              심야 대화, 공유, 답장 속도, 연속 대화 분석은 전체 보기에서 확인할 수 있어요.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Detail({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div className="caption">{label}</div>
      <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>{value}</div>
      {hint && <div className="caption" style={{ fontSize: 11 }}>{hint}</div>}
    </div>
  );
}

function balanceLabel(f: RankedFriend) {
  const ratio = f.theirs / Math.max(1, f.mine);
  if (ratio >= 1.5) return "친구가 더 많이 보내요";
  if (ratio <= 1 / 1.5) return "내가 더 많이 보내요";
  return "비슷하게 주고받아요";
}

function formatMinutes(min: number) {
  if (min < 1) return "1분 이내";
  if (min < 60) return `${min}분`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h}시간 ${m}분` : `${h}시간`;
}

interface Award {
  title: string;
  desc: string;
  friend: RankedFriend | undefined;
  value: (f: RankedFriend) => string;
}

function pickMax(list: RankedFriend[], fn: (f: RankedFriend) => number) {
  return list.reduce<RankedFriend | undefined>((best, f) => (fn(f) > 0 && (!best || fn(f) > fn(best)) ? f : best), undefined);
}

// 어워드 — 심야·공유는 선택한 기간, 답장·연속 대화는 전체 기간 기준
function Awards({ ranking, names, periodLabel, isPaid, onLocked }: {
  ranking: RankedFriend[]; names: Record<string, string>; periodLabel: string; isPaid: boolean; onLocked: () => void;
}) {
  const fastest = ranking
    .filter((f) => f.avgReplyMin != null)
    .reduce<RankedFriend | undefined>((best, f) => (!best || f.avgReplyMin! < best.avgReplyMin! ? f : best), undefined);

  const awards = ([
    { title: "심야 대화왕", desc: `${periodLabel} · 0~5시`, friend: pickMax(ranking, (f) => f.lateNight), value: (f) => `${f.lateNight.toLocaleString()}건` },
    { title: "공유왕", desc: `${periodLabel} · 게시물·릴스`, friend: pickMax(ranking, (f) => f.shares), value: (f) => `${f.shares.toLocaleString()}건` },
    { title: "답장 요정", desc: "전체 기간 · 평균 답장", friend: fastest, value: (f) => formatMinutes(f.avgReplyMin!) },
    { title: "연속 대화왕", desc: "전체 기간 · 최장 연속", friend: pickMax(ranking, (f) => f.maxStreak), value: (f) => `${f.maxStreak}일` },
  ] satisfies Award[]).filter((a) => a.friend);

  if (awards.length === 0) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <span style={{ fontSize: 17, fontWeight: 700 }}>어워드</span>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {awards.map((a) => (
          <button
            key={a.title}
            onClick={isPaid ? undefined : onLocked}
            className="card"
            style={{ textAlign: "left", cursor: isPaid ? "default" : "pointer", display: "flex", flexDirection: "column", gap: 4, font: "inherit", color: "inherit" }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--brand)" }}>{a.title}</span>
            <span
              aria-hidden={!isPaid}
              style={{
                fontSize: 17, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                filter: isPaid ? "none" : "blur(6px)", userSelect: isPaid ? "auto" : "none",
              }}
            >
              {isPaid ? names[a.friend!.key] : "잠긴 이름"}
            </span>
            <span className="caption" style={{ fontSize: 12 }}>
              {isPaid ? a.value(a.friend!) : "열어서 확인하기"} · {a.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Stat({ value, label, highlight }: { value: string; label: string; highlight?: boolean }) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 17, fontWeight: 700, color: highlight ? "var(--brand)" : "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", padding: "0 4px" }}>
        {value}
      </div>
      <div className="caption" style={{ marginTop: 2 }}>{label}</div>
    </div>
  );
}

function Divider() {
  return <div style={{ width: 1, background: "var(--line)", margin: "4px 0" }} />;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}
