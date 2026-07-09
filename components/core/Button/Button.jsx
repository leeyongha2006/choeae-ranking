import React from "react";

/**
 * Button — the wireframe's full "Button" component set (7 variants),
 * reskinned with the holo-card visual identity. Variant meanings map
 * 1:1 onto the source Figma component (Variant=default / primary /
 * secondary / danger / chip / chip-active), plus "default-active" for
 * a selected nav/text-button state.
 */
export function Button({
  variant = "primary",
  size = "md",
  icon = null,
  disabled = false,
  active = false,
  onClick,
  children,
  style,
  ...rest
}) {
  const resolvedVariant = variant === "default" && active ? "default-active" : variant === "chip" && active ? "chip-active" : variant;

  const base = {
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    transition: "transform var(--duration-fast) var(--ease-out), box-shadow var(--duration-base) var(--ease-out), background var(--duration-base) var(--ease-out)",
    boxSizing: "border-box",
    whiteSpace: "nowrap",
  };

  const sizes = {
    sm: { fontSize: 12, padding: "6px 12px", borderRadius: "var(--radius-sm)", height: 28 },
    md: { fontSize: 14, padding: "9px 18px", borderRadius: "var(--radius-md)", height: 40 },
    lg: { fontSize: 16, padding: "12px 24px", borderRadius: "var(--radius-lg)", height: 48 },
  };

  const variants = {
    primary: {
      background: "var(--color-primary)",
      color: "var(--text-on-brand)",
      boxShadow: "var(--shadow-pop)",
    },
    secondary: {
      background: "var(--surface-card)",
      color: "var(--text-primary)",
      boxShadow: "var(--shadow-inset-strong)",
    },
    danger: {
      background: "rgba(255,77,79,0.10)",
      color: "var(--color-danger)",
      boxShadow: "inset 0 0 0 1px rgba(255,77,79,0.35)",
    },
    default: {
      background: "transparent",
      color: "var(--text-secondary)",
      padding: sizes[size].padding,
    },
    "default-active": {
      background: "var(--violet-100)",
      color: "var(--color-primary)",
    },
    chip: {
      background: "var(--surface-sunken)",
      color: "var(--text-secondary)",
      boxShadow: "var(--shadow-inset-soft)",
      borderRadius: "var(--radius-pill)",
    },
    "chip-active": {
      background: "var(--gradient-mint-violet)",
      color: "var(--text-inverse)",
      borderRadius: "var(--radius-pill)",
    },
  };

  const hoverBg = {
    primary: "var(--color-primary-hover)",
    secondary: "var(--surface-sunken)",
    danger: "rgba(255,77,79,0.16)",
    default: "var(--surface-sunken)",
    "default-active": "var(--violet-100)",
    chip: "var(--paper-200)",
    "chip-active": "var(--gradient-mint-violet)",
  };

  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);

  const merged = {
    ...base,
    ...sizes[size],
    ...variants[resolvedVariant],
    ...(hover && !disabled ? { background: hoverBg[resolvedVariant], boxShadow: resolvedVariant === "primary" ? "var(--shadow-card-hover)" : variants[resolvedVariant].boxShadow } : {}),
    transform: press && !disabled ? "scale(0.97)" : "scale(1)",
    ...style,
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={merged}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
