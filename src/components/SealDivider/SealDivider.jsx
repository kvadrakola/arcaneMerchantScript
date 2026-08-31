import { IMG } from "@/assets/assets";

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
