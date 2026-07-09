(function () {
  // ── KakaoTalk .txt parser ──────────────────────────────────────────
  // Handles both common export formats:
  // Format A (most common): [이름] [오전/오후 HH:MM] message
  // Format B (iOS):         YYYY년 MM월 DD일 오전/오후 HH:MM, 이름 : message
  function parseKakaoTalk(text) {
    const lines = text.split(/\r?\n/);
    const counts = {};

    const fmtA = /^\[(.+?)\]\s*\[(?:오전|오후)\s*\d+:\d+\]/;
    const fmtB = /^\d{4}년\s*\d+월\s*\d+일\s*(?:오전|오후)\s*\d+:\d+,\s*(.+?)\s*:/;

    for (const line of lines) {
      const t = line.trim();
      if (!t) continue;
      const mA = t.match(fmtA);
      if (mA) { const n = mA[1].trim(); counts[n] = (counts[n] || 0) + 1; continue; }
      const mB = t.match(fmtB);
      if (mB) { const n = mB[1].trim(); counts[n] = (counts[n] || 0) + 1; }
    }

    return counts; // { "이름": msgCount, ... }
  }

  // ── KakaoTalk multi-file parser ────────────────────────────────────
  // Each file = one friend's chat room. Extracts friend name from filename,
  // counts total messages in file as the friendship score.
  // Filename pattern: KakaoTalk_친구이름_YYYYMMDD_HHMM.txt
  function parseKakaoFile(fileName, text) {
    // Extract friend name from filename
    const nameMatch = fileName.match(/^KakaoTalk_(.+?)_\d{8}/i);
    const friendName = nameMatch ? nameMatch[1] : fileName.replace(/\.txt$/i, "");

    // Count total message lines (both sides = total interaction volume)
    const fmtA = /^\[.+?\]\s*\[(?:오전|오후)\s*\d+:\d+\]/;
    const fmtB = /^\d{4}년\s*\d+월\s*\d+일\s*(?:오전|오후)\s*\d+:\d+,\s*.+?\s*:/;
    let count = 0;
    for (const line of text.split(/\r?\n/)) {
      const t = line.trim();
      if (fmtA.test(t) || fmtB.test(t)) count++;
    }

    return { friendName, count };
  }

  // ── Instagram JSON parser ──────────────────────────────────────────
  // Handles messages (inbox/*.json), liked posts, and liked comments
  function parseInstagram(data) {
    const counts = {};

    function add(name, pts) {
      if (!name) return;
      counts[name] = (counts[name] || 0) + pts;
    }

    // DM messages: { participants, messages: [{sender_name, ...}] }
    if (data.messages && Array.isArray(data.messages)) {
      for (const msg of data.messages) add(msg.sender_name, 1);
    }

    // Liked posts: { likes_media_likes: [{title, ...}] }
    if (data.likes_media_likes) {
      for (const like of data.likes_media_likes) add(like.title, 2);
    }

    // Liked comments: { likes_comment_likes: [{title, ...}] }
    if (data.likes_comment_likes) {
      for (const like of data.likes_comment_likes) add(like.title, 1);
    }

    // Comments: { comments_media_comments: [{title, ...}] }
    if (data.comments_media_comments) {
      for (const c of data.comments_media_comments) add(c.title, 1);
    }

    return counts;
  }

  // ── Merge + rank ───────────────────────────────────────────────────
  const RANK_MEDALS = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];

  function computeRankings(kakaoData, instaData, myName) {
    const combined = {};

    for (const [name, cnt] of Object.entries(kakaoData || {})) {
      if (name === myName) continue;
      combined[name] = (combined[name] || 0) + cnt;
    }
    for (const [name, cnt] of Object.entries(instaData || {})) {
      if (name === myName) continue;
      combined[name] = (combined[name] || 0) + cnt * 2;
    }

    const sorted = Object.entries(combined)
      .sort(([, a], [, b]) => b - a)
      .map(([name, score], i) => ({
        rank: i + 1,
        medal: RANK_MEDALS[i] || `${i + 1}`,
        name,
        score,
        kakaoCount: kakaoData?.[name] || 0,
        instaCount: instaData?.[name] || 0,
        avgResponseMin: Math.floor(Math.random() * 20 + 2), // cosmetic placeholder
        delta: i === 0 ? "—" : i % 2 === 0 ? `▲ ${i}` : `▼ ${i - 1}`,
      }));

    return sorted.slice(0, 5);
  }

  // ── Demo data fallback ─────────────────────────────────────────────
  function getDemoData() {
    const kakao = { 김민지: 987, 이준호: 842, 박서연: 761, 최다인: 698, 정하늘: 512, 홍성진: 401, 류지원: 312 };
    const insta = { 김민지: 42, 박서연: 31, 이준호: 18, 최다인: 8 };
    return { kakao, insta };
  }

  window.DataParser = { parseKakaoTalk, parseKakaoFile, parseInstagram, computeRankings, getDemoData };
})();
