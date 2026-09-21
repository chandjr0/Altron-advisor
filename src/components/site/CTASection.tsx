import { Link } from "@tanstack/react-router";
import { Reveal } from "./Motion";

export function CTASection({
  line = "Some decisions are expensive to get wrong. Those are the ones worth a conversation.",
}: {
  line?: string;
}) {
  return (
    <section className="bg-ink py-20 text-parchment sm:py-28 md:py-36" aria-labelledby="cta-heading">
      <div className="shell flex flex-col justify-between gap-10 md:flex-row md:items-end md:gap-12">
        <Reveal>
          <h2 id="cta-heading" className="display max-w-[20ch] text-[clamp(1.7rem,3.4vw,3.2rem)]">
            {line}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <Link
            to="/contact"
            className="btn-outline-light inline-flex min-h-12 shrink-0 items-center px-8 py-4 text-xs tracking-[0.18em] uppercase"
          >
            Arrange a Conversation
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
