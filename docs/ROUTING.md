# Routing

## Runtime router

The application runs on **TanStack Start**, whose file-based router
(**TanStack Router**) is a fixed part of the framework: it drives SSR, the
generated route tree, per-page metadata, and the build/deploy pipeline.
This is a deliberate, documented exception to the team standard
(react-router-dom): swapping the router would mean replacing the framework
itself and losing SSR.

## Application routes

| URL | Route file | Page |
| --- | --- | --- |
| `/` | `src/routes/index.jsx` | `src/pages/home/Home.jsx` |
| `/vendedores` | `src/routes/vendedores.jsx` | `src/pages/vendedores/Vendors.jsx` |
| `/historia` | `src/routes/historia.jsx` | `src/pages/historia/History.jsx` |
| `/tienda` | `src/routes/tienda.jsx` | `src/pages/tienda/Shop.jsx` |
| `/usuarios` | `src/routes/usuarios.jsx` | `src/pages/usuarios/Users.jsx` |

Route files are thin definitions (`head` metadata + page component) only.
All navigation data lives in `src/lib/navLinks.js`.

## AppLink — isolated navigation

`src/components/AppLink/AppLink.jsx` is the single place where application
code touches the router:

- `AppLink` — plain internal link (`to`, `className`, `onClick`, `aria-label`, `children`).
- `AppNavLink` — link with active-route styling (`exact`, `activeClassName`,
  or a function child receiving `isActive`).

All application components (header, footer, hero, pages) use these wrappers;
only framework files (`src/router.tsx`, `src/routeTree.gen.ts`,
`src/routes/__root.jsx`) import TanStack Router directly.

## Portability mapping

If the framework ever changes, only `AppLink.jsx` needs rewriting:

| TanStack Router | react-router-dom |
| --- | --- |
| `Link to` | `Link to` |
| `AppNavLink` (active state) | `NavLink` with `className={({ isActive }) => ...}` |
| `activeOptions={{ exact: true }}` | `NavLink end` |
| `Outlet` in `__root.jsx` | `Outlet` in a layout route |
| `head()` per route | manual `<title>`/meta helper |
