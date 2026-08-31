const BUTTON_BASE =
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap border-2 px-5 py-2 font-display text-[13px] tracking-[0.12em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.3_0.03_55)] disabled:opacity-50";

export function InkButton({
  children,
  variant = "solid",
  onClick,
  type = "button",
  disabled,
  className = "",
  "aria-label": ariaLabel,
}) {
  const skin =
    variant === "solid"
      ? "border-[oklch(0.3_0.03_55)] bg-accent text-parchment hover:bg-[oklch(0.31_0.12_26)]"
      : variant === "danger"
        ? "border-[oklch(0.35_0.14_26)] bg-transparent text-[oklch(0.38_0.15_26)] hover:bg-[oklch(0.45_0.17_26_/_0.12)]"
        : "border-[oklch(0.34_0.04_55_/_0.7)] bg-transparent text-ink hover:bg-[oklch(0.3_0.03_55_/_0.1)]";
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${BUTTON_BASE} ${skin} ${className}`}
    >
      {children}
    </button>
  );
}
