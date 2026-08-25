import type { ReactNode } from "react";
import { useEffect } from "react";
import { Ornament } from "./Ornament";
import { IMG } from "./assets";

export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <header className="text-center">
      <h1
        className="font-display text-[34px] leading-none font-bold text-ink sm:text-[44px] lg:text-[54px]"
        style={{ textShadow: "0 1px 0 oklch(1 0 0 / 0.3)" }}
      >
        {children}
      </h1>
      <Ornament className="mt-6" />
    </header>
  );
}

export function SealDivider() {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="ink-rule w-40" />
      <svg width="16" height="10" viewBox="0 0 16 10" className="text-ink/60" aria-hidden="true">
        <path d="M8 0l4 5-4 5-4-5z" fill="currentColor" opacity=".7" />
      </svg>
      <img
        src={IMG.seal}
        alt="Sello de cera de Mercatum Regni"
        loading="lazy"
        width={736}
        height={912}
        className="w-[96px]"
        style={{ filter: "drop-shadow(0 6px 8px oklch(0 0 0 / 0.35))" }}
      />
      <svg width="16" height="10" viewBox="0 0 16 10" className="text-ink/60" aria-hidden="true">
        <path d="M8 0l4 5-4 5-4-5z" fill="currentColor" opacity=".7" />
      </svg>
      <span className="ink-rule w-40" />
    </div>
  );
}

export function ParchmentCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`relative border-2 border-[oklch(0.36_0.04_55_/_0.55)] bg-[oklch(0.85_0.05_80_/_0.75)] p-5 ${className}`}
      style={{
        boxShadow:
          "inset 0 0 26px oklch(0.28 0.035 55 / 0.22), 0 4px 10px oklch(0 0 0 / 0.25)",
      }}
    >
      <span className="pointer-events-none absolute inset-[5px] border border-[oklch(0.36_0.04_55_/_0.35)]" />
      <div className="relative">{children}</div>
    </article>
  );
}

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
}: {
  children: ReactNode;
  variant?: "solid" | "outline" | "danger";
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
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

/** Loading / error / empty notice rendered as an ink note on parchment. */
export function InkNotice({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "error";
  title: string;
  children?: ReactNode;
}) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`mx-auto max-w-[620px] border-2 px-6 py-5 text-center ${
        tone === "error"
          ? "border-[oklch(0.4_0.14_26_/_0.55)] bg-[oklch(0.85_0.05_80_/_0.6)]"
          : "border-[oklch(0.34_0.04_55_/_0.5)] bg-[oklch(0.85_0.05_80_/_0.55)]"
      }`}
    >
      <p className="font-display text-[16px] tracking-[0.14em] uppercase text-ink">{title}</p>
      {children && (
        <p className="mt-2 font-body text-[17px] leading-[1.6] text-ink-soft">{children}</p>
      )}
    </div>
  );
}

/** Parchment modal used for every CRUD form. */
export function ParchmentDialog({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 py-10"
      style={{ backgroundColor: "oklch(0.08 0.01 60 / 0.72)" }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="relative w-full max-w-[560px] border-2 border-[oklch(0.36_0.04_55_/_0.7)] p-7"
        style={{
          backgroundColor: "oklch(0.88 0.045 82)",
          backgroundImage: `url(${IMG.parchment})`,
          backgroundSize: "1200px",
          boxShadow: "0 18px 50px oklch(0 0 0 / 0.7)",
        }}
      >
        <span className="pointer-events-none absolute inset-[6px] border border-[oklch(0.36_0.04_55_/_0.35)]" />
        <div className="relative">
          <h2 className="font-display text-[26px] font-bold text-ink">{title}</h2>
          <Ornament className="mt-4" />
          <div className="mt-6">{children}</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center border border-[oklch(0.34_0.04_55_/_0.6)] font-display text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.3_0.03_55)]"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

/** Labelled input in the ledger style. */
export function InkField({
  label,
  value,
  onChange,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const id = `f-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const cls =
    "mt-1.5 w-full border border-[oklch(0.34_0.04_55_/_0.6)] bg-[oklch(0.92_0.04_84_/_0.7)] px-3 py-2 font-body text-[17px] text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[oklch(0.3_0.03_55)]";
  return (
    <p>
      <label
        htmlFor={id}
        className="font-display text-[13px] tracking-[0.14em] uppercase text-ink-soft"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          required={required}
          rows={3}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      )}
    </p>
  );
}
