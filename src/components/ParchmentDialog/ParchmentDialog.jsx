import { useEffect } from "react";
import { Ornament } from "@/components/Ornament/Ornament";
import { IMG } from "@/assets/assets";
import "./ParchmentDialog.css";

/** Parchment modal used for every CRUD form. */
export function ParchmentDialog({ open, title, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="parchment-dialog-backdrop fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 py-10"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="parchment-dialog-surface relative w-full max-w-[560px] border-2 border-[oklch(0.36_0.04_55_/_0.7)] p-7"
        style={{ "--parchment-texture": `url(${IMG.parchment})` }}
      >
        <span className="pointer-events-none absolute inset-[6px] border border-[oklch(0.36_0.04_55_/_0.35)]" />
        <div className="relative">
          <h2 className="font-display text-[26px] font-bold text-ink">{title}</h2>
          <Ornament className="mt-4" />
          <div className="mt-6">{children}</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center border border-[oklch(0.34_0.04_55_/_0.6)] font-display text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.3_0.03_55)]"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
