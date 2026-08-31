import { SiteNav } from "@/components/SiteNav/SiteNav";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { IMG } from "@/assets/assets";
import "./PageShell.css";

export function PageShell({ children }) {
  return (
    <div
      className="page-shell min-h-screen w-full"
      style={{ "--stone-texture": `url(${IMG.stone})` }}
    >
      <div className="page-shell-overlay flex min-h-screen flex-col">
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
function LeftRail() {
  return (
    <aside className="relative hidden w-[300px] shrink-0 lg:block">
      <img
        src={IMG.banner}
        alt="Estandarte con león rampante dorado"
        width={576}
        height={1152}
        className="page-shell-rail-banner absolute top-0 left-[52px] w-[190px]"
      />
      <img
        src={IMG.lantern}
        alt="Farol de latón"
        loading="lazy"
        width={672}
        height={992}
        className="page-shell-rail-lantern absolute top-[430px] left-[6px] w-[132px]"
      />
      <span className="page-shell-lantern-aura pointer-events-none absolute top-[470px] left-[10px] h-[220px] w-[220px] rounded-full" />
    </aside>
  );
}
