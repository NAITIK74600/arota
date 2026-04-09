"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search, Clock, User } from "lucide-react";
import Link from "next/link";

const ScrollMorphHero = dynamic(
  () => import("@/components/ui/scroll-morph-hero"),
  { ssr: false, loading: () => <div className="w-full h-screen" /> }
);

const categories = ["All", "Design", "Engineering", "VFX & 3D", "Strategy"] as const;
type BlogCategory = (typeof categories)[number];

const articles = [
  { id: 1, title: "Why Arota launches with only one public case study", category: "Strategy" as BlogCategory, author: "Arota", date: "Apr 2026", readTime: "4 min", excerpt: "This studio is new, and the site should say that plainly. Here's why we removed invented numbers and chose to anchor the portfolio around one real live project.", accent: "oklch(65% 0.28 290)", featured: true },
  { id: 2, title: "Batla Medicos: the first live Arota build", category: "Engineering" as BlogCategory, author: "Arota", date: "Apr 2026", readTime: "5 min", excerpt: "A short build note on the first production website shipped under the Arota name and how it is now used as the studio's public live demo.", accent: "oklch(65% 0.25 250)" },
  { id: 3, title: "Writing production copy without fake proof", category: "Design" as BlogCategory, author: "Arota", date: "Apr 2026", readTime: "3 min", excerpt: "Design polish matters, but credibility matters more. This note covers how we handle copy when the real portfolio is still small and growing.", accent: "oklch(72% 0.22 210)" },
];

const ease = "easeOut" as const;

function BlogHero() {
  return (
    <section className="relative w-full" style={{ height: "100dvh" }}>
      {/* Morph animation fills the full hero */}
      <div className="absolute inset-0">
        <ScrollMorphHero />
      </div>
      {/* Overlay text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <motion.div
          className="text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-[0.18em] uppercase mb-6 glass"
            style={{ color: "oklch(65% 0.25 250)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Studio Notes · {articles.length} Posts
          </div>
          <h1
            className="text-5xl md:text-8xl font-black leading-[1.02] mb-4"
            style={{ fontFamily: "var(--font-sora-var)", textShadow: "0 2px 40px oklch(8% 0.015 270 / 80%)" }}
          >
            Notes from <span className="text-gradient">the launch phase.</span>
          </h1>
          <p
            className="text-base max-w-md mx-auto leading-relaxed"
            style={{ color: "oklch(65% 0.01 270)", textShadow: "0 1px 20px oklch(8% 0.015 270 / 60%)" }}
          >
            Small, direct updates on what we are building, what has shipped, and how we are keeping the public story accurate.
          </p>
        </motion.div>
        <motion.div
          className="absolute bottom-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: "oklch(45% 0.01 270)" }}>Scroll to read</span>
          <motion.div
            className="w-px h-8 rounded-full"
            style={{ background: "oklch(45% 0.01 270)" }}
            animate={{ scaleY: [1, 0.3, 1], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedArticle({ article }: { article: (typeof articles)[number] }) {
  return (
    <motion.div className="relative rounded-3xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${article.accent.replace(")", " / 12%)")}, oklch(10% 0.015 270))`, border: `1px solid ${article.accent.replace(")", " / 25%)")}` }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} whileHover={{ borderColor: article.accent.replace(")", " / 50%)") }}>
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative p-8 md:p-12">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ background: article.accent.replace(")", " / 15%)"), color: article.accent }}>Featured</span>
          <span className="px-2.5 py-1 rounded-lg text-xs" style={{ background: "oklch(14% 0.02 270)", color: "oklch(50% 0.01 270)" }}>{article.category}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-4 leading-tight" style={{ fontFamily: "var(--font-sora-var)" }}>{article.title}</h2>
            <p className="text-sm leading-relaxed" style={{ color: "oklch(55% 0.01 270)" }}>{article.excerpt}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 text-xs" style={{ color: "oklch(45% 0.01 270)" }}>
              <span className="flex items-center gap-1"><Clock size={12} />{article.readTime} read</span>
              <span className="flex items-center gap-1"><User size={12} />{article.author}</span>
              <span>{article.date}</span>
            </div>
            <Link href="#" data-cursor>
              <motion.span className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold" style={{ background: article.accent.replace(")", " / 18%)"), color: article.accent, border: `1px solid ${article.accent.replace(")", " / 30%)")}` }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                Read article <ArrowUpRight size={15} />
              </motion.span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ArticleCard({ article, index }: { article: (typeof articles)[number]; index: number }) {
  return (
    <motion.article
      className="group rounded-2xl overflow-hidden flex flex-col cursor-pointer"
      style={{ background: "oklch(12% 0.018 270)", border: "1px solid oklch(20% 0.025 270)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -4, borderColor: article.accent.replace(")", " / 30%)") }}
      data-cursor
    >
      {/* Visual header */}
      <div className="h-36 relative flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${article.accent.replace(")", " / 14%)")}, oklch(10% 0.015 270))` }}>
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 80% at 50% 50%, ${article.accent.replace(")", " / 15%)")}, transparent)` }} />
        <span className="absolute top-4 left-4 px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: article.accent.replace(")", " / 15%)"), color: article.accent }}>{article.category}</span>
        <motion.div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: article.accent }}>
          <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-300" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-sm font-bold mb-2 leading-snug flex-1" style={{ fontFamily: "var(--font-sora-var)" }}>{article.title}</h3>
        <p className="text-xs leading-relaxed mb-4" style={{ color: "oklch(48% 0.01 270)" }}>{article.excerpt.slice(0, 80)}…</p>
        <div className="flex items-center gap-3 text-xs" style={{ color: "oklch(40% 0.01 270)" }}>
          <span className="flex items-center gap-1"><Clock size={10} /> {article.readTime}</span>
          <span>{article.date}</span>
        </div>
      </div>
    </motion.article>
  );
}

function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="px-6 md:px-12 pb-24">
      <div className="max-w-6xl mx-auto">
        <motion.div className="rounded-3xl relative overflow-hidden p-10 md:p-14" style={{ background: "linear-gradient(135deg, oklch(65% 0.25 250 / 10%), oklch(65% 0.28 290 / 10%))", border: "1px solid oklch(65% 0.25 250 / 20%)" }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="absolute inset-0 grid-bg opacity-15" />
          <div className="relative max-w-2xl mx-auto text-center">
            <p className="text-xs tracking-[0.18em] uppercase mb-3" style={{ color: "oklch(65% 0.25 250)" }}>Launch Updates</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "var(--font-sora-var)" }}>Follow the studio as it grows.</h2>
            <p className="text-sm mb-8" style={{ color: "oklch(52% 0.01 270)" }}>Product notes, build decisions, and live launch updates as new work moves from draft to production.</p>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.p key="thanks" className="text-sm font-semibold" style={{ color: "oklch(65% 0.25 250)" }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  You&apos;re in. Talk soon.
                </motion.p>
              ) : (
                <motion.div key="form" className="flex gap-2 max-w-sm mx-auto" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "oklch(10% 0.015 270)", border: "1px solid oklch(22% 0.026 270)", color: "oklch(90% 0.01 270)" }}
                    data-cursor
                  />
                  <motion.button
                    onClick={() => { if (email) setSubmitted(true); }}
                    className="px-5 py-3 rounded-xl text-sm font-semibold text-white flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, oklch(65% 0.25 250), oklch(65% 0.28 290))" }}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    data-cursor
                  >
                    Subscribe
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");
  const [query, setQuery] = useState("");

  const featured = articles.find((a) => a.featured)!;
  const rest = articles
    .filter((a) => !a.featured)
    .filter((a) => activeCategory === "All" || a.category === activeCategory)
    .filter((a) => query === "" || a.title.toLowerCase().includes(query.toLowerCase()) || a.excerpt.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <BlogHero />

      <div className="max-w-6xl mx-auto px-6 md:px-12 pb-12">
        {/* Featured */}
        <div className="mb-10">
          <FeaturedArticle article={featured} />
        </div>

        {/* Filter row */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {categories.map((cat) => (
            <motion.button key={cat} onClick={() => setActiveCategory(cat)} className="px-4 py-2 rounded-full text-xs font-semibold" style={activeCategory === cat ? { background: "oklch(65% 0.25 250 / 18%)", color: "oklch(65% 0.25 250)", border: "1px solid oklch(65% 0.25 250 / 40%)" } : { background: "oklch(14% 0.02 270)", color: "oklch(50% 0.01 270)", border: "1px solid oklch(22% 0.025 270)" }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} data-cursor>
              {cat}
            </motion.button>
          ))}
          <div className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: "oklch(12% 0.018 270)", border: "1px solid oklch(20% 0.025 270)" }}>
            <Search size={13} style={{ color: "oklch(45% 0.01 270)" }} />
            <input type="text" placeholder="Search articles…" value={query} onChange={(e) => setQuery(e.target.value)} className="bg-transparent text-xs outline-none w-32" style={{ color: "oklch(70% 0.01 270)" }} data-cursor />
          </div>
        </div>

        {/* Articles grid */}
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory + query} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {rest.map((article, i) => <ArticleCard key={article.id} article={article} index={i} />)}
            {rest.length === 0 && (
              <div className="col-span-3 text-center py-16 text-sm" style={{ color: "oklch(40% 0.01 270)" }}>
                No articles match your filter. Try a different category.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <NewsletterCTA />
    </>
  );
}
