/* @ds-bundle: {"format":4,"namespace":"DesignSystem_8db18d","components":[{"name":"Button","sourcePath":"components/core/Button/Button.jsx"},{"name":"Image","sourcePath":"components/core/Image/Image.jsx"},{"name":"Input","sourcePath":"components/forms/Input/Input.jsx"},{"name":"SharedHeader","sourcePath":"components/navigation/SharedHeader/SharedHeader.jsx"},{"name":"SharedSidebar","sourcePath":"components/navigation/SharedSidebar/SharedSidebar.jsx"}],"sourceHashes":{"components/core/Button/Button.jsx":"800659ea9850","components/core/Image/Image.jsx":"58c0510e0fc2","components/forms/Input/Input.jsx":"04a24e6c9b0a","components/navigation/SharedHeader/SharedHeader.jsx":"1c39aa72dac2","components/navigation/SharedSidebar/SharedSidebar.jsx":"5e50156237a3","ui_kits/app/AnalyzingScreen.jsx":"046d66e57066","ui_kits/app/App.jsx":"1845bde97cc5","ui_kits/app/AppShell.jsx":"5f5f5ce1e510","ui_kits/app/DashboardScreen.jsx":"bf8391dce181","ui_kits/app/MyPageScreen.jsx":"62dc38316a85","ui_kits/app/OnboardingScreen.jsx":"ecaac91a8b25","ui_kits/app/ShareCardScreen.jsx":"797d87ad6add","ui_kits/app/Top5Screen.jsx":"103291029adb","ui_kits/app/UploadScreen.jsx":"dc45d9563b89"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesignSystem_8db18d = window.DesignSystem_8db18d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — the wireframe's full "Button" component set (7 variants),
 * reskinned with the holo-card visual identity. Variant meanings map
 * 1:1 onto the source Figma component (Variant=default / primary /
 * secondary / danger / chip / chip-active), plus "default-active" for
 * a selected nav/text-button state.
 */
function Button({
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
    whiteSpace: "nowrap"
  };
  const sizes = {
    sm: {
      fontSize: 12,
      padding: "6px 12px",
      borderRadius: "var(--radius-sm)",
      height: 28
    },
    md: {
      fontSize: 14,
      padding: "9px 18px",
      borderRadius: "var(--radius-md)",
      height: 40
    },
    lg: {
      fontSize: 16,
      padding: "12px 24px",
      borderRadius: "var(--radius-lg)",
      height: 48
    }
  };
  const variants = {
    primary: {
      background: "var(--color-primary)",
      color: "var(--text-on-brand)",
      boxShadow: "var(--shadow-pop)"
    },
    secondary: {
      background: "var(--surface-card)",
      color: "var(--text-primary)",
      boxShadow: "var(--shadow-inset-strong)"
    },
    danger: {
      background: "rgba(255,77,79,0.10)",
      color: "var(--color-danger)",
      boxShadow: "inset 0 0 0 1px rgba(255,77,79,0.35)"
    },
    default: {
      background: "transparent",
      color: "var(--text-secondary)",
      padding: sizes[size].padding
    },
    "default-active": {
      background: "var(--violet-100)",
      color: "var(--color-primary)"
    },
    chip: {
      background: "var(--surface-sunken)",
      color: "var(--text-secondary)",
      boxShadow: "var(--shadow-inset-soft)",
      borderRadius: "var(--radius-pill)"
    },
    "chip-active": {
      background: "var(--gradient-mint-violet)",
      color: "var(--text-inverse)",
      borderRadius: "var(--radius-pill)"
    }
  };
  const hoverBg = {
    primary: "var(--color-primary-hover)",
    secondary: "var(--surface-sunken)",
    danger: "rgba(255,77,79,0.16)",
    default: "var(--surface-sunken)",
    "default-active": "var(--violet-100)",
    chip: "var(--paper-200)",
    "chip-active": "var(--gradient-mint-violet)"
  };
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const merged = {
    ...base,
    ...sizes[size],
    ...variants[resolvedVariant],
    ...(hover && !disabled ? {
      background: hoverBg[resolvedVariant],
      boxShadow: resolvedVariant === "primary" ? "var(--shadow-card-hover)" : variants[resolvedVariant].boxShadow
    } : {}),
    transform: press && !disabled ? "scale(0.97)" : "scale(1)",
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: merged
  }, rest), icon, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Image/Image.jsx
try { (() => {
/**
 * Image — the wireframe's 2-variant "Image" component set (Shape:
 * round / square), used as an avatar or thumbnail placeholder. No
 * photography exists in the source, so this renders a soft violet
 * gradient fill + initials, matching the wireframe's own placeholder
 * intent (it also just showed "Aa").
 */
function Image({
  shape = "round",
  size = 64,
  initials = "친",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
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
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: Math.max(11, size * 0.32),
      color: "var(--text-inverse)",
      letterSpacing: 0.5
    }
  }, initials));
}
Object.assign(__ds_scope, { Image });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Image/Image.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const iconProps = {
  width: 14,
  height: 14,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const Chevron = () => /*#__PURE__*/React.createElement("svg", iconProps, /*#__PURE__*/React.createElement("polyline", {
  points: "6 9 12 15 18 9"
}));
const Check = () => /*#__PURE__*/React.createElement("svg", _extends({}, iconProps, {
  strokeWidth: 3
}), /*#__PURE__*/React.createElement("polyline", {
  points: "20 6 9 17 4 12"
}));
const Search = () => /*#__PURE__*/React.createElement("svg", iconProps, /*#__PURE__*/React.createElement("circle", {
  cx: "11",
  cy: "11",
  r: "7"
}), /*#__PURE__*/React.createElement("line", {
  x1: "21",
  y1: "21",
  x2: "16.65",
  y2: "16.65"
}));
const Eye = () => /*#__PURE__*/React.createElement("svg", iconProps, /*#__PURE__*/React.createElement("path", {
  d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "3"
}));
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
  outline: "none"
};
function Wrapper({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      width: "100%"
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 12,
      fontWeight: 600,
      color: "var(--text-secondary)"
    }
  }, label) : null, children);
}

/**
 * Input — the wireframe's 11-variant "InputType" component set,
 * collapsed into one component with a `type` prop. Sizes/paddings
 * mirror the source's select-box geometry (38px field height,
 * 12px/8px padding, 4-14px radius scaled up).
 */
function Input({
  type = "text",
  label,
  placeholder = "",
  value,
  onChange,
  options = [],
  checked = false,
  style
}) {
  const [focus, setFocus] = useState(false);
  const focusStyle = focus ? {
    boxShadow: "var(--shadow-focus-ring), var(--shadow-inset-strong)"
  } : {};
  if (type === "text" || type === "password") {
    const [show, setShow] = useState(false);
    return /*#__PURE__*/React.createElement(Wrapper, {
      label: label
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: type === "password" && !show ? "password" : "text",
      placeholder: placeholder,
      value: value,
      onChange: onChange,
      onFocus: () => setFocus(true),
      onBlur: () => setFocus(false),
      style: {
        ...fieldBase,
        ...focusStyle,
        paddingRight: type === "password" ? 36 : 14,
        ...style
      }
    }), type === "password" && /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => setShow(s => !s),
      style: {
        position: "absolute",
        right: 10,
        top: "50%",
        transform: "translateY(-50%)",
        background: "none",
        border: "none",
        color: "var(--text-tertiary)",
        cursor: "pointer",
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement(Eye, null))));
  }
  if (type === "search") {
    return /*#__PURE__*/React.createElement(Wrapper, {
      label: label
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 12,
        top: "50%",
        transform: "translateY(-50%)",
        color: "var(--text-tertiary)",
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement(Search, null)), /*#__PURE__*/React.createElement("input", {
      placeholder: placeholder || "검색",
      value: value,
      onChange: onChange,
      onFocus: () => setFocus(true),
      onBlur: () => setFocus(false),
      style: {
        ...fieldBase,
        ...focusStyle,
        paddingLeft: 34,
        ...style
      }
    })));
  }
  if (type === "area") {
    return /*#__PURE__*/React.createElement(Wrapper, {
      label: label
    }, /*#__PURE__*/React.createElement("textarea", {
      placeholder: placeholder,
      value: value,
      onChange: onChange,
      rows: 3,
      onFocus: () => setFocus(true),
      onBlur: () => setFocus(false),
      style: {
        ...fieldBase,
        ...focusStyle,
        resize: "vertical",
        fontFamily: "var(--font-body)",
        ...style
      }
    }));
  }
  if (type === "select") {
    return /*#__PURE__*/React.createElement(Wrapper, {
      label: label
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...fieldBase,
        ...focusStyle,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        ...style
      },
      onClick: () => setFocus(f => !f)
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: value ? "var(--text-primary)" : "var(--text-tertiary)"
      }
    }, value || placeholder || "선택…"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-tertiary)",
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement(Chevron, null))));
  }
  if (type === "check" || type === "check-on") {
    const on = type === "check-on" || checked;
    return /*#__PURE__*/React.createElement("label", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        fontFamily: "var(--font-body)",
        fontSize: 14,
        color: "var(--text-primary)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 20,
        height: 20,
        borderRadius: "var(--radius-sm)",
        flexShrink: 0,
        background: on ? "var(--color-primary)" : "var(--surface-card)",
        boxShadow: on ? "none" : "var(--shadow-inset-strong)",
        color: "var(--text-inverse)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background var(--duration-base) var(--ease-out)"
      }
    }, on && /*#__PURE__*/React.createElement(Check, null)), label);
  }
  if (type === "radio" || type === "radio-on") {
    const on = type === "radio-on" || checked;
    return /*#__PURE__*/React.createElement("label", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        fontFamily: "var(--font-body)",
        fontSize: 14,
        color: "var(--text-primary)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 20,
        height: 20,
        borderRadius: "var(--radius-pill)",
        flexShrink: 0,
        background: on ? "var(--color-primary)" : "var(--surface-card)",
        boxShadow: on ? "none" : "var(--shadow-inset-strong)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, on && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: "var(--radius-pill)",
        background: "var(--text-inverse)"
      }
    })), label);
  }
  if (type === "toggle" || type === "toggle-on") {
    const on = type === "toggle-on" || checked;
    return /*#__PURE__*/React.createElement("label", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
        fontFamily: "var(--font-body)",
        fontSize: 14,
        color: "var(--text-primary)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 40,
        height: 24,
        borderRadius: "var(--radius-pill)",
        position: "relative",
        flexShrink: 0,
        background: on ? "var(--gradient-mint-violet)" : "var(--paper-200)",
        transition: "background var(--duration-base) var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 3,
        left: on ? 19 : 3,
        width: 18,
        height: 18,
        borderRadius: "var(--radius-pill)",
        background: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
        transition: "left var(--duration-base) var(--ease-bounce)"
      }
    })), label);
  }
  return null;
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input/Input.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SharedHeader/SharedHeader.jsx
try { (() => {
/**
 * SharedHeader — top app chrome present on every authenticated
 * screen. Wordmark set in type (no logo file exists in source) +
 * primary nav (소개 / 가이드 / 마이).
 */
function SharedHeader({
  active = ""
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 20,
      padding: "14px 28px",
      background: "var(--surface-card)",
      borderBottom: "1px solid var(--border-soft)",
      width: "100%",
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 20,
      letterSpacing: 0.2,
      background: "var(--gradient-holo)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    }
  }, "\uCD5C\uC560\uCE5C\uAD6C\uB7AD\uD0B9"), /*#__PURE__*/React.createElement("div", {
    style: {
      flexGrow: 1
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, [{
    key: "intro",
    label: "소개"
  }, {
    key: "guide",
    label: "가이드"
  }, {
    key: "my",
    label: "마이"
  }].map(item => /*#__PURE__*/React.createElement(__ds_scope.Button, {
    key: item.key,
    variant: "default",
    size: "sm",
    active: active === item.key
  }, item.label))));
}
Object.assign(__ds_scope, { SharedHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SharedHeader/SharedHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SharedSidebar/SharedSidebar.jsx
try { (() => {
const items = [{
  key: "upload",
  label: "업로드",
  emoji: "📤"
}, {
  key: "result",
  label: "결과",
  emoji: "🏆"
}, {
  key: "share",
  label: "공유카드",
  emoji: "💌"
}, {
  key: "my",
  label: "마이",
  emoji: "🙋"
}, {
  key: "policy",
  label: "정책",
  emoji: "📄"
}];

/**
 * SharedSidebar — left nav present on every authenticated screen.
 * Item set matches the wireframe exactly (업로드/결과/공유카드/마이/정책);
 * emoji leads are an intentional addition matching the brand's
 * emoji-as-icon convention (see readme ICONOGRAPHY).
 */
function SharedSidebar({
  active = "result"
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 220,
      background: "var(--surface-sunken)",
      borderRight: "1px solid var(--border-soft)",
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      boxSizing: "border-box",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 12,
      fontWeight: 700,
      color: "var(--text-tertiary)",
      letterSpacing: 0.4,
      textTransform: "uppercase"
    }
  }, "\uBA54\uB274"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, items.map(item => /*#__PURE__*/React.createElement(__ds_scope.Button, {
    key: item.key,
    variant: "default",
    active: active === item.key,
    icon: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14
      }
    }, item.emoji),
    style: {
      justifyContent: "flex-start",
      width: "100%",
      borderRadius: "var(--radius-md)",
      padding: "9px 12px"
    }
  }, item.label))));
}
Object.assign(__ds_scope, { SharedSidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SharedSidebar/SharedSidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/AnalyzingScreen.jsx
try { (() => {
(function () {
  const {
    Button
  } = window.DesignSystem_8db18d;
  const {
    useEffect,
    useState
  } = React;
  function AnalyzingScreen({
    onNavigate
  }) {
    const {
      AppShell,
      SectionLabel,
      Well
    } = window;
    const [pct, setPct] = useState(12);
    useEffect(() => {
      const t = setInterval(() => setPct(p => p >= 96 ? 96 : p + Math.round(Math.random() * 9 + 3)), 450);
      return () => clearInterval(t);
    }, []);
    return /*#__PURE__*/React.createElement(AppShell, {
      activeNav: "upload"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: 28,
        color: "var(--ink-900)"
      }
    }, "\uBD84\uC11D \uC9C4\uD589 \uC911\uC785\uB2C8\uB2E4"), /*#__PURE__*/React.createElement(Well, null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 15,
        color: "var(--text-primary)"
      }
    }, "\uC548\uB155\uD558\uC138\uC694! \uC5C5\uB85C\uB4DC\uD558\uC2E0 \uB370\uC774\uD130\uB97C \uC5F4\uC2EC\uD788 \uBD84\uC11D\uD558\uACE0 \uC788\uC5B4\uC694 \uD83D\uDD0D"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-secondary)"
      }
    }, "\uC7A0\uC2DC\uB9CC \uAE30\uB2E4\uB824\uC8FC\uC138\uC694.")), /*#__PURE__*/React.createElement(Well, null, /*#__PURE__*/React.createElement(SectionLabel, null, "\uCC98\uB9AC \uC9C4\uD589\uB960"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: 14,
        borderRadius: "var(--radius-pill)",
        background: "var(--paper-200)",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${pct}%`,
        height: "100%",
        background: "var(--gradient-mint-violet)",
        borderRadius: "var(--radius-pill)",
        transition: "width 400ms var(--ease-out)"
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 15,
        color: "var(--text-primary)",
        minWidth: 42,
        textAlign: "right"
      }
    }, pct, "%"))), /*#__PURE__*/React.createElement(Well, null, [{
      label: "친구 목록 파싱 완료",
      done: true
    }, {
      label: "상호작용 분석 중...",
      done: pct > 40
    }, {
      label: "순위 계산 대기 중",
      done: pct >= 96
    }].map(s => /*#__PURE__*/React.createElement("div", {
      key: s.label,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: 13,
        color: s.done ? "var(--text-primary)" : "var(--text-tertiary)"
      }
    }, /*#__PURE__*/React.createElement("span", null, s.done ? "✅" : "⏳"), s.label))), /*#__PURE__*/React.createElement(Well, null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-secondary)"
      }
    }, "\uD83D\uDCA1 \uD301: \uC7A0\uC2DC \uAE30\uB2E4\uB9AC\uC2DC\uB294 \uB3D9\uC548 '\uAC00\uC774\uB4DC' \uBA54\uB274\uC5D0\uC11C \uBD84\uC11D \uACB0\uACFC\uB97C \uC5B4\uB5BB\uAC8C \uD65C\uC6A9\uD560 \uC218 \uC788\uB294\uC9C0 \uBBF8\uB9AC \uD655\uC778\uD574\uBCF4\uC138\uC694!")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => onNavigate("dashboard")
    }, "\uACB0\uACFC \uBCF4\uB7EC\uAC00\uAE30 \u2192")));
  }
  window.AnalyzingScreen = AnalyzingScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/AnalyzingScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/App.jsx
try { (() => {
(function () {
  const {
    useState
  } = React;
  const SCREENS = {
    onboarding: () => window.OnboardingScreen,
    upload: () => window.UploadScreen,
    analyzing: () => window.AnalyzingScreen,
    dashboard: () => window.DashboardScreen,
    top5: () => window.Top5Screen,
    share: () => window.ShareCardScreen,
    mypage: () => window.MyPageScreen
  };
  const TABS = [{
    key: "onboarding",
    label: "온보딩"
  }, {
    key: "upload",
    label: "업로드"
  }, {
    key: "analyzing",
    label: "분석 중"
  }, {
    key: "dashboard",
    label: "대시보드"
  }, {
    key: "top5",
    label: "TOP 5"
  }, {
    key: "share",
    label: "공유 카드"
  }, {
    key: "mypage",
    label: "마이페이지"
  }];
  function App() {
    const [screen, setScreen] = useState("onboarding");
    const Screen = SCREENS[screen]();
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 4,
        padding: "10px 16px",
        background: "var(--ink-900)",
        overflowX: "auto",
        position: "sticky",
        top: 0,
        zIndex: 20
      }
    }, TABS.map(t => /*#__PURE__*/React.createElement("button", {
      key: t.key,
      onClick: () => setScreen(t.key),
      style: {
        fontFamily: "var(--font-body)",
        fontSize: 12,
        fontWeight: 700,
        padding: "7px 14px",
        borderRadius: "var(--radius-pill)",
        border: "none",
        cursor: "pointer",
        whiteSpace: "nowrap",
        background: screen === t.key ? "var(--gradient-mint-violet)" : "rgba(255,255,255,0.08)",
        color: "#fff"
      }
    }, t.label))), /*#__PURE__*/React.createElement(Screen, {
      onNavigate: setScreen
    }));
  }
  window.App = App;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/AppShell.jsx
try { (() => {
(function () {
  const {
    SharedHeader,
    SharedSidebar
  } = window.DesignSystem_8db18d;
  function AppShell({
    activeNav = "result",
    activeHeader = "",
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--surface-canvas)",
        fontFamily: "var(--font-body)"
      }
    }, /*#__PURE__*/React.createElement(SharedHeader, {
      active: activeHeader
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flex: 1,
        alignItems: "stretch"
      }
    }, /*#__PURE__*/React.createElement(SharedSidebar, {
      active: activeNav
    }), /*#__PURE__*/React.createElement("main", {
      style: {
        flex: 1,
        padding: "32px 40px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 24,
        maxWidth: 1120
      }
    }, children)));
  }
  function SectionLabel({
    children
  }) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-body)",
        fontWeight: 700,
        fontSize: 16,
        color: "var(--text-primary)"
      }
    }, children);
  }
  function Well({
    children,
    style
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--surface-sunken)",
        boxShadow: "var(--shadow-inset-soft)",
        borderRadius: "var(--radius-lg)",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        boxSizing: "border-box",
        ...style
      }
    }, children);
  }
  function Card({
    children,
    style
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--surface-card)",
        boxShadow: "var(--shadow-card)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-soft)",
        padding: 20,
        boxSizing: "border-box",
        ...style
      }
    }, children);
  }
  Object.assign(window, {
    AppShell,
    SectionLabel,
    Well,
    Card
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/DashboardScreen.jsx
try { (() => {
(function () {
  const {
    Button,
    Input,
    Image
  } = window.DesignSystem_8db18d;
  const TOP5 = [{
    rank: "🥇",
    name: "김민지",
    meta: "대화 횟수 987회 · 평균 응답 6분",
    delta: "—"
  }, {
    rank: "🥈",
    name: "이준호",
    meta: "대화 횟수 842회 · 평균 응답 11분",
    delta: "▼ 1"
  }, {
    rank: "🥉",
    name: "박서연",
    meta: "대화 횟수 761회 · 평균 응답 8분",
    delta: "▲ 2"
  }, {
    rank: "4️⃣",
    name: "최다인",
    meta: "대화 횟수 698회 · 평균 응답 15분",
    delta: "NEW"
  }, {
    rank: "5️⃣",
    name: "정하늘",
    meta: "대화 횟수 512회 · 평균 응답 20분",
    delta: "▲ 1"
  }];
  function DashboardScreen({
    onNavigate
  }) {
    const {
      AppShell,
      SectionLabel,
      Well,
      Card
    } = window;
    return /*#__PURE__*/React.createElement(AppShell, {
      activeNav: "result"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, null, "\uC774\uBC88 \uB2EC \uB7AD\uD0B9 \uACB0\uACFC"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        alignItems: "flex-end"
      }
    }, /*#__PURE__*/React.createElement(Input, {
      type: "select",
      placeholder: "\uB7AD\uD0B9 \uAE30\uC900",
      style: {
        width: 140
      }
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: () => onNavigate("top5")
    }, "TOP 5 \uC0C1\uC138 \uBCF4\uAE30"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 16,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(Well, {
      style: {
        flex: "1 1 240px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-tertiary)"
      }
    }, "2026\uB144 7\uC6D4"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-secondary)"
      }
    }, "\uCD1D \uB300\uD654 \uC0C1\uB300"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: 32,
        color: "var(--violet-600)"
      }
    }, "38\uBA85")), /*#__PURE__*/React.createElement(Card, {
      style: {
        flex: "1 1 240px",
        background: "var(--gradient-holo-soft)",
        border: "none"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--ink-700)"
      }
    }, "\uD558\uB8E8 \uCD5C\uB300 342\uAC74"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: 20,
        color: "var(--ink-900)",
        marginTop: 6
      }
    }, "\uC0C1\uC704 12% \uC218\uC900 \uD83D\uDD25"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, null, "TOP 5 \uCE5C\uAD6C \uBBF8\uB9AC\uBCF4\uAE30"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, TOP5.map(f => /*#__PURE__*/React.createElement("div", {
      key: f.name,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: "var(--surface-card)",
        border: "1px solid var(--border-soft)",
        borderRadius: "var(--radius-md)",
        padding: "10px 16px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18,
        width: 28
      }
    }, f.rank), /*#__PURE__*/React.createElement(Image, {
      shape: "round",
      size: 36,
      initials: f.name.slice(0, 1)
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 14,
        color: "var(--text-primary)"
      }
    }, f.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "var(--text-secondary)"
      }
    }, f.meta)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: f.delta.startsWith("▲") ? "var(--color-success)" : f.delta.startsWith("▼") ? "var(--color-danger)" : "var(--violet-600)"
      }
    }, f.delta))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, null, "\uC21C\uC704 \uBCC0\uB3D9 \uCD94\uC774"), /*#__PURE__*/React.createElement(Well, null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-secondary)"
      }
    }, "\uCD5C\uADFC 3\uAC1C\uC6D4 TOP 3 \uC21C\uC704 \uBCC0\uD654"), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 140,
        borderRadius: "var(--radius-md)",
        background: "var(--surface-card)",
        boxShadow: "var(--shadow-inset-soft)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-tertiary)",
        fontSize: 12
      }
    }, "\uCC28\uD2B8 \uC790\uB9AC\uD45C\uC2DC\uC790 (line chart placeholder)"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 16,
        justifyContent: "center",
        fontSize: 12,
        color: "var(--text-secondary)"
      }
    }, /*#__PURE__*/React.createElement("span", null, "\u25CF \uAE40\uBBFC\uC9C0"), /*#__PURE__*/React.createElement("span", null, "\u25CF \uC774\uC900\uD638"), /*#__PURE__*/React.createElement("span", null, "\u25CF \uBC15\uC11C\uC5F0")))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "default",
      onClick: () => onNavigate("mypage")
    }, "\uB9C8\uC774\uD398\uC774\uC9C0 / \uC124\uC815"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      onClick: () => onNavigate("top5")
    }, "TOP 5 \uC0C1\uC138 \uBD84\uC11D \uBCF4\uAE30")));
  }
  window.DashboardScreen = DashboardScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/DashboardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/MyPageScreen.jsx
try { (() => {
(function () {
  const {
    Button,
    Input,
    Image
  } = window.DesignSystem_8db18d;
  const {
    useState
  } = React;
  function MyPageScreen() {
    const {
      AppShell,
      SectionLabel,
      Well
    } = window;
    const [showDelete, setShowDelete] = useState(false);
    return /*#__PURE__*/React.createElement(AppShell, {
      activeNav: "my",
      activeHeader: "my"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: 24,
        color: "var(--ink-900)"
      }
    }, "\uB9C8\uC774\uD398\uC774\uC9C0"), /*#__PURE__*/React.createElement(Well, null, /*#__PURE__*/React.createElement(SectionLabel, null, "\uD504\uB85C\uD544 \uC815\uBCF4"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Image, {
      shape: "round",
      size: 56,
      initials: "\uBBFC\uC9C0"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 15,
        color: "var(--text-primary)"
      }
    }, "\uAE40\uBBFC\uC9C0"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-tertiary)"
      }
    }, "2026.03 \uAC00\uC785"))), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      label: "\uB2C9\uB124\uC784",
      value: "\uBBFC\uC9C0\uB7EC\uBC84",
      onChange: () => {}
    }), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      label: "\uC774\uBA54\uC77C",
      value: "minji@example.com",
      onChange: () => {}
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary"
    }, "\uC815\uBCF4 \uC218\uC815"))), /*#__PURE__*/React.createElement(SectionLabel, null, "\uBD84\uC11D \uB370\uC774\uD130"), /*#__PURE__*/React.createElement(Well, null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 14,
        color: "var(--text-primary)"
      }
    }, "\uB0B4 \uBD84\uC11D \uB370\uC774\uD130 \uC870\uD68C"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-secondary)"
      }
    }, "\uC9C0\uAE08\uAE4C\uC9C0 \uC218\uC9D1\uB41C \uBD84\uC11D \uACB0\uACFC\uB97C \uD655\uC778\uD558\uC138\uC694"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, "\uB370\uC774\uD130 \uBCF4\uAE30"), /*#__PURE__*/React.createElement(Button, {
      variant: "danger",
      size: "sm"
    }, "\uC0AD\uC81C"))), /*#__PURE__*/React.createElement(SectionLabel, null, "\uC11C\uBE44\uC2A4 \uC815\uCC45"), /*#__PURE__*/React.createElement(Well, null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 14,
        color: "var(--text-primary)"
      }
    }, "\uAC1C\uC778\uC815\uBCF4 \uCC98\uB9AC\uBC29\uCE68"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-secondary)"
      }
    }, "\uC11C\uBE44\uC2A4 \uC774\uC6A9\uC57D\uAD00 \uBC0F \uAC1C\uC778\uC815\uBCF4 \uCC98\uB9AC\uC5D0 \uB300\uD574 \uC54C\uC544\uBCF4\uC138\uC694"), /*#__PURE__*/React.createElement(Button, {
      variant: "default"
    }, "\uC790\uC138\uD788 \uBCF4\uAE30")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "danger",
      onClick: () => setShowDelete(true)
    }, "\uACC4\uC815 \uD0C8\uD1F4")), showDelete && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(27,20,33,0.55)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10
      },
      onClick: () => setShowDelete(false)
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--surface-card)",
        borderRadius: "var(--radius-xl)",
        padding: 28,
        width: 340,
        boxShadow: "var(--shadow-pop)",
        display: "flex",
        flexDirection: "column",
        gap: 14
      },
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 800,
        fontSize: 16,
        color: "var(--text-primary)"
      }
    }, "\uC815\uB9D0 \uD0C8\uD1F4\uD558\uC2DC\uACA0\uC5B4\uC694? \uD83D\uDE22"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "var(--text-secondary)"
      }
    }, "\uACC4\uC815\uC744 \uC0AD\uC81C\uD558\uBA74 \uBAA8\uB4E0 \uB7AD\uD0B9 \uAE30\uB85D\uACFC \uACF5\uC720 \uCE74\uB4DC\uAC00 \uD568\uAED8 \uC0AC\uB77C\uC838\uC694."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        justifyContent: "flex-end"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      onClick: () => setShowDelete(false)
    }, "\uCDE8\uC18C"), /*#__PURE__*/React.createElement(Button, {
      variant: "danger",
      size: "sm",
      onClick: () => setShowDelete(false)
    }, "\uD0C8\uD1F4\uD560\uB798\uC694")))));
  }
  window.MyPageScreen = MyPageScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/MyPageScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/OnboardingScreen.jsx
try { (() => {
(function () {
  const {
    Button
  } = window.DesignSystem_8db18d;
  const FEATURES = [{
    emoji: "🏆",
    title: "TOP 5 랭킹",
    desc: "카카오톡·인스타그램 소통량을 합산해 이번 달 최애 친구 TOP 5를 뽑아드려요"
  }, {
    emoji: "💌",
    title: "홀로그램 공유 카드",
    desc: "분석 결과를 예쁜 포토카드로 만들어 친구들과 공유해 보세요"
  }, {
    emoji: "🔒",
    title: "즉시 삭제",
    desc: "업로드된 대화 데이터는 분석 후 즉시 삭제되며 원문은 저장되지 않아요"
  }];
  const CHECKLIST = [{
    step: "1단계",
    title: "데이터 내보내기 가이드",
    desc: "카카오톡 대화를 내보내는 방법을 단계별로 안내해 드립니다",
    cta: "보기"
  }, {
    step: "2단계",
    title: "개인정보 동의",
    desc: "분석에 앞서 개인정보 처리 방침을 확인하고 동의해 주세요",
    cta: "확인"
  }];
  function OnboardingScreen({
    onNavigate
  }) {
    const {
      AppShell,
      SectionLabel,
      Well
    } = window;
    return /*#__PURE__*/React.createElement(AppShell, {
      activeNav: "upload",
      activeHeader: "intro"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: "center",
        textAlign: "center",
        padding: "12px 0 4px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: 32,
        color: "var(--ink-900)"
      }
    }, "\uB0B4 \uCE74\uCE74\uC624\uD1A1 \uB300\uD654\uC5D0\uC11C ", /*#__PURE__*/React.createElement("span", {
      style: {
        background: "var(--gradient-holo)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }
    }, "\uCD5C\uC560 \uCE5C\uAD6C"), "\uB97C \uCC3E\uC544\uBCF4\uC138\uC694 \uD83D\uDC51"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: "var(--text-secondary)"
      }
    }, "\uB300\uD654 \uB370\uC774\uD130\uB97C \uC5C5\uB85C\uB4DC\uD558\uBA74 AI\uAC00 \uCE5C\uBC00\uB3C4\uB97C \uBD84\uC11D\uD574 \uCE5C\uAD6C \uC21C\uC704\uB97C \uC54C\uB824\uB4DC\uB9BD\uB2C8\uB2E4"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      style: {
        marginTop: 8
      },
      onClick: () => onNavigate("upload")
    }, "\uC2DC\uC791\uD558\uAE30")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, null, "\uC8FC\uC694 \uAE30\uB2A5"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 16,
        flexWrap: "wrap"
      }
    }, FEATURES.map(f => /*#__PURE__*/React.createElement("div", {
      key: f.title,
      style: {
        flex: "1 1 260px",
        background: "var(--surface-card)",
        border: "1px solid var(--border-soft)",
        boxShadow: "var(--shadow-card)",
        borderRadius: "var(--radius-lg)",
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 24
      }
    }, f.emoji), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 14,
        color: "var(--text-primary)"
      }
    }, f.title), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-secondary)"
      }
    }, f.desc))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, null, "\uC2DC\uC791 \uC804 \uD655\uC778\uD558\uC138\uC694"), CHECKLIST.map(c => /*#__PURE__*/React.createElement(Well, {
      key: c.step,
      style: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 4,
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-tertiary)",
        fontWeight: 700
      }
    }, c.step, " \xB7 ", c.title), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "var(--text-primary)"
      }
    }, c.desc)), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, c.cta)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: "center",
        padding: "8px 0"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-secondary)"
      }
    }, "\uC11C\uBE44\uC2A4\uAC00 \uC5B4\uB5BB\uAC8C \uC791\uB3D9\uD558\uB294\uC9C0 \uB354 \uC54C\uACE0 \uC2F6\uC73C\uC2E0\uAC00\uC694?"), /*#__PURE__*/React.createElement(Button, {
      variant: "default"
    }, "\uC11C\uBE44\uC2A4 \uC18C\uAC1C \uBCF4\uAE30")));
  }
  window.OnboardingScreen = OnboardingScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/OnboardingScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/ShareCardScreen.jsx
try { (() => {
(function () {
  const {
    Button,
    Input
  } = window.DesignSystem_8db18d;
  const {
    useState
  } = React;
  const AI_COMMENTS = ["이번 달 소통왕은 바로 이 친구! 🔥", "김민지 님과의 케미, 심상치 않은데요? 👀", "대화량으로 증명된 찐우정, 부럽습니다 💜"];
  function ShareCardScreen({
    onNavigate
  }) {
    const {
      AppShell,
      SectionLabel,
      Well
    } = window;
    const [title, setTitle] = useState("이번 달 나의 최애 친구는?");
    const [nickname, setNickname] = useState("민지러버");
    const [showScore, setShowScore] = useState(true);
    const [comment, setComment] = useState(AI_COMMENTS[0]);
    return /*#__PURE__*/React.createElement(AppShell, {
      activeNav: "share"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: 24,
        color: "var(--ink-900)"
      }
    }, "\uACF5\uC720 \uCE74\uB4DC \uC0DD\uC131 \uD83D\uDC8C"), /*#__PURE__*/React.createElement(Button, {
      variant: "default",
      onClick: () => onNavigate("top5")
    }, "TOP 5 \uACB0\uACFC\uB85C \uB3CC\uC544\uAC00\uAE30")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 24,
        flexWrap: "wrap",
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
        flex: "1 1 360px"
      }
    }, /*#__PURE__*/React.createElement(Well, null, /*#__PURE__*/React.createElement(SectionLabel, null, "\uAE30\uBCF8 \uC815\uBCF4 \uC785\uB825"), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      label: "\uCE74\uB4DC \uC81C\uBAA9",
      value: title,
      onChange: e => setTitle(e.target.value)
    }), /*#__PURE__*/React.createElement(Input, {
      type: "area",
      label: "\uD55C \uC904 \uC18C\uAC1C",
      placeholder: "\uC608: \uB0B4 \uCD5C\uC560 \uCE5C\uAD6C TOP 5 \uACF5\uAC1C!"
    }), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      label: "\uACF5\uAC1C \uB2C9\uB124\uC784",
      value: nickname,
      onChange: e => setNickname(e.target.value)
    }), /*#__PURE__*/React.createElement(Input, {
      type: "select",
      label: "\uACF5\uC720 \uD50C\uB7AB\uD3FC",
      placeholder: "\uC778\uC2A4\uD0C0\uADF8\uB7A8 \uC2A4\uD1A0\uB9AC"
    })), /*#__PURE__*/React.createElement(Well, null, /*#__PURE__*/React.createElement(SectionLabel, null, "\uC0DD\uC131 \uC635\uC158 \uC124\uC815"), /*#__PURE__*/React.createElement(Input, {
      type: "select",
      label: "\uBC30\uACBD \uD14C\uB9C8",
      placeholder: "\uD640\uB85C\uADF8\uB7A8 (\uAE30\uBCF8)"
    }), /*#__PURE__*/React.createElement(Input, {
      type: "toggle-on",
      label: "\uCE5C\uAD6C \uC774\uB984 \uD45C\uC2DC"
    }), /*#__PURE__*/React.createElement(Input, {
      type: showScore ? "toggle-on" : "toggle",
      label: "\uC810\uC218 \uACF5\uAC1C",
      checked: showScore
    }), /*#__PURE__*/React.createElement(Input, {
      type: "check-on",
      label: "AI \uCF54\uBA58\uD2B8 \uD3EC\uD568"
    }), /*#__PURE__*/React.createElement(Input, {
      type: "check-on",
      label: "\uC6CC\uD130\uB9C8\uD06C \uD45C\uC2DC"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "default",
      onClick: () => setComment(AI_COMMENTS[(AI_COMMENTS.indexOf(comment) + 1) % AI_COMMENTS.length])
    }, "\uD83D\uDD04 AI \uCF54\uBA58\uD2B8 \uC7AC\uC0DD\uC131"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg"
    }, "\uCE74\uB4DC \uC774\uBBF8\uC9C0 \uB2E4\uC6B4\uB85C\uB4DC"))), /*#__PURE__*/React.createElement(Well, {
      style: {
        flex: "0 0 340px",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, null, "\uBBF8\uB9AC\uBCF4\uAE30"), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        aspectRatio: "3/4",
        borderRadius: "var(--radius-xl)",
        background: "var(--gradient-holo)",
        boxShadow: "var(--shadow-pop)",
        position: "relative",
        overflow: "hidden",
        padding: 22,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#fff"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: "-40%",
        left: "-20%",
        width: "60%",
        height: "180%",
        background: "rgba(255,255,255,.25)",
        transform: "rotate(18deg)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: 14,
        position: "relative"
      }
    }, "\uCD5C\uC560\uCE5C\uAD6C\uB7AD\uD0B9 \xB7 2026.07"), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: 44
      }
    }, "\uD83E\uDD47"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-body)",
        fontWeight: 800,
        fontSize: 20
      }
    }, title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        opacity: 0.9
      }
    }, "\uAE40\uBBFC\uC9C0 \xB7 ", showScore ? "1,847회" : "비공개", " \xB7 @", nickname), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-accent)",
        fontSize: 16,
        marginTop: 10
      }
    }, "\"", comment, "\""))), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "var(--text-tertiary)",
        textAlign: "center"
      }
    }, "\uC635\uC158\uC744 \uBCC0\uACBD\uD558\uBA74 \uBBF8\uB9AC\uBCF4\uAE30\uAC00 \uC5C5\uB370\uC774\uD2B8\uB429\uB2C8\uB2E4."))));
  }
  window.ShareCardScreen = ShareCardScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/ShareCardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Top5Screen.jsx
try { (() => {
(function () {
  const {
    Button,
    Image
  } = window.DesignSystem_8db18d;
  const RANK = [{
    rank: "🥇",
    name: "김민지",
    score: 98,
    meta: "대화 횟수 987회 · 평균 응답 6분",
    delta: "전월 대비 유지",
    color: "var(--rank-gold)"
  }, {
    rank: "🥈",
    name: "이준호",
    score: 87,
    meta: "대화 횟수 842회 · 평균 응답 11분",
    delta: "전월 대비 +1",
    color: "var(--rank-silver)"
  }, {
    rank: "🥉",
    name: "박서연",
    score: 79,
    meta: "대화 횟수 761회 · 평균 응답 8분",
    delta: "전월 대비 -2",
    color: "var(--rank-bronze)"
  }, {
    rank: "4️⃣",
    name: "최다인",
    score: 68,
    meta: "대화 횟수 698회 · 평균 응답 15분",
    delta: "전월 대비 0"
  }, {
    rank: "5️⃣",
    name: "정하늘",
    score: 55,
    meta: "대화 횟수 512회 · 평균 응답 20분",
    delta: "전월 대비 +5"
  }];
  function Top5Screen({
    onNavigate
  }) {
    const {
      AppShell,
      SectionLabel,
      Well
    } = window;
    return /*#__PURE__*/React.createElement(AppShell, {
      activeNav: "result"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: 28,
        color: "var(--ink-900)"
      }
    }, "TOP 5 \uB7AD\uD0B9 \uACB0\uACFC \uD83C\uDFC6"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      onClick: () => onNavigate("share")
    }, "\uACF5\uC720 \uCE74\uB4DC \uB9CC\uB4E4\uAE30 \uD83D\uDC8C")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 12,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(Well, {
      style: {
        flex: "1 1 180px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "var(--text-secondary)"
      }
    }, "\uCD1D \uC18C\uD1B5 \uD69F\uC218"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: 24,
        color: "var(--violet-600)"
      }
    }, "1,847\uD68C")), /*#__PURE__*/React.createElement(Well, {
      style: {
        flex: "1 1 180px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "var(--text-secondary)"
      }
    }, "\uC774\uBC88 \uB2EC \uCD5C\uC560"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: 24,
        color: "var(--pink-600)"
      }
    }, "\uAE40\uBBFC\uC9C0")), /*#__PURE__*/React.createElement(Well, {
      style: {
        flex: "1 1 180px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "var(--text-secondary)"
      }
    }, "\uCD1D \uB300\uD654 \uC0C1\uB300"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: 24,
        color: "var(--ink-900)"
      }
    }, "38\uBA85"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, null, "\uB098\uC758 \uCD5C\uC560 \uCE5C\uAD6C \uC21C\uC704"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, RANK.map((f, i) => /*#__PURE__*/React.createElement("div", {
      key: f.name,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 16,
        background: i === 0 ? "var(--gradient-holo-soft)" : "var(--surface-card)",
        border: i === 0 ? "none" : "1px solid var(--border-soft)",
        boxShadow: i === 0 ? "var(--shadow-pop-yellow)" : "var(--shadow-card)",
        borderRadius: "var(--radius-lg)",
        padding: "14px 18px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 24,
        width: 34
      }
    }, f.rank), /*#__PURE__*/React.createElement(Image, {
      shape: "round",
      size: 44,
      initials: f.name.slice(0, 1)
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 800,
        fontSize: 15,
        color: "var(--text-primary)"
      }
    }, f.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "var(--text-secondary)"
      }
    }, f.meta)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: 20,
        color: "var(--violet-600)"
      }
    }, f.score), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: "var(--text-tertiary)",
        minWidth: 90,
        textAlign: "right"
      }
    }, f.delta))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, null, "\uC9C0\uB09C \uB7AD\uD0B9 \uBBF8\uB9AC\uBCF4\uAE30"), /*#__PURE__*/React.createElement(Well, {
      style: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-secondary)"
      }
    }, "2026\uB144 6\uC6D4 \uAE30\uC900 \xB7 \uB7AD\uD0B9 \uC810\uC218 87"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-secondary)"
      }
    }, "2026\uB144 5\uC6D4 \uAE30\uC900 \xB7 \uB7AD\uD0B9 \uC810\uC218 74"), /*#__PURE__*/React.createElement(Button, {
      variant: "default"
    }, "\uC804\uCCB4 \uD788\uC2A4\uD1A0\uB9AC \uBCF4\uAE30"))));
  }
  window.Top5Screen = Top5Screen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Top5Screen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/UploadScreen.jsx
try { (() => {
(function () {
  const {
    Button,
    Image
  } = window.DesignSystem_8db18d;
  function UploadScreen({
    onNavigate
  }) {
    const {
      AppShell,
      Well
    } = window;
    return /*#__PURE__*/React.createElement(AppShell, {
      activeNav: "upload"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: 28,
        color: "var(--ink-900)"
      }
    }, "\uD30C\uC77C \uC5C5\uB85C\uB4DC"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "var(--text-secondary)"
      }
    }, "\uBD84\uC11D\uD560 \uB300\uD654 \uD30C\uC77C\uC744 \uC120\uD0DD\uD574 \uC8FC\uC138\uC694. \uCE74\uCE74\uC624\uD1A1 \uB610\uB294 \uC778\uC2A4\uD0C0\uADF8\uB7A8 \uC911 \uD558\uB098\uB97C \uC5C5\uB85C\uB4DC\uD558\uBA74 \uBC14\uB85C \uBD84\uC11D\uC774 \uC2DC\uC791\uB429\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 20,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(Well, {
      style: {
        flex: "1 1 320px"
      }
    }, /*#__PURE__*/React.createElement(Image, {
      shape: "square",
      size: 56,
      initials: "\uD83D\uDCAC",
      style: {
        width: "100%",
        background: "var(--gradient-holo-soft)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "var(--text-primary)"
      }
    }, "\uCE74\uCE74\uC624\uD1A1 \uC571\uC5D0\uC11C \uB0B4\uBCF4\uB0B8 .txt \uD30C\uC77C\uC744 \uC5C5\uB85C\uB4DC\uD558\uC138\uC694. 1:1 \uBC0F \uB2E8\uCCB4 \uB300\uD654 \uBAA8\uB450 \uC9C0\uC6D0\uD569\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "var(--text-tertiary)"
      }
    }, "\uC9C0\uC6D0 \uD615\uC2DD: .txt"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: () => onNavigate("analyzing")
    }, "\uCE74\uCE74\uC624\uD1A1 \uD30C\uC77C \uC5C5\uB85C\uB4DC")), /*#__PURE__*/React.createElement(Well, {
      style: {
        flex: "1 1 320px"
      }
    }, /*#__PURE__*/React.createElement(Image, {
      shape: "square",
      size: 56,
      initials: "\uD83D\uDCF7",
      style: {
        width: "100%",
        background: "var(--gradient-mint-violet)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "var(--text-primary)"
      }
    }, "\uC778\uC2A4\uD0C0\uADF8\uB7A8 \uC815\uBCF4 \uB2E4\uC6B4\uB85C\uB4DC\uC5D0\uC11C \uB0B4\uBCF4\uB0B8 \uBA54\uC2DC\uC9C0 \uD30C\uC77C\uC744 \uC5C5\uB85C\uB4DC\uD558\uC138\uC694. JSON \uD615\uC2DD\uC744 \uC9C0\uC6D0\uD569\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "var(--text-tertiary)"
      }
    }, "\uC9C0\uC6D0 \uD615\uC2DD: .json"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: () => onNavigate("analyzing")
    }, "\uC778\uC2A4\uD0C0\uADF8\uB7A8 \uD30C\uC77C \uC5C5\uB85C\uB4DC"))), /*#__PURE__*/React.createElement(Well, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 12,
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18
      }
    }, "\u26A0\uFE0F"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 14,
        color: "var(--text-primary)"
      }
    }, "\uD30C\uC77C \uC624\uB958\uAC00 \uBC1C\uC0DD\uD558\uC168\uB098\uC694?"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-secondary)"
      }
    }, "\uC5C5\uB85C\uB4DC \uC911 \uC624\uB958\uAC00 \uC0DD\uAE30\uAC70\uB098 \uD30C\uC77C \uD615\uC2DD\uC774 \uB9DE\uC9C0 \uC54A\uB294 \uACBD\uC6B0 \uC544\uB798 \uAC00\uC774\uB4DC\uB97C \uCC38\uACE0\uD574 \uC8FC\uC138\uC694. \uC62C\uBC14\uB978 \uD30C\uC77C \uCD94\uCD9C \uBC29\uBC95\uACFC \uC790\uC8FC \uBB3B\uB294 \uC624\uB958 \uD574\uACB0\uBC95\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4."))), /*#__PURE__*/React.createElement(Button, {
      variant: "default"
    }, "\uC5C5\uB85C\uB4DC \uAC00\uC774\uB4DC \uC0C1\uC138 \uBCF4\uAE30")));
  }
  window.UploadScreen = UploadScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/UploadScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Image = __ds_scope.Image;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SharedHeader = __ds_scope.SharedHeader;

__ds_ns.SharedSidebar = __ds_scope.SharedSidebar;

})();
