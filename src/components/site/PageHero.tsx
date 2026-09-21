import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_PREMIUM } from "./Motion";

export function PageHero({
  image,
  imageAlt,
  eyebrow,
  title,
  intro,
  children,
}: {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative flex min-h-dvh w-full items-end overflow-hidden"
      aria-labelledby="page-hero-title"
    >
      <motion.img
        src={image}
        alt={imageAlt}
        width={1920}
        height={1280}
        fetchPriority="high"
        decoding="async"
        initial={reduce ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: EASE_PREMIUM }}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div aria-hidden className="hero-overlay absolute inset-0" />
      {children}

      <div className="shell relative z-10 w-full pt-32 pb-20 text-parchment sm:pt-40 sm:pb-24 md:pb-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_PREMIUM }}
        >
          <span className="eyebrow text-brass">{eyebrow}</span>
        </motion.div>
        <motion.h1
          id="page-hero-title"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, ease: EASE_PREMIUM, delay: 0.1 }}
          className="display mt-6 max-w-[16ch] text-[clamp(2.15rem,6vw,5.5rem)] sm:mt-8"
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_PREMIUM, delay: 0.22 }}
            className="prose-measure mt-8 text-base text-parchment/80 sm:mt-10"
          >
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  );
}
