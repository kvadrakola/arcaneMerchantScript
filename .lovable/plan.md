# Mercatum Regni — Audit and Polish Plan

Audit of the five existing routes, shared layout and navigation, against the current medieval merchant-guild design. No redesign: every addition reuses the existing parchment / stone / brass vocabulary, Cinzel + EB Garamond type, and the existing tokens in `src/styles.css`.

Note on the attachment: the uploaded file only contains an HTML `<select>` of academic programs and carries no requirements for this site, so nothing below is derived from it.

## What is already right

- Shared shell (stone wall, dark overlay, left rail with heraldic banner and glowing lantern) on all five routes.
- Wooden nav bar with parchment brand ribbon, gold-fleur active state, brass-framed cart/account buttons.
- Parchment panel, ornamental rules, wax-seal divider, parchment cards, ink buttons.
- Per-route `head()` metadata with unique titles and descriptions.

## Gaps found

1. **No footer anywhere.** Pages end at the seal divider; there is no guild colophon, no secondary navigation, no legal/contact line.
2. **Navigation is desktop-only.** `SiteNav` reserves a fixed `pl-[420px]` for the ribbon and lays five links in one row, so below ~1024px the links collide with the brand and there is no mobile menu.
3. **Left rail disappears below `lg`** with nothing replacing it — mobile loses the banner/lantern identity entirely.
4. **Users table overflows on small screens** (six columns, fixed padding, no horizontal scroll container).
5. **Interactive elements are inert.** Home CTAs are `<button>`s and do not navigate; shop category chips do not filter; "Añadir al carro" does not change the nav cart badge (permanently `0`).
6. **404 and error screens are unstyled shadcn defaults** — plain dark boxes that break the illusion when a bad URL is hit.
7. **Minor fidelity issues:** page padding drops hard on mobile (`px-10` fixed), history engraving is `hidden lg:block` so mobile history has no imagery, headings use fixed `text-[54px]` with no smaller step.
8. **No weather widget** on the home page.

## Weather widget — placement and approach

Placement: on the home page, in the right column directly under the market engraving, as a parchment "Parte del Cielo" card — the same `ParchmentCard` frame used for the virtues, so it reads as a guild notice rather than a modern widget. Content is styled as a herald's weather note: place name, engraved-look temperature in large Cinzel, condition in Spanish (`Cielo despejado`, `Lluvia ligera`), plus wind and humidity as an ink-ruled `dl`. Condition icons are hand-drawn SVGs in the same line weight as the existing crest/fleur ornaments — no third-party icon set, no colored emoji.

Implementation: Open-Meteo, which needs no API key. A `createServerFn` in `src/lib/weather.functions.ts` fetches current conditions for a fixed default location (Toledo, as the guild's seat) and returns a small normalized object; the component reads it through `useQuery` with the server fn, showing a parchment skeleton while loading and a quiet "El heraldo no trae parte" line on failure. Codes are mapped to Spanish condition text in a plain helper module. Optional geolocation is not included — a fixed guild seat fits the fiction better and avoids a permission prompt on first load.

## Prioritized changes

**P1 — coherence and completeness**
1. Add `SiteFooter` (dark wood band matching the nav, gold hairline top edge, three columns: guild colophon with seal, section links, contact/legal line, closing "Anno Domini MXXIV" rule) and render it inside `PageShell` below the main area on all five routes.
2. Make `SiteNav` responsive: keep the desktop row above `lg`; below it, shrink the ribbon, replace the link row with a brass-framed menu button that opens a parchment drop-panel listing the five sections.
3. Themed 404 and error components in `__root.tsx` using the parchment panel + seal, replacing the generic dark boxes.

**P2 — responsive fidelity**
4. Fluid page padding (`px-5 sm:px-8 lg:px-16`) and a responsive `PageTitle` step (`text-[34px] sm:text-[44px] lg:text-[54px]`).
5. Wrap the users table in an overflow-x container with a fixed min-width so the ledger scrolls instead of crushing; keep the parchment frame outside the scroll area.
6. Show the history engraving on mobile as a bounded banner above the text instead of hiding it.
7. Below `lg`, render a slim horizontal band with the banner + lantern so the heraldry survives on phones.

**P3 — home page weather widget**
8. `src/lib/weather.functions.ts` server fn + condition mapping helper.
9. `WeatherScroll` parchment card wired into the home right column, with loading and failure states in-voice.

**P4 — light interactivity (no backend)**
10. Home CTAs become `Link`s to `/tienda` and `/vendedores`.
11. Shop category chips become client-side filter state over the existing product array.
12. Cart badge driven by a small client-side cart context so "Añadir al carro" increments it.

## Technical notes

- No new dependencies; Open-Meteo is called with `fetch` inside the server fn handler.
- Weather fetch stays server-side so the browser never calls a third-party host directly; the query is cached by TanStack Query with a 15-minute stale time.
- All new colors come from existing CSS variables (`--ink`, `--gold`, `--parchment`, `--wine`); no hardcoded hex.
- Footer and mobile menu live in `src/components/medieval/` next to `SiteNav`, keeping the shell in one place.
- After the edits, verify all five routes at 1280px and 390px via Playwright screenshots.
