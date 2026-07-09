
# 최애친구랭킹 Design System

**최애친구랭킹** ("My Ult-Bias Friend Ranking") is a Korean social utility: users export their own KakaoTalk chat history (`.txt`) and Instagram data download (`.json`), upload both, and the service analyzes message volume / likes / comments to surface a **monthly TOP 5 "who did I actually talk to most"** friend ranking — then packages the result as a shareable, holographic-style **photocard** for Instagram Stories/KakaoTalk, with a short AI-generated one-line comment (Claude API) riding along. No live API integration with Kakao/Instagram — everything runs off user-exported files, which is the product's stated privacy/trust differentiator. Target users: Korean 20s–early 30s, high SNS literacy, meme-fluent.

Core loop (see `sources/user-flow.md`): 온보딩 → 파일 업로드(카카오톡/인스타그램) → 분석 중 → 랭킹 대시보드 → TOP 5 상세 → 공유 카드 생성(AI 코멘트 포함) → SNS 공유 / 마이페이지·데이터 관리.

## Sources
- Figma wireframe: **"친구랭킹 와이어프레임.fig"** (attached, mounted read-only; not a public URL). 1 page in use, 29 frames, 3 component sets (Button/Image/Input) + 2 shared symbols (SharedHeader/SharedSidebar). Structure and copy are traced from this file.
- `uploads/최애친구랭킹 서비스_유저플로우_2026-07-09.md.md` — full flow diagram (5 stages: 온보딩 / 데이터 업로드 / 랭킹 결과 / 공유 카드 / 마이페이지·설정).
- `uploads/최애친구랭킹 서비스_기능명세서_2026-07-09.md` — feature spec: 6 features, target users, scenario, KPIs, risks.

**Important note on visual direction:** the source Figma is a functional grayscale wireframe (Inter, `#1F2937` ink, hairline borders, 6px radii) — explicitly called out by the requester as "too plain to appeal to a 20s–30s audience." This design system keeps the wireframe's *information architecture, screen inventory, component inventory (Button/Image/Input variants, Shared Header/Sidebar) and copy* as ground truth, but replaces the *visual skin* with an original, youth-oriented identity: a "포토카드(포카)" holographic trading-card aesthetic (violet→pink→yellow foil), chunky Korean display type, big soft radii, and colored shadows. See VISUAL FOUNDATIONS below.

No logo file exists anywhere in the source — the wordmark is set in type (`Black Han Sans`) everywhere a mark would go. See `assets/README.md`.

**Font substitution flag:** the wireframe only specifies "Inter" (Latin, no Korean support). This system needed a real Korean type identity and picked Google Fonts substitutes — **Black Han Sans** (display), **Noto Sans KR** (UI body, standing in for Pretendard), **Gaegu** (playful accent). If the team has licensed Pretendard or another brand font, swap `tokens/fonts.css` and ask us to update.

---

## CONTENT FUNDAMENTALS

**Voice:** 발랄하고 유머러스 — playful, meme-literate, high-energy. Talks *with* the user like a close friend group chat, not a corporate service.

- **Person & formality:** casual-polite 해요체 (안녕하세요, 확인해 주세요, 알려드립니다) — friendly, never 존댓말-stiff, never banmal. First person plural for the product ("저희"), direct 당신/너 avoided — address the user implicitly ("이번 달 당신의 소통왕은 바로 이 친구!" style copy is the *maximum* directness used, and only inside a shareable, high-energy card headline).
- **Emoji: used deliberately, not decoratively.** One emoji as a punctuation/emphasis mark at the end of a headline (👑 for "you found your best friend", 🔥 for streaks), medal emoji as literal rank markers on cards (🥇🥈🥉4️⃣5️⃣), arrows for rank delta (▲▼—). Never emoji-as-bullet, never emoji spam.
- **Numbers do the bragging:** "대화 횟수 987회 · 평균 응답 6분", "하루 최대 342건 · 상위 12% 수준" — always cite a concrete count + a comparison/percentile so results feel earned, not vague.
- **Headlines are a hook, body copy is reassurance:** e.g. hero headline "내 카카오톡 대화에서 최애 친구를 찾아보세요 👑" (curiosity + payoff), immediately followed by a calm, plain-spoken subhead explaining the mechanism and reassuring on privacy ("업로드된 대화 데이터는 분석 후 즉시 삭제되며 원문은 저장되지 않아요").
- **AI comments are the one place slang/meme voice goes further** — one-liners like "이번 달 소통왕은 바로 이 친구!" — short, punchy, exclamation-friendly, written to be screenshotted.
- **Never:** guilt-trippy retention copy, dark patterns, English loanword overload, ALL CAPS shouting (except the literal product term "TOP 5", "AI" — used as-is, uppercase, no translation).

---

## VISUAL FOUNDATIONS

**Overall vibe:** Korean "포토카드(포카)" fan-culture — the physical holographic trading cards K-pop fans collect for their "최애" (ult bias) — reimagined as a friend-ranking product. Warm paper-white app surfaces in daylight UI; holographic violet→pink→yellow foil reserved for rank #1, share cards, and hero moments so it stays special instead of everywhere.

- **Color:** warm off-white canvas (`--paper-0 #FFFBF5`) + true-white cards, ink-plum text (`--ink-900 #1B1421`, warmer/softer than pure black). Brand hue is violet (`--violet-600 #7C3AED`) paired with hot pink (`--pink-500 #FF3D81`); kakao-adjacent yellow (`--yellow-400`) and mint (`--mint-400`) are sparing accents/positive-stat colors, never primary UI chrome. Rank medals use literal gold/silver/bronze tokens. Full palette: `guidelines/colors.card.html`.
- **Type:** three-tier system — `Black Han Sans` chunky poster display for hero numbers/headlines and share-card hero text; `Noto Sans KR` for all UI/body copy (clean at 12–16px, matches the wireframe's actual type scale of 11/12/14/16/20px — those sizes are preserved exactly, just re-fonted); `Gaegu` handwritten accent used only for AI-comment bubbles and small "found it!" stickers, never for structural UI. See `guidelines/type-*.card.html`.
- **Spacing:** the wireframe's 4/8/12/16/24/32px auto-layout gaps are kept verbatim as the spacing scale (`tokens/spacing.css`) — the wireframe's *rhythm* was fine, only its *skin* needed work.
- **Backgrounds:** flat warm paper for standard screens (no full-bleed photography — this is a data/utility app, not a media app); the one place backgrounds go maximal is the **share card**, which uses the holographic gradient full-bleed as its canvas, optionally with a subtle diagonal foil-sheen overlay (a soft white diagonal band at low opacity, mimicking real photocard foil) — no photographic imagery, no noise/grain textures elsewhere.
- **Corner radii:** deliberately larger than the wireframe's plain 4–6px: `--radius-md 14px` standard card, `--radius-lg 20px` for the friend-rank rows and modals, `--radius-xl 28px` for the share card itself, `--radius-pill` for chips/badges/toggle tracks. Big soft radii read as "app for hanging out," not "enterprise dashboard."
- **Shadows:** soft, *colored* shadows instead of neutral drop shadows — `--shadow-card` is a violet-tinted shadow, `--shadow-pop` a pink-tinted shadow for the primary CTA and share card, `--shadow-pop-yellow` reserved for the #1 rank medal/crown moment. No hard black shadows anywhere.
- **Borders:** thin (1px) soft-lavender hairlines (`--border-soft`) on resting cards/inputs — a direct continuation of the wireframe's hairline convention, just recolored off pure gray.
- **Hover state:** buttons/cards lift 1–2px with shadow growing from `--shadow-card` → `--shadow-card-hover`, background shifts one step darker (primary: violet-600→violet-700). Ghost/ text buttons underline or gain a faint tinted background wash — never pure opacity fade.
- **Press state:** scale down to ~0.97 with a snappier `--ease-out` timing, background steps to its darkest token (e.g. `--color-primary-press`). No color-only press feedback — the scale is what sells "tactile."
- **Motion:** short and bouncy where delight matters (`--ease-bounce`, rank-reveal, medal pop-in, card flip on share-card generation), calm ease-out for structural transitions (page/panel changes). No infinite decorative loops; nothing animates on a page that isn't responding to a user action or a one-time reveal.
- **Transparency/blur:** used only for the sticky share-card toolbar (frosted `backdrop-filter: blur(16px)` over the holo background) and modal scrims (`rgba(27,20,33,.55)`) — never as a default surface treatment.
- **Imagery color vibe:** none provided in source (this app doesn't feature user photography beyond an optional avatar/thumbnail slot) — avatars use the `Image` component's `round`/`square` shape family with a plum/violet placeholder fill + initials, exactly as the wireframe intended, just recolored.
- **Cards:** white surface, 1px soft-lavender border, `--radius-md`/`--radius-lg`, `--shadow-card` at rest → `--shadow-card-hover` + lift on hover. Sunken "well" panels (stat groups, guide steps) use `--surface-sunken` fill + inset hairline instead of a shadow, again matching the wireframe's own sunken-panel convention.

---

## ICONOGRAPHY

The wireframe defines **no icon system** — no icon font, no SVG sprite, no icon component family in its 3 component sets. It leans on emoji (👑🥇🥈🥉4️⃣5️⃣🔥) and Unicode glyphs (▲▼—, ●) as literal rank/status markers directly in text.

This system continues that pattern rather than inventing a full icon library the source never defined: **emoji-as-icon stays the primary marker system** (medal ranks, streaks, headline punctuation), and small UI chrome that genuinely needs a glyph (dropdown chevrons, checkboxes) uses **Lucide** icons loaded from CDN (`https://unpkg.com/lucide-static`) as an *intentional addition* — closest-match, single-weight, rounded-friendly stroke icon set — documented below.

**Intentional additions** (not in the source, added because the product needs them functionally):
- Lucide CDN icons for chevrons/checkmarks/close/upload glyphs in `Input` variants — the wireframe's own chevron was a raw hairline vector; Lucide's `chevron-down` is the closest-match stand-in.

---

## Index

- `styles.css` — root import list (loads everything below)
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `shadows.css`, `motion.css`, `fonts.css`
- `guidelines/` — foundation specimen cards (colors, type, spacing, shadows, motion) shown in the Design System tab
- `assets/` — no logo in source (see `assets/README.md`); avatar placeholders
- `components/`
  - `core/Button` — 7 variants: default, default-active, primary, secondary, danger, chip, chip-active
  - `core/Image` — 2 shapes: round, square (avatar/thumbnail placeholder)
  - `forms/Input` — 11 types: text, area, select, search, password, check, check-on, radio, radio-on, toggle, toggle-on
  - `navigation/SharedHeader`, `navigation/SharedSidebar` — app chrome used on every authenticated screen
- `ui_kits/app/` — click-through recreation: 온보딩 → 업로드 → 분석 중 → 랭킹 대시보드 → TOP 5 상세 → 공유 카드 → 마이페이지
- `SKILL.md` — Claude-Code-compatible skill wrapper for this design system

## Intentional additions beyond the source
- Lucide icon set (see ICONOGRAPHY)
- Display/body/accent font trio (see font substitution flag above)
- Holographic gradient + colored-shadow visual skin (explicitly requested — source wireframe visuals rejected as unappealing)
