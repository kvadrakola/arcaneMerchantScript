import { AppLink } from "@/components/AppLink/AppLink";
import { IMG } from "@/assets/assets";
import { NAV_LINKS } from "@/lib/navLinks";
import "./SiteFooter.css";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer relative z-20 border-t-2 border-black/70">
      <span className="site-footer-rule block h-[2px] w-full" />
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-9 px-6 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-start gap-4">
          <img
            src={IMG.seal}
            alt="Sello de cera del gremio"
            loading="lazy"
            width={736}
            height={912}
            className="w-[62px] shrink-0"
          />
          <div>
            <p className="font-display text-[22px] font-bold text-gold">Mercatum Regni</p>
            <p className="mt-2 max-w-[280px] font-body text-[16px] leading-[1.6] text-parchment/70">
              Gremio de mercaderes y artesanos al servicio del reino desde el año 1024.
            </p>
          </div>
        </div>

        <nav aria-label="Enlaces del pie">
          <h2 className="font-display text-[14px] tracking-[0.18em] uppercase text-parchment/60">
            Secciones
          </h2>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="font-body text-[17px] text-parchment/85 underline-offset-4 transition-colors hover:text-gold hover:underline focus-visible:text-gold focus-visible:outline-none focus-visible:underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-[14px] tracking-[0.18em] uppercase text-parchment/60">
            Cartas y fuentes
          </h2>
          <ul className="mt-4 space-y-2 font-body text-[16px] text-parchment/70">
            <li>
              Mercancías y súbditos:{" "}
              <a
                href="https://fakeapi.platzi.com/"
                target="_blank"
                rel="noreferrer"
                className="text-gold/90 underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
              >
                FakeAPI Platzi
              </a>
            </li>
            <li>
              Parte del cielo:{" "}
              <a
                href="https://open-meteo.com/en/docs"
                target="_blank"
                rel="noreferrer"
                className="text-gold/90 underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
              >
                Open-Meteo
              </a>
            </li>
            <li>Forjado con React, TanStack Start y Tailwind.</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/20 px-6 py-4">
        <p className="text-center font-body text-[15px] text-parchment/55">
          © {year} Mercatum Regni · Anno Domini MXXIV · Todos los fueros reservados
        </p>
      </div>
    </footer>
  );
}
