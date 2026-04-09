"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  { n: "01", title: "Discovery & Strategy", desc: "We dive deep — user research, competitive mapping, a full creative brief, and a shared definition of success before a single pixel is designed." },
  { n: "02", title: "Design & Architecture", desc: "Wireframes, visual systems, interactive prototypes. We design every state, every edge case, and every micro-interaction before engineering begins." },
  { n: "03", title: "Build & Engineer", desc: "Production-grade engineering with performance, accessibility, and scalability as first-class concerns — not afterthoughts bolted on at QA." },
  { n: "04", title: "Launch & Iterate", desc: "We ship carefully, monitor obsessively, and stay engaged. Real impact comes from iterating post-launch, not celebrating at deployment." },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineScaleY = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section ref={sectionRef} id="process" className="relative py-28 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 80% 50%, oklch(65% 0.25 250 / 5%) 0%, transparent 65%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(65% 0.25 250 / 25%), transparent)" }} />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-[0.18em] uppercase mb-5 glass" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ color: "oklch(65% 0.25 250)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              How We Work
            </motion.div>
            <motion.h2 className="text-4xl md:text-6xl font-bold leading-[1.05]" style={{ fontFamily: "var(--font-sora-var)" }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              A process built
              <br /><span className="text-gradient-bp">for clarity.</span>
            </motion.h2>
          </div>
          <motion.p className="text-sm leading-relaxed max-w-xs" style={{ color: "oklch(50% 0.01 270)" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            No surprises. No blaming "the brief." Every project follows a proven four-phase process that keeps everyone aligned.
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: "oklch(18% 0.022 270)" }}>
            <motion.div className="absolute top-0 left-0 w-full origin-top" style={{ scaleY: lineScaleY, background: "linear-gradient(to bottom, oklch(65% 0.28 290), oklch(65% 0.28 330))", height: "100%" }} />
          </div>

          <div className="flex flex-col gap-20">
            {steps.map(({ n, title, desc }, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={n}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${!isLeft ? "md:flex-row-reverse" : ""}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                >
                  {/* Card */}
                  <div className={`flex-1 ${isLeft ? "md:text-right md:pr-16" : "md:text-left md:pl-16"}`}>
                    <motion.div
                      className="inline-block rounded-3xl p-7"
                      style={{ background: "oklch(12% 0.018 270)", border: "1px solid oklch(20% 0.025 270)" }}
                      whileHover={{ borderColor: "oklch(65% 0.28 290 / 35%)", y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-xs font-mono tracking-[0.18em] uppercase mb-2" style={{ color: "oklch(40% 0.01 270)" }}>Phase {n}</div>
                      <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-sora-var)" }}>{title}</h3>
                      <p className="text-sm leading-relaxed max-w-72" style={{ color: "oklch(55% 0.01 270)" }}>{desc}</p>
                    </motion.div>
                  </div>

                  {/* Center dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{ background: "linear-gradient(135deg, oklch(65% 0.28 290), oklch(65% 0.28 330))", fontFamily: "var(--font-sora-var)", boxShadow: "0 0 30px oklch(65% 0.28 290 / 40%)" }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.15 }}
                    >
                      {n}
                    </motion.div>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
