import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "article" | "li" | "figure";
};

/** Subtle scroll-triggered reveal. Respects prefers-reduced-motion. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 22,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px" }}
      transition={{ duration: 0.85, ease: EASE_PREMIUM, delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Soft fade for route content on mount. */
export function PageFade({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.35, ease: EASE_PREMIUM }}
    >
      {children}
    </motion.div>
  );
}
