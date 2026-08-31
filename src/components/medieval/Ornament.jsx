export function Ornament({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="ink-rule w-full max-w-[220px] flex-1" />
      <svg
        width="46"
        height="12"
        viewBox="0 0 46 12"
        fill="none"
        className="shrink-0 text-ink/70"
        aria-hidden="true"
      >
        <path
          d="M23 1c2.4 0 3.6 1.8 3.6 3.4 0 1.6-1.2 2.6-2.4 2.6-1 0-1.8-.6-1.8-1.5 0-.8.6-1.3 1.2-1.3"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <path
          d="M23 1c-2.4 0-3.6 1.8-3.6 3.4 0 1.6 1.2 2.6 2.4 2.6 1 0 1.8-.6 1.8-1.5 0-.8-.6-1.3-1.2-1.3"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <path d="M0 6h14M32 6h14" stroke="currentColor" strokeWidth="0.9" />
        <path d="M15.5 4l2 2-2 2M30.5 4l-2 2 2 2" stroke="currentColor" strokeWidth="0.9" />
      </svg>
      <span className="ink-rule w-full max-w-[220px] flex-1" />
    </div>
  );
}

export function GoldFleur({ className = "" }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      className={`text-gold ${className}`}
      aria-hidden="true"
    >
      <path d="M6 0.5 7 5 11.5 6 7 7 6 11.5 5 7 0.5 6 5 5Z" fill="currentColor" opacity="0.85" />
    </svg>
  );
}
