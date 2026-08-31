import "./InkButton.css";

const VARIANT_CLASS = {
  solid: "ink-button--solid",
  danger: "ink-button--danger",
  outline: "ink-button--outline",
};

export function InkButton({
  children,
  variant = "solid",
  onClick,
  type = "button",
  disabled,
  className = "",
  "aria-label": ariaLabel,
}) {
  const skin = VARIANT_CLASS[variant] ?? VARIANT_CLASS.solid;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`ink-button ${skin} ${className}`}
    >
      {children}
    </button>
  );
}
