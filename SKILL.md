---
name: choeaechingurangking-design
description: Use this skill to generate well-branded interfaces and assets for 최애친구랭킹 (Choe-ae Chingu Ranking — "My Ult-Bias Friend Ranking"), a Korean friend-ranking/share-card social utility, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Quick orientation:
- `readme.md` — company/product context, content voice, visual foundations, iconography.
- `tokens/` — colors, typography, spacing, radii, shadows, motion, fonts (Google Fonts substitutes — see font-substitution flag in readme).
- `components/` — Button (7 variants), Image (avatar placeholder, 2 shapes), Input (11 types), SharedHeader, SharedSidebar.
- `ui_kits/app/` — full click-through recreation of the product loop (온보딩 → 업로드 → 분석 중 → 대시보드 → TOP 5 → 공유 카드 → 마이페이지).
- The signature visual motif is a "포토카드(포카)" holographic gradient card — reserve it for share-card / rank-#1 moments only, never everyday UI chrome.
