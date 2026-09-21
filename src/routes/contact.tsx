import { createFileRoute } from "@tanstack/react-router";
import { Linkedin, MapPin, Phone } from "lucide-react";
import type { FormEvent } from "react";
import { useId, useState } from "react";
import heroContact from "@/assets/hero-contact.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Eyebrow, SectionWrapper } from "@/components/site/SectionWrapper";
import { Reveal } from "@/components/site/Motion";
import { pageSeo } from "@/lib/seo";
import {
  LINKEDIN_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  SOCIAL_LINKS,
  SOCIAL_PLACEHOLDER,
} from "@/lib/site";

const contactSeo = pageSeo({
  title: "Arrange a Conversation — Altrion Advisory",
  description:
    "Get in touch with Altrion Advisory in London to discuss an FM strategy, commercial or transaction question. Call +44 7516 166135.",
  path: "/contact",
  keywords:
    "Contact Altrion Advisory, arrange conversation, FM strategy enquiry, London FM advisor, Derrick Tate contact",
});

export const Route = createFileRoute("/contact")({
  head: () => contactSeo,
  component: Contact,
});

const FIELDS = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "organisation", label: "Organisation", type: "text", autoComplete: "organization" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
] as const;

function Contact() {
  const [sent, setSent] = useState(false);
  const formId = useId();
  const statusId = `${formId}-status`;

  // Static UI only — no submission logic or backend is wired up.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <PageHero
        image={heroContact}
        imageAlt="Calm meeting setting for arranging a conversation with Altrion Advisory"
        eyebrow="Get in Touch"
        title="Arrange a conversation."
      />

      <SectionWrapper labelledBy="contact-heading">
        <div className="grid gap-12 md:grid-cols-2 md:gap-24">
          <Reveal>
            <Eyebrow className="text-muted-foreground">Before You Commit</Eyebrow>
            <h2 id="contact-heading" className="display mt-8 text-[clamp(1.5rem,2.8vw,2.4rem)] sm:mt-10">
              A first conversation costs nothing and usually clarifies more than it commits.
            </h2>
            <p className="prose-measure mt-8 text-base text-muted-foreground">
              Tell us roughly what you are weighing up — a sourcing decision, a contract coming up
              for renewal, an asset under review — and we will tell you honestly whether independent
              advice would help.
            </p>

            <div className="mt-12 flex flex-col gap-6 border-t border-hairline pt-8 sm:mt-14">
              <p className="flex items-center gap-4 text-sm">
                <MapPin className="h-4 w-4 shrink-0 text-brass" strokeWidth={1.3} aria-hidden />
                London, UK
              </p>
              <a href={PHONE_HREF} className="rule-link inline-flex w-fit items-center gap-4 text-sm">
                <Phone className="h-4 w-4 shrink-0 text-brass" strokeWidth={1.3} aria-hidden />
                {PHONE_DISPLAY}
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="rule-link inline-flex w-fit items-center gap-4 text-sm"
              >
                <Linkedin className="h-4 w-4 shrink-0 text-brass" strokeWidth={1.3} aria-hidden />
                Altrion Advisory on LinkedIn
              </a>
              {SOCIAL_LINKS.filter((s) => !s.href).map((s) => (
                <p key={s.label} className="text-sm text-muted-foreground">
                  {s.label}: <span className="italic">{SOCIAL_PLACEHOLDER}</span>
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-8 sm:gap-10"
              noValidate={false}
              aria-describedby={sent ? statusId : undefined}
            >
              {FIELDS.map((f) => {
                const fieldId = `${formId}-${f.name}`;
                return (
                  <div key={f.name} className="flex flex-col gap-3">
                    <label htmlFor={fieldId} className="eyebrow text-muted-foreground">
                      {f.label}
                    </label>
                    <input
                      id={fieldId}
                      type={f.type}
                      name={f.name}
                      autoComplete={f.autoComplete}
                      required
                      className="field-input min-h-11 w-full border-0 border-b border-hairline bg-transparent pb-3 text-base outline-none transition-colors duration-500 focus:border-brass"
                    />
                  </div>
                );
              })}
              <div className="flex flex-col gap-3">
                <label htmlFor={`${formId}-message`} className="eyebrow text-muted-foreground">
                  Message
                </label>
                <textarea
                  id={`${formId}-message`}
                  name="message"
                  rows={4}
                  required
                  className="field-input w-full resize-y border-0 border-b border-hairline bg-transparent pb-3 text-base outline-none transition-colors duration-500 focus:border-brass"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <button
                  type="submit"
                  className="btn-solid inline-flex min-h-12 items-center px-8 py-4 text-xs tracking-[0.18em] uppercase"
                >
                  Send
                </button>
                {sent && (
                  <span id={statusId} role="status" aria-live="polite" className="text-sm text-muted-foreground">
                    Thank you — we will be in touch.
                  </span>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </SectionWrapper>
    </>
  );
}
