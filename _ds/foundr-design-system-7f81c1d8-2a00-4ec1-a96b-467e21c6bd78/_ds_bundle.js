/* @ds-bundle: {"format":4,"namespace":"FoundrDesignSystem_7f81c1","components":[{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"Tag","sourcePath":"components/display/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Tabs","sourcePath":"components/feedback/Tabs.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"}],"sourceHashes":{"components/display/Badge.jsx":"2c3716f8ae14","components/display/Card.jsx":"98bb0d7876c0","components/display/Tag.jsx":"0b5f6241769e","components/feedback/Dialog.jsx":"70dedee968ef","components/feedback/Tabs.jsx":"b275c2a0b6f4","components/feedback/Toast.jsx":"33d374465d58","components/feedback/Tooltip.jsx":"2bc885481c29","components/forms/Button.jsx":"6ccf0aef3c45","components/forms/Checkbox.jsx":"28f86ebd297d","components/forms/IconButton.jsx":"c368c43d29ad","components/forms/Input.jsx":"d33c3544141b","components/forms/Radio.jsx":"4bb4849bb912","components/forms/Select.jsx":"3d42624fd909","components/forms/Switch.jsx":"d5e2ceb388cd"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FoundrDesignSystem_7f81c1 = window.FoundrDesignSystem_7f81c1 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/display/Badge.jsx
try { (() => {
function Badge({
  variant = 'neutral',
  children,
  style
}) {
  const v = {
    neutral: {
      background: 'var(--gray-100)',
      color: 'var(--gray-800)'
    },
    accent: {
      background: 'var(--accent-soft)',
      color: 'var(--blue)'
    },
    inverse: {
      background: 'var(--ink)',
      color: '#fff'
    },
    success: {
      background: 'rgba(22,163,74,0.12)',
      color: '#15803D'
    }
  }[variant];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height: 22,
      padding: '0 8px',
      borderRadius: 'var(--radius)',
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 600,
      ...v,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function Card({
  label,
  title,
  children,
  footer,
  padding = 24,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--shadow-card)',
      padding,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-label)',
      fontWeight: 500,
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--gray-500)',
      marginBottom: 10
    }
  }, label), title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-title)',
      fontWeight: 600,
      color: 'var(--ink)',
      marginBottom: 8
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-body)',
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-body)'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      paddingTop: 14,
      borderTop: '1px solid var(--border-hairline)'
    }
  }, footer));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/Tag.jsx
try { (() => {
const {
  useState
} = React;
function Tag({
  children,
  onRemove,
  active,
  onClick,
  style
}) {
  const [hover, setHover] = useState(false);
  const clickable = !!onClick;
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 28,
      padding: '0 12px',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 500,
      cursor: clickable ? 'pointer' : 'default',
      transition: 'background var(--dur) var(--ease), border-color var(--dur) var(--ease)',
      background: active ? 'var(--ink)' : hover && clickable ? 'var(--gray-100)' : 'var(--paper)',
      color: active ? '#fff' : 'var(--ink)',
      border: '1px solid ' + (active ? 'var(--ink)' : 'var(--border-strong)'),
      ...style
    }
  }, children, onRemove && /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    style: {
      cursor: 'pointer',
      color: active ? '#999' : 'var(--gray-400)',
      fontSize: 14,
      lineHeight: 1
    },
    "aria-label": "Remove"
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  children,
  actions,
  onClose,
  width = 440
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width,
      maxWidth: 'calc(100vw - 48px)',
      background: 'var(--paper)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-overlay)',
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      color: 'var(--ink)'
    }
  }, title), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      background: 'none',
      border: 'none',
      fontSize: 18,
      lineHeight: 1,
      color: 'var(--gray-400)',
      cursor: 'pointer',
      padding: 2
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-body)',
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-body)',
      marginTop: 10
    }
  }, children), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10,
      marginTop: 24
    }
  }, actions)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tabs.jsx
try { (() => {
const {
  useState
} = React;
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  style
}) {
  const [internal, setInternal] = useState(defaultValue ?? tabs[0]);
  const active = value !== undefined ? value : internal;
  const pick = t => {
    if (value === undefined) setInternal(t);
    onChange && onChange(t);
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      gap: 24,
      borderBottom: '1px solid var(--border-hairline)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, tabs.map(t => {
    const on = t === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t,
      role: "tab",
      "aria-selected": on,
      onClick: () => pick(t),
      style: {
        background: 'none',
        border: 'none',
        padding: '10px 2px',
        marginBottom: -1,
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        fontWeight: on ? 600 : 500,
        color: on ? 'var(--ink)' : 'var(--gray-500)',
        borderBottom: '2px solid ' + (on ? 'var(--blue)' : 'transparent'),
        cursor: 'pointer',
        transition: 'color var(--dur) var(--ease), border-color var(--dur) var(--ease)'
      }
    }, t);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function Toast({
  open = true,
  message,
  detail,
  variant = 'neutral',
  onDismiss,
  style
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: 12,
      background: 'var(--ink)',
      color: '#fff',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-overlay)',
      padding: '12px 16px',
      fontFamily: 'var(--font-sans)',
      maxWidth: 380,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: variant === 'success' ? '#4ADE80' : 'var(--blue)',
      flex: 'none',
      marginTop: 5
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      lineHeight: 1.45
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 600
    }
  }, message), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#AAAAAA',
      display: 'block',
      fontSize: 13
    }
  }, detail)), onDismiss && /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    "aria-label": "Dismiss",
    style: {
      background: 'none',
      border: 'none',
      color: '#777',
      fontSize: 16,
      lineHeight: 1,
      cursor: 'pointer',
      padding: 0,
      marginTop: 2
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
const {
  useState
} = React;
function Tooltip({
  label,
  children,
  style
}) {
  const [show, setShow] = useState(false);
  return /*#__PURE__*/React.createElement("span", {
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    }
  }, children, show && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      bottom: '100%',
      left: '50%',
      transform: 'translate(-50%, -6px)',
      background: 'var(--ink)',
      color: '#fff',
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 500,
      lineHeight: 1.4,
      padding: '5px 10px',
      borderRadius: 'var(--radius)',
      whiteSpace: 'nowrap',
      boxShadow: 'var(--shadow-overlay)',
      zIndex: 50,
      pointerEvents: 'none'
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
function Button({
  variant = 'primary',
  size = 'md',
  disabled,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false),
    [press, setPress] = useState(false),
    [focus, setFocus] = useState(false);
  const sz = {
    sm: {
      height: 32,
      padding: '0 12px',
      fontSize: 13
    },
    md: {
      height: 40,
      padding: '0 16px',
      fontSize: 14
    },
    lg: {
      height: 48,
      padding: '0 24px',
      fontSize: 15
    }
  }[size];
  const v = {
    primary: {
      background: press ? '#2C49D8' : hover ? 'var(--accent-hover)' : 'var(--accent)',
      color: '#fff',
      border: '1px solid transparent'
    },
    secondary: {
      background: press ? 'var(--gray-200)' : hover ? 'var(--gray-100)' : 'var(--paper)',
      color: 'var(--ink)',
      border: '1px solid var(--border-strong)'
    },
    ghost: {
      background: press ? 'var(--gray-200)' : hover ? 'var(--gray-100)' : 'transparent',
      color: 'var(--ink)',
      border: '1px solid transparent'
    },
    inverse: {
      background: press ? 'var(--gray-200)' : hover ? 'var(--gray-100)' : '#fff',
      color: 'var(--ink)',
      border: '1px solid transparent'
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      borderRadius: 'var(--radius)',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'background var(--dur) var(--ease)',
      outline: 'none',
      boxShadow: focus ? 'var(--focus-ring)' : 'none',
      ...sz,
      ...v,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
const {
  useState
} = React;
function Checkbox({
  label,
  checked,
  defaultChecked = false,
  onChange,
  disabled,
  style
}) {
  const [internal, setInternal] = useState(defaultChecked);
  const [focus, setFocus] = useState(false);
  const isOn = checked !== undefined ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInternal(!isOn);
    onChange && onChange(!isOn);
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--ink)',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: isOn,
    onChange: toggle,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 16,
      height: 16,
      flex: 'none',
      borderRadius: 3,
      border: '1px solid ' + (isOn ? 'var(--blue)' : 'var(--border-strong)'),
      background: isOn ? 'var(--blue)' : 'var(--paper)',
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 11,
      fontWeight: 700,
      lineHeight: 1,
      transition: 'background var(--dur) var(--ease), border-color var(--dur) var(--ease)',
      boxShadow: focus ? 'var(--focus-ring)' : 'none',
      boxSizing: 'border-box'
    }
  }, isOn ? '✓' : ''), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
function IconButton({
  label,
  size = 'md',
  variant = 'ghost',
  disabled,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false),
    [press, setPress] = useState(false),
    [focus, setFocus] = useState(false);
  const d = {
    sm: 32,
    md: 40
  }[size];
  const v = {
    ghost: {
      background: press ? 'var(--gray-200)' : hover ? 'var(--gray-100)' : 'transparent',
      color: 'var(--ink)',
      border: '1px solid transparent'
    },
    secondary: {
      background: press ? 'var(--gray-200)' : hover ? 'var(--gray-100)' : 'var(--paper)',
      color: 'var(--ink)',
      border: '1px solid var(--border-strong)'
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: d,
      height: d,
      fontSize: size === 'sm' ? 14 : 16,
      fontFamily: 'var(--font-sans)',
      borderRadius: 'var(--radius)',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'background var(--dur) var(--ease)',
      outline: 'none',
      boxShadow: focus ? 'var(--focus-ring)' : 'none',
      ...v,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
function Input({
  label,
  error,
  hint,
  size = 'md',
  style,
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const h = {
    sm: 32,
    md: 40
  }[size];
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-label)',
      fontWeight: 500,
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--gray-500)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      height: h,
      padding: '0 12px',
      fontSize: 14,
      fontFamily: 'var(--font-sans)',
      color: 'var(--ink)',
      background: 'var(--paper)',
      border: '1px solid ' + (error ? '#D6453D' : focus ? 'var(--blue)' : 'var(--border-strong)'),
      borderRadius: 'var(--radius)',
      outline: 'none',
      boxShadow: focus && !error ? 'var(--focus-ring)' : 'none',
      transition: 'border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease)',
      boxSizing: 'border-box',
      width: '100%'
    }
  }, rest)), (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: error ? '#D6453D' : 'var(--gray-500)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
const {
  useState
} = React;
function Radio({
  label,
  name,
  value,
  checked,
  onChange,
  disabled,
  style
}) {
  const [focus, setFocus] = useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--ink)',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    onChange: () => onChange && onChange(value),
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 16,
      height: 16,
      flex: 'none',
      borderRadius: '50%',
      border: checked ? '5px solid var(--blue)' : '1px solid var(--border-strong)',
      background: 'var(--paper)',
      transition: 'border var(--dur) var(--ease)',
      boxShadow: focus ? 'var(--focus-ring)' : 'none',
      boxSizing: 'border-box'
    }
  }), label);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
function Select({
  label,
  options = [],
  size = 'md',
  style,
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const h = {
    sm: 32,
    md: 40
  }[size];
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-label)',
      fontWeight: 500,
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--gray-500)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      height: h,
      width: '100%',
      padding: '0 32px 0 12px',
      fontSize: 14,
      fontFamily: 'var(--font-sans)',
      color: 'var(--ink)',
      background: 'var(--paper)',
      border: '1px solid ' + (focus ? 'var(--blue)' : 'var(--border-strong)'),
      borderRadius: 'var(--radius)',
      outline: 'none',
      boxShadow: focus ? 'var(--focus-ring)' : 'none',
      transition: 'border-color var(--dur) var(--ease)',
      appearance: 'none',
      WebkitAppearance: 'none',
      cursor: 'pointer',
      boxSizing: 'border-box'
    }
  }, rest), options.map(o => typeof o === 'string' ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      fontSize: 11,
      color: 'var(--gray-500)'
    }
  }, "\u25BE")));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
const {
  useState
} = React;
function Switch({
  label,
  checked,
  defaultChecked = false,
  onChange,
  disabled,
  style
}) {
  const [internal, setInternal] = useState(defaultChecked);
  const [focus, setFocus] = useState(false);
  const isOn = checked !== undefined ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInternal(!isOn);
    onChange && onChange(!isOn);
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--ink)',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    checked: isOn,
    onChange: toggle,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 36,
      height: 20,
      flex: 'none',
      borderRadius: 'var(--radius-pill)',
      background: isOn ? 'var(--blue)' : 'var(--gray-200)',
      position: 'relative',
      transition: 'background var(--dur) var(--ease)',
      boxShadow: focus ? 'var(--focus-ring)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: isOn ? 18 : 2,
      width: 16,
      height: 16,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
      transition: 'left var(--dur) var(--ease)'
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

})();
