(function () {
const { Button, Input, Image } = window.DesignSystem_8db18d;
const { useState } = React;

function MyPageScreen({ onNavigate }) {
  const { AppShell, SectionLabel, Well } = window;
  const [showDelete, setShowDelete] = useState(false);
  return (
    <AppShell activeNav="mypage" activeHeader="my" onNavigate={onNavigate}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--ink-900)" }}>마이페이지</span>

      <Well>
        <SectionLabel>프로필 정보</SectionLabel>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Image shape="round" size={56} initials="민지" />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>김민지</span>
            <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>2026.03 가입</span>
          </div>
        </div>
        <Input type="text" label="닉네임" value="민지러버" onChange={() => {}} />
        <Input type="text" label="이메일" value="minji@example.com" onChange={() => {}} />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="primary">정보 수정</Button>
        </div>
      </Well>

      <SectionLabel>분석 데이터</SectionLabel>
      <Well>
        <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>내 분석 데이터 조회</span>
        <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>지금까지 수집된 분석 결과를 확인하세요</span>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="secondary" size="sm">데이터 보기</Button>
          <Button variant="danger" size="sm">삭제</Button>
        </div>
      </Well>

      <SectionLabel>서비스 정책</SectionLabel>
      <Well>
        <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>개인정보 처리방침</span>
        <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>서비스 이용약관 및 개인정보 처리에 대해 알아보세요</span>
        <Button variant="default">자세히 보기</Button>
      </Well>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="danger" onClick={() => setShowDelete(true)}>계정 탈퇴</Button>
      </div>

      {showDelete && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(27,20,33,0.55)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }} onClick={() => setShowDelete(false)}>
          <div style={{ background: "var(--surface-card)", borderRadius: "var(--radius-xl)", padding: 28, width: 340, boxShadow: "var(--shadow-pop)", display: "flex", flexDirection: "column", gap: 14 }} onClick={(e) => e.stopPropagation()}>
            <span style={{ fontWeight: 800, fontSize: 16, color: "var(--text-primary)" }}>정말 탈퇴하시겠어요? 😢</span>
            <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>계정을 삭제하면 모든 랭킹 기록과 공유 카드가 함께 사라져요.</span>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <Button variant="secondary" size="sm" onClick={() => setShowDelete(false)}>취소</Button>
              <Button variant="danger" size="sm" onClick={() => setShowDelete(false)}>탈퇴할래요</Button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

window.MyPageScreen = MyPageScreen;
})();
