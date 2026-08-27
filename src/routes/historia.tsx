import { createFileRoute } from "@tanstack/react-router";
import { PageShell, ParchmentPanel } from "@/components/medieval/PageShell";
import { PageTitle, SealDivider, Vellum } from "@/components/medieval/parts";
import { IMG } from "@/components/medieval/assets";

export const Route = createFileRoute("/historia")({
  head: () => ({
    meta: [
      { title: "Nuestra Historia — Mercatum Regni" },
      {
        name: "description",
        content:
          "La crónica de Mercatum Regni: mercaderes y artesanos unidos desde el año 1024 al servicio del reino.",
      },
      { property: "og:title", content: "Nuestra Historia — Mercatum Regni" },
      {
        property: "og:description",
        content: "Mercaderes y artesanos unidos desde el año 1024 al servicio del reino.",
      },
    ],
  }),
  component: HistoriaPage,
});

function HistoriaPage() {
  return (
    <PageShell>
      <ParchmentPanel>
        <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_44%]">
          <div className="flex flex-col justify-between px-5 py-10 sm:px-8 lg:py-14 lg:pl-16">
            <div>
              <PageTitle>Nuestra Historia</PageTitle>

              <Vellum className="mx-auto mt-10 max-w-[560px] space-y-7 text-center font-body text-[19px] sm:text-[21px] leading-[1.75] text-ink">
                <p>
                  Mercatum Regni nace en el año 1024, cuando un grupo de comerciantes y
                  artesanos decidieron unir sus fuerzas para ofrecer productos
                  extraordinarios a todo el reino.
                </p>
                <p>
                  Inspirados por los valores de honor, calidad y confianza, hemos recorrido un
                  largo camino para convertirnos en la tienda preferida de miles de clientes.
                </p>
                <p>Hoy, seguimos escribiendo nuestra historia contigo.</p>
              </Vellum>
            </div>

            <div className="mt-14">
              <SealDivider />
            </div>
          </div>

          <div className="relative hidden lg:block">
            <img
              src={IMG.town}
              alt="Grabado de una villa medieval con su castillo"
              width={1280}
              height={1024}
              className="h-full w-full object-cover"
              style={{ mixBlendMode: "multiply", opacity: 0.92 }}
            />
            <span
              className="pointer-events-none absolute inset-y-0 left-0 w-40"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.88 0.045 82) 0%, transparent 100%)",
              }}
            />
          </div>
        </div>
      </ParchmentPanel>
    </PageShell>
  );
}
