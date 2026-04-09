"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";

const LampContainer = dynamic(
  () => import("@/components/ui/lamp").then((m) => ({ default: m.LampContainer })),
  { ssr: false, loading: () => <div className="h-[420px]" /> }
);

const services = [
  {
    id: "01",
    label: "Website Design & Frontend Delivery",
    accent: "oklch(65% 0.25 250)",
    headline: "Launch-ready websites for real businesses.",
    desc: "We design and ship responsive marketing sites, brand sites, and storefront experiences with production deployment in mind from day one.",
    pricing: "Custom quote",
    deliverables: ["Site Architecture", "Responsive UI", "Design System", "Next.js Development", "QA & Launch", "Deployment Support"],
    process: ["Scope the launch", "Map the pages", "Design the interface", "Build the frontend", "Ship to production"],
    caseStudy: { title: "Batla Medicos → live production demo", href: "https://batlamedicos.shop/" },
  },
  {
    id: "02",
    label: "Brand Identity",
    accent: "oklch(65% 0.28 290)",
    headline: "Identity systems that make the site feel cohesive.",
    desc: "We shape the visual language around a launch so typography, layout, color, and component styling all feel intentional and consistent.",
    pricing: "Custom quote",
    deliverables: ["Visual Direction", "Logo Refresh", "Color System", "Typography Pairing", "Component Language", "Launch Assets"],
    process: ["Audit the brand", "Set the direction", "Build the system", "Apply it to pages", "Prepare launch assets"],
    caseStudy: { title: "Arota launch system → in active use", href: "/" },
  },
  {
    id: "03",
    label: "Motion & Interaction Design",
    accent: "oklch(65% 0.28 330)",
    headline: "Motion with a product purpose.",
    desc: "We add motion where it helps the interface feel polished, guided, and memorable without turning the site into a demo reel.",
    pricing: "Custom quote",
    deliverables: ["Interaction Audit", "Scroll Motion", "Transition Design", "Loader States", "Micro-interactions", "Launch Polish"],
    process: ["Audit interaction needs", "Prototype key moments", "Build performant motion", "Test reduced-motion fallbacks", "Ship final polish"],
    caseStudy: { title: "Batla Medicos → production-ready launch polish", href: "https://batlamedicos.shop/" },
  },
];

const faqs = [
  { q: "Are you an established studio or a new startup agency?", a: "Arota is a startup agency established in 2026. We prefer stating that clearly rather than inflating experience claims." },
  { q: "What live work can you show right now?", a: "Our current live public project is Batla Medicos. It is the production reference we use in portfolio copy today." },
  { q: "Do you only take website work?", a: "Our strongest current offer is design and frontend delivery for launch-ready websites. Adjacent branding and motion support can be scoped when it directly improves the launch." },
  { q: "Can you deploy to Netlify?", a: "Yes. This site is being prepared for Netlify deployment, and we can structure new builds with deployment readiness from the start." },
  { q: "How do you handle copy and accuracy?", a: "We avoid invented numbers, fabricated testimonials, and placeholder case studies in production work. If a claim cannot be verified, we write around it honestly." },
  { q: "How do we start?", a: "Share the website scope, launch target, and reference material. We'll shape the page system, build plan, and deployment path from there." },
];

const ease = "easeOut" as const;

function ServicesHero() {
  return (
    <section className="relative pt-36 pb-16 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% -5%, oklch(65% 0.28 290 / 12%) 0%, transparent 60%)" }} />
      <div className="max-w-6xl mx-auto">
        <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-[0.18em] uppercase mb-5 glass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ color: "oklch(65% 0.28 290)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          Three Disciplines
        </motion.div>
        <motion.h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.02]" style={{ fontFamily: "var(--font-sora-var)" }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          Three disciplines.<br />
          <span className="text-gradient-pp">One roof.</span>
        </motion.h1>
        <motion.p className="text-base leading-relaxed max-w-xl" style={{ color: "oklch(55% 0.01 270)" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          We currently focus on launch-ready websites, the supporting brand system around them, and the motion polish that makes them feel finished in production.
        </motion.p>
        {/* Anchor pills */}
        <motion.div className="flex flex-wrap gap-3 mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {services.map((s) => (
            <a key={s.id} href={`#service-${s.id}`} className="px-4 py-2 rounded-full text-xs font-semibold transition-colors" style={{ background: s.accent.replace(")", " / 12%)"), color: s.accent, border: `1px solid ${s.accent.replace(")", " / 30%)")}` }} data-cursor>
              {s.id} · {s.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceBlock({ service, index }: { service: (typeof services)[number]; index: number }) {
  const [activeStep, setActiveStep] = useState(0);
  const isEven = index % 2 === 0;

  return (
    <section id={`service-${service.id}`} className="px-6 md:px-12 py-20 border-t" style={{ borderColor: "oklch(18% 0.022 270)" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-12 items-start mb-14`}>
          <div className="flex-1">
            <div className="text-xs font-mono mb-3" style={{ color: service.accent }}>{service.id}</div>
            <motion.h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight" style={{ fontFamily: "var(--font-sora-var)" }} initial={{ opacity: 0, x: isEven ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
              {service.headline}
            </motion.h2>
            <p className="text-sm leading-relaxed mb-6 max-w-md" style={{ color: "oklch(55% 0.01 270)" }}>{service.desc}</p>
                <div className="text-lg font-bold" style={{ color: service.accent }}>{service.pricing}</div>
          </div>

          {/* Deliverables grid */}
          <div className="flex-1">
            <div className="text-xs mb-4" style={{ color: "oklch(40% 0.01 270)", letterSpacing: "0.1em" }}>WHAT YOU GET</div>
            <div className="grid grid-cols-2 gap-2">
              {service.deliverables.map((d, i) => (
                <motion.div key={d} className="flex items-center gap-2 text-sm" style={{ color: "oklch(65% 0.01 270)" }} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: service.accent }} />
                  {d}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Process tabs + case study */}
        <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8`}>
          {/* Process tabs */}
          <div className="flex-1 rounded-2xl p-6" style={{ background: "oklch(12% 0.018 270)", border: "1px solid oklch(20% 0.025 270)" }}>
            <div className="text-xs mb-4" style={{ color: "oklch(40% 0.01 270)", letterSpacing: "0.1em" }}>THE PROCESS</div>
            <div className="space-y-1">
              {service.process.map((step, i) => (
                <button key={step} onClick={() => setActiveStep(i)} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left text-sm transition-colors" style={activeStep === i ? { background: service.accent.replace(")", " / 12%)"), color: "oklch(90% 0.01 270)" } : { color: "oklch(48% 0.01 270)" }} data-cursor>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0" style={{ background: activeStep === i ? service.accent.replace(")", " / 25%)") : "oklch(18% 0.022 270)", color: activeStep === i ? service.accent : "oklch(38% 0.01 270)" }}>
                    {i + 1}
                  </span>
                  {step}
                </button>
              ))}
            </div>
          </div>

          {/* Case study callout */}
          <motion.div className="flex-1 rounded-2xl overflow-hidden relative" style={{ background: `linear-gradient(135deg, ${service.accent.replace(")", " / 12%)")}, oklch(10% 0.015 270))`, border: `1px solid ${service.accent.replace(")", " / 25%)")}` }} whileHover={{ borderColor: service.accent.replace(")", " / 50%)") }} transition={{ duration: 0.3 }}>
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="relative p-7 h-full flex flex-col justify-between">
              <div>
                <div className="text-xs mb-6" style={{ color: service.accent.replace(")", " / 70%)"), letterSpacing: "0.1em" }}>FEATURED OUTCOME</div>
                <div className="text-lg font-bold leading-snug mb-2" style={{ fontFamily: "var(--font-sora-var)" }}>{service.caseStudy.title}</div>
              </div>
              <a href={service.caseStudy.href} target={service.caseStudy.href.startsWith("http") ? "_blank" : undefined} rel={service.caseStudy.href.startsWith("http") ? "noreferrer" : undefined} data-cursor>
                <motion.span className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: service.accent }} whileHover={{ x: 3 }}>
                  View case study <ArrowUpRight size={15} />
                </motion.span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="px-6 md:px-12 py-20 border-t" style={{ borderColor: "oklch(18% 0.022 270)" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs mb-3 tracking-[0.18em] uppercase" style={{ color: "oklch(65% 0.25 250)" }}>Common Questions</p>
          <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "var(--font-sora-var)" }}>Honestly answered.</h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} className="rounded-xl overflow-hidden" style={{ background: "oklch(12% 0.018 270)", border: "1px solid oklch(20% 0.025 270)" }} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <button className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold" onClick={() => setOpen(open === i ? null : i)} data-cursor>
                <span>{faq.q}</span>
                <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown size={16} style={{ color: "oklch(45% 0.01 270)" }} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.3, ease }}>
                    <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "oklch(52% 0.01 270)" }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesCTA() {
  return (
    <section className="px-6 md:px-12 pb-24">
      <div className="max-w-6xl mx-auto">
        <motion.div className="rounded-3xl relative overflow-hidden p-12 text-center" style={{ background: "linear-gradient(135deg, oklch(65% 0.28 290 / 10%), oklch(65% 0.28 330 / 10%))", border: "1px solid oklch(65% 0.28 290 / 20%)" }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="relative">
            <p className="text-xs tracking-[0.18em] uppercase mb-3" style={{ color: "oklch(65% 0.28 330)" }}>Ready when you are</p>
            <h2 className="text-3xl md:text-5xl font-black mb-4" style={{ fontFamily: "var(--font-sora-var)" }}>
              Let&apos;s build something<br className="hidden md:block" /> worth showing off.
            </h2>
            <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: "oklch(52% 0.01 270)" }}>
              Tell us what you&apos;re building. We&apos;ll tell you how we&apos;d approach it — no cost, no obligation.
            </p>
            <Link href="/#contact" data-cursor>
              <motion.span className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, oklch(65% 0.28 290), oklch(65% 0.28 330))" }} whileHover={{ scale: 1.04, boxShadow: "0 0 40px oklch(65% 0.28 290 / 50%)" }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                Start the conversation <ArrowUpRight size={16} />
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function ServicesPage() {
  return (
    <>
      <ServicesHero />

      {/* Lamp beam divider before service blocks */}
      <div className="w-full overflow-hidden" style={{ height: 380 }}>
        <LampContainer className="min-h-0 h-full rounded-none bg-[oklch(8%_0.015_270)]">
          <motion.div
            className="text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className="text-xs tracking-[0.35em] uppercase font-light mb-3" style={{ color: "oklch(55% 0.01 270)" }}>Built for outcomes</p>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight" style={{ fontFamily: "var(--font-sora-var)" }}>
              Launch-ready delivery. <span className="italic text-[oklch(65%_0.28_290)]">No fake claims.</span>
            </h2>
          </motion.div>
        </LampContainer>
      </div>

      {services.map((s, i) => <ServiceBlock key={s.id} service={s} index={i} />)}
      <FaqAccordion />
      <ServicesCTA />
    </>
  );
}
