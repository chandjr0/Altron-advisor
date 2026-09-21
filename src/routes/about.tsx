import { createFileRoute } from "@tanstack/react-router";
import heroAbout from "@/assets/hero-about.jpg";
import derrickTate from "@/assets/derrick-tate.jpg";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { Eyebrow, SectionWrapper } from "@/components/site/SectionWrapper";
import { Reveal } from "@/components/site/Motion";
import { pageSeo } from "@/lib/seo";

const aboutSeo = pageSeo({
  title: "About — Altrion Advisory | Derrick Tate, Founder",
  description:
    "Altrion Advisory is an independent FM strategy and commercial advisory practice in London, founded and led by Derrick Tate, Founder & Managing Director.",
  path: "/about",
  keywords:
    "About Altrion Advisory, Derrick Tate, Founder Managing Director, independent FM advisory London, facilities management consultant",
});

export const Route = createFileRoute("/about")({
  head: () => aboutSeo,
  component: About,
});

const PRINCIPLES = [
  {
    title: "Independent",
    line: "Altrion is not tied to any FM provider, supplier or vendor. The advice has no other commercial interest behind it.",
  },
  {
    title: "Senior only",
    line: "Engagements are led and delivered personally. There is no layer between the person you brief and the person who does the thinking.",
  },
  {
    title: "Decision-focused",
    line: "The output is a decision you can act on, not a document that describes the problem back to you.",
  },
  {
    title: "Quiet by default",
    line: "Most of this work is commercially sensitive. Discretion is part of the service, not an add-on.",
  },
];

function About() {
  return (
    <>
      <PageHero
        image={heroAbout}
        imageAlt="Quiet architectural space representing Altrion Advisory’s independent practice"
        eyebrow="About"
        title="An independent practice, led personally."
        intro="Altrion Advisory is a London-based FM strategy and commercial advisory practice, founded and run by Derrick Tate."
      />

      <SectionWrapper labelledBy="why-altrion-heading">
        <div className="grid gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-24">
          <Reveal as="figure" className="border border-hairline p-3 sm:p-4">
            <div className="relative aspect-4/5 w-full overflow-hidden bg-stone">
              <img
                src={derrickTate}
                alt="Derrick Tate, Founder & Managing Director of Altrion Advisory"
                width={800}
                height={800}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-[center_20%]"
              />
            </div>
            <figcaption className="mt-5 flex flex-col gap-2">
              <span className="eyebrow">Derrick Tate</span>
              <span className="text-sm text-muted-foreground">Founder &amp; Managing Director</span>
            </figcaption>
          </Reveal>

          <div>
            <Eyebrow className="text-muted-foreground">Why Altrion Exists</Eyebrow>
            <Reveal>
              <h2 id="why-altrion-heading" className="display mt-8 text-[clamp(1.5rem,2.8vw,2.4rem)] sm:mt-10">
                Most facilities advice arrives attached to something someone wants to sell.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="prose-measure mt-8 flex flex-col gap-6 text-base text-muted-foreground sm:mt-10">
                <p>
                  Altrion was founded as an independent practice for a straightforward reason: the
                  organisations making the largest operational commitments often have the least
                  impartial counsel available to them.
                </p>
                <p>
                  The work covers the operational infrastructure that sits behind a business — how it
                  is structured, sourced, priced and governed — for corporate occupiers, private
                  equity investors and FM providers alike. The common thread is not a sector or a
                  service line. It is the weight of the decision.
                </p>
                <p>
                  Engagements are deliberately small in number and senior in nature. That is a choice,
                  not a constraint.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper tone="stone" labelledBy="how-we-work-heading">
        <Eyebrow className="text-muted-foreground">How We Work</Eyebrow>
        <h2 id="how-we-work-heading" className="sr-only">
          How We Work
        </h2>
        <div className="mt-12 grid gap-x-16 gap-y-10 sm:mt-16 sm:gap-y-12 md:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} className="flex gap-6 border-t border-hairline pt-8">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-brass" />
              <div>
                <h3 className="display text-xl">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.line}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      <CTASection line="If the decision in front of you is a significant one, it is worth an independent read." />
    </>
  );
}
