import { Link } from "@tanstack/react-router";
import { IMG } from "./assets";
import { GoldFleur } from "./Ornament";

const LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/vendedores", label: "Vendedores" },
  { to: "/historia", label: "Historia" },
  { to: "/tienda", label: "Tienda" },
  { to: "/usuarios", label: "Usuarios" },
] as const;

export function SiteNav() {
  return (
    <header className="relative z-30 h-[74px] w-full">
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

      {/* brand ribbon */}
      <Link
        to="/"
        className="absolute top-0 left-4 z-20 flex h-[92px] w-[420px] items-center justify-center"
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
          className="relative -mt-1 font-display text-[30px] leading-none font-bold tracking-tight text-ink"
          style={{ textShadow: "0 1px 0 oklch(1 0 0 / 0.25)" }}
        >
          Mercatum Regni
        </span>
      </Link>

      <nav className="relative flex h-[74px] items-center justify-center gap-9 pl-[420px]">
        {LINKS.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            activeOptions={{ exact: l.to === "/" }}
            className="group relative px-2 py-1 font-body text-[19px] text-parchment/85 transition-colors hover:text-gold"
          >
            {({ isActive }: { isActive: boolean }) => (
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

      <div className="absolute top-0 right-5 flex h-[74px] items-center gap-3">
        <button
          type="button"
          aria-label="Carro"
          className="relative flex h-[46px] w-[54px] items-center justify-center gold-frame rounded-sm text-gold/85"
        >
          <CartIcon />
          <span className="absolute -top-1.5 -right-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-destructive font-body text-[11px] text-parchment">
            0
          </span>
        </button>
        <button
          type="button"
          aria-label="Cuenta"
          className="flex h-[46px] w-[54px] items-center justify-center gold-frame rounded-sm text-gold/85"
        >
          <UserIcon />
        </button>
      </div>
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M2 4h3l3.2 10.5h9.3L21 7H6" />
      <circle cx="9.5" cy="19" r="1.6" />
      <circle cx="17.5" cy="19" r="1.6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="8.2" r="3.6" />
      <path d="M4.8 20c1.2-4 4-5.6 7.2-5.6S18 16 19.2 20" />
    </svg>
  );
}
