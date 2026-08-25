import { createFileRoute } from "@tanstack/react-router";
import { PageShell, ParchmentPanel } from "@/components/medieval/PageShell";
import { InkButton, PageTitle, ParchmentCard, SealDivider } from "@/components/medieval/parts";
import { IMG } from "@/components/medieval/assets";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mercatum Regni — Mercado del Reino" },
      {
        name: "description",
        content:
          "Mercatum Regni: gremio de mercaderes y artesanos con productos extraordinarios para todo el reino desde 1024.",
      },
      { property: "og:title", content: "Mercatum Regni — Mercado del Reino" },
      {
        property: "og:description",
        content: "Gremio de mercaderes y artesanos al servicio del reino desde 1024.",
      },
    ],
  }),
  component: HomePage,
});

const VIRTUDES = [
  { t: "Honor", d: "Cada trato se cierra con palabra dada y sello de cera." },
  { t: "Calidad", d: "Obras de artesanos examinadas por el gremio del reino." },
  { t: "Confianza", d: "Miles de clientes en villas, burgos y castillos." },
];

function HomePage() {
  return (
    <PageShell>
      <ParchmentPanel>
        <div className="px-10 py-14 lg:px-16">
          <PageTitle>Mercatum Regni</PageTitle>

          <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_46%]">
            <div className="max-w-[560px] space-y-7 font-body text-[21px] leading-[1.75]">
              <p>
                Bienvenido al mercado del reino, donde mercaderes y artesanos exponen sus
                mejores obras bajo el amparo del gremio.
              </p>
              <p>
                Armas forjadas, arneses, libros iluminados y remedios de botica esperan al
                viajero que cruce nuestras puertas.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <InkButton>Visitar la tienda</InkButton>
                <InkButton variant="outline">Conocer el gremio</InkButton>
              </div>
            </div>

            <img
              src={IMG.market}
              alt="Grabado de un puesto de mercado medieval"
              width={1024}
              height={768}
              className="w-full border-2 border-[oklch(0.36_0.04_55_/_0.55)]"
              style={{ mixBlendMode: "multiply", opacity: 0.95 }}
            />
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {VIRTUDES.map((v) => (
              <ParchmentCard key={v.t}>
                <h2 className="font-display text-[22px] font-bold tracking-wide text-ink">
                  {v.t}
                </h2>
                <p className="mt-3 font-body text-[18px] leading-[1.6] text-ink-soft">{v.d}</p>
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
