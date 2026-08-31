import { createFileRoute } from "@tanstack/react-router";
import Shop from "@/pages/tienda/Shop";

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
  component: Shop,
});
