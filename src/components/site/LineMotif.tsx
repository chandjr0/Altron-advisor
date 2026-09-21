import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Signature moment: a blueprint-style line motif behind the home hero headline.
 * Desktop — the plan drifts and extends with the cursor.
 * Touch / reduced motion — it simply draws itself in once and settles.
 */
export function LineMotif() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setInteractive(fine && !calm);
  }, []);

  useEffect(() => {
    if (!interactive) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [interactive, mx, my]);

  const spring = { stiffness: 40, damping: 26, mass: 1.1 };
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);

  const farX = useTransform(sx, (v) => v * 42);
  const farY = useTransform(sy, (v) => v * 26);
  const midX = useTransform(sx, (v) => v * -24);
  const midY = useTransform(sy, (v) => v * -14);
  const nearX = useTransform(sx, (v) => v * 14);
  const nearY = useTransform(sy, (v) => v * 9);

  const draw = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: {
      pathLength: { duration: 2.6, delay, ease: [0.16, 1, 0.3, 1] as const },
      opacity: { duration: 1.2, delay },
    },
  });

  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-parchment"
    >
      <motion.g
        style={{ x: farX, y: farY }}
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.22"
        fill="none"
      >
        {[120, 260, 400, 540, 680].map((y, i) => (
          <motion.line key={y} x1="0" y1={y} x2="1200" y2={y} {...draw(0.2 + i * 0.09)} />
        ))}
        {[150, 380, 610, 840, 1070].map((x, i) => (
          <motion.line key={x} x1={x} y1="0" x2={x} y2="800" {...draw(0.5 + i * 0.09)} />
        ))}
      </motion.g>

      <motion.g
        style={{ x: midX, y: midY }}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
        fill="none"
      >
        <motion.rect x="150" y="120" width="460" height="290" {...draw(0.9)} />
        <motion.rect x="610" y="260" width="230" height="150" {...draw(1.1)} />
        <motion.rect x="380" y="410" width="460" height="270" {...draw(1.25)} />
        <motion.path d="M150 410 H 380" {...draw(1.4)} />
        <motion.path d="M840 260 L 1070 120" {...draw(1.5)} />
      </motion.g>

      <motion.g style={{ x: nearX, y: nearY }} fill="none">
        <motion.path
          d="M150 680 H 380 V 410"
          stroke="var(--altrion-accent)"
          strokeWidth="1.4"
          {...draw(1.7)}
        />
        <motion.circle
          cx="380"
          cy="410"
          r="4"
          stroke="var(--altrion-accent)"
          strokeWidth="1.2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.6 }}
        />
        <motion.circle
          cx="840"
          cy="260"
          r="4"
          stroke="var(--altrion-accent)"
          strokeWidth="1.2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.8 }}
        />
      </motion.g>
    </svg>
  );
}
