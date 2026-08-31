import { createFileRoute } from "@tanstack/react-router";
import Users from "@/pages/usuarios/Users";

export const Route = createFileRoute("/usuarios")({
  head: () => ({
    meta: [
      { title: "Registro de Usuarios — Mercatum Regni" },
      {
        name: "description",
        content:
          "Libro de registro de los súbditos inscritos en Mercatum Regni: rango, correo y estado de la cuenta.",
      },
      { property: "og:title", content: "Registro de Usuarios — Mercatum Regni" },
      {
        property: "og:description",
        content: "Libro de registro de los súbditos inscritos en Mercatum Regni.",
      },
    ],
  }),
  component: Users,
});
