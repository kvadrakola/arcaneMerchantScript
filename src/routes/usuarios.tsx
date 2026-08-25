import { createFileRoute } from "@tanstack/react-router";
import { PageShell, ParchmentPanel } from "@/components/medieval/PageShell";
import { InkButton, PageTitle, SealDivider } from "@/components/medieval/parts";

export const Route = createFileRoute("/usuarios")({
  head: () => ({
    meta: [
      { title: "Registro de Usuarios — Mercatum Regni" },
      {
        name: "description",
        content:
          "Libro de registro de los súbditos inscritos en Mercatum Regni: rango, villa y estado de la cuenta.",
      },
      { property: "og:title", content: "Registro de Usuarios — Mercatum Regni" },
      {
        property: "og:description",
        content: "Libro de registro de los súbditos inscritos en Mercatum Regni.",
      },
    ],
  }),
  component: UsuariosPage,
});

const USUARIOS = [
  { n: "Aldric de Valmar", r: "Mayordomo", v: "Burgo de Valmar", e: "Activo", d: "1024" },
  { n: "Beatriz Ferrata", r: "Mercader", v: "Villa de Aldoria", e: "Activo", d: "1031" },
  { n: "Gonzalo el Escriba", r: "Escriba", v: "Burgo de Valmar", e: "Activo", d: "1044" },
  { n: "Inés de Mirena", r: "Boticaria", v: "Puerto de Mirena", e: "Suspendido", d: "1052" },
  { n: "Rodrigo Corvina", r: "Talabartero", v: "Villa de Aldoria", e: "Activo", d: "1057" },
  { n: "Ordoño el Fundidor", r: "Mercader", v: "Monte Alcor", e: "Activo", d: "1063" },
  { n: "Marta del Telar", r: "Tejedora", v: "Bajo Ríoseco", e: "Pendiente", d: "1068" },
];

function UsuariosPage() {
  return (
    <PageShell>
      <ParchmentPanel>
        <div className="px-10 py-14 lg:px-16">
          <PageTitle>Usuarios</PageTitle>

          <p className="mx-auto mt-8 max-w-[720px] text-center font-body text-[20px] leading-[1.7] text-ink-soft">
            Libro de registro de los súbditos inscritos en el mercado del reino.
          </p>

          <div
            className="mt-12 border-2 border-[oklch(0.36_0.04_55_/_0.55)] bg-[oklch(0.86_0.05_80_/_0.6)] p-1.5"
            style={{ boxShadow: "inset 0 0 26px oklch(0.28 0.035 55 / 0.22)" }}
          >
            <table className="w-full border-collapse font-body text-[19px] text-ink">
              <thead>
                <tr className="border-b-2 border-[oklch(0.34_0.04_55_/_0.6)]">
                  {["Nombre", "Rango", "Villa", "Inscrito", "Estado", "Sello"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-left font-display text-[14px] tracking-[0.16em] uppercase text-ink"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {USUARIOS.map((u, i) => (
                  <tr
                    key={u.n}
                    className={`border-b border-[oklch(0.34_0.04_55_/_0.3)] ${
                      i % 2 === 1 ? "bg-[oklch(0.83_0.05_78_/_0.45)]" : ""
                    }`}
                  >
                    <td className="px-5 py-3.5">{u.n}</td>
                    <td className="px-5 py-3.5 italic text-ink-soft">{u.r}</td>
                    <td className="px-5 py-3.5">{u.v}</td>
                    <td className="px-5 py-3.5">Anno {u.d}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`border px-3 py-1 font-display text-[12px] tracking-[0.14em] uppercase ${
                          u.e === "Activo"
                            ? "border-[oklch(0.4_0.06_140_/_0.6)] text-[oklch(0.36_0.07_140)]"
                            : u.e === "Suspendido"
                              ? "border-[oklch(0.4_0.14_26_/_0.6)] text-[oklch(0.4_0.14_26)]"
                              : "border-[oklch(0.4_0.06_80_/_0.6)] text-[oklch(0.42_0.07_75)]"
                        }`}
                      >
                        {u.e}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <InkButton variant="outline">Revisar</InkButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-16 pb-4">
            <SealDivider />
          </div>
        </div>
      </ParchmentPanel>
    </PageShell>
  );
}
