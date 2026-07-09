import React, { useState } from "react";

const iconProps = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" };

const Chevron = () => <svg {...iconProps}><polyline points="6 9 12 15 18 9" /></svg>;
const Check = () => <svg {...iconProps} strokeWidth={3}><polyline points="20 6 9 17 4 12" /></svg>;
const Search = () => <svg {...iconProps}><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
const Eye = () => <svg {...iconProps}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>;

const fieldBase = {
  fontFamily: "var(--font-body)",
  fontSize: 14,
  color: "var(--text-primary)",
  background: "var(--surface-card)",
  border: "none",
  boxShadow: "var(--shadow-inset-strong)",
  borderRadius: "var(--radius-md)",
  padding: "10px 14px",
  boxSizing: "border-box",
  width: "100%",
  outline: "none",
};

function Wrapper({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
      {label ? <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "var(--text-secondary)" }}>{label}</span> : null}
      {children}
    </div>
  );
}

/**
 * Input — the wireframe's 11-variant "InputType" component set,
 * collapsed into one component with a `type` prop. Sizes/paddings
 * mirror the source's select-box geometry (38px field height,
 * 12px/8px padding, 4-14px radius scaled up).
 */
export function Input({ type = "text", label, placeholder = "", value, onChange, options = [], checked = false, style }) {
  const [focus, setFocus] = useState(false);
  const focusStyle = focus ? { boxShadow: "var(--shadow-focus-ring), var(--shadow-inset-strong)" } : {};

  if (type === "text" || type === "password") {
    const [show, setShow] = useState(false);
    return (
      <Wrapper label={label}>
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={type === "password" && !show ? "password" : "text"}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            style={{ ...fieldBase, ...focusStyle, paddingRight: type === "password" ? 36 : 14, ...style }}
          />
          {type === "password" && (
            <button type="button" onClick={() => setShow((s) => !s)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer", display: "flex" }}>
              <Eye />
            </button>
          )}
        </div>
      </Wrapper>
    );
  }

  if (type === "search") {
    return (
      <Wrapper label={label}>
        <div style={{ position: "relative", width: "100%" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)", display: "flex" }}><Search /></span>
          <input placeholder={placeholder || "검색"} value={value} onChange={onChange}
            onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
            style={{ ...fieldBase, ...focusStyle, paddingLeft: 34, ...style }} />
        </div>
      </Wrapper>
    );
  }

  if (type === "area") {
    return (
      <Wrapper label={label}>
        <textarea placeholder={placeholder} value={value} onChange={onChange} rows={3}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ ...fieldBase, ...focusStyle, resize: "vertical", fontFamily: "var(--font-body)", ...style }} />
      </Wrapper>
    );
  }

  if (type === "select") {
    return (
      <Wrapper label={label}>
        <div style={{ ...fieldBase, ...focusStyle, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", ...style }}
          onClick={() => setFocus((f) => !f)}>
          <span style={{ color: value ? "var(--text-primary)" : "var(--text-tertiary)" }}>{value || placeholder || "선택…"}</span>
          <span style={{ color: "var(--text-tertiary)", display: "flex" }}><Chevron /></span>
        </div>
      </Wrapper>
    );
  }

  if (type === "check" || type === "check-on") {
    const on = type === "check-on" || checked;
    return (
      <label style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-primary)" }}>
        <span style={{
          width: 20, height: 20, borderRadius: "var(--radius-sm)", flexShrink: 0,
          background: on ? "var(--color-primary)" : "var(--surface-card)",
          boxShadow: on ? "none" : "var(--shadow-inset-strong)",
          color: "var(--text-inverse)", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background var(--duration-base) var(--ease-out)",
        }}>{on && <Check />}</span>
        {label}
      </label>
    );
  }

  if (type === "radio" || type === "radio-on") {
    const on = type === "radio-on" || checked;
    return (
      <label style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-primary)" }}>
        <span style={{
          width: 20, height: 20, borderRadius: "var(--radius-pill)", flexShrink: 0,
          background: on ? "var(--color-primary)" : "var(--surface-card)",
          boxShadow: on ? "none" : "var(--shadow-inset-strong)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>{on && <span style={{ width: 8, height: 8, borderRadius: "var(--radius-pill)", background: "var(--text-inverse)" }} />}</span>
        {label}
      </label>
    );
  }

  if (type === "toggle" || type === "toggle-on") {
    const on = type === "toggle-on" || checked;
    return (
      <label style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-primary)" }}>
        <span style={{
          width: 40, height: 24, borderRadius: "var(--radius-pill)", position: "relative", flexShrink: 0,
          background: on ? "var(--gradient-mint-violet)" : "var(--paper-200)",
          transition: "background var(--duration-base) var(--ease-out)",
        }}>
          <span style={{
            position: "absolute", top: 3, left: on ? 19 : 3, width: 18, height: 18, borderRadius: "var(--radius-pill)",
            background: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
            transition: "left var(--duration-base) var(--ease-bounce)",
          }} />
        </span>
        {label}
      </label>
    );
  }

  return null;
}
