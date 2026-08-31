import { createFileRoute } from "@tanstack/react-router";
import Vendors from "@/pages/vendedores/Vendors";

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
  component: Vendors,
});
