import type { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { IMG } from "./assets";

export function PageShell({ children }: { children: ReactNode }) {
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
      <div style={{ backgroundColor: "oklch(0.12 0.01 60 / 0.55)" }}>
        <SiteNav />
        <div className="relative flex min-h-[calc(100vh-74px)] items-stretch">
          <LeftRail />
          <main className="relative flex-1">{children}</main>
        </div>
      </div>
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
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`parchment-surface relative min-h-[calc(100vh-74px)] border-l-2 border-[oklch(0.32_0.03_55_/_0.45)] text-ink ${className}`}
      style={{
        backgroundImage: `url(${IMG.parchment})`,
        backgroundSize: "760px",
        backgroundRepeat: "repeat",
      }}
    >
      {children}
    </section>
  );
}
