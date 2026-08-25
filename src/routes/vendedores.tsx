import { createFileRoute } from "@tanstack/react-router";
import { PageShell, ParchmentPanel } from "@/components/medieval/PageShell";
import { InkButton, PageTitle, ParchmentCard, SealDivider } from "@/components/medieval/parts";

export const Route = createFileRoute("/vendedores")({
  head: () => ({
    meta: [
      { title: "Vendedores del Gremio — Mercatum Regni" },
      {
        name: "description",
        content:
          "Maestros herreros, escribas, boticarios y talabarteros admitidos en el gremio de Mercatum Regni.",
      },
      { property: "og:title", content: "Vendedores del Gremio — Mercatum Regni" },
      {
        property: "og:description",
        content: "Maestros artesanos admitidos en el gremio de Mercatum Regni.",
      },
    ],
  }),
  component: VendedoresPage,
});

const VENDEDORES = [
  { n: "Casa Ferrata", o: "Maestro herrero", v: "Villa de Aldoria", a: 1031 },
  { n: "Scriptorium Aureum", o: "Escriba e iluminador", v: "Burgo de Valmar", a: 1044 },
  { n: "Botica de Sant Roc", o: "Boticario", v: "Puerto de Mirena", a: 1052 },
  { n: "Taller Corvina", o: "Talabartero", v: "Villa de Aldoria", a: 1057 },
  { n: "Fundición Ordoño", o: "Fundidor de campanas", v: "Monte Alcor", a: 1063 },
  { n: "Telares del Norte", o: "Tejedor de paños", v: "Bajo Ríoseco", a: 1068 },
];

function VendedoresPage() {
  return (
    <PageShell>
      <ParchmentPanel>
        <div className="px-10 py-14 lg:px-16">
          <PageTitle>Vendedores</PageTitle>

          <p className="mx-auto mt-8 max-w-[720px] text-center font-body text-[20px] leading-[1.7] text-ink-soft">
            Maestros y talleres admitidos por el gremio, cada uno con su marca y su juramento
            registrado en los libros del reino.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {VENDEDORES.map((v) => (
              <ParchmentCard key={v.n}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-[23px] leading-tight font-bold text-ink">
                      {v.n}
                    </h2>
                    <p className="mt-1 font-body text-[18px] text-ink-soft italic">{v.o}</p>
                  </div>
                  <Crest />
                </div>
                <div className="mt-4 ink-rule" />
                <dl className="mt-4 space-y-1.5 font-body text-[18px] text-ink">
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-soft">Villa</dt>
                    <dd>{v.v}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-soft">Admitido</dt>
                    <dd>Anno {v.a}</dd>
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
    <svg width="40" height="46" viewBox="0 0 40 46" className="shrink-0 text-ink/70" aria-hidden="true">
      <path d="M2 2h36v24c0 10-9 15-18 18C11 41 2 36 2 26V2z" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 14h36M20 2v40" stroke="currentColor" strokeWidth="0.8" opacity=".6" />
      <path d="M20 20l4 5-4 5-4-5z" fill="currentColor" opacity=".65" />
    </svg>
  );
}
