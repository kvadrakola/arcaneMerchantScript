import type { ReactNode } from "react";
import { Ornament } from "./Ornament";
import { IMG } from "./assets";

export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <header className="text-center">
      <h1
        className="font-display text-[54px] leading-none font-bold text-ink"
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

export function InkButton({
  children,
  variant = "solid",
}: {
  children: ReactNode;
  variant?: "solid" | "outline";
}) {
  const base =
    "inline-flex items-center justify-center border-2 px-6 py-2 font-display text-[15px] tracking-[0.12em] uppercase transition-colors";
  return (
    <button
      type="button"
      className={
        variant === "solid"
          ? `${base} border-[oklch(0.3_0.03_55)] bg-accent text-parchment hover:bg-[oklch(0.31_0.12_26)]`
          : `${base} border-[oklch(0.34_0.04_55_/_0.7)] bg-transparent text-ink hover:bg-[oklch(0.3_0.03_55_/_0.1)]`
      }
    >
      {children}
    </button>
  );
}
