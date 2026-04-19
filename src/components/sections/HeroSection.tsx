"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import Link from "next/link";

const words = ["Websites", "Launches", "Interfaces", "Stores", "Frontends"];

function RotatingWords() {
  return (
    <span className="relative inline-block overflow-hidden align-bottom" style={{ height: "1.05em", verticalAlign: "bottom" }}>
      <motion.span
        className="flex flex-col"
        animate={{ y: ["0%", "-100%", "-200%", "-300%", "-400%", "-500%"] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: [0.76, 0, 0.24, 1],
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        }}
        style={{ lineHeight: "1.05em" }}
      >
        {[...words, words[0]].map((word, i) => (
          <span key={i} className="text-gradient block whitespace-nowrap" style={{ lineHeight: "1.05em" }}>{word}</span>
        ))}
      </motion.span>
    </span>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const yFar = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const orbLeftY = useTransform(scrollYProgress, [0, 1], ["0%", "52%"]);
  const orbRightY = useTransform(scrollYProgress, [0, 1], ["0%", "34%"]);
  const farBlur = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const farFilter = useMotionTemplate`blur(${farBlur}px)`;

  const containerVar = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const itemVar = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.33, 1, 0.68, 1] as const } },
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">

      {/* ── Far bg plane: grid + top aurora ── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: yFar, filter: farFilter }}>
        <div className="absolute inset-0 grid-bg opacity-[0.18]" />
        {/* Primary aurora */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 100% 70% at 50% -10%, oklch(65% 0.28 290 / 22%) 0%, transparent 60%)"
        }} />
        {/* Secondary aurora left */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 55% 45% at -10% 40%, oklch(65% 0.25 250 / 16%) 0%, transparent 60%)"
        }} />
        {/* Secondary aurora right */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 55% 45% at 110% 60%, oklch(65% 0.28 330 / 14%) 0%, transparent 60%)"
        }} />
      </motion.div>

      {/* ── Mid plane: bottom fade + centre depth glow ── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: yMid }}>
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(65% 0.28 290 / 5%) 0%, transparent 70%)"
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-2/3" style={{
          background: "linear-gradient(to top, oklch(8% 0.015 270) 0%, oklch(8% 0.015 270 / 70%) 40%, transparent 100%)"
        }} />
      </motion.div>

      {/* ── Large glow orbs ── */}
      <motion.div
        className="absolute top-[15%] -left-40 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: "oklch(65% 0.25 250 / 28%)", y: orbLeftY }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] -right-40 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: "oklch(65% 0.28 330 / 26%)", y: orbRightY }}
        animate={{ scale: [1.06, 1, 1.06], opacity: [0.8, 0.5, 0.8] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Centre small glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "oklch(65% 0.28 290 / 10%)" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 max-w-5xl w-full text-center"
        style={{ opacity, y: yContent }}
        variants={containerVar}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.div variants={itemVar} className="flex items-center justify-center gap-3 mb-7">
          <div className="h-px w-8" style={{ background: "oklch(65% 0.28 290 / 50%)" }} />
          <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: "oklch(65% 0.28 290)" }}>
            Startup Agency · Est. 2026
          </span>
          <div className="h-px w-8" style={{ background: "oklch(65% 0.28 290 / 50%)" }} />
        </motion.div>

        {/* Headline — 3 lines: "We Build" / [rotating word] / "Worth Obsessing Over." */}
        <motion.h1
          className="font-black leading-[0.95] mb-8 tracking-tight"
          style={{ fontFamily: "var(--font-sora-var)", fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
          variants={itemVar}
        >
          <span className="block text-white/90">We Build</span>
          <span className="block" style={{ fontSize: "clamp(4rem, 12vw, 8.5rem)" }}>
            <RotatingWords />
          </span>
          <span className="block" style={{ color: "oklch(62% 0.01 270)", fontSize: "clamp(2.2rem, 6vw, 4.5rem)", fontWeight: 700 }}>
            Worth Obsessing Over.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-11 leading-relaxed"
          style={{ color: "oklch(55% 0.01 270)" }}
          variants={itemVar}
        >
          Arota is a founder-led startup agency building clean, launch-ready digital experiences. Our first live production website is{" "}
          <a href="https://batlamedicos.shop/" target="_blank" rel="noreferrer" className="underline decoration-white/30 underline-offset-4" style={{ color: "oklch(75% 0.01 270)" }}>
            batlamedicos.shop
          </a>.
        </motion.p>

        {/* CTAs */}
        <motion.div className="flex flex-wrap items-center justify-center gap-4" variants={itemVar}>
          <Link href="/#contact">
            <motion.span
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white"
              style={{ background: "linear-gradient(135deg, oklch(65% 0.28 290), oklch(65% 0.28 330))" }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px oklch(65% 0.28 290 / 55%)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              Start a Project <ArrowUpRight size={18} />
            </motion.span>
          </Link>
          <a href="https://batlamedicos.shop/" target="_blank" rel="noreferrer">
            <motion.span
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-medium"
              style={{ background: "oklch(15% 0.02 270)", border: "1px solid oklch(28% 0.03 270)", color: "oklch(78% 0.01 270)" }}
              whileHover={{ scale: 1.04, borderColor: "oklch(65% 0.28 290 / 55%)", color: "oklch(95% 0.005 270)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Play size={15} fill="currentColor" /> Open Live Demo
            </motion.span>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 mt-14 pt-10"
          style={{ borderTop: "1px solid oklch(20% 0.025 270 / 50%)" }}
          variants={itemVar}
        >
          {[
            { label: "Established", value: "2026" },
            { label: "Live Websites", value: "1" },
            { label: "Production Demo", value: "Batla" },
            { label: "Status", value: "Live" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold text-gradient-bp" style={{ fontFamily: "var(--font-sora-var)" }}>{value}</div>
              <div className="text-xs mt-0.5" style={{ color: "oklch(42% 0.01 270)" }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) as never }}
      >
        <span className="text-[10px] tracking-[0.22em] uppercase" style={{ color: "oklch(38% 0.01 270)" }}>Scroll</span>
        <motion.div
          className="w-px h-12 rounded-full"
          style={{ background: "linear-gradient(to bottom, oklch(65% 0.28 290 / 70%), transparent)" }}
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}


const words = ["Websites", "Launches", "Interfaces", "Stores", "Frontends"];

function RotatingWords() {
  return (
    <div className="relative h-[1.1em] overflow-hidden inline-block">
      <motion.div
        animate={{ y: ["0%", "-100%", "-200%", "-300%", "-400%", "-500%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", times: [0, 0.18, 0.36, 0.54, 0.72, 1] }}
        style={{ lineHeight: "1.1em" }}
      >
        {[...words, words[0]].map((word, i) => (
          <div key={i} className="text-gradient block" style={{ lineHeight: "1.1em" }}>{word}</div>
        ))}
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  // Content fades as you scroll
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Depth layers — each at a different parallax rate
  const yFar = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);   // furthest back
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);   // mid plane
  const yNear = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);  // foreground content
  const y = yFar; // alias for existing bg layer

  // Orb scale parallax for depth sensation
  const orbLeftY = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const orbRightY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  // Subtle blur on far background as it recedes
  const farBlur = useTransform(scrollYProgress, [0, 1], [0, 4]);
  const farFilter = useMotionTemplate`blur(${farBlur}px)`;

  const containerVar = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };
  const itemVar = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Background layers — far plane (most parallax) */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: yFar, filter: farFilter }}>
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 80% at 50% -20%, oklch(65% 0.28 290 / 14%) 0%, transparent 60%)" }} />
      </motion.div>

      {/* Mid-depth gradient fade */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: yMid }}>
        <div className="absolute bottom-0 left-0 right-0 h-1/2" style={{ background: "linear-gradient(to top, oklch(8% 0.015 270), transparent)" }} />
      </motion.div>

      {/* Glow orbs — near plane, different rates */}
      <motion.div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full blur-[100px] pointer-events-none"
        style={{ background: "oklch(65% 0.25 250)", y: orbLeftY }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute bottom-1/4 -right-20 w-72 h-72 rounded-full blur-[100px] pointer-events-none"
        style={{ background: "oklch(65% 0.28 330)", y: orbRightY }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.12, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content — near plane (least parallax) */}
      <motion.div
        className="relative z-10 max-w-5xl w-full text-center"
        style={{ opacity, y: yNear }}
        variants={containerVar}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.div variants={itemVar} className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-8" style={{ background: "oklch(65% 0.28 290 / 50%)" }} />
          <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: "oklch(65% 0.28 290)" }}>
            Startup Agency · Est. 2026
          </span>
          <div className="h-px w-8" style={{ background: "oklch(65% 0.28 290 / 50%)" }} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-6xl md:text-8xl lg:text-[100px] font-black leading-[0.96] mb-8 tracking-tight"
          style={{ fontFamily: "var(--font-sora-var)" }}
          variants={itemVar}
        >
          We Build{" "}
          <RotatingWords />
          <br />
          <span style={{ color: "oklch(70% 0.01 270)" }}>Worth Obsessing Over.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-11 leading-relaxed"
          style={{ color: "oklch(55% 0.01 270)" }}
          variants={itemVar}
        >
          Arota is a founder-led startup agency building clean, launch-ready digital experiences. Our first live production website is <a href="https://batlamedicos.shop/" target="_blank" rel="noreferrer" className="underline decoration-white/30 underline-offset-4">batlamedicos.shop</a>.
        </motion.p>

        {/* CTAs */}
        <motion.div className="flex flex-wrap items-center justify-center gap-4" variants={itemVar}>
          <Link href="/#contact" data-cursor>
            <motion.span
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white"
              style={{ background: "linear-gradient(135deg, oklch(65% 0.28 290), oklch(65% 0.28 330))" }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px oklch(65% 0.28 290 / 50%)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              Start a Project <ArrowUpRight size={18} />
            </motion.span>
          </Link>
          <a href="https://batlamedicos.shop/" target="_blank" rel="noreferrer" data-cursor>
            <motion.span
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-medium"
              style={{ background: "oklch(15% 0.02 270)", border: "1px solid oklch(24% 0.028 270)", color: "oklch(78% 0.01 270)" }}
              whileHover={{ scale: 1.04, borderColor: "oklch(65% 0.28 290 / 50%)", color: "oklch(92% 0.005 270)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Play size={15} /> Open Live Demo
            </motion.span>
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 mt-14 pt-10"
          style={{ borderTop: "1px solid oklch(20% 0.025 270 / 50%)" }}
          variants={itemVar}
        >
          {[
            { label: "Established", value: "2026" },
            { label: "Live Websites", value: "1" },
            { label: "Production Demo", value: "Batla" },
            { label: "Status", value: "Live" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold text-gradient-bp" style={{ fontFamily: "var(--font-sora-var)" }}>{value}</div>
              <div className="text-xs mt-0.5" style={{ color: "oklch(42% 0.01 270)" }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) as never }}
      >
        <span className="text-[10px] tracking-[0.18em] uppercase" style={{ color: "oklch(38% 0.01 270)" }}>Scroll</span>
        <motion.div
          className="w-px h-12 rounded-full"
          style={{ background: "linear-gradient(to bottom, oklch(65% 0.28 290 / 60%), transparent)" }}
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
