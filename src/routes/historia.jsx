import { createFileRoute } from "@tanstack/react-router";
import History from "@/pages/historia/History";

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
  component: History,
});
