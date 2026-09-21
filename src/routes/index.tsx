import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { Building2, Settings2, TrendingUp } from "lucide-react";
import heroHome from "@/assets/hero-home.jpg";
import panelOccupiers from "@/assets/panel-occupiers.jpg";
import panelInvestors from "@/assets/panel-investors.jpg";
import panelProviders from "@/assets/panel-providers.jpg";
import { LineMotif } from "@/components/site/LineMotif";
import { CTASection } from "@/components/site/CTASection";
import { Eyebrow, SectionWrapper } from "@/components/site/SectionWrapper";
import { EASE_PREMIUM, Reveal } from "@/components/site/Motion";
import { pageSeo } from "@/lib/seo";

const homeSeo = pageSeo({
  title: "Altrion Advisory — Senior Judgement for Decisions That Matter",
  description:
    "Independent FM strategy and commercial advisory in London. Altrion Advisory helps corporate occupiers, private equity investors and FM providers make better operational decisions.",
  path: "/",
  keywords:
    "Altrion Advisory, FM strategy London, facilities management advisory, commercial advisory, private equity FM, corporate occupiers, FM providers, senior judgement",
});

export const Route = createFileRoute("/")({
  head: () => homeSeo,
  component: Home,
});

const AUDIENCES = [
  {
    icon: Building2,
    title: "Corporate Occupiers",
    image: panelOccupiers,
    alt: "Modern corporate office interior representing facilities strategy for corporate occupiers",
    line: "Clear-eyed advice on how your facilities model should be structured, sourced and governed — before a contract locks the answer in for five years.",
  },
  {
    icon: TrendingUp,
    title: "Private Equity Investors",
    image: panelInvestors,
    alt: "City skyline at dusk representing commercial judgement for private equity investors",
    line: "Commercial judgement on FM assets and service businesses: what the operating model really delivers, and where the value or the risk actually sits.",
  },
  {
    icon: Settings2,
    title: "FM Providers",
    image: panelProviders,
    alt: "Technical building systems representing positioning advisory for FM providers",
    line: "An outside read on positioning, propositions and pursuit decisions — which opportunities are worth the effort, and which are not.",
  },
];

const TRIPTYCH = [
  { word: "Insight", line: "Seeing the operational picture as it is, not as the reporting describes it." },
  { word: "Clarity", line: "Reducing a complex decision to the few things that genuinely change the outcome." },
  { word: "Better Decisions", line: "Judgement you can act on, defend internally, and live with afterwards." },
];

function Home() {
  const reduce = useReducedMotion();

  return (
    <>
      <section
        className="relative flex min-h-dvh w-full items-end overflow-hidden"
        aria-labelledby="home-hero-title"
      >
        <motion.img
          src={heroHome}
          alt="Architectural interior conveying senior judgement for facilities and commercial decisions"
          width={1920}
          height={1280}
          fetchPriority="high"
          decoding="async"
          initial={reduce ? false : { scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: EASE_PREMIUM }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div aria-hidden className="hero-overlay absolute inset-0" />
        <LineMotif />

        <div className="shell relative z-10 w-full pt-32 pb-20 text-parchment sm:pt-40 sm:pb-24 md:pb-28">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: EASE_PREMIUM }}
          >
            <span className="eyebrow text-brass">
              Independent FM Strategy &amp; Commercial Advisory
            </span>
          </motion.div>

          <motion.h1
            id="home-hero-title"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.15, ease: EASE_PREMIUM, delay: 0.12 }}
            className="display mt-6 max-w-[14ch] text-[clamp(2.15rem,6vw,5.5rem)] sm:mt-8"
          >
            Senior judgement for decisions that matter.
          </motion.h1>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_PREMIUM, delay: 0.28 }}
            className="mt-10 flex flex-wrap items-center gap-6 sm:mt-12 sm:gap-8"
          >
            <Link
              to="/contact"
              className="btn-outline-light inline-flex min-h-12 items-center px-8 py-4 text-xs tracking-[0.18em] uppercase"
            >
              Arrange a Conversation
            </Link>
            <span className="eyebrow text-parchment/60">London, UK</span>
          </motion.div>
        </div>
      </section>

      <SectionWrapper labelledBy="positioning-heading">
        <Eyebrow className="text-muted-foreground">Positioning</Eyebrow>
        <Reveal>
          <h2 id="positioning-heading" className="sr-only">
            Positioning
          </h2>
          <p className="display mt-10 max-w-[22ch] text-[clamp(1.65rem,4vw,3.6rem)] sm:mt-12 md:max-w-[24ch]">
            Altrion helps corporate occupiers, private equity investors and FM providers make better
            decisions about the operational infrastructure that supports their businesses.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="prose-measure mt-10 text-base text-muted-foreground sm:mt-12">
            Facilities decisions rarely fail loudly. They fail slowly — in the wrong operating model,
            the wrong contract structure, the wrong assumption carried into an investment case. Our
            work concentrates on the decisions that are expensive to get wrong, and on giving the
            people making them a clear, independent read before they commit.
          </p>
        </Reveal>
      </SectionWrapper>

      <SectionWrapper tone="stone" labelledBy="audiences-heading">
        <Eyebrow className="text-muted-foreground">Who We Advise</Eyebrow>
        <h2 id="audiences-heading" className="sr-only">
          Who We Advise
        </h2>
        <div className="mt-12 grid gap-px border border-hairline bg-hairline sm:mt-16 md:grid-cols-3">
          {AUDIENCES.map((a, i) => {
            const Icon = a.icon;
            return (
              <Reveal key={a.title} as="article" delay={i * 0.08} className="group flex flex-col bg-parchment">
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={a.image}
                    alt={a.alt}
                    loading="lazy"
                    decoding="async"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-ink/25 transition-opacity duration-700 group-hover:opacity-0"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
                  <Icon className="h-5 w-5 text-brass" strokeWidth={1.2} aria-hidden />
                  <h3 className="display text-2xl">{a.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{a.line}</p>
                  {/* [TBD — confirm with client] any sector figures or engagement counts for this audience */}
                </div>
              </Reveal>
            );
          })}
        </div>
      </SectionWrapper>

      <SectionWrapper labelledBy="triptych-heading">
        <h2 id="triptych-heading" className="sr-only">
          Insight, Clarity, Better Decisions
        </h2>
        <div className="grid gap-12 sm:gap-16 md:grid-cols-3">
          {TRIPTYCH.map((t, i) => (
            <Reveal key={t.word} delay={i * 0.1} className="border-t border-hairline pt-8">
              <span aria-hidden className="mb-8 block h-px w-10 bg-brass" />
              <h3 className="display text-[clamp(1.65rem,2.6vw,2.6rem)]">{t.word}</h3>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{t.line}</p>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      <CTASection />
    </>
  );
}
