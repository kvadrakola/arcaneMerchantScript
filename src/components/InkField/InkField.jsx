/** Labelled input in the ledger style. */
export function InkField({ label, value, onChange, type = "text", required, textarea }) {
  const id = `f-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const cls = "ledger-control mt-1.5 w-full";
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
