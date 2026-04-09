"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Heart, Zap, Shield, Globe, Lightbulb, Users, Layers, Sparkles } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const RadialOrbitalTimeline = dynamic(
  () => import("@/components/ui/radial-orbital-timeline"),
  { ssr: false, loading: () => <div className="h-[500px]" /> }
);

const PROCESS_TIMELINE = [
  { id: 1, title: "Discovery", date: "Week 1", content: "Deep immersion into your brand, audience, competitors, and business goals. We emerge with a clear brief.", category: "Strategy", icon: Sparkles, relatedIds: [2], status: "completed" as const, energy: 88 },
  { id: 2, title: "Design", date: "Week 2–3", content: "Pixel-perfect wireframes, visual design system, component library. Two structured rounds of review.", category: "Design", icon: Layers, relatedIds: [1, 3], status: "completed" as const, energy: 92 },
  { id: 3, title: "Build", date: "Week 4–6", content: "Motion-rich Next.js development. Animations, interactions, and performance optimized for production.", category: "Engineering", icon: Zap, relatedIds: [2, 4], status: "in-progress" as const, energy: 96 },
  { id: 4, title: "Launch", date: "Week 7", content: "Deployment, performance audits, SEO setup, and handoff documentation. You own it completely.", category: "Delivery", icon: Globe, relatedIds: [3, 5], status: "pending" as const, energy: 80 },
  { id: 5, title: "Grow", date: "Ongoing", content: "Analytics review, A/B testing, iteration sprints, and new feature additions as your business evolves.", category: "Growth", icon: Users, relatedIds: [4], status: "pending" as const, energy: 75 },
];

const stats = [
  { value: "2026", label: "Established" },
  { value: "1", label: "Live Website" },
  { value: "1", label: "Public Case Study" },
  { value: "Now", label: "Taking Projects" },
];

const values = [
  { icon: Zap,        title: "Speed without slop",       desc: "We move fast but we do not ship shortcuts. Radical efficiency means better architecture, not less testing.", accent: "oklch(65% 0.25 250)" },
  { icon: Heart,      title: "Craft as a practice",      desc: "Beauty matters. A well-designed button matters. A typographically excellent heading matters. We obsess over these things because our clients can feel the difference.", accent: "oklch(65% 0.28 330)" },
  { icon: Globe,      title: "Remote by default",     desc: "We work lean, async where useful, and around the launch needs of each project instead of pretending to be a giant agency.", accent: "oklch(65% 0.28 290)" },
  { icon: Shield,     title: "Radical transparency",     desc: "Weekly updates. Documented scopes. Honest conversations when scope drifts. We are the agency that never ghosts you in round 3.", accent: "oklch(72% 0.22 210)" },
  { icon: Lightbulb,  title: "Clarity before cleverness", desc: "The best solution is the one that's obvious in retrospect. We fight the urge to over-engineer and return to first principles constantly.", accent: "oklch(65% 0.28 290)" },
  { icon: Users,      title: "Small team, direct communication",    desc: "You work close to the people shaping and building the site. Fewer layers means faster decisions and fewer handoff errors.", accent: "oklch(65% 0.28 330)" },
];

const team = [
  { name: "Founder-led", role: "Strategy & Delivery", bio: "Arota is being built as a direct, execution-first startup agency with production honesty as a baseline rule.", acc: "oklch(65% 0.28 330)", initials: "FL" },
  { name: "Design Focus", role: "Interface Systems", bio: "Layout, visual hierarchy, typography, and component consistency are handled as one system rather than disconnected page comps.", acc: "oklch(65% 0.25 250)", initials: "DF" },
  { name: "Frontend Build", role: "Next.js Delivery", bio: "We build modern, responsive frontend experiences with deployment readiness and maintainability in mind.", acc: "oklch(65% 0.28 290)", initials: "FB" },
  { name: "Launch Support", role: "QA & Deployment", bio: "The goal is not just beautiful screens. The goal is a site that can go live cleanly and stay usable after launch.", acc: "oklch(72% 0.22 210)", initials: "LS" },
];

const timeline = [
  { year: "2026", title: "Arota is established", desc: "The studio launches publicly with a simple rule: no inflated claims, no fictional portfolio, and no production copy we can't stand behind." },
  { year: "2026", title: "First live project ships", desc: "Batla Medicos becomes the first public Arota launch and the current proof of delivery shown across the site." },
  { year: "2026", title: "Portfolio is kept honest", desc: "Instead of filling the site with invented clients and made-up metrics, the portfolio reflects the work that is actually live today." },
  { year: "Next", title: "Selective growth", desc: "Future projects will be added as they go live. Until then, the site stays grounded in what has been built, not what sounds impressive." },
];

// ── AboutHero ──────────────────────────────────────────────────────────────
function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={sectionRef} className="relative pt-36 pb-24 px-6 md:px-12 overflow-hidden">
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y }}>
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 70% at 50% -15%, oklch(65% 0.28 290 / 14%) 0%, transparent 60%)" }} />
      </motion.div>

      <motion.div className="max-w-6xl mx-auto relative" style={{ opacity }}>
        <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-[0.18em] uppercase mb-5 glass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ color: "oklch(65% 0.28 290)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          Our Story
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <motion.h1 className="text-5xl md:text-7xl font-black leading-[1.02]" style={{ fontFamily: "var(--font-sora-var)" }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}>
            We built <span className="text-gradient">Arota</span><br />to start honestly.
          </motion.h1>
          <div>
            <motion.p className="text-base leading-relaxed mb-6" style={{ color: "oklch(55% 0.01 270)" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              Arota is a startup agency established in 2026. We are intentionally keeping the public story simple: one live production project, a clear service offer, and no invented credibility layered on top.
            </motion.p>
            <motion.div className="flex gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <Link href="/#contact" data-cursor>
                <motion.span className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, oklch(65% 0.28 290), oklch(65% 0.28 330))" }} whileHover={{ scale: 1.04, boxShadow: "0 0 28px oklch(65% 0.28 290 / 45%)" }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                  Work with us <ArrowUpRight size={15} />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ── StatsBar ────────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <section className="px-6 md:px-12 pb-16">
      <div className="max-w-6xl mx-auto">
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl" style={{ background: "oklch(11% 0.017 270)", border: "1px solid oklch(18% 0.022 270)" }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {stats.map(({ value, label }, i) => (
            <motion.div key={label} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="text-4xl font-black text-gradient mb-1" style={{ fontFamily: "var(--font-sora-var)" }}>{value}</div>
              <div className="text-xs" style={{ color: "oklch(45% 0.01 270)" }}>{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── ValuesSection ──────────────────────────────────────────────────────────
function ValuesSection() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.fromTo(".value-card", { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 75%", toggleActions: "play none none none" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative py-24 px-6 md:px-12 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(65% 0.28 290 / 25%), transparent)" }} />
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-[0.18em] uppercase mb-5 glass" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ color: "oklch(65% 0.28 290)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Our Values
          </motion.div>
          <motion.h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-sora-var)" }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            What we <span className="text-gradient">stand for</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map(({ icon: Icon, title, desc, accent }) => (
            <motion.div
              key={title}
              className="value-card group relative rounded-2xl p-6 opacity-0"
              style={{ background: "oklch(12% 0.018 270)", border: "1px solid oklch(20% 0.025 270)" }}
              whileHover={{ y: -4, borderColor: accent.replace(")", " / 35%)") }}
              transition={{ duration: 0.25 }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: accent.replace(")", " / 12%)"), color: accent }}>
                <Icon size={18} />
              </div>
              <h3 className="text-base font-bold mb-2" style={{ fontFamily: "var(--font-sora-var)" }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "oklch(52% 0.01 270)" }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TeamSection ────────────────────────────────────────────────────────────
function TeamSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative py-24 px-6 md:px-12 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(65% 0.25 250 / 25%), transparent)" }} />
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-[0.18em] uppercase mb-5 glass" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ color: "oklch(65% 0.25 250)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            The Team
          </motion.div>
          <motion.h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-sora-var)" }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            How the studio <span className="text-gradient-bp">is structured</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map(({ name, role, bio, acc, initials }, i) => (
            <motion.div
              key={name}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ background: "oklch(12% 0.018 270)", border: "1px solid oklch(20% 0.025 270)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onHoverStart={() => setHoveredIdx(i)}
              onHoverEnd={() => setHoveredIdx(null)}
              whileHover={{ borderColor: acc.replace(")", " / 35%)"), y: -4 }}
              data-cursor
            >
              {/* Avatar area */}
              <div className="h-40 flex items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${acc.replace(")", " / 12%)")}, oklch(10% 0.015 270))` }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black" style={{ background: `${acc.replace(")", " / 20%)")}`, color: acc, border: `2px solid ${acc.replace(")", " / 30%)")}` }}>
                  {initials}
                </div>
                {/* Hover bio overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center px-4 text-center"
                  style={{ background: `${acc.replace(")", " / 90%)")}` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIdx === i ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-xs leading-relaxed text-white">{bio}</p>
                </motion.div>
              </div>

              <div className="p-4">
                <div className="font-bold text-sm mb-0.5" style={{ fontFamily: "var(--font-sora-var)" }}>{name}</div>
                <div className="text-xs" style={{ color: acc }}>{role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Timeline ───────────────────────────────────────────────────────────────
function Timeline() {
  return (
    <section className="relative py-24 px-6 md:px-12 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(65% 0.28 330 / 25%), transparent)" }} />
      <div className="max-w-3xl mx-auto">
        <div className="mb-14 text-center">
          <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-[0.18em] uppercase mb-5 glass" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ color: "oklch(65% 0.28 330)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Our History
          </motion.div>
          <motion.h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-sora-var)" }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            Built in <span className="text-gradient">public, from day one</span>
          </motion.h2>
        </div>
        <div className="relative flex flex-col gap-0">
          {/* Vertical line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2" style={{ background: "oklch(20% 0.025 270)" }} />

          {timeline.map(({ year, title, desc }, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={year}
                className={`relative flex flex-col md:flex-row gap-6 pb-12 pl-14 md:pl-0 ${!isLeft ? "md:flex-row-reverse" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5 }}
              >
                {/* Card */}
                <div className={`flex-1 ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                  <motion.div className="inline-block rounded-2xl p-5" style={{ background: "oklch(12% 0.018 270)", border: "1px solid oklch(20% 0.025 270)" }} whileHover={{ borderColor: "oklch(65% 0.28 290 / 30%)", y: -2 }} transition={{ duration: 0.25 }}>
                    <div className="text-xs font-mono tracking-[0.15em] mb-1" style={{ color: "oklch(65% 0.28 290)" }}>{year}</div>
                    <div className="text-base font-bold mb-1.5" style={{ fontFamily: "var(--font-sora-var)" }}>{title}</div>
                    <div className="text-sm leading-relaxed" style={{ color: "oklch(52% 0.01 270)" }}>{desc}</div>
                  </motion.div>
                </div>

                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 top-0 md:-translate-x-1/2">
                  <motion.div className="w-3 h-3 rounded-full" style={{ background: "linear-gradient(135deg, oklch(65% 0.28 290), oklch(65% 0.28 330))", boxShadow: "0 0 12px oklch(65% 0.28 290 / 50%)" }} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.15 }} />
                </div>

                {/* Spacer */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── AboutCTA ───────────────────────────────────────────────────────────────
function AboutCTA() {
  return (
    <section className="relative py-28 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, oklch(65% 0.28 290 / 7%), oklch(65% 0.28 330 / 5%))" }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(65% 0.28 290 / 35%), transparent)" }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-52 blur-[90px] opacity-15 pointer-events-none" style={{ background: "radial-gradient(ellipse, oklch(65% 0.28 290), oklch(65% 0.28 330))" }} />
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2 className="text-4xl md:text-6xl font-bold mb-5" style={{ fontFamily: "var(--font-sora-var)" }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          Want to be <span className="text-gradient">the next live launch?</span>
        </motion.h2>
        <motion.p className="text-base mb-10 max-w-md mx-auto" style={{ color: "oklch(55% 0.01 270)" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          The studio is early, focused, and available for carefully scoped website work.
        </motion.p>
        <motion.div className="flex flex-wrap gap-4 justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <Link href="/#contact" data-cursor>
            <motion.span className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, oklch(65% 0.28 290), oklch(65% 0.28 330))" }} whileHover={{ scale: 1.04, boxShadow: "0 0 40px oklch(65% 0.28 290 / 50%)" }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
              Let's Talk <ArrowUpRight size={16} />
            </motion.span>
          </Link>
          <Link href="/work" data-cursor>
            <motion.span className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium" style={{ background: "oklch(15% 0.02 270)", border: "1px solid oklch(25% 0.025 270)", color: "oklch(78% 0.01 270)" }} whileHover={{ scale: 1.04, borderColor: "oklch(65% 0.28 290 / 45%)" }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
              See Our Work
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export function AboutPage() {
  return (
    <>
      <AboutHero />
      <StatsBar />
      <ValuesSection />
      <TeamSection />

      {/* Orbital Process Timeline */}
      <section className="relative py-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(65% 0.28 290 / 25%), transparent)" }} />
        <div className="max-w-6xl mx-auto mb-12 text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-[0.18em] uppercase mb-5 glass"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ color: "oklch(65% 0.28 290)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            How We Work
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-sora-var)" }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            Our process, <span className="text-gradient">visualized</span>
          </motion.h2>
          <motion.p
            className="mt-3 text-sm max-w-md mx-auto"
            style={{ color: "oklch(50% 0.01 270)" }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          >
            Click each node to explore the phase. Every project follows this orbit.
          </motion.p>
        </div>
        <RadialOrbitalTimeline timelineData={PROCESS_TIMELINE} />
      </section>

      <Timeline />
      <AboutCTA />
    </>
  );
}
