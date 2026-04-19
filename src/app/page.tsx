"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageLoader } from "@/components/layout/PageLoader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingAIButton } from "@/components/layout/FloatingAI";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeTicker } from "@/components/sections/MarqueeTicker";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ScrollStorySection } from "@/components/sections/ScrollStorySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SpiralAnimation } from "@/components/ui/spiral-animation";
const PROOF_ITEMS = [
  {
    title: "Batla Medicos is live",
    text: "This is the current public proof of delivery for the studio and the live demo linked across the site.",
  },
  {
    title: "Established in 2026",
    text: "The agency story is being written from the ground up, so the copy now reflects a real startup stage instead of inflated history.",
  },
  {
    title: "No fabricated metrics",
    text: "The homepage, about page, and work pages have been rewritten to remove invented case studies, testimonials, and retention numbers.",
  },
  {
    title: "Netlify-ready repo",
    text: "The project is being prepared for a Netlify deployment path instead of a standalone-only server output.",
  },
];

function LaunchProofSection() {

  return (
    <section id="testimonials" className="relative py-24 px-6 md:px-12 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(65% 0.28 290 / 25%), transparent)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 20% 60%, oklch(65% 0.28 290 / 5%), transparent 60%)" }} />

      <div className="max-w-6xl mx-auto mb-12 text-center">
        <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-[0.18em] uppercase mb-5 glass" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ color: "oklch(65% 0.28 290)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          Studio Proof
        </motion.div>
        <motion.h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-sora-var)" }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          What is <span className="text-gradient">true right now</span>
        </motion.h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {PROOF_ITEMS.map((item, index) => (
          <motion.article
            key={item.title}
            className="rounded-3xl p-8"
            style={{ background: "oklch(12% 0.018 270)", border: "1px solid oklch(20% 0.025 270)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <div className="text-xs tracking-[0.18em] uppercase mb-3" style={{ color: "oklch(65% 0.28 290)" }}>
              Proof {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-sora-var)" }}>{item.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "oklch(55% 0.01 270)" }}>{item.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

// ─── Spiral Intro (redesigned) ─────────────────────────────────────────────
function SpiralIntro({ onEnter }: { onEnter: () => void }) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const rafRef = useRef<number>(0);

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - Math.min(progress, 1));

  useEffect(() => {
    const delayId = setTimeout(() => {
      const duration = 2600;
      const start = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - start) / duration, 1);
        setProgress(p);
        if (p < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setReady(true);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    }, 500);

    return () => {
      clearTimeout(delayId);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-black flex items-center justify-center cursor-pointer"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 1.3, ease: "easeInOut" }}
      onClick={ready ? onEnter : undefined}
    >
      {/* Spiral canvas background */}
      <SpiralAnimation />

      {/* Top wordmark */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.6em] uppercase font-light text-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.2 }}
      >
        Arota Studio
      </motion.div>

      {/* Center UI */}
      <div className="relative flex flex-col items-center gap-7 z-10 pointer-events-none">
        {/* SVG Progress Ring */}
        <div className="relative w-[130px] h-[130px] flex items-center justify-center">
          <svg width="130" height="130" className="-rotate-90" style={{ overflow: "visible" }}>
            {/* Track */}
            <circle cx="65" cy="65" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            {/* Progress */}
            <circle
              cx="65" cy="65" r={radius}
              fill="none"
              stroke="url(#introRingGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
            <defs>
              <linearGradient id="introRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="oklch(65% 0.28 290)" />
                <stop offset="100%" stopColor="oklch(65% 0.28 330)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center: breathing "A" */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="text-3xl font-black text-white select-none"
              style={{ fontFamily: "var(--font-sora-var)" }}
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              A
            </motion.span>
          </div>
        </div>

        {/* Status label */}
        <div className="flex flex-col items-center gap-3">
          <motion.p
            className="text-[10px] tracking-[0.45em] uppercase font-light"
            animate={{ color: ready ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.2)" }}
            transition={{ duration: 0.7 }}
          >
            {ready ? "Tap to begin" : "Initializing"}
          </motion.p>

          {/* Animated vertical line */}
          <motion.div
            className="w-px h-6 origin-top"
            style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)" }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: ready ? 1 : 0, opacity: ready ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Pulsing dot at bottom of line */}
          <motion.div
            className="w-1 h-1 rounded-full bg-white/50"
            initial={{ opacity: 0, scale: 0 }}
            animate={ready ? { opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] } : { opacity: 0, scale: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Bottom year */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] font-mono text-white/12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        © 2026
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      <AnimatePresence>{!entered && <SpiralIntro onEnter={() => setEntered(true)} />}</AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <PageLoader />
        <SmoothScroll>
          <Navbar />
          <main>
            <HeroSection />
            <MarqueeTicker />
            <ServicesSection />
            <ProcessSection />
            <ScrollStorySection />
            <ProjectsSection />
            <LaunchProofSection />
            <ContactSection />
          </main>
          <Footer />
          <FloatingAIButton />
        </SmoothScroll>
      </motion.div>
    </>
  );
}

