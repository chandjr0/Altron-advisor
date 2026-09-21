import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useState } from "react";
import { Mark } from "./Mark";
import { EASE_PREMIUM } from "./Motion";

export const NAV_ITEMS = [
  { to: "/", label: "home" },
  { to: "/about", label: "about" },
  { to: "/services", label: "services" },
  { to: "/approach", label: "approach" },
  { to: "/contact", label: "contact" },
] as const;

function NavLabel({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="group relative inline-block px-1 py-1 text-sm lowercase tracking-wide focus-visible:outline-none"
      activeProps={{ "data-current": "true" }}
    >
      <motion.span
        className="inline-block"
        initial={false}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.45, ease: EASE_PREMIUM }}
      >
        {label}
      </motion.span>
      <span
        aria-hidden
        className="absolute bottom-0 left-1 h-px w-[calc(100%-0.5rem)] origin-left scale-x-0 bg-brass transition-transform duration-[620ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 group-data-[current=true]:scale-x-100"
      />
    </Link>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const menuId = useId();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color,backdrop-filter] duration-700 ${
          solid
            ? "border-b border-hairline bg-parchment/95 text-ink backdrop-blur-md"
            : "border-b border-transparent bg-transparent text-parchment"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between sm:h-20">
          <Link
            to="/"
            className="group flex items-center gap-3 focus-visible:outline-none"
            aria-label="Altrion Advisory home"
          >
            <Mark
              light={!solid}
              className="h-7 w-7 transition-transform duration-500 group-hover:scale-[1.04] sm:h-8 sm:w-8"
            />
            <span className="eyebrow">Altrion Advisory</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavLabel key={item.to} to={item.to} label={item.label} />
            ))}
            <Link
              to="/contact"
              className="btn-outline ml-2 inline-flex min-h-11 items-center px-5 py-2.5 text-xs tracking-[0.16em] uppercase"
            >
              Arrange a Conversation
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={menuId}
            className="flex h-11 w-11 flex-col items-end justify-center gap-[6px] focus-visible:outline-none lg:hidden"
          >
            <span
              className={`h-px bg-current transition-all duration-500 ${open ? "w-6 translate-y-[3.5px] rotate-45" : "w-6"}`}
            />
            <span
              className={`h-px bg-current transition-all duration-500 ${open ? "w-6 -translate-y-[3.5px] -rotate-45" : "w-4"}`}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.55, ease: EASE_PREMIUM }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-parchment pt-28 pb-10 text-ink sm:pt-32"
          >
            <nav aria-label="Mobile" className="shell flex flex-col items-start gap-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.06 * i + 0.08 }}
                >
                  <Link
                    to={item.to}
                    className="rule-link display block py-2 text-[clamp(2rem,8vw,3.25rem)] capitalize"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="shell">
              <span className="eyebrow text-muted-foreground">
                Derrick Tate — Founder &amp; Managing Director
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
