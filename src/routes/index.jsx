import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageShell, ParchmentPanel } from "@/components/medieval/PageShell";
import { InkButton, InkNotice, PageTitle, ParchmentCard, SealDivider, Vellum } from "@/components/medieval/parts";
import { HeroCarousel,               } from "@/components/medieval/HeroCarousel";
import { IMG } from "@/components/medieval/assets";
import { firstImage, isPresentable, listProducts } from "@/lib/platzi";

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

/** Used only when the remote market cannot be reached. */
const HERO_FALLBACK             = [
  { id: "f1", title: "Espada larga de Aldoria", price: 240, image: IMG.products[0] , category: "Armería" },
  { id: "f2", title: "Códice iluminado", price: 320, image: IMG.products[2] , category: "Escritos" },
  { id: "f3", title: "Yelmo con penacho", price: 185, image: IMG.products[1] , category: "Arneses" },
  { id: "f4", title: "Capacete de guardia", price: 150, image: IMG.products[1] , category: "Arneses" },
  { id: "f5", title: "Elixir de la villa", price: 46, image: IMG.products[3] , category: "Botica" },
];

function HomePage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["products", "hero"],
    queryFn: () => listProducts(50),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const clean = data?.filter(isPresentable) ?? [];

  const top             = clean.length > 0
    ? [...clean]
        .sort((a, b) => b.price - a.price)
        .slice(0, 5)
        .map((p, i) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          image: firstImage(p.images, IMG.products[i % IMG.products.length] ),
          category: p.category?.name ?? "Mercancía",
        }))
    : HERO_FALLBACK;

  return (
    <PageShell>
      <ParchmentPanel>
        <div className="px-5 py-10 sm:px-8 lg:px-16 lg:py-14">
          <PageTitle>Mercatum Regni</PageTitle>

          <div className="mt-10">
            {isPending ? (
              <InkNotice title="Desplegando el pergamino">
                El heraldo trae las mercancías más preciadas del reino…
              </InkNotice>
            ) : (
              <>
                <Vellum className="mb-5">
                  <h2 className="text-center font-display text-[16px] font-semibold tracking-[0.18em] uppercase text-ink">
                    Las cinco mercancías más preciadas
                  </h2>
                </Vellum>
                <HeroCarousel items={top} />
                {isError && (
                  <p className="mt-4 text-center font-body text-[16px] text-ink-soft italic">
                    El mensajero del mercado no respondió; se muestran las mercancías del
                    archivo del gremio.
                  </p>
                )}
              </>
            )}
          </div>

          <div className="mt-14 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_46%]">
            <Vellum className="max-w-[560px] space-y-7 font-body text-[19px] leading-[1.75] text-ink sm:text-[21px]">
              <p>
                Bienvenido al mercado del reino, donde mercaderes y artesanos exponen sus
                mejores obras bajo el amparo del gremio.
              </p>
              <p>
                Armas forjadas, arneses, libros iluminados y remedios de botica esperan al
                viajero que cruce nuestras puertas.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/tienda" className="focus-visible:outline-none">
                  <InkButton>Visitar la tienda</InkButton>
                </Link>
                <Link to="/vendedores" className="focus-visible:outline-none">
                  <InkButton variant="outline">Conocer el gremio</InkButton>
                </Link>
              </div>
            </Vellum>

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
