# 최애친구랭킹 App — UI Kit

Click-through recreation of the core product loop, built from the attached wireframe's screen inventory (온보딩 → 업로드 → 분석 중 → 랭킹 대시보드 → TOP 5 상세 → 공유 카드 → 마이페이지), reskinned in the holo-photocard visual identity.

Open `index.html`. Use the pill tab bar at the top to jump between screens (a stand-in for real navigation, since this is a cosmetic click-through, not production routing).

Screens included: `OnboardingScreen`, `UploadScreen`, `AnalyzingScreen` (auto-progressing demo bar), `DashboardScreen`, `Top5Screen`, `ShareCardScreen` (live-editable card preview), `MyPageScreen` (includes a delete-account confirm modal). Shared chrome lives in `AppShell.jsx`.

Not built (out of scope for a cosmetic kit): 서비스 소개/데이터 내보내기 가이드/파일 오류 안내/랭킹 히스토리/개인정보 처리방침 — these are all content-only variants of the `Well`/`Card` pattern already shown, omitted to avoid padding the kit with repetitive screens.
