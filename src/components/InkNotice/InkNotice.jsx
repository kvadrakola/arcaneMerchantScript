/** Loading / error / empty notice rendered as an ink note on parchment. */
export function InkNotice({ tone = "info", title, children }) {
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
