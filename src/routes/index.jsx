import { createFileRoute } from "@tanstack/react-router";
import Home from "@/pages/home/Home";

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
  component: Home,
});
