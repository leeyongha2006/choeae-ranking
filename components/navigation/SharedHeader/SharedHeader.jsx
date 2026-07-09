import React from "react";
import { Button } from "../../core/Button/Button.jsx";

/**
 * SharedHeader — top app chrome present on every authenticated
 * screen. Wordmark set in type (no logo file exists in source) +
 * primary nav (소개 / 가이드 / 마이).
 */
export function SharedHeader({ active = "" }) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "14px 28px",
        background: "var(--surface-card)",
        borderBottom: "1px solid var(--border-soft)",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: 20,
          letterSpacing: 0.2,
          background: "var(--gradient-holo)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        최애친구랭킹
      </span>
      <div style={{ flexGrow: 1 }} />
      <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {[
          { key: "intro", label: "소개" },
          { key: "guide", label: "가이드" },
          { key: "my", label: "마이" },
        ].map((item) => (
          <Button key={item.key} variant="default" size="sm" active={active === item.key}>
            {item.label}
          </Button>
        ))}
      </nav>
    </header>
  );
}
