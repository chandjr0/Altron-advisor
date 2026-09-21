import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import heroApproach from "@/assets/hero-approach.jpg";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { Eyebrow, SectionWrapper } from "@/components/site/SectionWrapper";
import { Reveal } from "@/components/site/Motion";
import { pageSeo } from "@/lib/seo";

const approachSeo = pageSeo({
  title: "How We Work — Altrion Advisory",
  description:
    "How an Altrion engagement unfolds: understand, clarify, decide, implement — with independence that is not tied to any FM provider's commercial interest.",
  path: "/approach",
  keywords:
    "Altrion approach, FM advisory process, understand clarify decide implement, independent FM advice, facilities engagement model",
});

export const Route = createFileRoute("/approach")({
  head: () => approachSeo,
  component: Approach,
});

const STAGES = [
  {
    verb: "Understand",
    line: "Time spent on the actual situation — the contracts, the estate, the people and the pressures — before any view is offered.",
  },
  {
    verb: "Clarify",
    line: "Stripping the question back to the few variables that genuinely move the outcome, and naming the trade-offs honestly.",
  },
  {
    verb: "Decide",
    line: "A clear recommendation with the reasoning attached, framed so it can be taken into a board or investment committee intact.",
  },
  {
    verb: "Implement",
    line: "Support through the part where decisions usually erode: sourcing, mobilisation, governance and the first year of reality.",
  },
];

function Approach() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);

  return (
    <>
      <PageHero
        image={heroApproach}
        imageAlt="Measured architectural lines representing Altrion Advisory’s structured approach"
        eyebrow="Approach"
        title="How we work."
        intro="Engagements differ, but the shape of the thinking rarely does."
      />

      <SectionWrapper labelledBy="sequence-heading">
        <Eyebrow className="text-muted-foreground">The Sequence</Eyebrow>
        <h2 id="sequence-heading" className="sr-only">
          The Sequence
        </h2>

        <div ref={trackRef} className="relative mt-14 sm:mt-20">
          <div aria-hidden className="absolute top-3 right-0 left-0 hidden h-px bg-hairline md:block">
            <motion.div
              style={{ scaleX: reduce ? 1 : lineScale }}
              className="h-px w-full origin-left bg-brass"
            />
          </div>

          <ol className="grid list-none gap-12 p-0 md:grid-cols-4 md:gap-10">
            {STAGES.map((s, i) => (
              <Reveal
                key={s.verb}
                as="li"
                delay={i * 0.1}
                className="relative md:pt-0"
              >
                <span
                  aria-hidden
                  className="mb-8 block h-1.5 w-1.5 rotate-45 bg-brass md:absolute md:top-[9px] md:left-0 md:mb-0"
                />
                <div className="md:pt-16">
                  <h3 className="display text-[clamp(1.5rem,2.4vw,2.2rem)]">{s.verb}</h3>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{s.line}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </SectionWrapper>

      <SectionWrapper tone="ink" labelledBy="independence-heading">
        <div className="mx-auto max-w-4xl">
          <span className="eyebrow text-brass">Independence</span>
          <Reveal>
            <h2
              id="independence-heading"
              className="display mt-8 text-[clamp(1.65rem,3.2vw,3rem)] sm:mt-10"
            >
              Altrion holds no provider relationships, referral arrangements or supplier interests.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="prose-measure mt-8 text-base text-parchment/70 sm:mt-10">
              That matters more than it sounds. In facilities and operational services, advice is
              frequently bundled with delivery, and the recommendation quietly follows the revenue.
              Altrion's only commercial relationship is with the client sitting opposite. If the
              honest answer is to do nothing, or to keep what you already have, that is the answer you
              will get.
            </p>
          </Reveal>
        </div>
      </SectionWrapper>

      <CTASection />
    </>
  );
}
