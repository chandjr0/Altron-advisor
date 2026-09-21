import type { ReactNode } from "react";

export function SectionWrapper({
  children,
  className = "",
  tone = "parchment",
  id,
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  tone?: "parchment" | "stone" | "ink";
  id?: string;
  labelledBy?: string;
}) {
  const toneClass =
    tone === "ink"
      ? "bg-ink text-parchment"
      : tone === "stone"
        ? "bg-stone text-ink"
        : "bg-parchment text-ink";

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${toneClass} py-20 sm:py-28 md:py-40 ${className}`}
    >
      <div className="shell">{children}</div>
    </section>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`eyebrow inline-flex items-center gap-3 ${className}`}>
      <span aria-hidden className="h-px w-8 bg-brass" />
      {children}
    </span>
  );
}
