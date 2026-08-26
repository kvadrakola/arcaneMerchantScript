import { createFileRoute } from "@tanstack/react-router";
import { PageShell, ParchmentPanel } from "@/components/medieval/PageShell";
import { InkButton, PageTitle, ParchmentCard, SealDivider, Vellum } from "@/components/medieval/parts";
import { IMG } from "@/components/medieval/assets";

export const Route = createFileRoute("/vendedores")({
  head: () => ({
    meta: [
      { title: "Vendedores del Gremio — Mercatum Regni" },
      {
        name: "description",
        content:
          "Maestros herreros, escribas, boticarios y talabarteros admitidos en el gremio de Mercatum Regni, con retrato y nombre.",
      },
      { property: "og:title", content: "Vendedores del Gremio — Mercatum Regni" },
      {
        property: "og:description",
        content: "Maestros artesanos del gremio de Mercatum Regni, con retrato y nombre.",
      },
    ],
  }),
  component: VendedoresPage,
});

interface Vendedor {
  nombre: string;
  maestro: string;
  oficio: string;
  villa: string;
  admitido: number;
  retrato: string;
}

/** Portraits reuse the guild's own engravings so no image can break. */
const VENDEDORES: Vendedor[] = [
  {
    nombre: "Casa Ferrata",
    maestro: "Beatriz Ferrata",
    oficio: "Maestra herrera",
    villa: "Villa de Aldoria",
    admitido: 1031,
    retrato: IMG.products[0]!,
  },
  {
    nombre: "Scriptorium Aureum",
    maestro: "Gonzalo el Escriba",
    oficio: "Escriba e iluminador",
    villa: "Burgo de Valmar",
    admitido: 1044,
    retrato: IMG.products[2]!,
  },
  {
    nombre: "Botica de Sant Roc",
    maestro: "Inés de Mirena",
    oficio: "Boticaria",
    villa: "Puerto de Mirena",
    admitido: 1052,
    retrato: IMG.products[3]!,
  },
  {
    nombre: "Taller Corvina",
    maestro: "Rodrigo Corvina",
    oficio: "Talabartero",
    villa: "Villa de Aldoria",
    admitido: 1057,
    retrato: IMG.products[1]!,
  },
  {
    nombre: "Fundición Ordoño",
    maestro: "Ordoño el Fundidor",
    oficio: "Fundidor de campanas",
    villa: "Monte Alcor",
    admitido: 1063,
    retrato: IMG.market,
  },
  {
    nombre: "Telares del Norte",
    maestro: "Marta del Telar",
    oficio: "Tejedora de paños",
    villa: "Bajo Ríoseco",
    admitido: 1068,
    retrato: IMG.town,
  },
];

function VendedoresPage() {
  return (
    <PageShell>
      <ParchmentPanel>
        <div className="px-5 py-10 sm:px-8 lg:px-16 lg:py-14">
          <PageTitle>Vendedores</PageTitle>

          <Vellum className="mx-auto mt-8 max-w-[720px] text-center font-body text-[19px] leading-[1.7] text-ink-soft sm:text-[20px]">
            <p>
              Maestros y talleres admitidos por el gremio, con su retrato, su nombre y el
              juramento registrado en los libros del reino.
            </p>
          </Vellum>

          <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
            {VENDEDORES.map((v) => (
              <ParchmentCard key={v.nombre}>
                <div className="flex items-start gap-4">
                  <img
                    src={v.retrato}
                    alt={`Retrato de ${v.maestro}, ${v.oficio.toLowerCase()}`}
                    loading="lazy"
                    width={640}
                    height={640}
                    className="h-[96px] w-[96px] shrink-0 border-2 border-[oklch(0.36_0.04_55_/_0.6)] object-cover"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <div className="min-w-0">
                    <h2 className="font-display text-[22px] leading-tight font-bold text-ink">
                      {v.maestro}
                    </h2>
                    <p className="mt-1 font-body text-[18px] text-ink-soft italic">{v.oficio}</p>
                    <p className="mt-2 flex items-center gap-2 font-display text-[13px] tracking-[0.14em] uppercase text-ink">
                      <Crest />
                      {v.nombre}
                    </p>
                  </div>
                </div>
                <div className="mt-4 ink-rule" />
                <dl className="mt-4 space-y-1.5 font-body text-[18px] text-ink">
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-soft">Villa</dt>
                    <dd>{v.villa}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-soft">Admitido</dt>
                    <dd>Anno {v.admitido}</dd>
                  </div>
                </dl>
                <div className="mt-5">
                  <InkButton variant="outline">Ver taller</InkButton>
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

function Crest() {
  return (
    <svg width="18" height="21" viewBox="0 0 40 46" className="shrink-0 text-ink/70" aria-hidden="true">
      <path d="M2 2h36v24c0 10-9 15-18 18C11 41 2 36 2 26V2z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l4 5-4 5-4-5z" fill="currentColor" opacity=".65" />
    </svg>
  );
}
