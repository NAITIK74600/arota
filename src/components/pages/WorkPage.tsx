"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";

const InfiniteGallery = dynamic(
  () => import("@/components/ui/3d-gallery-photography"),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
);

const ScrollExpandMedia = dynamic(
  () => import("@/components/blocks/scroll-expansion-hero"),
  { ssr: false, loading: () => <div className="w-full min-h-screen" /> }
);

const WORK_GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80", alt: "Architecture" },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80", alt: "Office" },
  { src: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=500&q=80", alt: "Interior" },
  { src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&q=80", alt: "Tech" },
  { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80", alt: "Woods" },
  { src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500&q=80", alt: "Valley" },
  { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80", alt: "Space" },
  { src: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=500&q=80", alt: "Animal" },
  { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80", alt: "Nature" },
  { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&q=80", alt: "Landscape" },
];

const categories = ["All", "Live Demo"] as const;
type Category = (typeof categories)[number];

const projects = [
  {
    id: 1,
    title: "Batla Medicos",
    category: "Live Demo" as Category,
    year: "2026",
    desc: "Arota's first live production launch. This site is our current proof of execution and the reference point for future client work.",
    result: "Live at batlamedicos.shop",
    deliverables: ["Design Direction", "Frontend Build", "Responsive Pages", "Production Launch"],
    accent: "oklch(65% 0.25 250)",
  },
];

function WorkHero() {
  return (
    <section className="relative pt-36 pb-12 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 70% at 50% -10%, oklch(65% 0.28 330 / 12%) 0%, transparent 60%)" }} />
      <div className="max-w-6xl mx-auto">
        <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-[0.18em] uppercase mb-5 glass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ color: "oklch(65% 0.28 330)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          Selected Work · {projects.length} Live Launch
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          <motion.h1 className="text-5xl md:text-7xl font-black leading-[1.02]" style={{ fontFamily: "var(--font-sora-var)" }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}>
            Real output, <span className="text-gradient">not placeholders.</span>
          </motion.h1>
          <motion.p className="text-base leading-relaxed max-w-md" style={{ color: "oklch(55% 0.01 270)" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            This portfolio currently shows one live website because that's the truthful state of the studio today. Batla Medicos is live, public, and available as a working demo.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, onClick }: { project: (typeof projects)[number]; index: number; onClick: () => void }) {
  return (
    <motion.article
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ background: "oklch(12% 0.018 270)", border: "1px solid oklch(20% 0.025 270)" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.33, 1, 0.68, 1] }}
      whileHover={{ y: -5, borderColor: project.accent.replace(")", " / 35%)") }}
      onClick={onClick}
      data-cursor
    >
      {/* Visual header */}
      <div className="h-44 relative overflow-hidden flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${project.accent.replace(")", " / 15%)")}, oklch(10% 0.015 270))` }}>
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 70% at 50% 50%, ${project.accent.replace(")", " / 20%)")}, transparent)` }} />
        <div className="absolute top-4 left-4 text-xs font-mono" style={{ color: project.accent.replace(")", " / 60%)") }}>{project.year}</div>
        <motion.div className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: project.accent.replace(")", " / 20%)"), color: project.accent }}>
          <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="text-xs px-2.5 py-1 rounded-lg mb-3 inline-block" style={{ background: project.accent.replace(")", " / 12%)"), color: project.accent }}>{project.category}</span>
        <h3 className="text-base font-bold mb-2 leading-snug" style={{ fontFamily: "var(--font-sora-var)" }}>{project.title}</h3>
        <p className="text-xs leading-relaxed mb-3" style={{ color: "oklch(50% 0.01 270)" }}>{project.desc.slice(0, 90)}…</p>
        <div className="text-xs font-semibold" style={{ color: project.accent }}>{project.result}</div>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }: { project: (typeof projects)[number]; onClose: () => void }) {
  return (
    <motion.div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <div className="absolute inset-0" style={{ background: "oklch(4% 0.01 270 / 88%)", backdropFilter: "blur(8px)" }} />
      <motion.div
        className="relative w-full max-w-xl rounded-3xl overflow-hidden"
        style={{ background: "oklch(12% 0.018 270)", border: "1px solid oklch(24% 0.028 270)" }}
        initial={{ y: 60, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 60, scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-36 relative" style={{ background: `linear-gradient(135deg, ${project.accent.replace(")", " / 20%)")}, oklch(10% 0.015 270))` }}>
          <div className="absolute inset-0 grid-bg opacity-30" />
          <button className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "oklch(15% 0.02 270 / 80%)", color: "oklch(60% 0.01 270)" }} onClick={onClose} data-cursor>
            <X size={16} />
          </button>
          <div className="absolute bottom-4 left-6 text-xs font-mono" style={{ color: project.accent }}>{project.year}</div>
        </div>
        <div className="p-8">
          <span className="text-xs px-2.5 py-1 rounded-lg inline-block mb-3" style={{ background: project.accent.replace(")", " / 12%)"), color: project.accent }}>{project.category}</span>
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-sora-var)" }}>{project.title}</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "oklch(58% 0.01 270)" }}>{project.desc}</p>
          <div className="text-sm font-semibold mb-5" style={{ color: project.accent }}>{project.result}</div>
          <div className="mb-6">
            <div className="text-xs mb-2" style={{ color: "oklch(40% 0.01 270)" }}>Deliverables</div>
            <div className="flex flex-wrap gap-2">
              {project.deliverables.map((d) => <span key={d} className="px-2.5 py-1 rounded-lg text-xs" style={{ background: "oklch(16% 0.02 270)", color: "oklch(60% 0.01 270)", border: "1px solid oklch(22% 0.025 270)" }}>{d}</span>)}
            </div>
          </div>
          <Link href="/#contact" data-cursor>
            <motion.span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: `linear-gradient(135deg, ${project.accent}, oklch(65% 0.28 330))` }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
              Start similar project <ArrowUpRight size={15} />
            </motion.span>
          </Link>
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

      {/* Cinematic featured project reveal — scroll to expand */}
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1400&q=80"
        bgImageSrc="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80"
        title="Batla Medicos"
        date="2026 · Live Demo"
        scrollToExpand="Scroll to explore the live launch"
        textBlend
      />

      {/* 3D Gallery banner */}
      <div className="relative w-full overflow-hidden" style={{ height: 420 }}>
        <InfiniteGallery
          images={WORK_GALLERY_IMAGES}
          speed={0.8}
          visibleCount={10}
          className="w-full h-full"
        />
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center mix-blend-exclusion">
          <span className="font-serif text-5xl md:text-7xl italic text-white select-none opacity-90 tracking-tight">
            Batla Medicos
          </span>
        </div>
        {/* Gradient fade to page bg */}
        <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, oklch(8% 0.015 270))" }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 pb-24">
        {/* Sticky filter bar */}
        <div className="sticky top-16 z-30 -mx-6 md:-mx-12 px-6 md:px-12 py-4 mb-10" style={{ background: "oklch(8% 0.015 270 / 90%)", backdropFilter: "blur(16px)", borderBottom: "1px solid oklch(18% 0.022 270 / 60%)" }}>
          <div className="max-w-6xl mx-auto flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="px-4 py-2 rounded-full text-xs font-semibold"
                style={activeFilter === cat
                  ? { background: "oklch(65% 0.28 290 / 18%)", color: "oklch(65% 0.28 290)", border: "1px solid oklch(65% 0.28 290 / 40%)" }
                  : { background: "oklch(14% 0.02 270)", color: "oklch(50% 0.01 270)", border: "1px solid oklch(22% 0.025 270)" }
                }
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                data-cursor
              >
                {cat}
                <span className="ml-1.5 opacity-50 text-[10px]">{cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onClick={() => setSelected(project)} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div className="text-center mt-20" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-base font-semibold mb-6" style={{ color: "oklch(55% 0.01 270)" }}>
            Want to review the live build?
          </p>
          <a href="https://batlamedicos.shop/" target="_blank" rel="noreferrer" data-cursor>
            <motion.span className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, oklch(65% 0.28 290), oklch(65% 0.28 330))" }} whileHover={{ scale: 1.04, boxShadow: "0 0 40px oklch(65% 0.28 290 / 50%)" }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
              Open live demo <ArrowUpRight size={16} />
            </motion.span>
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
