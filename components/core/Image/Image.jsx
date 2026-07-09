import React from "react";

/**
 * Image — the wireframe's 2-variant "Image" component set (Shape:
 * round / square), used as an avatar or thumbnail placeholder. No
 * photography exists in the source, so this renders a soft violet
 * gradient fill + initials, matching the wireframe's own placeholder
 * intent (it also just showed "Aa").
 */
export function Image({ shape = "round", size = 64, initials = "친", style }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        minWidth: 40,
        minHeight: 40,
        borderRadius: shape === "round" ? "var(--radius-pill)" : "var(--radius-md)",
        background: "var(--gradient-mint-violet)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: "var(--shadow-inset-soft)",
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: Math.max(11, size * 0.32),
          color: "var(--text-inverse)",
          letterSpacing: 0.5,
        }}
      >
        {initials}
      </span>
    </div>
  );
}
