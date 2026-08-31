// Application navigation links, isolated from the router library.
// If the framework ever changes (e.g. to react-router-dom), only this
// file needs to be rewritten — all link usage in the app goes through here.
import { Link } from "@tanstack/react-router";

/** Plain internal link. Mirrors the minimal API of react-router's Link. */
export function AppLink({ to, className, onClick, "aria-label": ariaLabel, children }) {
  return (
    <Link to={to} className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

/**
 * Link with active-route styling.
 * - `exact` requires an exact path match (used for the home link).
 * - `activeClassName` is merged in while the route is active.
 * - `children` may also be a function receiving `isActive` for custom
 *   active rendering; in react-router this maps to NavLink's className/render state.
 */
export function AppNavLink({
  to,
  className,
  activeClassName,
  exact = false,
  onClick,
  children,
}) {
  return (
    <Link
      to={to}
      activeOptions={{ exact }}
      activeProps={activeClassName ? { className: activeClassName } : undefined}
      className={className}
      onClick={onClick}
    >
      {typeof children === "function" ? ({ isActive }) => children(isActive) : children}
    </Link>
  );
}
