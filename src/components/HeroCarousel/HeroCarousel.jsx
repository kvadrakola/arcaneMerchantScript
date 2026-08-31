import { useEffect, useState } from "react";
import { AppLink } from "@/components/AppLink/AppLink";
import { GoldFleur } from "@/components/Ornament/Ornament";
import { InkButton } from "@/components/InkButton/InkButton";
import { IMG } from "@/assets/assets";
import "./HeroCarousel.css";

/** Dynamic banner showing the most expensive wares of the market. */
export function HeroCarousel({ items }) {
  const [index, setIndex] = useState(0);
  const total = items.length;

  useEffect(() => {
    if (total < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 6000);
    return () => clearInterval(id);
  }, [total]);

  if (total === 0) return null;
  const item = items[Math.min(index, total - 1)];

  return (
    <section
      aria-label="Mercancías más preciadas"
      className="hero-carousel relative mx-auto w-[calc(100%-32px)] border-2 border-[oklch(0.36_0.04_55_/_0.6)] bg-[oklch(0.85_0.05_80_/_0.7)] p-4 sm:w-full sm:max-w-[1000px] sm:p-6"
    >
      <span className="pointer-events-none absolute inset-[6px] border border-[oklch(0.36_0.04_55_/_0.35)]" />

      <div className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
        <div className="border border-[oklch(0.36_0.04_55_/_0.5)] bg-[oklch(0.9_0.04_84_/_0.6)]">
          <img
            key={item.image}
            src={item.image}
            alt={item.title}
            width={640}
            height={640}
            className="engraved-image aspect-square w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = IMG.products[index % IMG.products.length];
            }}
          />
        </div>

        <div>
          <p className="flex items-center gap-2 font-display text-[13px] tracking-[0.18em] uppercase text-ink-soft">
            <GoldFleur />
            {item.category}
          </p>
          <h2 className="mt-3 font-display text-[26px] leading-tight font-bold text-ink sm:text-[32px]">
            {item.title}
          </h2>
          <p className="mt-4 font-display text-[24px] text-ink">
            {Math.round(item.price)}{" "}
            <span className="text-[15px] tracking-wider">monedas de oro</span>
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <AppLink to="/tienda" className="focus-visible:outline-none">
              <InkButton>Ver en la tienda</InkButton>
            </AppLink>
            <div className="flex items-center gap-2">
              <ArrowButton
                label="Mercancía anterior"
                onClick={() => setIndex((i) => (i - 1 + total) % total)}
                dir="left"
              />
              <ArrowButton
                label="Mercancía siguiente"
                onClick={() => setIndex((i) => (i + 1) % total)}
                dir="right"
              />
            </div>
          </div>

          <div
            className="mt-5 flex items-center gap-2"
            role="tablist"
            aria-label="Mercancías destacadas"
          >
            {items.map((it, i) => (
              <button
                key={it.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Mostrar ${it.title}`}
                onClick={() => setIndex(i)}
                className={`h-[10px] w-[10px] rotate-45 border border-[oklch(0.34_0.04_55_/_0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.3_0.03_55)] ${
                  i === index ? "bg-accent" : "bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowButton({ label, onClick, dir }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center border-2 border-[oklch(0.34_0.04_55_/_0.7)] text-ink transition-colors hover:bg-[oklch(0.3_0.03_55_/_0.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.3_0.03_55)]"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        {dir === "left" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
      </svg>
    </button>
  );
}
