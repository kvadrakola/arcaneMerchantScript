
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { IMG } from "./assets";

export function PageShell({ children }                         ) {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: "oklch(0.19 0.012 60)",
        backgroundImage: `url(${IMG.stone})`,
        backgroundSize: "620px",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="flex min-h-screen flex-col" style={{ backgroundColor: "oklch(0.12 0.01 60 / 0.55)" }}>
        <SiteNav />
        <MobileHeraldry />
        <div className="relative flex flex-1 items-stretch">
          <LeftRail />
          <main className="relative min-w-0 flex-1">{children}</main>
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
        className="h-[74px] w-auto"
        style={{ filter: "drop-shadow(0 8px 14px oklch(0 0 0 / 0.7))" }}
      />
      <img
        src={IMG.lantern}
        alt="Farol de latón"
        loading="lazy"
        width={672}
        height={992}
        className="h-[62px] w-auto"
        style={{ filter: "drop-shadow(0 0 30px oklch(0.78 0.13 74 / 0.45))" }}
      />
    </div>
  );
}

/** Dark stone column with the heraldic banner and the hanging lantern. */
function LeftRail() {
  return (
    <aside className="relative hidden w-[300px] shrink-0 lg:block">
      <img
        src={IMG.banner}
        alt="Estandarte con león rampante dorado"
        width={576}
        height={1152}
        className="absolute top-0 left-[52px] w-[190px]"
        style={{ filter: "drop-shadow(0 14px 22px oklch(0 0 0 / 0.75))" }}
      />
      <img
        src={IMG.lantern}
        alt="Farol de latón"
        loading="lazy"
        width={672}
        height={992}
        className="absolute top-[430px] left-[6px] w-[132px]"
        style={{ filter: "drop-shadow(0 0 44px oklch(0.78 0.13 74 / 0.45))" }}
      />
      <span
        className="pointer-events-none absolute top-[470px] left-[10px] h-[220px] w-[220px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.8 0.13 74 / 0.22) 0%, transparent 70%)",
        }}
      />
    </aside>
  );
}

/** Aged parchment panel used as the main content surface on every page. */
export function ParchmentPanel({
  children,
  className = "",
}

 ) {
  return (
    <section
      className={`parchment-surface relative min-h-[calc(100vh-74px)] border-l-0 border-[oklch(0.32_0.03_55_/_0.45)] text-ink lg:border-l-2 ${className}`}
      style={{
        backgroundImage: `url(${IMG.parchment})`,
        backgroundSize: "1600px",
        backgroundRepeat: "repeat",
      }}
    >
      {children}
    </section>
  );
}
