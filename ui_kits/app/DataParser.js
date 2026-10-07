(function () {
  // ── Instagram JSON parser ──────────────────────────────────────────
  // Instagram encodes non-ASCII as UTF-8 bytes stored as Latin-1 chars.
  function fixInstaEncoding(str) {
    if (!str) return str;
    try { return decodeURIComponent(escape(str)); } catch { return str; }
  }

  const INSTA_PLACEHOLDER = "Instagram 사용자";

  // folderName: ZIP 내 폴더명 (예: "john_smith_123456789") — 삭제 계정 fallback용
  function parseInstagram(data, folderName) {
    // 그룹DM: 참여자 3명 이상 → 스킵
    if (data.participants && data.participants.length > 2) return null;

    const title = fixInstaEncoding(data.title || null);

    // 폴더명 끝의 숫자 ID 제거: "john_smith_123456789" → "john_smith"
    const folderBase = folderName ? folderName.replace(/_\d+$/, "") : null;
    // "instagramsayongja" 폴더 = 삭제/비활성화 계정, 식별 불가
    const folderDisplay = (folderBase && folderBase !== "instagramsayongja") ? folderBase : null;

    // title이 placeholder이면 사용 안 함
    const usableTitle = (title && title !== INSTA_PLACEHOLDER) ? title : null;
    const fallback = usableTitle || folderDisplay;

    // 이름을 전혀 특정할 수 없는 계정 → 스킵
    if (!fallback) return null;

    const counts = {};
    // 월별 메시지 수 (key: monthIndex) — 기간별 랭킹 계산용
    const months = {};
    if (data.messages && Array.isArray(data.messages)) {
      for (const msg of data.messages) {
        if (!msg.sender_name) continue;
        let name = fixInstaEncoding(msg.sender_name);
        if (name === INSTA_PLACEHOLDER) name = fallback;
        counts[name] = (counts[name] || 0) + 1;
        if (msg.timestamp_ms) {
          const m = monthIndex(msg.timestamp_ms);
          months[m] = (months[m] || 0) + 1;
        }
      }
    }

    const rawMyName = data.participants?.[0]?.name || null;
    const myName = fixInstaEncoding(rawMyName);

    return { counts, months, myName, title };
  }

  function monthIndex(ts) {
    const d = new Date(ts);
    return d.getFullYear() * 12 + d.getMonth();
  }

  // 대화방 하나의 결과를 친구별 누적 데이터에 합침
  // instaData[friend] = { total, months: { [monthIndex]: count } }
  function addConversation(instaData, friendName, result) {
    const entry = instaData[friendName] || (instaData[friendName] = { total: 0, months: {} });
    entry.total += Object.values(result.counts).reduce((a, b) => a + b, 0);
    for (const m in result.months) {
      entry.months[m] = (entry.months[m] || 0) + result.months[m];
    }
  }

  // ── Rank ───────────────────────────────────────────────────────────
  const RANK_MEDALS = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

  // months: 기준 월 포함 최근 N개월 (null = 전체)
  const PERIODS = [
    { key: "recent", label: "최근 3개월", topLabel: "요즘 최애", months: 3 },
    { key: "year",   label: "최근 1년",   topLabel: "1년간 최애", months: 12 },
    { key: "all",    label: "전체",       topLabel: "역대 최애", months: null },
  ];

  function countInPeriod(entry, months, refMonth) {
    if (!months) return entry.total;
    const from = refMonth - months + 1;
    let n = 0;
    for (const m in entry.months) if (+m >= from) n += entry.months[m];
    return n;
  }

  function computeRankings(instaData, myName, months, refMonth) {
    const counts = {};
    for (const name of Object.keys(instaData || {})) {
      if (name === myName) continue;
      const n = countInPeriod(instaData[name], months, refMonth);
      if (n > 0) counts[name] = n;
    }

    const names = Object.keys(counts);
    const max = Math.max(1, ...names.map(n => counts[n]));

    return names
      .sort((a, b) => counts[b] - counts[a])
      .map((name, i) => ({
        rank: i + 1,
        medal: RANK_MEDALS[i] || `${i + 1}`,
        name,
        score: Math.round((counts[name] / max) * 100),
        instaCount: counts[name],
        kakaoCount: 0,
        avgResponseMin: null,
      }));
  }

  // 기준 월 = 데이터에서 가장 최근 메시지가 있는 달 (내보내기 시점 기준)
  function computeAllRankings(instaData, myName) {
    let refMonth = -Infinity;
    for (const entry of Object.values(instaData || {})) {
      for (const m in entry.months) if (+m > refMonth) refMonth = +m;
    }
    const byPeriod = {};
    for (const p of PERIODS) {
      byPeriod[p.key] = computeRankings(instaData, myName, p.months, refMonth);
    }
    return byPeriod;
  }

  // ── Demo data fallback ─────────────────────────────────────────────
  function getDemoData() {
    const insta = { 김민지: 987, 이준호: 842, 박서연: 761, 최다인: 698, 정하늘: 512, 홍성진: 401, 류지원: 312 };
    return { insta };
  }

  window.DataParser = { parseInstagram, addConversation, computeAllRankings, PERIODS, getDemoData };
})();
