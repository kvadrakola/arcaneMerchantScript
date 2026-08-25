import { createFileRoute } from "@tanstack/react-router";
import { PageShell, ParchmentPanel } from "@/components/medieval/PageShell";
import { InkButton, PageTitle, ParchmentCard, SealDivider } from "@/components/medieval/parts";
import { IMG } from "@/components/medieval/assets";

export const Route = createFileRoute("/tienda")({
  head: () => ({
    meta: [
      { title: "Tienda del Reino — Mercatum Regni" },
      {
        name: "description",
        content:
          "Catálogo de armas, arneses, libros iluminados y remedios de botica del gremio Mercatum Regni.",
      },
      { property: "og:title", content: "Tienda del Reino — Mercatum Regni" },
      {
        property: "og:description",
        content: "Armas, arneses, libros iluminados y remedios de botica del reino.",
      },
    ],
  }),
  component: TiendaPage,
});

const CATEGORIAS = ["Todo", "Armería", "Arneses", "Escritos", "Botica"];

const PRODUCTOS = [
  { n: "Espada larga de Aldoria", c: "Armería", p: 240, img: 0, v: "Casa Ferrata" },
  { n: "Yelmo con penacho", c: "Arneses", p: 185, img: 1, v: "Casa Ferrata" },
  { n: "Códice iluminado", c: "Escritos", p: 320, img: 2, v: "Scriptorium Aureum" },
  { n: "Elixir de la villa", c: "Botica", p: 46, img: 3, v: "Botica de Sant Roc" },
  { n: "Daga de cinto", c: "Armería", p: 95, img: 0, v: "Casa Ferrata" },
  { n: "Breviario de viaje", c: "Escritos", p: 130, img: 2, v: "Scriptorium Aureum" },
  { n: "Bálsamo de romero", c: "Botica", p: 28, img: 3, v: "Botica de Sant Roc" },
  { n: "Capacete de guardia", c: "Arneses", p: 150, img: 1, v: "Taller Corvina" },
];

function TiendaPage() {
  return (
    <PageShell>
      <ParchmentPanel>
        <div className="px-10 py-14 lg:px-16">
          <PageTitle>Tienda</PageTitle>

          <nav className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {CATEGORIAS.map((c, i) => (
              <span
                key={c}
                className={`shrink-0 whitespace-nowrap border px-5 py-1.5 font-display text-[14px] tracking-[0.14em] uppercase ${
                  i === 0
                    ? "border-[oklch(0.3_0.03_55)] bg-accent text-parchment"
                    : "border-[oklch(0.34_0.04_55_/_0.6)] text-ink"
                }`}
              >
                {c}
              </span>
            ))}
          </nav>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {PRODUCTOS.map((p) => (
              <ParchmentCard key={p.n} className="flex flex-col">
                <div className="border border-[oklch(0.36_0.04_55_/_0.5)] bg-[oklch(0.9_0.04_84_/_0.6)]">
                  <img
                    src={IMG.products[p.img]}
                    alt={p.n}
                    loading="lazy"
                    width={640}
                    height={640}
                    className="aspect-square w-full object-cover"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </div>
                <h2 className="mt-4 font-display text-[19px] leading-snug font-bold text-ink">
                  {p.n}
                </h2>
                <p className="mt-1 font-body text-[17px] text-ink-soft italic">{p.v}</p>
                <div className="mt-3 ink-rule" />
                <p className="mt-3 font-display text-[20px] text-ink">
                  {p.p} <span className="text-[15px] tracking-wider">monedas de oro</span>
                </p>
                <div className="mt-4">
                  <InkButton>Añadir al carro</InkButton>
                </div>
              </ParchmentCard>
            ))}
          </div>

          <div className="mt-16 pb-4">
            <SealDivider />
          </div>
        </div>
      </ParchmentPanel>
    </PageShell>
  );
}
