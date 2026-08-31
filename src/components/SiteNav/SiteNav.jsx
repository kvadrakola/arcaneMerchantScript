import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { IMG } from "@/assets/assets";
import { GoldFleur } from "@/components/Ornament/Ornament";
import { WeatherWidget } from "@/components/WeatherWidget/WeatherWidget";
import { NAV_LINKS } from "@/lib/navLinks";
import "./SiteNav.css";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-30 w-full">
      {/* dark wooden bar */}
      <div className="site-nav-wood-bar absolute inset-0 border-b-2 border-black/70" />

      <div className="relative flex min-h-[74px] items-center gap-3 px-3 sm:px-4">
        {/* brand ribbon */}
        <Link
          to="/"
          className="relative flex h-[68px] w-[190px] shrink-0 items-center justify-center focus-visible:outline-none sm:h-[92px] sm:w-[360px] xl:w-[420px]"
        >
          <img
            src={IMG.ribbon}
            alt=""
            width={1152}
            height={576}
            className="site-nav-ribbon absolute inset-0 h-full w-full object-fill"
          />
          <span className="site-nav-brand relative -mt-2 font-display text-[14px] leading-none font-bold tracking-tight text-ink sm:text-[24px] xl:text-[28px]">
            Mercatum Regni
          </span>
        </Link>

        {/* desktop nav */}
        <nav
          aria-label="Navegación principal"
          className="hidden flex-1 items-center justify-center gap-6 xl:flex"
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="group relative px-2 py-1 font-body text-[19px] text-parchment/85 transition-colors hover:text-gold focus-visible:text-gold focus-visible:outline-none"
            >
              {({ isActive }) => (
                <span className="flex items-center gap-2">
                  {isActive && <GoldFleur />}
                  <span className={isActive ? "text-gold brass-glow" : undefined}>{l.label}</span>
                  {isActive && <GoldFleur />}
                  {isActive && (
                    <span className="pointer-events-none absolute -inset-x-3 -inset-y-1.5 rounded-sm border border-gold/45 shadow-[inset_0_0_14px_oklch(0.78_0.11_84_/_0.18)]" />
                  )}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <WeatherWidget />
          </div>
          <div className="sm:hidden">
            <WeatherWidget compact />
          </div>

          {/* mobile / tablet menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-gremio"
            className="gold-frame flex h-[46px] w-[50px] items-center justify-center rounded-sm text-gold/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold xl:hidden"
          >
            <span className="sr-only">Abrir el menú</span>
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="menu-gremio"
          aria-label="Navegación del gremio"
          className="site-nav-mobile-menu relative border-y-2 border-black/60 xl:hidden"
        >
          <ul className="flex flex-col py-2">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  onClick={() => setOpen(false)}
                  activeProps={{ className: "text-gold brass-glow" }}
                  className="flex items-center gap-2 px-6 py-3 font-body text-[19px] text-parchment/85 transition-colors hover:text-gold focus-visible:text-gold focus-visible:outline-none"
                >
                  <GoldFleur />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function MenuIcon({ open }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}
