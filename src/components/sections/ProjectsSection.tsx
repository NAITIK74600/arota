"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Batla Medicos",
    category: "Live Demo",
    desc: "The first live production website delivered by Arota. This build now anchors our public portfolio while the studio grows.",
    result: "Live at batlamedicos.shop",
    accent: "oklch(65% 0.25 250)",
    tags: ["Live Website", "Production Launch", "Next.js"],
  },
];

const filters = ["All", "Live Demo"] as const;

type Filter = (typeof filters)[number];

export function ProjectsSection() {
  const [active, setActive] = useState<Filter>("All");
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="relative py-28 px-6 md:px-12 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(65% 0.28 330 / 25%), transparent)" }} />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-[0.18em] uppercase mb-5 glass" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ color: "oklch(65% 0.28 330)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Selected Work
            </motion.div>
            <motion.h2 className="text-4xl md:text-6xl font-bold leading-[1.05]" style={{ fontFamily: "var(--font-sora-var)" }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              Real work, <br /><span className="text-gradient">live now.</span>
            </motion.h2>
          </div>
          <a href="https://batlamedicos.shop/" target="_blank" rel="noreferrer" data-cursor>
            <motion.span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium" style={{ background: "oklch(14% 0.02 270)", border: "1px solid oklch(22% 0.025 270)", color: "oklch(70% 0.01 270)" }} whileHover={{ scale: 1.04, borderColor: "oklch(65% 0.28 290 / 40%)" }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
              Open live demo <ArrowUpRight size={15} />
            </motion.span>
          </a>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-10">
          {filters.map((f) => (
            <motion.button key={f} onClick={() => setActive(f)}
              className="px-4 py-2 rounded-full text-xs font-semibold"
              style={active === f
                ? { background: "oklch(65% 0.28 290 / 18%)", color: "oklch(65% 0.28 290)", border: "1px solid oklch(65% 0.28 290 / 40%)" }
                : { background: "oklch(14% 0.02 270)", color: "oklch(50% 0.01 270)", border: "1px solid oklch(22% 0.025 270)" }
              }
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              data-cursor
            >
              {f}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={active} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{ background: "oklch(12% 0.018 270)", border: "1px solid oklch(20% 0.025 270)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -5, borderColor: project.accent.replace(")", " / 35%)") }}
                onClick={() => setSelected(project)}
                data-cursor
              >
                {/* Color header */}
                <div className="h-40 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${project.accent.replace(")", " / 15%)")}, oklch(10% 0.015 270))` }}>
                  <div className="absolute inset-0 grid-bg opacity-20" />
                  <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 70% at 50% 50%, ${project.accent.replace(")", " / 20%)")}, transparent)` }} />
                  {/* Hover arrow */}
                  <motion.div className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: project.accent.replace(")", " / 20%)"), color: project.accent }}>
                    <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2.5 py-1 rounded-lg" style={{ background: project.accent.replace(")", " / 12%)"), color: project.accent }}>{project.category}</span>
                  </div>
                  <h3 className="text-base font-bold mb-2 leading-snug" style={{ fontFamily: "var(--font-sora-var)" }}>{project.title}</h3>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: "oklch(50% 0.01 270)" }}>{project.desc.slice(0, 80)}…</p>
                  <div className="text-xs font-semibold" style={{ color: project.accent }}>{project.result}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0" style={{ background: "oklch(4% 0.01 270 / 85%)", backdropFilter: "blur(8px)" }} />
            <motion.div
              className="relative w-full max-w-lg rounded-3xl overflow-hidden"
              style={{ background: "oklch(12% 0.018 270)", border: "1px solid oklch(24% 0.028 270)" }}
              initial={{ y: 60, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 60, scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-32 relative" style={{ background: `linear-gradient(135deg, ${selected.accent.replace(")", " / 20%)")}, oklch(10% 0.015 270))` }}>
                <div className="absolute inset-0 grid-bg opacity-30" />
                <button className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "oklch(15% 0.02 270 / 80%)", color: "oklch(60% 0.01 270)" }} onClick={() => setSelected(null)} data-cursor>
                  <X size={16} />
                </button>
              </div>
              <div className="p-8">
                <span className="text-xs px-2.5 py-1 rounded-lg mb-3 inline-block" style={{ background: selected.accent.replace(")", " / 12%)"), color: selected.accent }}>{selected.category}</span>
                <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-sora-var)" }}>{selected.title}</h2>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "oklch(58% 0.01 270)" }}>{selected.desc}</p>
                <div className="text-sm font-semibold mb-6" style={{ color: selected.accent }}>{selected.result}</div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selected.tags.map((t) => <span key={t} className="px-2.5 py-1 rounded-lg text-xs" style={{ background: "oklch(16% 0.02 270)", color: "oklch(60% 0.01 270)", border: "1px solid oklch(22% 0.025 270)" }}>{t}</span>)}
                </div>
                <a href="https://batlamedicos.shop/" target="_blank" rel="noreferrer" data-cursor>
                  <motion.span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: `linear-gradient(135deg, ${selected.accent}, oklch(65% 0.28 330))` }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                    Open live demo <ArrowUpRight size={15} />
                  </motion.span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
