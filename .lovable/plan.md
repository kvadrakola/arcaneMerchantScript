# B6 — Routing migration feasibility (react-router-dom vs TanStack Router)

Read-only analysis. No files were changed.

## Feasibility verdict

**NOT RECOMMENDED** as a full migration. **SAFE** as the hybrid documented below.

Reason: routing here is not a library choice the app makes — it is the framework. TanStack Start's SSR entry, the Vite plugin (`@lovable.dev/vite-tanstack-config` → `tanstackStart`), head/meta management, and the generated `src/routeTree.gen.ts` all require TanStack Router. Swapping in react-router-dom means removing TanStack Start, i.e. rebuilding the build/SSR/deploy pipeline this Lovable project is published with.

## Current routing map

| URL | Route file | Page component |
| --- | --- | --- |
| `/` | `src/routes/index.jsx` | `src/pages/home/Home.jsx` |
| `/vendedores` | `src/routes/vendedores.jsx` | `pages/vendedores/Vendors.jsx` |
| `/historia` | `src/routes/historia.jsx` | `pages/historia/History.jsx` |
| `/tienda` | `src/routes/tienda.jsx` | `pages/tienda/Shop.jsx` |
| `/usuarios` | `src/routes/usuarios.jsx` | `pages/usuarios/Users.jsx` |

Flat routes, no dynamic params, no loaders, no search-param validation, no nested layouts beyond the root. All data fetching happens inside page components (Axios + TanStack Query), not in router loaders. That is the single most important finding: **the router is only doing URL→component mapping plus links.**

## Files that touch routing

Application routing (portable, small surface):
- `src/routes/index.jsx`, `vendedores.jsx`, `historia.jsx`, `tienda.jsx`, `usuarios.jsx` — `createFileRoute(...)({ head, component })` only.
- `src/routes/__root.jsx` — `createRootRouteWithContext`, `Outlet`, `HeadContent`, `Scripts`, `useRouter().invalidate()`, `<Link to="/">`, shell + 404 + error component.
- `src/components/SiteNav/SiteNav.jsx` — `Link` with `activeOptions` and the `{({ isActive }) => ...}` render-prop children (TanStack-specific API; react-router uses `NavLink` + `className={({isActive})=>...}` and cannot put arbitrary children render-props).
- `src/components/SiteFooter/SiteFooter.jsx`, `src/components/HeroCarousel/HeroCarousel.jsx`, `src/pages/home/Home.jsx` — plain `<Link to>`, trivially portable.
- `src/lib/navLinks.js` — already library-agnostic.

Framework infrastructure (NOT application routing):
- `src/router.tsx` (`createRouter` + routeTree + query context), `src/routeTree.gen.ts` (generated, never hand-edited), `src/start.ts` (Start instance, CSRF + error middleware), `src/server.ts` (Cloudflare-worker SSR fetch entry, error normalization), `vite.config.ts` (`tanstackStart`).

No `useNavigate`, `useLocation`, `useParams`, `useSearch`, or loaders exist anywhere in app code — so a future migration has no data-loading rewrite at all.

## Can react-router-dom coexist inside TanStack Start?

Technically yes, but only in a way that is worse than either option: you would keep one TanStack splat route rendering a react-router `BrowserRouter`/`RouterProvider` inside it. Consequences: double routing, SSR breakage or forced `ssr: false`, loss of per-route `head()` metadata (SEO regression on all five pages), no server-rendered HTML for crawlers, and it violates the Lovable platform guidance for this stack. Not recommended.

## Cost of a true full migration

Replacing TanStack Start means: removing `tanstackStart` from Vite, deleting `src/server.ts` / `src/start.ts` / `src/router.tsx` / `routeTree.gen.ts`, adding `index.html` + `main.jsx` + `App.jsx` with `createBrowserRouter`, replacing `head()` metadata with a manual solution, and re-establishing SPA fallback routing on the host. Effects: SSR is lost (client-only SPA), the Lovable publish pipeline changes, the error/CSRF middleware protections disappear, and preview/deploy behaviour must be re-validated. On Vercel it would work as a static SPA with a rewrite, but Lovable-managed hosting is the current target.

## Recommended hybrid (satisfies the standard as far as safely possible)

1. Keep TanStack Router as the runtime router (framework requirement, documented as a justified exception).
2. Normalise the *application* routing layer so it is idiomatic and library-neutral: keep route files as thin `head + component` definitions (already true), keep all nav data in `src/lib/navLinks.js` (already true), and confine router imports to a single small wrapper (e.g. `src/components/AppLink/AppLink.jsx`) so link usage is one-line-swappable later.
3. Replace the render-prop `Link` children in `SiteNav` with the `activeProps`/`className` form so the markup matches react-router's `NavLink` shape.
4. Route paths are already kebab-case-compatible single Spanish words; no URL changes.
5. Write `docs/ROUTING.md` explaining the standard, the framework constraint, and the mapping TanStack ↔ react-router-dom for the assessment.

Result: reviewers see `src/pages`, one page per route, a nav-link config, and a documented routing abstraction — with zero risk to SSR, styling, CRUD, or weather.

## If you still choose full migration — phases

- **P1** Add `react-router-dom`; no wiring. Commit `chore: add react-router-dom`.
- **P2** Introduce link abstraction + convert all `Link` usages to it. Commit `refactor: centralize navigation links`.
- **P3** Create SPA entry (`index.html`, `src/main.jsx`, `src/App.jsx`) with `createBrowserRouter` and the five routes; keep TanStack files in place, unused. Commit `feat: add react-router route tree`.
- **P4** Move root shell (`SiteNav`/`SiteFooter`/404/error boundary) into a react-router layout route with `<Outlet />`. Commit `refactor: move app shell to react-router layout`.
- **P5** Replace `head()` metadata with a document-title/meta helper per page. Commit `feat: add per-page metadata helper`.
- **P6** Switch Vite off `tanstackStart`, delete `src/router.tsx`, `src/server.ts`, `src/start.ts`, `src/routes/*`, `routeTree.gen.ts`. Commit `refactor: replace tanstack start with vite spa`.
- **P7** Re-validate build, lint, five URLs, CRUD, weather, screenshots. Commit `test: verify routing migration`.

Risks: P6 is irreversible in practice within this environment (loses SSR, Lovable publish path, CSRF/error middleware); P5 is an SEO regression risk; P3–P4 can produce duplicate `/` matches; preview may 500 during P6.

## Rollback strategy

Each phase is one conventional commit, so `git revert <sha>` undoes exactly one phase; revert in reverse order (P7→P1). Before P6, tag the last known-good state (`pre-router-migration`) so `git reset --hard` to that tag restores the working TanStack Start app. Validate after each phase (build, lint, five routes 200, screenshot diff) before committing the next.

## Recommendation

Adopt the hybrid (steps 1–5). Treat full migration as out of scope unless the school explicitly rejects a documented framework exception.
