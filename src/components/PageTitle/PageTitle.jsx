import { Ornament } from "@/components/Ornament/Ornament";

export function PageTitle({ children }) {
  return (
    <header className="relative text-center">
      <span aria-hidden="true" className="vellum-wash" />
      <h1
        className="relative font-display text-[34px] leading-none font-bold text-ink sm:text-[44px] lg:text-[54px]"
        style={{ textShadow: "0 1px 0 oklch(1 0 0 / 0.35)" }}
      >
        {children}
      </h1>
      <Ornament className="relative mt-6" />
    </header>
  );
}
