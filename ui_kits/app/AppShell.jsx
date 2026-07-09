(function () {
const { SharedHeader, SharedSidebar } = window.DesignSystem_8db18d;
const { useState, useEffect } = React;

const TAB_ICONS = {
  home: (active) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke={active ? "var(--violet-600)" : "#94a3b8"} strokeWidth="1.5" fill={active ? "var(--violet-100)" : "none"}/>
      <path d="M7 18v-6h6v6" stroke={active ? "var(--violet-600)" : "#94a3b8"} strokeWidth="1.5"/>
    </svg>
  ),
  chart: (active) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="10" width="3" height="7" rx="1" fill={active ? "var(--violet-600)" : "#94a3b8"}/>
      <rect x="8.5" y="6" width="3" height="11" rx="1" fill={active ? "var(--violet-600)" : "#94a3b8"}/>
      <rect x="14" y="3" width="3" height="14" rx="1" fill={active ? "var(--violet-600)" : "#94a3b8"}/>
    </svg>
  ),
  trophy: (active) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M6 3h8v6a4 4 0 01-8 0V3z" stroke={active ? "var(--violet-600)" : "#94a3b8"} strokeWidth="1.5" fill={active ? "var(--violet-100)" : "none"}/>
      <path d="M4 3h2M14 3h2M4 3c0 3 1 5 2 6M16 3c0 3-1 5-2 6" stroke={active ? "var(--violet-600)" : "#94a3b8"} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 13v3M7 16h6" stroke={active ? "var(--violet-600)" : "#94a3b8"} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  share: (active) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="15" cy="4" r="2" stroke={active ? "var(--violet-600)" : "#94a3b8"} strokeWidth="1.5"/>
      <circle cx="5" cy="10" r="2" stroke={active ? "var(--violet-600)" : "#94a3b8"} strokeWidth="1.5"/>
      <circle cx="15" cy="16" r="2" stroke={active ? "var(--violet-600)" : "#94a3b8"} strokeWidth="1.5"/>
      <path d="M7 9l6-3.5M7 11l6 3.5" stroke={active ? "var(--violet-600)" : "#94a3b8"} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  user: (active) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="7" r="3.5" stroke={active ? "var(--violet-600)" : "#94a3b8"} strokeWidth="1.5" fill={active ? "var(--violet-100)" : "none"}/>
      <path d="M3 17c0-3.31 3.13-6 7-6s7 2.69 7 6" stroke={active ? "var(--violet-600)" : "#94a3b8"} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

const BOTTOM_TABS = [
  { key: "onboarding", iconKey: "home", label: "홈" },
  { key: "dashboard", iconKey: "chart", label: "결과" },
  { key: "top5", iconKey: "trophy", label: "TOP 5" },
  { key: "share", iconKey: "share", label: "공유" },
  { key: "mypage", iconKey: "user", label: "마이" },
];

function useIsMobile() {
  const [v, setV] = useState(window.innerWidth < 700);
  useEffect(() => {
    function fn() { setV(window.innerWidth < 700); }
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return v;
}

function AppShell({ activeNav = "result", activeHeader = "", onNavigate, children }) {
  const isMobile = useIsMobile();

  return (
    <div style={{
      width: "100%", minHeight: "100vh",
      display: "flex", flexDirection: "column",
      background: "var(--surface-canvas)", fontFamily: "var(--font-body)",
    }}>
      <SharedHeader active={activeHeader} />
      <div style={{ display: "flex", flex: 1, alignItems: "stretch" }}>
        {!isMobile && <SharedSidebar active={activeNav} />}
        <main style={{
          flex: 1,
          padding: isMobile ? "20px 16px" : "32px 40px",
          paddingBottom: isMobile ? 88 : undefined,
          boxSizing: "border-box",
          display: "flex", flexDirection: "column",
          gap: isMobile ? 16 : 24,
          maxWidth: isMobile ? "100%" : 1120,
          minWidth: 0,
        }}>
          {children}
        </main>
      </div>

      {isMobile && onNavigate && (
        <nav style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: "var(--surface-card)",
          borderTop: "1px solid var(--border-soft)",
          display: "flex",
          zIndex: 50,
          paddingBottom: "env(safe-area-inset-bottom, 4px)",
          boxShadow: "0 -2px 12px rgba(0,0,0,0.08)",
        }}>
          {BOTTOM_TABS.map(t => {
            const isActive = activeNav === t.key;
            return (
              <button
                key={t.key}
                onClick={() => onNavigate(t.key)}
                style={{
                  flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                  gap: 3, padding: "10px 4px 6px", background: "none", border: "none",
                  cursor: "pointer",
                  color: isActive ? "var(--violet-600)" : "#94a3b8",
                }}
              >
                {TAB_ICONS[t.iconKey](isActive)}
                <span style={{
                  fontSize: 10, fontWeight: isActive ? 700 : 500,
                  fontFamily: "var(--font-body)", letterSpacing: "-0.01em",
                  color: isActive ? "var(--violet-600)" : "#94a3b8",
                }}>{t.label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}

function SectionLabel({ children }) {
  return <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>{children}</span>;
}

function Well({ children, style }) {
  return (
    <div style={{
      background: "var(--surface-sunken)",
      boxShadow: "var(--shadow-inset-soft)",
      borderRadius: "var(--radius-lg)",
      padding: 20,
      display: "flex", flexDirection: "column", gap: 14,
      boxSizing: "border-box",
      ...style,
    }}>
      {children}
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div style={{
      background: "var(--surface-card)",
      boxShadow: "var(--shadow-card)",
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--border-soft)",
      padding: 20,
      boxSizing: "border-box",
      ...style,
    }}>
      {children}
    </div>
  );
}

window.useIsMobile = useIsMobile;
Object.assign(window, { AppShell, SectionLabel, Well, Card });
})();
