import { SiteNav } from "@/components/SiteNav/SiteNav";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { IMG } from "@/assets/assets";
import "./PageShell.css";

/**
 * Shared shell. `heraldryOverlay` lets a page (currently /tienda) keep the
 * banner/lantern as pure decoration layered over a full-width main area
 * instead of a structural left column.
 */
export function PageShell({ children, heraldryOverlay = false }) {
  return (
    <div className="page-shell min-h-dvh w-full" style={{ "--stone-texture": `url(${IMG.stone})` }}>
      <div className="page-shell-overlay flex min-h-dvh flex-col">
        {/* Keyboard users can jump straight to the page content. */}
        <a
          href="#contenido"
          className="sr-only rounded-sm bg-accent px-4 py-2 font-display text-[15px] text-parchment focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50"
        >
          Saltar al contenido
        </a>
        <SiteNav />
        <MobileHeraldry />
        <div className="relative flex flex-1 items-stretch">
          {heraldryOverlay ? (
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[180px] lg:block"
              aria-hidden="true"
            >
              <LeftRail decorative />
            </div>
          ) : (
            <LeftRail />
          )}
          <main id="contenido" className="relative min-w-0 flex-1">
            {children}
          </main>
        </div>
        <SiteFooter />
      </div>
    </div>
  );
}

/** Slim heraldic band so the identity survives below the lg breakpoint. */
function MobileHeraldry() {
  return (
    <div className="relative flex items-center justify-center gap-6 overflow-hidden py-2 lg:hidden">
      <img
        src={IMG.banner}
        alt="Estandarte con león rampante dorado"
        width={576}
        height={1152}
        className="page-shell-mobile-banner h-[74px] w-auto"
      />
      <img
        src={IMG.lantern}
        alt="Farol de latón"
        loading="lazy"
        width={672}
        height={992}
        className="page-shell-mobile-lantern h-[62px] w-auto"
      />
    </div>
  );
}

/** Dark stone column with the heraldic banner and the hanging lantern. */
function LeftRail({ decorative = false }) {
  return (
    <aside
      className={
        decorative
          ? "page-shell-rail--slim relative h-full w-[300px]"
          : "relative hidden w-[300px] shrink-0 lg:block"
      }
    >
      <img
        src={IMG.banner}
        alt={decorative ? "" : "Estandarte con león rampante dorado"}
        width={576}
        height={1152}
        className="page-shell-rail-banner absolute top-0 left-[52px] w-[190px]"
      />
      <img
        src={IMG.lantern}
        alt={decorative ? "" : "Farol de latón"}
        loading="lazy"
        width={672}
        height={992}
        className="page-shell-rail-lantern absolute top-[430px] left-[6px] w-[132px]"
      />
      <span className="page-shell-lantern-aura pointer-events-none absolute top-[470px] left-[10px] h-[220px] w-[220px] rounded-full" />
    </aside>
  );
}
