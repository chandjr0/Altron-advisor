import { Link } from "@tanstack/react-router";
import { Linkedin, Phone } from "lucide-react";
import { Mark } from "./Mark";
import { NAV_ITEMS } from "./Nav";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  SOCIAL_LINKS,
  SOCIAL_PLACEHOLDER,
} from "@/lib/site";

export { LINKEDIN_URL } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-parchment py-14 text-ink sm:py-16">
      <div className="shell flex flex-col gap-10 sm:gap-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="flex items-start gap-4">
            <Mark className="mt-0.5 h-9 w-9 transition-transform duration-500 hover:scale-[1.03]" />
            <div>
              <p className="eyebrow">Altrion Advisory</p>
              <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                Independent FM strategy &amp; commercial advisory. London, UK.
              </p>
              <a
                href={PHONE_HREF}
                className="rule-link mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Phone className="h-3.5 w-3.5 text-brass" strokeWidth={1.4} aria-hidden />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_ITEMS.map((item) => (
              <Link key={item.to} to={item.to} className="rule-link eyebrow">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-6 border-t border-hairline pt-8 md:flex-row md:items-center">
          <p className="text-xs leading-relaxed text-muted-foreground">
            © {new Date().getFullYear()} Altrion Advisory.{" "}
            <a
              href="https://theinnovations.tech/"
              target="_blank"
              rel="noreferrer"
              className="rule-link"
            >
              This website is powered by The Innovations
            </a>
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {SOCIAL_LINKS.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Altrion Advisory on ${item.label}`}
                  className="inline-flex h-11 w-11 items-center justify-center border border-hairline transition-all duration-500 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-parchment focus-visible:outline-none"
                >
                  <Linkedin className="h-4 w-4" strokeWidth={1.4} />
                </a>
              ) : (
                <span
                  key={item.label}
                  className="text-xs text-muted-foreground"
                  title={`${item.label} link pending`}
                >
                  {item.label}: {SOCIAL_PLACEHOLDER}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
