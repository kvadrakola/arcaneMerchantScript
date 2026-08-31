# Compliance Audit — Medieval Merchant's Codex vs. Web Development Standards

Audit only. No files were modified. Findings are based on reading the current repository
(`package.json`, `src/routes/*`, `src/components/*`, `src/lib/*`, `src/styles.css`, `eslint.config.js`).

## Summary

The app is functionally complete and visually coherent, but it is built on a different
architecture than the standards assume: TypeScript + TanStack Start/Router + Tailwind v4 +
`fetch`, instead of JavaScript ES6+ + react-router-dom + per-component CSS + Axios.
Two findings (routing library, language) cannot be fixed without rebuilding the app on a
different framework, and one of them conflicts with a hard platform constraint. Everything
else is achievable incrementally without touching the design.

Counts: 3 Critical, 6 High, 7 Medium, 4 Low.

## Blocking conflict to decide first

**The Lovable platform for this project fixes the stack to TanStack Start + TanStack Router
(TypeScript template).** `react-router-dom`, `BrowserRouter`, and a hand-written `main.jsx`
entry are not supported here — installing them breaks the build. So standards items
"react-router-dom" and "global `index.css` and `main.jsx`" are technically unreachable in
this repository.

Two possible resolutions (needs your call before any migration starts):
- **A. Documented exception** (recommended): keep TanStack Router as the routing layer and
  map every other rule onto it (kebab-case route files, `src/pages`, PascalCase page
  components, semantic structure). Lowest risk, preserves design and functionality 1:1.
- **B. Full rewrite** on a plain Vite + React + react-router-dom JS project. Full standards
  compliance, but it is a rebuild, not a migration, and carries real regression risk for
  the parchment/stone visual system and the CRUD flows.

The plan below assumes **A** for the two unreachable items and full compliance everywhere else.

---

## 1. Stack

| # | Finding | Severity |
|---|---|---|
| 1.1 | **Language is TypeScript, not JavaScript ES6+.** All 20+ source files are `.ts`/`.tsx`; `tsconfig.json` runs in strict mode with `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`. Standard requires JS ES6+. Action: either accept a documented exception (TS is a superset of ES6+ and the template is TS-only), or convert file-by-file (`src/lib` → `src/components` → pages), deleting type-only declarations. Depends on: nothing. | Critical |
| 1.2 | **Routing is `@tanstack/react-router` (file-based), not `react-router-dom`.** `src/routes/*.tsx` + generated `src/routeTree.gen.ts`, `src/router.tsx`. See the blocking conflict above. | Critical |
| 1.3 | **No Axios.** `src/lib/platzi.ts:49` and `src/lib/weather.ts` use a hand-rolled `fetch` wrapper with manual `res.ok` checks and text-slicing error messages. Action: add `axios`, create `src/lib/apiClient.js` with `axios.create({ baseURL })`, replace `request()` with `apiClient.get/post/put/delete`, drop manual status handling (Axios throws). Depends on: 1.1 if converting to JS first. | High |
| 1.4 | **Vite: compliant.** `vite` 8.1.5 via `@lovable.dev/vite-tanstack-config`. No action. | — |
| 1.5 | **ESLint: present but not standards-tuned.** `eslint.config.js` extends `typescript-eslint` and explicitly disables the unused-vars rule (`"@typescript-eslint/no-unused-vars": "off"`, line 36) — the exact rule the clean-code standard needs. Action: re-enable `no-unused-vars` as `error` (with `argsIgnorePattern: "^_"`), add `jsx-a11y` plugin for the WCAG items, and switch to the JS config once/if 1.1 lands. Depends on: 1.1. | High |

## 2. Folder structure

| # | Finding | Severity |
|---|---|---|
| 2.1 | **No `src/pages`.** Pages live in `src/routes/` (`index.tsx`, `tienda.tsx`, `usuarios.tsx`, `vendedores.tsx`, `historia.tsx`) as required by file-based routing. Action: move page bodies into `src/pages/<page>/<Page>.jsx` and keep `src/routes/*` as thin route definitions that import and render them. This satisfies the "pages folder lowercase, page file PascalCase" rule while keeping routing working. Depends on: 1.2 decision. | High |
| 2.2 | **No global `index.css` / `main.jsx`.** Global CSS is `src/styles.css`; the entry is framework-managed (`src/router.tsx`, `src/routes/__root.tsx`, `src/server.ts`). Action: rename `styles.css` → `index.css` and update the single import in `src/routes/__root.tsx:12`. `main.jsx` is not creatable under this framework (see blocking conflict). | Medium |
| 2.3 | **`src/components/medieval/` mixes components with non-components:** `assets.ts`, `nav-links.ts`, `parts.tsx`. Action: move `assets.ts` → `src/assets/index.js`, `nav-links.ts` → `src/lib/navLinks.js`, and split `parts.tsx` (258 lines, 8 exported components) into one PascalCase file per component under `src/components/`. Depends on: 2.1 for import rewrites. | High |
| 2.4 | **`src/components/ui/` — 46 shadcn files, zero imports anywhere in the app.** Confirmed dead: no file outside that folder imports `components/ui`. This is the single largest chunk of unnecessary architectural complexity. Action: delete the folder plus `components.json`, then remove the now-unused deps (see §9). Depends on: nothing — safe first step. | High |
| 2.5 | `src/hooks/use-mobile.tsx` — kebab-case filename, and unused if nothing imports it. Action: verify usage; delete if dead, else rename `useMobile.js`. | Low |

## 3. Naming

| # | Finding | Severity |
|---|---|---|
| 3.1 | **Spanish identifiers in source code** — the clearest rule break. Examples: `src/routes/vendedores.tsx:27-29` (`maestro`, `oficio`, `villa`), `:35` `VENDEDORES`, the `Vendedor` interface; `TiendaPage`, `UsuariosPage`, `VendedoresPage`, `HistoriaPage` component names; `src/components/medieval/parts.tsx` exports mixing English and domain-Spanish. Action: rename to English (`masterName`, `craft`, `town`, `SELLERS`, `Seller`, `ShopPage`, `UsersPage`, `SellersPage`, `HistoryPage`) while leaving every user-visible string in Spanish untouched. Depends on: 2.1/2.3 (do renames in the same pass as the moves to avoid double churn). | High |
| 3.2 | **Route/page filenames are lowercase Spanish** (`tienda.tsx`, `usuarios.tsx`). Under file-based routing the filename *is* the URL, so it must stay lowercase; the PascalCase requirement should be satisfied by the extracted page component files from 2.1. | Medium |
| 3.3 | `src/lib` filenames are kebab-case: `error-capture.ts`, `error-page.ts`, `lovable-error-reporting.ts`. Standard wants camelCase for general names. Action: rename to `errorCapture.js`, `errorPage.js`, `lovableErrorReporting.js`. Note: `error-page.ts` is referenced from `src/start.ts` and `src/server.ts` — update both. | Medium |
| 3.4 | Component and folder PascalCase: `HeroCarousel`, `PageShell`, `SiteFooter`, `SiteNav`, `WeatherWidget`, `Ornament` all comply. The container folder `medieval/` is lowercase — acceptable as a grouping folder, but flatten it into `src/components/` when 2.3 runs. | Low |
| 3.5 | Constant style is inconsistent: `IMG`, `NAV_LINKS`, `EMPTY_FORM`, `VENDEDORES` (SCREAMING_SNAKE) alongside camelCase locals. Pick one convention for module constants and apply it. | Low |

## 4. CSS

| # | Finding | Severity |
|---|---|---|
| 4.1 | **No component/page-specific CSS files exist.** All styling is Tailwind utility classes inline in JSX, plus custom `@utility` blocks in `src/styles.css` (`parchment-surface`, `ink-rule`, `gold-frame`, `brass-glow`, `vellum-wash`, `ink-crisp`). The standard requires scoped `ComponentName.css` next to each component. Action: for each component, extract its long class strings into a co-located `ComponentName.css` (or CSS Module) using the existing design tokens, and keep only tokens/utilities in `index.css`. Do this **one component per step with a visual before/after check** — this is the highest-regression-risk part of the migration. Depends on: 2.3, 2.2. | High |
| 4.2 | **Hardcoded raw colour literals in JSX instead of tokens** — e.g. `oklch(0.34_0.04_55_/_0.6)` repeated across `parts.tsx:201,228`, `tienda.tsx:182,197`, `usuarios.tsx:345`, `HeroCarousel.tsx:95,121`; inline `style={{ backgroundColor: "oklch(0.15 0.01 60)" }}` in `SiteFooter.tsx:11-16`. Action: promote each to a CSS variable in `index.css` and reference the variable. Prerequisite for 4.1. | Medium |
| 4.3 | Global tokens themselves are well organised in `styles.css` (`@theme inline` + `:root`) — keep this structure as `index.css`. | — |

## 5. Images and static resources

| # | Finding | Severity |
|---|---|---|
| 5.1 | **`src/assets` contains no real image files** — only 12 `*.asset.json` pointer files (`stone.jpg.asset.json`, etc.) whose `.url` fields resolve to remote CDN URLs consumed via `src/components/medieval/assets.ts`. Effectively every UI image is an external URL, which the "no hardcoded external UI image URLs" rule targets. Action: download the 12 assets into `src/assets` as real `.jpg`/`.png`, import them directly (`import stone from "@/assets/stone.jpg"`), and delete the `.asset.json` indirection. Depends on: nothing; do before 2.3. | Critical |
| 5.2 | **Hardcoded external avatar URL:** `src/routes/usuarios.tsx:49` `avatar: "https://i.pravatar.cc/150?img=12"` as a default form value. Action: replace with a local placeholder from `src/assets`. | Medium |
| 5.3 | Dynamic API images (Platzi product/user images via `firstImage()` in `src/lib/platzi.ts:63`) are correctly remote — permitted by the standard. Keep, including the local sepia fallback. | — |
| 5.4 | Google Fonts loaded via `<link>` in `src/routes/__root.tsx:98-103` — external, but a stylesheet, not a UI image. Acceptable; self-host only if the standard is read strictly. | Low |

## 6. Routing

| # | Finding | Severity |
|---|---|---|
| 6.1 | **Route paths are Spanish single words:** `/tienda`, `/usuarios`, `/vendedores`, `/historia`. All are single-token, so they are trivially kebab-case-compatible — no violation today, but the convention is unenforced. Action: keep the paths (they are user-facing and already published) and document that any future multi-word route uses kebab-case, e.g. `/historia-del-gremio`, never `/historiaDelGremio`. | Low |
| 6.2 | Routing mechanism itself: see 1.2 / blocking conflict. | Critical (same as 1.2) |
| 6.3 | `src/routeTree.gen.ts` is generated and must never be hand-edited — note this in the migration runbook so a rename pass doesn't touch it. | Medium |

## 7. WCAG 2.1 AA

Overall this is the strongest area — semantic landmarks, `alt`, `aria-label`, and `:focus-visible`
are used consistently. Remaining gaps:

| # | Finding | Severity |
|---|---|---|
| 7.1 | **`focus-visible:outline-none` with no visible replacement** on several interactive elements: `SiteNav.tsx:28` (logo link), `:56` and `:111` (nav links — these fall back to a colour change only), `HeroCarousel.tsx:69` and `index.tsx:106,109` (link-wrapped buttons). Colour-only focus indication fails 2.4.7 / 1.4.11. Action: replace with a visible ring/outline token. | High |
| 7.2 | **Carousel dots use `role="tablist"` with `<button>` children lacking `role="tab"`, `aria-selected`, and a `tabpanel`** (`HeroCarousel.tsx:86-95`). Incomplete ARIA pattern misleads screen readers. Action: drop the tablist role and expose them as plain buttons with `aria-current`, or complete the tabs pattern. | Medium |
| 7.3 | **Carousel auto-advance with no pause control** (if the interval in `HeroCarousel` runs unattended) violates 2.2.2. Action: add pause-on-hover/focus or a visible pause button. | Medium |
| 7.4 | **No skip-to-content link** before the header in `PageShell.tsx` / `SiteNav.tsx`; the decorative stone/banner chrome sits ahead of `<main>`. Action: add a visually-hidden-until-focused skip link targeting `<main>`. | Medium |
| 7.5 | **Contrast needs measurement, not assumption:** `text-parchment/55` and `/60` in `SiteFooter.tsx:44,62,94` and `text-parchment/85` nav links over the wood gradient are the likely AA failures. Action: measure each with a contrast tool and lift opacity/token until ≥4.5:1 (≥3:1 for ≥24px). This is the one item that may visibly alter the design — flag each change for your approval. | High |
| 7.6 | Decorative vs. informative `alt` is inconsistent: `SiteNav.tsx:32` correctly uses `alt=""`, but `PageShell.tsx:36,44,61,69` give purely decorative banners/lanterns descriptive alt text ("Estandarte con león rampante dorado", "Farol de latón"), adding noise for screen-reader users. Action: set `alt=""` on decorative chrome. | Medium |
| 7.7 | Form labels: compliant. `parts.tsx:231` `InkField` pairs `label htmlFor` with the input `id`; `tienda.tsx:174` uses an `sr-only` label; `usuarios.tsx:333` labels the select. Keep the `InkField` abstraction as the only way to render inputs. | — |
| 7.8 | `min-h-screen` used in `__root.tsx:17,45` — prefer `min-h-dvh` for mobile viewport correctness. | Low |

## 8. Clean code (comments rule waived, as instructed)

| # | Finding | Severity |
|---|---|---|
| 8.1 | **Oversized multi-responsibility page components:** `src/routes/tienda.tsx` (369 lines) and `src/routes/usuarios.tsx` (367 lines) each hold data fetching, form state, filtering, CRUD handlers, dialogs, and full presentational markup in one function. Action: split into `<Page>` (composition), `use<Entity>Crud` hook (state + mutations), and presentational `<EntityCard>` / `<EntityFormDialog>` components. Depends on: 2.1, 2.3. | High |
| 8.2 | **Commented-out dead UI:** the three product-card actions in `src/routes/tienda.tsx` ("Añadir al carro", "Enmendar", "Retirar") are commented out pending cart work. Per your instruction these comments stay; tracked here only so the eventual cart work has a known home. Not counted as a violation. | — |
| 8.3 | **Duplicated inline input/button class strings** across `parts.tsx`, `tienda.tsx`, `usuarios.tsx` — the same ~10-utility string repeated. Action: funnel every input through `InkField` and every button through `InkButton`; resolved naturally by 4.1. | Medium |
| 8.4 | **Data-cleaning logic embedded in the API layer:** `isPresentable()` and `firstImage()` in `src/lib/platzi.ts:63,103` mix transport with presentation filtering. Action: move to `src/lib/productFilters.js`, keeping `platzi.js` transport-only. Depends on: 1.3. | Medium |
| 8.5 | Guard clauses / early returns are used well in the fetch wrapper and `firstImage`. Extend the same style to the new hooks from 8.1. | Low |

## 9. Unnecessary dependencies

`package.json` carries a large surface the app does not use. All of the following are only
reachable from the dead `src/components/ui/` folder (§2.4) or nothing at all:

- 27 `@radix-ui/*` packages, `cmdk`, `vaul`, `input-otp`, `react-resizable-panels`,
  `react-day-picker`, `recharts`, `sonner`, `embla-carousel-react`, `class-variance-authority`,
  `date-fns`, `@hookform/resolvers`, `react-hook-form`, `zod`, `lucide-react`.
- `@tanstack/react-query` **is** used (`tienda.tsx`, `usuarios.tsx`, `HeroCarousel`) — under the
  required minimal stack it is arguably unnecessary complexity on top of Axios; decide whether
  to keep it or move to `useEffect` + Axios in the CRUD hooks from 8.1.
- Keep: `react`, `react-dom`, `clsx`, `tailwind-merge` (if Tailwind stays), `vite`, `eslint`,
  plus the TanStack framework packages the platform requires.

Severity: **High** — removal is safe once §2.4 lands and materially reduces install/build surface.

## 10. Other repository conflicts

| # | Finding | Severity |
|---|---|---|
| 10.1 | `src/routes/README.md` documents the TanStack file-routing conventions and directly contradicts the react-router-dom standard. Action: after the §"blocking conflict" decision, rewrite it as the project's documented exception record. | Medium |
| 10.2 | `docs/API.md` documents the current `fetch`-based layer; must be updated in the same commit as the Axios migration (1.3). | Low |
| 10.3 | `src/lib/error-capture.ts`, `error-page.ts`, `lovable-error-reporting.ts`, `src/server.ts`, `src/start.ts` are platform infrastructure, not app code. They should be exempted from the standards (naming aside, per 3.3) and left functionally untouched. | Medium |

---

## Recommended migration order

Each step is independently shippable and ends with a visual check of all 5 pages at 1280px
and 390px. No step changes design intent; step 8 is the only one that can alter pixels, and
only where contrast requires it.

0. **Decide the blocking conflict** (Option A documented exception vs. B rewrite). Everything
   below assumes A.
1. **Delete dead weight** — remove `src/components/ui/` (46 unused files) + `components.json`;
   prune the unused dependencies from §9. Zero behavioural risk, biggest complexity win.
2. **Turn the guardrails on** — re-enable `no-unused-vars` as `error`, add `jsx-a11y`. Fix
   whatever it surfaces. Do this early so later steps can't reintroduce dead code.
3. **Localise the images** — download the 12 `.asset.json` targets into `src/assets` as real
   files, switch to direct imports, delete the pointer files, and replace the `pravatar` URL
   (5.1, 5.2).
4. **Restructure folders** — create `src/pages/<page>/<Page>.jsx`, move page bodies out of
   `src/routes/*` (routes become thin definitions), flatten `medieval/`, split `parts.tsx`
   into one component per file, relocate `assets.ts`/`nav-links.ts` (2.1, 2.3).
5. **Rename to English, in the same pass as step 4's moves** — identifiers, components,
   `src/lib` filenames. User-facing Spanish strings untouched (3.1, 3.3).
6. **Swap `fetch` → Axios** — add `src/lib/apiClient.js`, rewrite `platzi.js` and `weather.js`,
   extract `productFilters.js`, update `docs/API.md` (1.3, 8.4, 10.2).
7. **Decompose the two large pages** — extract `useProductsCrud` / `useUsersCrud` hooks and
   presentational card/dialog components (8.1, 8.3).
8. **CSS migration, one component at a time** — rename `styles.css` → `index.css`, promote the
   hardcoded `oklch(...)` literals to variables, then extract each component's classes into a
   co-located `ComponentName.css`, screenshot-diffing after each (4.1, 4.2, 2.2).
9. **Accessibility pass** — visible focus rings, skip link, fix carousel ARIA + auto-advance
   pause, decorative `alt=""`, `min-h-dvh`, then measure and correct contrast (§7).
10. **Optional / by decision** — TypeScript → JavaScript conversion (1.1) and dropping
    `@tanstack/react-query` (§9). Both are large, low-benefit, high-regression-risk; recommend
    deferring or covering with a documented exception.

Steps 1–3 are safe to run immediately after your decision on step 0.
