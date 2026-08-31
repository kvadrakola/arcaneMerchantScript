/** Labelled input in the ledger style. */
export function InkField({ label, value, onChange, type = "text", required, textarea }) {
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
