export function ParchmentCard({ children, className = "" }) {
  return (
    <article
      className={`relative border-2 border-[oklch(0.36_0.04_55_/_0.55)] bg-[oklch(0.85_0.05_80_/_0.75)] p-5 ${className}`}
      style={{
        boxShadow: "inset 0 0 26px oklch(0.28 0.035 55 / 0.22), 0 4px 10px oklch(0 0 0 / 0.25)",
      }}
    >
      <span className="pointer-events-none absolute inset-[5px] border border-[oklch(0.36_0.04_55_/_0.35)]" />
      <div className="relative">{children}</div>
    </article>
  );
}
