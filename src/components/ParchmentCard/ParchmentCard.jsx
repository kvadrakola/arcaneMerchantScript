import "./ParchmentCard.css";

export function ParchmentCard({ children, className = "" }) {
  return (
    <article
      className={`parchment-card relative border-2 border-[oklch(0.36_0.04_55_/_0.55)] bg-[oklch(0.85_0.05_80_/_0.75)] p-5 ${className}`}
    >
      <span className="pointer-events-none absolute inset-[5px] border border-[oklch(0.36_0.04_55_/_0.35)]" />
      <div className="relative">{children}</div>
    </article>
  );
}
