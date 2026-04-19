"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useSpring,
} from "framer-motion";

// ─── Story chapters ──────────────────────────────────────────────────────────
const chapters = [
  {
    num: "01",
    tag: "Discovery",
    headline: ["Every great", "product starts", "with a question."],
    body: "Not a brief, not a budget — a question worth answering. Before we design a single pixel, we find out what actually needs to be built, and why it matters right now.",
    accent: "oklch(65% 0.25 250)",
    accentHue: "250",
  },
  {
    num: "02",
    tag: "Design",
    headline: ["We turn ideas", "into systems", "that speak."],
    body: "Typography, space, motion, colour — every decision is deliberate. We create visual systems that communicate instantly and hold together at every scale.",
    accent: "oklch(65% 0.28 290)",
    accentHue: "290",
  },
  {
    num: "03",
    tag: "Engineering",
    headline: ["Code that", "serves the", "experience."],
    body: "Production-grade engineering with performance and accessibility as first-class concerns — not afterthoughts bolted on at QA. Built to scale, built to last.",
    accent: "oklch(68% 0.28 330)",
    accentHue: "330",
  },
  {
    num: "04",
    tag: "Launch",
    headline: ["We ship, watch,", "iterate, and", "keep going."],
    body: "Real impact comes from relentless iteration post-launch. We monitor obsessively, learn from real users, and never consider the work done at deployment.",
    accent: "oklch(68% 0.24 175)",
    accentHue: "175",
  },
];

const N = chapters.length;
// 1 vh per chapter + buffer zones
const TOTAL_VH = N + 1.5;

function chapterProgress(
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"],
  i: number
) {
  const step = 1 / TOTAL_VH;
  const enter = i * step;
  const mid = enter + step * 0.5;
  const exit = enter + step;

  const opacity = useTransform(
    scrollYProgress,
    [enter, enter + step * 0.18, exit - step * 0.18, exit],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [enter, mid, exit],
    ["5vh", "0vh", "-5vh"]
  );
  const scale = useTransform(
    scrollYProgress,
    [enter, enter + step * 0.22, exit - step * 0.22, exit],
    [0.96, 1, 1, 0.97]
  );
  const clipY = useTransform(
    scrollYProgress,
    [enter, enter + step * 0.28],
    ["100%", "0%"]
  );

  return { opacity, y, scale, clipY };
}

// ─── Chapter panel ────────────────────────────────────────────────────────────
function ChapterPanel({
  ch,
  index,
  scrollYProgress,
}: {
  ch: (typeof chapters)[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const { opacity, y, scale } = chapterProgress(scrollYProgress, index);

  const step = 1 / TOTAL_VH;
  const enter = index * step;
  const exit = enter + step;
  const mid = enter + step * 0.5;

  // Watermark number parallax — deeper plane (3x faster)
  const wmY = useTransform(scrollYProgress, [enter, exit], ["18vh", "-18vh"]);
  const wmOpacity = useTransform(scrollYProgress, [enter, mid, exit], [0, 0.07, 0]);

  // Glow pulse
  const glowO = useTransform(scrollYProgress, [enter, mid, exit], [0, 0.18, 0]);

  // Line width draw
  const lineW = useTransform(
    scrollYProgress,
    [enter, enter + step * 0.35, exit - step * 0.2, exit],
    ["0%", "100%", "100%", "0%"]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-8 md:px-16 lg:px-24"
      style={{ opacity, y, scale, pointerEvents: "none" }}
    >
      {/* Ambient glow for this chapter */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 65% 55% at 50% 50%, ${ch.accent} 0%, transparent 70%)`,
          opacity: glowO,
        }}
      />

      <div className="relative max-w-5xl w-full">
        {/* Watermark number — deepest parallax plane */}
        <motion.div
          className="absolute -right-4 md:-right-10 -bottom-10 font-black leading-none select-none pointer-events-none"
          style={{
            fontFamily: "var(--font-sora-var)",
            fontSize: "clamp(8rem, 25vw, 22rem)",
            color: ch.accent,
            opacity: wmOpacity,
            y: wmY,
            letterSpacing: "-0.05em",
          }}
        >
          {ch.num}
        </motion.div>

        {/* Left accent bar */}
        <div className="flex items-start gap-6 md:gap-10">
          <div className="flex-shrink-0 pt-3 hidden sm:flex flex-col items-center gap-3">
            <motion.div
              className="w-px origin-top"
              style={{
                height: "80px",
                background: ch.accent,
                scaleY: useTransform(scrollYProgress, [enter, enter + step * 0.3], [0, 1]),
              }}
            />
            <span
              className="text-[9px] tracking-[0.3em] uppercase font-mono rotate-90 origin-center mt-6 whitespace-nowrap"
              style={{ color: ch.accent }}
            >
              {ch.tag}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            {/* Chapter label row */}
            <div className="flex items-center gap-4 mb-6">
              <span
                className="text-[11px] font-mono tracking-[0.35em] uppercase"
                style={{ color: ch.accent }}
              >
                Chapter {ch.num}
              </span>
              <motion.div
                className="h-px flex-1 max-w-[60px] origin-left"
                style={{ background: ch.accent, scaleX: lineW }}
              />
              <span
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{ color: "oklch(38% 0.01 270)" }}
              >
                {ch.tag}
              </span>
            </div>

            {/* Headline — each line clips up independently */}
            <h2
              className="font-black leading-[1] mb-8"
              style={{
                fontFamily: "var(--font-sora-var)",
                fontSize: "clamp(2.6rem, 7.5vw, 6.5rem)",
              }}
            >
              {ch.headline.map((line, li) => {
                const lineEnter = enter + (li * step * 0.12);
                const lineOpacity = useTransform(
                  scrollYProgress,
                  [lineEnter, lineEnter + step * 0.18, exit - step * 0.12, exit],
                  [0, 1, 1, 0]
                );
                const lineY = useTransform(
                  scrollYProgress,
                  [lineEnter, lineEnter + step * 0.18],
                  ["40px", "0px"]
                );
                return (
                  <motion.span
                    key={li}
                    className="block"
                    style={{
                      opacity: lineOpacity,
                      y: lineY,
                      color:
                        li === 1
                          ? ch.accent
                          : li === 2
                          ? "oklch(85% 0.005 270)"
                          : "oklch(95% 0.005 270)",
                    }}
                  >
                    {line}
                  </motion.span>
                );
              })}
            </h2>

            {/* Body text */}
            <motion.p
              className="text-base md:text-lg leading-relaxed max-w-lg"
              style={{
                color: "oklch(52% 0.01 270)",
                opacity: useTransform(
                  scrollYProgress,
                  [enter + step * 0.25, enter + step * 0.45, exit - step * 0.2, exit],
                  [0, 1, 1, 0]
                ),
                y: useTransform(
                  scrollYProgress,
                  [enter + step * 0.25, enter + step * 0.45],
                  ["20px", "0px"]
                ),
              }}
            >
              {ch.body}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Side progress rail ───────────────────────────────────────────────────────
function ProgressRail({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const scaleY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    { stiffness: 120, damping: 22 }
  );

  return (
    <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-0 z-20">
      {/* Track */}
      <div className="relative w-px h-32" style={{ background: "oklch(20% 0.025 270)" }}>
        <motion.div
          className="absolute top-0 left-0 w-full origin-top"
          style={{
            scaleY,
            background:
              "linear-gradient(to bottom, oklch(65% 0.25 250), oklch(65% 0.28 290), oklch(68% 0.28 330), oklch(68% 0.24 175))",
            height: "100%",
          }}
        />
      </div>

      {/* Chapter dots */}
      <div className="absolute flex flex-col justify-between h-32 top-0">
        {chapters.map((ch, i) => {
          const step = 1 / TOTAL_VH;
          const enter = i * step;
          const mid = enter + step * 0.5;
          const exit = enter + step;
          const dotScale = useTransform(scrollYProgress, [enter, mid, exit], [0.7, 1.6, 0.7]);
          const dotOpacity = useTransform(scrollYProgress, [enter, mid, exit], [0.3, 1, 0.3]);
          return (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full -translate-x-[2px]"
              style={{ background: ch.accent, scale: dotScale, opacity: dotOpacity }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─── Bottom progress bar ──────────────────────────────────────────────────────
function ProgressBar({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const scaleX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 150,
    damping: 25,
  });
  return (
    <motion.div
      className="absolute bottom-0 left-0 h-[2px] origin-left z-20 w-full"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, oklch(65% 0.25 250), oklch(65% 0.28 290) 40%, oklch(68% 0.28 330) 70%, oklch(68% 0.24 175))",
      }}
    />
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function ScrollStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background hue morphs across the scroll journey
  const hue = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [250, 290, 330, 175]);
  const bgGrad = useMotionTemplate`radial-gradient(ellipse 80% 55% at 25% 55%, oklch(65% 0.18 ${hue} / 7%) 0%, transparent 65%)`;

  return (
    <div
      ref={containerRef}
      style={{ height: `${TOTAL_VH * 100}vh` }}
      aria-label="Our story"
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Morphing ambient bg */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ background: bgGrad }} />

        {/* Top edge fade */}
        <div
          className="absolute top-0 inset-x-0 h-28 pointer-events-none z-10"
          style={{ background: "linear-gradient(to bottom, oklch(8% 0.015 270), transparent)" }}
        />
        {/* Bottom edge fade */}
        <div
          className="absolute bottom-0 inset-x-0 h-28 pointer-events-none z-10"
          style={{ background: "linear-gradient(to top, oklch(8% 0.015 270), transparent)" }}
        />

        {/* Section eyebrow */}
        <div className="absolute top-10 left-8 md:left-14 z-20 flex items-center gap-3">
          <span
            className="text-[9px] tracking-[0.45em] uppercase font-mono"
            style={{ color: "oklch(32% 0.01 270)" }}
          >
            Our Story
          </span>
          <div className="h-px w-8" style={{ background: "oklch(32% 0.01 270 / 50%)" }} />
        </div>

        {/* All chapter panels */}
        <div className="absolute inset-0">
          {chapters.map((ch, i) => (
            <ChapterPanel
              key={i}
              ch={ch}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Side progress rail */}
        <ProgressRail scrollYProgress={scrollYProgress} />

        {/* Bottom bar */}
        <ProgressBar scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
