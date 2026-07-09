import React from "react";
import { Button } from "../../core/Button/Button.jsx";

const items = [
  { key: "upload", label: "업로드", emoji: "📤" },
  { key: "result", label: "결과", emoji: "🏆" },
  { key: "share", label: "공유카드", emoji: "💌" },
  { key: "my", label: "마이", emoji: "🙋" },
  { key: "policy", label: "정책", emoji: "📄" },
];

/**
 * SharedSidebar — left nav present on every authenticated screen.
 * Item set matches the wireframe exactly (업로드/결과/공유카드/마이/정책);
 * emoji leads are an intentional addition matching the brand's
 * emoji-as-icon convention (see readme ICONOGRAPHY).
 */
export function SharedSidebar({ active = "result" }) {
  return (
    <aside
      style={{
        width: 220,
        background: "var(--surface-sunken)",
        borderRight: "1px solid var(--border-soft)",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        boxSizing: "border-box",
        height: "100%",
      }}
    >
      <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)", letterSpacing: 0.4, textTransform: "uppercase" }}>메뉴</span>
      <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {items.map((item) => (
          <Button
            key={item.key}
            variant="default"
            active={active === item.key}
            icon={<span style={{ fontSize: 14 }}>{item.emoji}</span>}
            style={{ justifyContent: "flex-start", width: "100%", borderRadius: "var(--radius-md)", padding: "9px 12px" }}
          >
            {item.label}
          </Button>
        ))}
      </nav>
    </aside>
  );
}
