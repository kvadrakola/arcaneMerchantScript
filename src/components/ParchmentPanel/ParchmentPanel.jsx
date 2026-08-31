import { IMG } from "@/assets/assets";
import "./ParchmentPanel.css";

/** Aged parchment panel used as the main content surface on every page. */
export function ParchmentPanel({ children, className = "" }) {
  return (
    <section
      className={`parchment-surface parchment-panel-texture relative min-h-[calc(100vh-74px)] border-l-0 border-[oklch(0.32_0.03_55_/_0.45)] text-ink lg:border-l-2 ${className}`}
      style={{ "--parchment-texture": `url(${IMG.parchment})` }}
    >
      {children}
    </section>
  );
}
