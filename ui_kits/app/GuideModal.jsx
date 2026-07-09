(function () {
const { Button } = window.DesignSystem_8db18d;
const { useState } = React;

const KAKAO_STEPS = [
  {
    num: "1",
    emoji: "💬",
    title: "채팅방 열기",
    desc: "카카오톡 앱에서 랭킹에 포함할 친구와의 채팅방을 엽니다.",
    tip: "1:1 채팅방과 단체 채팅방 모두 지원해요.",
  },
  {
    num: "2",
    emoji: "☰",
    title: "채팅방 설정 열기",
    desc: "화면 우측 상단 ☰ 메뉴 → '채팅방 설정'을 탭합니다.",
    tip: "iPhone은 우측 상단, Android는 우측 상단 또는 하단 메뉴에 있어요.",
  },
  {
    num: "3",
    emoji: "📤",
    title: "대화 내보내기",
    desc: "'대화 내보내기'를 탭한 뒤 '내 파일에 저장' 또는 '파일로 저장'을 선택합니다.",
    tip: "미디어 포함 여부는 어떻게 선택해도 관계없어요.",
  },
  {
    num: "4",
    emoji: "📁",
    title: ".txt 파일 확인",
    desc: "저장된 KakaoTalk_날짜.txt 파일을 찾아 이 화면에 업로드하세요.",
    tip: "파일이 보이지 않으면 내 파일 앱 → Download 폴더를 확인하세요.",
  },
];

const INSTA_STEPS = [
  {
    num: "1",
    emoji: "⚙️",
    title: "설정 및 활동 열기",
    desc: "Instagram 앱 → 프로필 → 우측 상단 ☰ → '설정 및 활동'을 탭합니다.",
  },
  {
    num: "2",
    emoji: "📊",
    title: "내 활동 → 정보 다운로드",
    desc: "'내 활동' → '정보 다운로드'로 이동한 뒤 '다운로드 요청'을 탭합니다.",
    tip: "형식은 반드시 'JSON'으로 선택하세요!",
  },
  {
    num: "3",
    emoji: "📧",
    title: "이메일에서 다운로드",
    desc: "1~3일 내 Instagram에서 이메일을 보내줍니다. 링크를 눌러 ZIP 파일을 다운로드하세요.",
    tip: "스팸 폴더도 확인해보세요.",
  },
  {
    num: "4",
    emoji: "🗂️",
    title: "messages 폴더에서 파일 찾기",
    desc: "압축 해제 후 messages → inbox → 친구이름 폴더 안의 message_1.json 파일을 업로드하세요.",
    tip: "친구별로 폴더가 따로 있어요. 가장 많이 대화한 친구 파일을 올리면 돼요.",
  },
];

const ERRORS = [
  { icon: "⚠️", title: "파일 형식 오류", desc: "카카오톡은 .txt, 인스타그램은 .json 파일만 지원해요. 다른 형식은 업로드가 되지 않아요." },
  { icon: "🔤", title: "인코딩 오류 (카카오톡)", desc: "카카오톡 파일이 깨져 보인다면 저장할 때 '텍스트(.txt)' 형식으로 다시 내보내기 해보세요. UTF-8 인코딩이 필요해요." },
  { icon: "📦", title: "인스타그램 ZIP 파일 그대로 올리면 안 돼요", desc: "ZIP 압축을 먼저 풀고, 그 안의 .json 파일을 올려야 해요." },
  { icon: "⏳", title: "분석이 너무 오래 걸려요", desc: "대용량 파일(수만 건 이상)은 조금 시간이 걸릴 수 있어요. 탭을 닫지 말고 기다려 주세요." },
];

function StepCard({ step }) {
  return (
    <div style={{
      display: "flex", gap: 14, padding: "14px 16px",
      background: "var(--surface-card)", border: "1px solid var(--border-soft)",
      borderRadius: "var(--radius-md)",
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: "var(--radius-pill)", flexShrink: 0,
        background: "var(--gradient-holo)", display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 14, color: "#fff",
      }}>{step.num}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 16 }}>{step.emoji}</span>
          <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>{step.title}</span>
        </div>
        <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{step.desc}</span>
        {step.tip && (
          <span style={{ fontSize: 11, color: "var(--violet-600)", background: "var(--violet-100)", borderRadius: "var(--radius-md)", padding: "3px 8px", marginTop: 2, display: "inline-block" }}>
            💡 {step.tip}
          </span>
        )}
      </div>
    </div>
  );
}

function GuideModal({ onClose, initialTab }) {
  const [tab, setTab] = useState(initialTab || "kakao");

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(27,20,33,0.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}
      onClick={onClose}
    >
      <div
        style={{ background: "var(--surface-card)", borderRadius: "var(--radius-xl)", width: "100%", maxWidth: 600, maxHeight: "85vh", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "var(--shadow-pop)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div style={{ padding: "20px 24px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--ink-900)" }}>📋 파일 내보내기 가이드</span>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "var(--text-tertiary)", lineHeight: 1 }}>✕</button>
        </div>

        {/* 탭 */}
        <div style={{ display: "flex", gap: 8, padding: "16px 24px 0" }}>
          {[{ key: "kakao", label: "💬 카카오톡" }, { key: "insta", label: "📷 인스타그램" }, { key: "error", label: "⚠️ 오류 해결" }].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                padding: "8px 16px", borderRadius: "var(--radius-pill)", border: "none", cursor: "pointer",
                fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 700,
                background: tab === t.key ? "var(--gradient-holo)" : "var(--surface-sunken)",
                color: tab === t.key ? "#fff" : "var(--text-secondary)",
              }}
            >{t.label}</button>
          ))}
        </div>

        {/* 본문 */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
          {tab === "kakao" && (
            <>
              <div style={{ padding: "10px 14px", background: "var(--yellow-100)", borderRadius: "var(--radius-md)", fontSize: 12, color: "var(--ink-700)" }}>
                📱 카카오톡 채팅방 하나씩 내보내기 해야 해요. 여러 채팅방 파일을 올리면 더 정확한 랭킹이 나와요!
              </div>
              {KAKAO_STEPS.map(s => <StepCard key={s.num} step={s} />)}
            </>
          )}
          {tab === "insta" && (
            <>
              <div style={{ padding: "10px 14px", background: "var(--mint-100)", borderRadius: "var(--radius-md)", fontSize: 12, color: "var(--ink-700)" }}>
                ⏰ 인스타그램 데이터 요청 후 최대 3일이 걸릴 수 있어요. 미리 신청해두세요!
              </div>
              {INSTA_STEPS.map(s => <StepCard key={s.num} step={s} />)}
            </>
          )}
          {tab === "error" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {ERRORS.map(e => (
                <div key={e.title} style={{ padding: "14px 16px", background: "var(--surface-sunken)", borderRadius: "var(--radius-md)", display: "flex", gap: 12 }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{e.icon}</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 13, color: "var(--text-primary)" }}>{e.title}</span>
                    <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{e.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ padding: "12px 24px 20px", borderTop: "1px solid var(--border-soft)", display: "flex", justifyContent: "flex-end" }}>
          <Button variant="primary" onClick={onClose}>확인했어요!</Button>
        </div>
      </div>
    </div>
  );
}

window.GuideModal = GuideModal;
})();
