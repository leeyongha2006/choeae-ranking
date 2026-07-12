(function () {
const { useState, useEffect } = React;

function useIsMobile() {
  const [v, setV] = useState(window.innerWidth < 640);
  useEffect(() => {
    function fn() { setV(window.innerWidth < 640); }
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return v;
}

const NAV_TABS = [
  {
    key: "upload", label: "파일",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 15V3M7 8l5-5 5 5" stroke={active ? "#e1306c" : "#555"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke={active ? "#e1306c" : "#555"} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: "top5", label: "랭킹",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M8 21V13M12 21V9M16 21V5" stroke={active ? "#e1306c" : "#555"} strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: "share", label: "공유",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="18" cy="5" r="2.5" stroke={active ? "#e1306c" : "#555"} strokeWidth="1.8"/>
        <circle cx="6" cy="12" r="2.5" stroke={active ? "#e1306c" : "#555"} strokeWidth="1.8"/>
        <circle cx="18" cy="19" r="2.5" stroke={active ? "#e1306c" : "#555"} strokeWidth="1.8"/>
        <path d="M8.5 10.5l7-4M8.5 13.5l7 4" stroke={active ? "#e1306c" : "#555"} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
];

function AppShell({ activeNav, onNavigate, children, hideNav }) {
  const isMobile = useIsMobile();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d0d",
      display: "flex", flexDirection: "column",
      fontFamily: "var(--font-body)",
    }}>
      <main style={{
        flex: 1,
        width: "100%",
        maxWidth: 480,
        margin: "0 auto",
        padding: hideNav
          ? "24px 20px 32px"
          : isMobile
            ? "24px 18px 100px"
            : "32px 20px 100px",
        display: "flex", flexDirection: "column",
        gap: 18,
        boxSizing: "border-box",
      }}>
        {children}
      </main>

      {!hideNav && (
        <nav style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
          background: "rgba(13,13,13,0.96)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}>
          {NAV_TABS.map(t => {
            const isActive = activeNav === t.key;
            return (
              <button
                key={t.key}
                onClick={() => onNavigate(t.key)}
                style={{
                  flex: 1, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  gap: 4, padding: "12px 4px 10px",
                  background: "none", border: "none", cursor: "pointer",
                  WebkitTapHighlightColor: "transparent",
                  position: "relative",
                }}
              >
                {isActive && (
                  <div style={{
                    position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                    width: 24, height: 2, borderRadius: 99,
                    background: "linear-gradient(90deg, #f09433, #e1306c)",
                  }} />
                )}
                {t.icon(isActive)}
                <span style={{
                  fontSize: 10, fontWeight: isActive ? 700 : 500,
                  fontFamily: "var(--font-body)",
                  color: isActive ? "#e1306c" : "#555",
                  letterSpacing: "-0.01em",
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
  return (
    <span style={{
      fontFamily: "var(--font-body)", fontWeight: 700,
      fontSize: 15, color: "#fff",
    }}>{children}</span>
  );
}

function Well({ children, style }) {
  return (
    <div style={{
      background: "#161616",
      borderRadius: 16,
      padding: "16px 18px",
      display: "flex", flexDirection: "column", gap: 12,
      boxSizing: "border-box",
      border: "1px solid #1e1e1e",
      ...style,
    }}>
      {children}
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div style={{
      background: "#161616",
      borderRadius: 16,
      border: "1px solid #1e1e1e",
      padding: "18px 18px",
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
