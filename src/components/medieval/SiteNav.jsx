import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { IMG } from "./assets";
import { GoldFleur } from "./Ornament";
import { WeatherWidget } from "./WeatherWidget";
import { NAV_LINKS } from "./nav-links";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-30 w-full">
      {/* dark wooden bar */}
      <div
        className="absolute inset-0 border-b-2 border-black/70"
        style={{
          backgroundColor: "oklch(0.16 0.01 60)",
          backgroundImage:
            "linear-gradient(180deg, oklch(0.22 0.015 60) 0%, oklch(0.14 0.01 60) 55%, oklch(0.1 0.008 60) 100%)",
          boxShadow: "0 6px 18px oklch(0 0 0 / 0.7)",
        }}
      />

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
            className="absolute inset-0 h-full w-full object-fill"
            style={{ filter: "drop-shadow(0 6px 10px oklch(0 0 0 / 0.6))" }}
          />
          <span
            className="relative -mt-2 font-display text-[14px] leading-none font-bold tracking-tight text-ink sm:text-[24px] xl:text-[28px]"
            style={{ textShadow: "0 1px 0 oklch(1 0 0 / 0.25)" }}
          >
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
              {({ isActive }: { isActive: boolean }) => (
                <span className="flex items-center gap-2">
                  {isActive && <GoldFleur />}
                  <span className={isActive ? "text-gold brass-glow" : undefined}>
                    {l.label}
                  </span>
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
          className="relative border-y-2 border-black/60 xl:hidden"
          style={{ backgroundColor: "oklch(0.13 0.01 60 / 0.97)" }}
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

function MenuIcon({ open }                   ) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      {open   (
        <path d="M5 5l14 14M19 5L5 19" />
      )
                                          />
      )}
    </svg>
  );
}
