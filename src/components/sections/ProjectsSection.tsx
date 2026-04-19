"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, X, Globe, Zap, Code2 } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Batla Medicos",
    category: "Live Production",
    year: "2026",
    url: "https://batlamedicos.shop/",
    image: "/images/batla-medicos-preview.jpg",
    desc: "The first live production website delivered by soft-era Studio — a full-featured medical retail storefront built and shipped end-to-end. This build anchors our public portfolio while the studio scales.",
    result: "Live at batlamedicos.shop",
    accent: "oklch(65% 0.25 250)",
    accentGrad: "linear-gradient(135deg, oklch(65% 0.25 250), oklch(65% 0.28 290))",
    tags: ["Next.js", "Production Launch", "Live Website", "Medical Retail"],
    metrics: [
      { icon: Globe, label: "Status", value: "Live" },
      { icon: Zap, label: "Stack", value: "Next.js" },
      { icon: Code2, label: "Type", value: "Full Build" },
    ],
  },
];

const filters = ["All", "Live Production"] as const;
type Filter = (typeof filters)[number];

// ── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: (typeof projects)[number];
  index: number;
  onClick: () => void;
}) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <motion.article
      className="group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col"
      style={{ background: "oklch(11% 0.018 270)", border: "1px solid oklch(20% 0.025 270)" }}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.33, 1, 0.68, 1] }}
      whileHover={{ y: -8, borderColor: project.accent.replace(")", " / 45%)") }}
      onClick={onClick}
    >
      {/* ── Image area ── */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
        {!imgErr ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgErr(true)}
            unoptimized
          />
        ) : (
          /* Fallback when image fails */
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${project.accent.replace(")", " / 18%)")}, oklch(10% 0.015 270))` }}
          >
            <div className="absolute inset-0 grid-bg opacity-20" />
            <span className="text-6xl font-black" style={{ fontFamily: "var(--font-sora-var)", color: project.accent, opacity: 0.3 }}>BM</span>
          </div>
        )}

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "oklch(5% 0.01 270 / 60%)", backdropFilter: "blur(2px)" }}
        >
          <motion.div
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white"
            style={{ background: project.accent }}
            initial={{ scale: 0.85, opacity: 0 }}
            whileHover={{ scale: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            View project <ArrowUpRight size={15} />
          </motion.div>
        </motion.div>

        {/* Live badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "oklch(8% 0.015 270 / 85%)", border: "1px solid oklch(65% 0.25 250 / 30%)", backdropFilter: "blur(6px)" }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "oklch(65% 0.25 250)" }} />
          <span className="text-[10px] font-semibold tracking-[0.15em] uppercase" style={{ color: "oklch(65% 0.25 250)" }}>Live</span>
        </div>

        {/* Year tag */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono" style={{ background: "oklch(8% 0.015 270 / 80%)", color: "oklch(42% 0.01 270)", backdropFilter: "blur(6px)" }}>
          {project.year}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase font-mono mb-1.5 block" style={{ color: project.accent }}>
              {project.category}
            </span>
            <h3 className="text-xl font-bold leading-tight" style={{ fontFamily: "var(--font-sora-var)" }}>
              {project.title}
            </h3>
          </div>
          <motion.div
            className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5"
            style={{ background: project.accent.replace(")", " / 12%)"), color: project.accent, border: `1px solid ${project.accent.replace(")", " / 25%)")}` }}
            whileHover={{ rotate: 45 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <ArrowUpRight size={16} />
          </motion.div>
        </div>

        <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "oklch(50% 0.01 270)" }}>
          {project.desc.slice(0, 110)}…
        </p>

        {/* Metrics */}
        <div className="flex items-center gap-4 pt-4" style={{ borderTop: "1px solid oklch(18% 0.022 270)" }}>
          {project.metrics.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-1.5">
              <Icon size={12} style={{ color: project.accent, opacity: 0.8 }} />
              <span className="text-xs" style={{ color: "oklch(48% 0.01 270)" }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

// ── Modal ────────────────────────────────────────────────────────────────────
function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projects)[number];
  onClose: () => void;
}) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background: "oklch(4% 0.01 270 / 88%)", backdropFilter: "blur(10px)" }} />

      <motion.div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden"
        style={{ background: "oklch(11% 0.018 270)", border: "1px solid oklch(26% 0.03 270)" }}
        initial={{ y: 50, scale: 0.94, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 50, scale: 0.94, opacity: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
          {!imgErr ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="672px"
              className="object-cover object-top"
              onError={() => setImgErr(true)}
              unoptimized
            />
          ) : (
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${project.accent.replace(")", " / 20%)")}, oklch(10% 0.015 270))` }}>
              <div className="absolute inset-0 grid-bg opacity-25" />
            </div>
          )}

          {/* Gradient overlay on image */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, oklch(11% 0.018 270) 0%, transparent 60%)" }} />

          {/* Close */}
          <button
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "oklch(8% 0.015 270 / 80%)", color: "oklch(60% 0.01 270)", backdropFilter: "blur(6px)" }}
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 -mt-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] tracking-[0.2em] uppercase font-mono px-2.5 py-1 rounded-lg" style={{ background: project.accent.replace(")", " / 14%)"), color: project.accent }}>
              {project.category}
            </span>
            <span className="text-[10px] font-mono" style={{ color: "oklch(38% 0.01 270)" }}>{project.year}</span>
          </div>

          <h2 className="text-3xl font-black mb-3" style={{ fontFamily: "var(--font-sora-var)" }}>
            {project.title}
          </h2>

          <p className="text-sm leading-relaxed mb-5" style={{ color: "oklch(56% 0.01 270)" }}>
            {project.desc}
          </p>

          {/* Metrics row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {project.metrics.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-xl p-3 text-center" style={{ background: "oklch(14% 0.02 270)", border: "1px solid oklch(20% 0.025 270)" }}>
                <Icon size={16} className="mx-auto mb-1.5" style={{ color: project.accent }} />
                <div className="text-xs font-semibold mb-0.5">{value}</div>
                <div className="text-[10px]" style={{ color: "oklch(42% 0.01 270)" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-7">
            {project.tags.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-lg text-xs" style={{ background: "oklch(16% 0.02 270)", color: "oklch(58% 0.01 270)", border: "1px solid oklch(22% 0.025 270)" }}>
                {t}
              </span>
            ))}
          </div>

          <a href={project.url} target="_blank" rel="noreferrer">
            <motion.span
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white"
              style={{ background: project.accentGrad }}
              whileHover={{ scale: 1.04, boxShadow: `0 0 40px ${project.accent.replace(")", " / 40%)")}` }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <ExternalLink size={15} /> Open live site
            </motion.span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────
export function ProjectsSection() {
  const [active, setActive] = useState<Filter>("All");
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="relative py-28 px-6 md:px-12 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(65% 0.28 330 / 25%), transparent)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 80% 60%, oklch(65% 0.28 330 / 4%) 0%, transparent 60%)" }} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-[0.18em] uppercase mb-5 glass"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ color: "oklch(65% 0.28 330)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Selected Work
            </motion.div>
            <motion.h2
              className="text-4xl md:text-6xl font-bold leading-[1.05]"
              style={{ fontFamily: "var(--font-sora-var)" }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              Real work,{" "}<span className="text-gradient">live now.</span>
            </motion.h2>
          </div>
          <motion.a
            href="https://batlamedicos.shop/" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium self-start md:self-auto"
            style={{ background: "oklch(14% 0.02 270)", border: "1px solid oklch(24% 0.028 270)", color: "oklch(70% 0.01 270)" }}
            whileHover={{ scale: 1.04, borderColor: "oklch(65% 0.28 290 / 40%)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          >
            Open live demo <ArrowUpRight size={15} />
          </motion.a>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-10">
          {filters.map((f) => (
            <motion.button
              key={f}
              onClick={() => setActive(f)}
              className="px-4 py-2 rounded-full text-xs font-semibold transition-colors"
              style={
                active === f
                  ? { background: "oklch(65% 0.28 290 / 18%)", color: "oklch(65% 0.28 290)", border: "1px solid oklch(65% 0.28 290 / 40%)" }
                  : { background: "oklch(14% 0.02 270)", color: "oklch(50% 0.01 270)", border: "1px solid oklch(22% 0.025 270)" }
              }
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {f}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => setSelected(project)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
