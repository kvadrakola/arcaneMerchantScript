import { useId } from "react";

/** Labelled input in the ledger style. */
export function InkField({ label, value, onChange, type = "text", required, textarea }) {
  const id = useId();
  const controlClass = "ledger-control mt-1.5 w-full";
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
          className={controlClass}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          className={controlClass}
        />
      )}
    </p>
  );
}
