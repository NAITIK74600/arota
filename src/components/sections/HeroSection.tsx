"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import Link from "next/link";

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
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

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
      {/* Background layers */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y }}>
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 80% at 50% -20%, oklch(65% 0.28 290 / 14%) 0%, transparent 60%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-1/2" style={{ background: "linear-gradient(to top, oklch(8% 0.015 270), transparent)" }} />
      </motion.div>

      {/* Glow orbs */}
      <motion.div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ background: "oklch(65% 0.25 250)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute bottom-1/4 -right-20 w-72 h-72 rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ background: "oklch(65% 0.28 330)" }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.12, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl w-full text-center"
        style={{ opacity }}
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
