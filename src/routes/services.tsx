import { createFileRoute } from "@tanstack/react-router";
import { Building2, Settings2, TrendingUp } from "lucide-react";
import heroServices from "@/assets/hero-services.jpg";
import panelOccupiers from "@/assets/panel-occupiers.jpg";
import panelInvestors from "@/assets/panel-investors.jpg";
import panelProviders from "@/assets/panel-providers.jpg";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { Eyebrow, SectionWrapper } from "@/components/site/SectionWrapper";
import { Reveal } from "@/components/site/Motion";
import { pageSeo } from "@/lib/seo";

const servicesSeo = pageSeo({
  title: "What We Advise On — Altrion Advisory",
  description:
    "FM strategy for corporate occupiers, commercial and transaction advisory for private equity investors, and positioning advisory for FM providers.",
  path: "/services",
  keywords:
    "FM strategy, commercial advisory, transaction advisory, FM positioning, corporate occupiers, private equity facilities, FM providers go-to-market",
});

export const Route = createFileRoute("/services")({
  head: () => servicesSeo,
  component: Services,
});

const PILLARS = [
  {
    icon: Building2,
    eyebrow: "For Corporate Occupiers",
    title: "FM Strategy",
    image: panelOccupiers,
    alt: "Corporate workplace environment illustrating FM strategy advisory for occupiers",
    body: "How your facilities function should be shaped: in-house versus outsourced, single versus multi-provider, what to specify and what to leave to the market. We work through the operating model, the sourcing route and the governance that has to hold once the contract is signed.",
    points: [
      "Operating model and sourcing strategy",
      "Contract structure and commercial terms review",
      "Service specification and performance framework",
      "Independent second opinion before committing",
    ],
  },
  {
    icon: TrendingUp,
    eyebrow: "For Private Equity Investors",
    title: "Commercial & Transaction Advisory",
    image: panelInvestors,
    alt: "Urban commercial district illustrating transaction advisory for private equity",
    body: "A practitioner's read on FM service businesses and the operational assumptions inside an investment case. What the contract base is really worth, where margin is genuinely earned, and which parts of the operating model will not survive contact with growth.",
    points: [
      "Commercial due diligence on FM and service businesses",
      "Contract quality and margin durability review",
      "Operating model assessment pre- and post-deal",
      "Value creation and exit-readiness input",
    ],
  },
  {
    icon: Settings2,
    eyebrow: "For FM Providers",
    title: "Positioning & Go-to-Market Advisory",
    image: panelProviders,
    alt: "Building infrastructure systems illustrating positioning advisory for FM providers",
    body: "An outside view of how you are seen in the market and where you actually win. We work on proposition, pricing posture and pursuit discipline — including the harder conversation about which opportunities to decline.",
    points: [
      "Proposition and market positioning",
      "Bid and pursuit qualification discipline",
      "Commercial and pricing posture review",
      "Client experience and retention diagnostics",
    ],
  },
];

function Services() {
  return (
    <>
      <PageHero
        image={heroServices}
        imageAlt="Structured workplace architecture representing Altrion Advisory services"
        eyebrow="Services"
        title="What we advise on."
        intro="Three pillars, one common thread: the operational decisions that are expensive to get wrong."
      />

      {PILLARS.map((p, i) => {
        const Icon = p.icon;
        const flip = i % 2 === 1;
        const headingId = `pillar-${i}-heading`;
        return (
          <SectionWrapper key={p.title} tone={flip ? "stone" : "parchment"} labelledBy={headingId}>
            <div
              className={`grid items-center gap-10 md:grid-cols-2 md:gap-24 ${flip ? "md:[&>figure]:order-2" : ""}`}
            >
              <Reveal as="figure" className="group relative aspect-4/3 overflow-hidden border border-hairline">
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
                />
              </Reveal>

              <Reveal delay={0.08}>
                <Eyebrow className="text-muted-foreground">{p.eyebrow}</Eyebrow>
                <div className="mt-6 flex items-start gap-4 sm:mt-8 sm:gap-5">
                  <Icon className="mt-3 h-5 w-5 shrink-0 text-brass" strokeWidth={1.2} aria-hidden />
                  <h2 id={headingId} className="display text-[clamp(1.7rem,3.2vw,3rem)]">
                    {p.title}
                  </h2>
                </div>
                <p className="prose-measure mt-6 text-base text-muted-foreground sm:mt-8">{p.body}</p>
                <ul className="mt-8 flex flex-col sm:mt-10">
                  {p.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-center gap-4 border-t border-hairline py-4 text-sm transition-colors duration-500 last:border-b hover:text-ink"
                    >
                      <span aria-hidden className="h-px w-5 shrink-0 bg-brass" />
                      {pt}
                    </li>
                  ))}
                </ul>
                {/* [TBD — confirm with client] engagement formats, durations and fee model are deliberately not stated */}
              </Reveal>
            </div>
          </SectionWrapper>
        );
      })}

      <CTASection line="Engagements are scoped individually. The first step is simply a conversation." />
    </>
  );
}
