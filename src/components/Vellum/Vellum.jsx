/**
 * Wraps a block of text with a soft, local parchment wash so ink stays legible
 * over the aged texture. The texture remains visible around and through it.
 */
export function Vellum({ children, className = "" }) {
  return (
    <div className="relative">
      <span aria-hidden="true" className="vellum-wash" />
      <div className={`relative ink-crisp ${className}`}>{children}</div>
    </div>
  );
}
