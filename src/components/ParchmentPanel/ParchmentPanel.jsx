import { IMG } from "@/assets/assets";

/** Aged parchment panel used as the main content surface on every page. */
export function ParchmentPanel({ children, className = "" }) {
  return (
    <section
      className={`parchment-surface relative min-h-[calc(100vh-74px)] border-l-0 border-[oklch(0.32_0.03_55_/_0.45)] text-ink lg:border-l-2 ${className}`}
      style={{
        backgroundImage: `url(${IMG.parchment})`,
        backgroundSize: "1600px",
        backgroundRepeat: "repeat",
      }}
    >
      {children}
    </section>
  );
}
