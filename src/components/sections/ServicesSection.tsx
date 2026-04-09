"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Monitor, Palette, Film, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Monitor,
    number: "01",
    title: "UI/UX & Web Development",
    description: "We design and engineer digital products that users love — apps, platforms, and design systems built to perform at scale.",
    tags: ["Product Design", "Next.js", "React Native", "Design Systems"],
    accent: "oklch(65% 0.25 250)",
    href: "/services#service-01",
  },
  {
    icon: Palette,
    number: "02",
    title: "Graphic Design & Branding",
    description: "From logo to brand universe — we craft visual identities that are instantly recognizable and emotionally resonant.",
    tags: ["Brand Identity", "Typography", "Print & Packaging", "Strategy"],
    accent: "oklch(65% 0.28 290)",
    href: "/services#service-02",
  },
  {
    icon: Film,
    number: "03",
    title: "Video · VFX · 3D & CGI",
    description: "Cinematic video content, photorealistic CGI, and visual effects — the kind that makes audiences watch twice.",
    tags: ["VFX", "3D Animation", "CGI Visualization", "Motion Graphics"],
    accent: "oklch(65% 0.28 330)",
    href: "/services#service-03",
  },
];

function ServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
  const { icon: Icon, number, title, description, tags, accent, href } = service;

  return (
    <motion.div
      className="group relative rounded-3xl p-7 flex flex-col justify-between overflow-hidden cursor-pointer"
      style={{ background: "oklch(12% 0.018 270)", border: "1px solid oklch(20% 0.025 270)" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
      whileHover={{
        y: -6,
        borderColor: accent.replace(")", " / 40%)"),
        boxShadow: `0 20px 60px ${accent.replace(")", " / 15%)")}`,
      }}
      data-cursor
    >
      {/* Bg glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 70% 60% at 20% 20%, ${accent.replace(")", " / 8%)")}, transparent 65%)` }}
      />

      {/* Watermark number */}
      <div
        className="absolute -bottom-3 -right-2 text-[7rem] font-black leading-none pointer-events-none select-none"
        style={{ fontFamily: "var(--font-sora-var)", color: accent.replace(")", " / 5%)") }}
      >
        {number}
      </div>

      <div className="relative">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
          style={{ background: `${accent.replace(")", " / 12%)")}`, color: accent }}
        >
          <Icon size={22} />
        </div>

        {/* Number label */}
        <div className="text-xs font-mono tracking-[0.18em] uppercase mb-2" style={{ color: "oklch(40% 0.01 270)" }}>
          Service {number}
        </div>

        <h3 className="text-xl font-bold mb-3 leading-tight" style={{ fontFamily: "var(--font-sora-var)" }}>
          {title}
        </h3>

        <p className="text-sm leading-relaxed mb-6" style={{ color: "oklch(55% 0.01 270)" }}>
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg text-xs"
              style={{ background: `${accent.replace(")", " / 10%)")}`, color: accent, border: `1px solid ${accent.replace(")", " / 20%)")}` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Link href={href} data-cursor>
        <motion.span
          className="relative inline-flex items-center gap-2 text-sm font-semibold"
          style={{ color: accent }}
          whileHover={{ gap: "0.625rem" }}
          transition={{ duration: 0.2 }}
        >
          Explore service
          <motion.span
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: `${accent.replace(")", " / 15%)")}` }}
            whileHover={{ rotate: 45 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <ArrowUpRight size={14} />
          </motion.span>
        </motion.span>
      </Link>
    </motion.div>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="relative py-28 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, oklch(65% 0.28 290 / 6%) 0%, transparent 60%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(65% 0.28 290 / 25%), transparent)" }} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-[0.18em] uppercase mb-5 glass"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ color: "oklch(65% 0.28 290)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              What We Do
            </motion.div>
            <motion.h2
              className="text-4xl md:text-6xl font-bold leading-[1.05]"
              style={{ fontFamily: "var(--font-sora-var)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Three disciplines.
              <br />
              <span className="text-gradient">One studio.</span>
            </motion.h2>
          </div>
          <motion.p
            className="text-sm leading-relaxed max-w-xs"
            style={{ color: "oklch(50% 0.01 270)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            We don't outsource. Design, engineering, and production live under one roof — so your project stays coherent from brief to launch.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
