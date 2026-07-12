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
    if (data.messages && Array.isArray(data.messages)) {
      for (const msg of data.messages) {
        if (!msg.sender_name) continue;
        let name = fixInstaEncoding(msg.sender_name);
        if (name === INSTA_PLACEHOLDER) name = fallback;
        counts[name] = (counts[name] || 0) + 1;
      }
    }

    const rawMyName = data.participants?.[0]?.name || null;
    const myName = fixInstaEncoding(rawMyName);

    return { counts, myName, title };
  }

  // ── Rank ───────────────────────────────────────────────────────────
  const RANK_MEDALS = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

  function computeRankings(instaData, myName) {
    const insta = instaData || {};

    const names = Object.keys(insta).filter(n => n !== myName);
    const max = Math.max(1, ...names.map(n => insta[n]));

    const sorted = names
      .sort((a, b) => insta[b] - insta[a])
      .map((name, i) => ({
        rank: i + 1,
        medal: RANK_MEDALS[i] || `${i + 1}`,
        name,
        score: Math.round((insta[name] / max) * 100),
        instaCount: insta[name],
        kakaoCount: 0,
        avgResponseMin: null,
        delta: i === 0 ? "—" : i % 2 === 0 ? `▲ ${i}` : `▼ ${i - 1}`,
      }));

    return sorted;
  }

  // ── Demo data fallback ─────────────────────────────────────────────
  function getDemoData() {
    const insta = { 김민지: 987, 이준호: 842, 박서연: 761, 최다인: 698, 정하늘: 512, 홍성진: 401, 류지원: 312 };
    return { insta };
  }

  window.DataParser = { parseInstagram, computeRankings, getDemoData };
})();
