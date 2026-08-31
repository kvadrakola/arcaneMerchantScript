import { PageShell } from "@/components/PageShell/PageShell";
import { ParchmentPanel } from "@/components/ParchmentPanel/ParchmentPanel";
import { InkButton } from "@/components/InkButton/InkButton";
import { PageTitle } from "@/components/PageTitle/PageTitle";
import { ParchmentCard } from "@/components/ParchmentCard/ParchmentCard";
import { SealDivider } from "@/components/SealDivider/SealDivider";
import { Vellum } from "@/components/Vellum/Vellum";
import { IMG } from "@/assets/assets";

/** Portraits reuse the guild's own engravings so no image can break. */
const GUILD_VENDORS = [
  {
    workshop: "Casa Ferrata",
    master: "Beatriz Ferrata",
    craft: "Maestra herrera",
    town: "Villa de Aldoria",
    admittedYear: 1031,
    portrait: IMG.products[0],
  },
  {
    workshop: "Scriptorium Aureum",
    master: "Gonzalo el Escriba",
    craft: "Escriba e iluminador",
    town: "Burgo de Valmar",
    admittedYear: 1044,
    portrait: IMG.products[2],
  },
  {
    workshop: "Botica de Sant Roc",
    master: "Inés de Mirena",
    craft: "Boticaria",
    town: "Puerto de Mirena",
    admittedYear: 1052,
    portrait: IMG.products[3],
  },
  {
    workshop: "Taller Corvina",
    master: "Rodrigo Corvina",
    craft: "Talabartero",
    town: "Villa de Aldoria",
    admittedYear: 1057,
    portrait: IMG.products[1],
  },
  {
    workshop: "Fundición Ordoño",
    master: "Ordoño el Fundidor",
    craft: "Fundidor de campanas",
    town: "Monte Alcor",
    admittedYear: 1063,
    portrait: IMG.market,
  },
  {
    workshop: "Telares del Norte",
    master: "Marta del Telar",
    craft: "Tejedora de paños",
    town: "Bajo Ríoseco",
    admittedYear: 1068,
    portrait: IMG.town,
  },
];

function Vendors() {
  return (
    <PageShell>
      <ParchmentPanel>
        <div className="px-5 py-10 sm:px-8 lg:px-16 lg:py-14">
          <PageTitle>Vendedores</PageTitle>

          <Vellum className="mx-auto mt-8 max-w-[720px] text-center font-body text-[19px] leading-[1.7] text-ink-soft sm:text-[20px]">
            <p>
              Maestros y talleres admitidos por el gremio, con su retrato, su nombre y el juramento
              registrado en los libros del reino.
            </p>
          </Vellum>

          <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
            {GUILD_VENDORS.map((vendor) => (
              <ParchmentCard key={vendor.workshop}>
                <div className="flex items-start gap-4">
                  <img
                    src={vendor.portrait}
                    alt={`Retrato de ${vendor.master}, ${vendor.craft.toLowerCase()}`}
                    loading="lazy"
                    width={640}
                    height={640}
                    className="h-[96px] w-[96px] shrink-0 border-2 border-[oklch(0.36_0.04_55_/_0.6)] object-cover"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <div className="min-w-0">
                    <h2 className="font-display text-[22px] leading-tight font-bold text-ink">
                      {vendor.master}
                    </h2>
                    <p className="mt-1 font-body text-[18px] text-ink-soft italic">
                      {vendor.craft}
                    </p>
                    <p className="mt-2 flex items-center gap-2 font-display text-[13px] tracking-[0.14em] uppercase text-ink">
                      <Crest />
                      {vendor.workshop}
                    </p>
                  </div>
                </div>
                <div className="mt-4 ink-rule" />
                <dl className="mt-4 space-y-1.5 font-body text-[18px] text-ink">
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-soft">Villa</dt>
                    <dd>{vendor.town}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-soft">Admitido</dt>
                    <dd>Anno {vendor.admittedYear}</dd>
                  </div>
                </dl>
                <div className="mt-5">
                  <InkButton variant="outline" aria-label={`Ver el taller de ${vendor.workshop}`}>
                    Ver taller
                  </InkButton>
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
    <svg
      width="18"
      height="21"
      viewBox="0 0 40 46"
      className="shrink-0 text-ink/70"
      aria-hidden="true"
    >
      <path
        d="M2 2h36v24c0 10-9 15-18 18C11 41 2 36 2 26V2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M20 20l4 5-4 5-4-5z" fill="currentColor" opacity=".65" />
    </svg>
  );
}

export default Vendors;
