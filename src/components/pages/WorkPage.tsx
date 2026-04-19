"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Globe, Layers3, Rocket, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = ["All", "Live Production"] as const;
type Category = (typeof categories)[number];

const projects = [
  {
    id: 1,
    title: "Batla Medicos",
    category: "Live Production" as Category,
    year: "2026",
    image: "/images/batla-medicos-preview.jpg",
    desc: "soft-era's first live production launch. This project is our active portfolio proof, built for real users and shipped with deployment-first thinking.",
    result: "Live at batlamedicos.shop",
    deliverables: ["UI System", "Frontend Build", "Responsive QA", "Launch & Deployment"],
    accent: "oklch(65% 0.25 250)",
    metrics: [
      { label: "Type", value: "Live Website" },
      { label: "Status", value: "Production" },
      { label: "Stack", value: "Next.js" },
    ],
  },
];

const process = [
  {
    icon: Layers3,
    title: "Design Direction",
    text: "We align layout, typography, and content hierarchy to support the business goal before development starts.",
  },
  {
    icon: Rocket,
    title: "Build & Delivery",
    text: "The interface is engineered as reusable sections and production-ready components with responsive behavior built in.",
  },
  {
    icon: Globe,
    title: "Launch Reality",
    text: "Final output is shipped, publicly accessible, and tested as a real website, not just a local demo or mock case study.",
  },
];

function WorkHero() {
  return (
    <section className="relative pt-36 pb-16 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 85% 65% at 50% -10%, oklch(65% 0.28 330 / 14%) 0%, transparent 62%)" }} />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-[0.18em] uppercase mb-6 glass"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ color: "oklch(65% 0.28 330)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          Work Archive · {projects.length} Live Project
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 items-end">
          <motion.h1
            className="text-5xl md:text-7xl font-black leading-[0.98] tracking-tight"
            style={{ fontFamily: "var(--font-sora-var)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
          >
            Work that ships.<br />
            <span className="text-gradient">Work that stays live.</span>
          </motion.h1>

          <motion.p
            className="text-base md:text-lg leading-relaxed max-w-lg"
            style={{ color: "oklch(55% 0.01 270)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            We prioritize real launch outcomes over decorative portfolios. Every project here is shown with accurate context, actual deployment state, and production intent.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function FeaturedCaseStudy() {
  const project = projects[0];

  return (
    <section className="px-6 md:px-12 pb-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="rounded-3xl overflow-hidden"
          style={{ background: "oklch(11% 0.018 270)", border: "1px solid oklch(20% 0.025 270)" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[300px] lg:min-h-[420px]">
              <Image
                src={project.image}
                alt="Batla Medicos live website preview"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-top"
                unoptimized
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, oklch(11% 0.018 270 / 30%), transparent 45%)" }} />
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] tracking-[0.18em] uppercase" style={{ background: "oklch(8% 0.015 270 / 78%)", color: project.accent, border: `1px solid ${project.accent.replace(")", " / 35%)")}` }}>
                Featured Case Study
              </div>
            </div>

            <div className="p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="text-xs tracking-[0.18em] uppercase mb-2" style={{ color: project.accent }}>
                  {project.category}
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "var(--font-sora-var)" }}>
                  {project.title}
                </h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "oklch(56% 0.01 270)" }}>
                  {project.desc}
                </p>

                <div className="grid grid-cols-3 gap-3 mb-7">
                  {project.metrics.map((item) => (
                    <div key={item.label} className="rounded-xl p-3 text-center" style={{ background: "oklch(14% 0.02 270)", border: "1px solid oklch(20% 0.025 270)" }}>
                      <div className="text-sm font-semibold" style={{ color: "oklch(84% 0.01 270)" }}>{item.value}</div>
                      <div className="text-[10px] mt-1" style={{ color: "oklch(42% 0.01 270)" }}>{item.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.deliverables.map((item) => (
                    <span key={item} className="px-2.5 py-1 rounded-lg text-xs" style={{ background: "oklch(16% 0.02 270)", color: "oklch(60% 0.01 270)", border: "1px solid oklch(22% 0.025 270)" }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="https://batlamedicos.shop/" target="_blank" rel="noreferrer">
                  <motion.span
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
                    style={{ background: "linear-gradient(135deg, oklch(65% 0.28 290), oklch(65% 0.28 330))" }}
                    whileHover={{ scale: 1.03, boxShadow: "0 0 30px oklch(65% 0.28 290 / 40%)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 420, damping: 22 }}
                  >
                    Open Live Demo <ArrowUpRight size={15} />
                  </motion.span>
                </a>

                <Link href="/#contact">
                  <motion.span
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
                    style={{ background: "oklch(14% 0.02 270)", color: "oklch(76% 0.01 270)", border: "1px solid oklch(24% 0.028 270)" }}
                    whileHover={{ scale: 1.03, borderColor: "oklch(65% 0.28 290 / 40%)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 420, damping: 22 }}
                  >
                    Start Similar Project
                  </motion.span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DeliveryProcess() {
  return (
    <section className="px-6 md:px-12 py-16 border-t" style={{ borderColor: "oklch(18% 0.022 270)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-xs tracking-[0.18em] uppercase mb-3" style={{ color: "oklch(65% 0.25 250)" }}>
            Delivery Standard
          </p>
          <h3 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "var(--font-sora-var)" }}>
            Structured process, professional output.
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {process.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                className="rounded-2xl p-6"
                style={{ background: "oklch(12% 0.018 270)", border: "1px solid oklch(20% 0.025 270)" }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -4, borderColor: "oklch(65% 0.28 290 / 35%)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "oklch(65% 0.28 290 / 12%)", color: "oklch(65% 0.28 290)" }}>
                  <Icon size={18} />
                </div>
                <h4 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-sora-var)" }}>{item.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(54% 0.01 270)" }}>{item.text}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: (typeof projects)[number];
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.article
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ background: "oklch(12% 0.018 270)", border: "1px solid oklch(20% 0.025 270)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ y: -4, borderColor: project.accent.replace(")", " / 38%)") }}
      onClick={onClick}
    >
      <div className="relative" style={{ aspectRatio: "16/9" }}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, oklch(11% 0.018 270 / 40%), transparent 55%)" }} />
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono" style={{ background: "oklch(8% 0.015 270 / 82%)", color: "oklch(42% 0.01 270)" }}>
          {project.year}
        </div>
      </div>

      <div className="p-5">
        <span className="text-xs px-2.5 py-1 rounded-lg mb-3 inline-block" style={{ background: project.accent.replace(")", " / 12%)"), color: project.accent }}>
          {project.category}
        </span>
        <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-sora-var)" }}>{project.title}</h3>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "oklch(52% 0.01 270)" }}>
          {project.desc.slice(0, 110)}…
        </p>
        <div className="text-xs font-semibold" style={{ color: project.accent }}>{project.result}</div>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }: { project: (typeof projects)[number]; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0" style={{ background: "oklch(4% 0.01 270 / 88%)", backdropFilter: "blur(8px)" }} />
      <motion.div
        className="relative w-full max-w-xl rounded-3xl overflow-hidden"
        style={{ background: "oklch(12% 0.018 270)", border: "1px solid oklch(24% 0.028 270)" }}
        initial={{ y: 40, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 40, scale: 0.96, opacity: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative" style={{ aspectRatio: "16/8" }}>
          <Image src={project.image} alt={project.title} fill sizes="768px" className="object-cover object-top" unoptimized />
          <button
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "oklch(15% 0.02 270 / 80%)", color: "oklch(60% 0.01 270)" }}
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-sora-var)" }}>{project.title}</h2>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "oklch(58% 0.01 270)" }}>{project.desc}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.deliverables.map((d) => (
              <span key={d} className="px-2.5 py-1 rounded-lg text-xs" style={{ background: "oklch(16% 0.02 270)", color: "oklch(60% 0.01 270)", border: "1px solid oklch(22% 0.025 270)" }}>
                {d}
              </span>
            ))}
          </div>
          <a href="https://batlamedicos.shop/" target="_blank" rel="noreferrer">
            <motion.span
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, oklch(65% 0.28 290), oklch(65% 0.28 330))" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
            >
              Open live demo <ArrowUpRight size={15} />
            </motion.span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      <WorkHero />
      <FeaturedCaseStudy />
      <DeliveryProcess />

      <section className="px-6 md:px-12 py-16 border-t" style={{ borderColor: "oklch(18% 0.022 270)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="sticky top-16 z-30 -mx-6 md:-mx-12 px-6 md:px-12 py-4 mb-8" style={{ background: "oklch(8% 0.015 270 / 90%)", backdropFilter: "blur(16px)", borderBottom: "1px solid oklch(18% 0.022 270 / 60%)" }}>
            <div className="max-w-6xl mx-auto flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="px-4 py-2 rounded-full text-xs font-semibold"
                  style={
                    activeFilter === cat
                      ? { background: "oklch(65% 0.28 290 / 18%)", color: "oklch(65% 0.28 290)", border: "1px solid oklch(65% 0.28 290 / 40%)" }
                      : { background: "oklch(14% 0.02 270)", color: "oklch(50% 0.01 270)", border: "1px solid oklch(22% 0.025 270)" }
                  }
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 420, damping: 22 }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} onClick={() => setSelected(project)} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </>
  );
}
