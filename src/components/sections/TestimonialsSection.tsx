"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const stats = [
  { value: "80+",  label: "Projects Delivered" },
  { value: "60+",  label: "Happy Clients" },
  { value: "98%",  label: "Client Retention" },
  { value: "5★",   label: "Average Rating" },
];

const testimonials = [
  { name: "Amara Osei", role: "CEO — ZuraHealth", text: "soft-era took our chaotic MVP and turned it into an experience that our users brag about. The attention to detail — every transition, every loading state — was extraordinary. They're not a vendor; they're a creative partner.", avatar: "AO", accent: "oklch(65% 0.25 250)" },
  { name: "Emil Strand", role: "Founder — NovaPeak", text: "The rebrand they delivered didn't just look incredible — it got us funded. Multiple investors commented specifically on our visual brand during the Series A round. Direct ROI from design. That's rare.", avatar: "ES", accent: "oklch(65% 0.28 290)" },
  { name: "Priya Nair", role: "Marketing Director — Nebula Technologies", text: "2.4 million organic views on LinkedIn for a 90-second product film. I still can't believe the quality they produced within that timeline. The CGI looked like it had a $300k budget. It didn't.", avatar: "PN", accent: "oklch(65% 0.28 330)" },
  { name: "James Okoro", role: "CTO — Solis Energy", text: "Three web agencies had given up on our real-time data dashboard before soft-era. They not only built it properly but shipped ahead of schedule. The architecture is clean enough that our own team can maintain it.", avatar: "JO", accent: "oklch(72% 0.22 210)" },
];

function CountUp({ target, duration = 1800 }: { target: string; duration?: number }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const num = parseInt(target.replace(/\D/g, ""), 10);
      const suffix = target.replace(/\d/g, "");
      if (isNaN(num)) { setDisplay(target); return; }
      const start = Date.now();
      const step = () => {
        const progress = Math.min((Date.now() - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(ease * num) + suffix);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <div ref={ref}>{display}</div>;
}

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const t = testimonials[current];

  return (
    <section id="testimonials" className="relative py-28 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 20% 60%, oklch(65% 0.28 290 / 5%), transparent 60%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(65% 0.28 290 / 25%), transparent)" }} />

      <div className="max-w-6xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 p-8 rounded-3xl" style={{ background: "oklch(11% 0.017 270)", border: "1px solid oklch(18% 0.022 270)" }}>
          {stats.map(({ value, label }, i) => (
            <motion.div key={label} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="text-4xl font-black text-gradient-bp mb-1" style={{ fontFamily: "var(--font-sora-var)" }}>
                <CountUp target={value} />
              </div>
              <div className="text-xs" style={{ color: "oklch(45% 0.01 270)" }}>{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Header */}
        <div className="mb-12">
          <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-[0.18em] uppercase mb-5 glass" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ color: "oklch(65% 0.28 290)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Client Stories
          </motion.div>
          <motion.h2 className="text-4xl md:text-6xl font-bold leading-[1.05]" style={{ fontFamily: "var(--font-sora-var)" }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            Words from <span className="text-gradient">people we've built for.</span>
          </motion.h2>
        </div>

        {/* Testimonial carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className="rounded-3xl p-8"
                style={{ background: "oklch(12% 0.018 270)", border: `1px solid ${t.accent.replace(")", " / 25%)")}` }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              >
                <Quote size={24} className="mb-4 opacity-40" style={{ color: t.accent }} />
                <p className="text-base leading-relaxed mb-6" style={{ color: "oklch(75% 0.008 270)" }}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: t.accent.replace(")", " / 20%)"), color: t.accent }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "oklch(88% 0.005 270)" }}>{t.name}</div>
                    <div className="text-xs" style={{ color: "oklch(45% 0.01 270)" }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-5">
            {/* Navigation */}
            <div className="flex items-center gap-3">
              <motion.button onClick={prev} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "oklch(14% 0.02 270)", border: "1px solid oklch(22% 0.025 270)", color: "oklch(65% 0.01 270)" }} whileHover={{ scale: 1.1, borderColor: "oklch(65% 0.28 290 / 40%)", color: "oklch(65% 0.28 290)" }} whileTap={{ scale: 0.95 }} data-cursor>
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button onClick={next} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "oklch(14% 0.02 270)", border: "1px solid oklch(22% 0.025 270)", color: "oklch(65% 0.01 270)" }} whileHover={{ scale: 1.1, borderColor: "oklch(65% 0.28 290 / 40%)", color: "oklch(65% 0.28 290)" }} whileTap={{ scale: 0.95 }} data-cursor>
                <ChevronRight size={18} />
              </motion.button>
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className="rounded-full transition-all duration-200" style={{ width: i === current ? 20 : 6, height: 6, background: i === current ? t.accent : "oklch(25% 0.028 270)" }} data-cursor />
                ))}
              </div>
            </div>

            {/* Preview list */}
            <div className="flex flex-col gap-3">
              {testimonials.map((item, i) => (
                <motion.button
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200"
                  style={i === current ? { background: item.accent.replace(")", " / 10%)"), border: `1px solid ${item.accent.replace(")", " / 25%)")}` } : { background: "oklch(12% 0.018 270)", border: "1px solid oklch(20% 0.025 270)" }}
                  onClick={() => setCurrent(i)}
                  data-cursor
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: item.accent.replace(")", " / 18%)"), color: item.accent }}>
                    {item.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold truncate" style={{ color: "oklch(80% 0.01 270)" }}>{item.name}</div>
                    <div className="text-[10px] truncate" style={{ color: "oklch(45% 0.01 270)" }}>{item.role}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
