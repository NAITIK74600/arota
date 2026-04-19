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
): {
  opacity: ReturnType<typeof useTransform>;
  y: ReturnType<typeof useTransform>;
  scale: ReturnType<typeof useTransform>;
  clipY: ReturnType<typeof useTransform>;
} {
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


// ─── Story chapters ──────────────────────────────────────────────────────────
const chapters = [
  {
    index: "00",
    label: "The Beginning",
    headline: "Every great\nproduct starts\nwith a question.",
    body: "Not a brief. Not a budget. A question worth answering. We start every engagement by finding out what really needs to be built — and why.",
    accent: "oklch(65% 0.25 250)",
    accentRaw: "250",
  },
  {
    index: "01",
    label: "The Vision",
    headline: "Design is a\nconversation\nbetween form & meaning.",
    body: "We translate abstract ideas into visual systems that communicate instantly. Typography, space, color — every decision deliberate, every pixel intentional.",
    accent: "oklch(65% 0.28 290)",
    accentRaw: "290",
  },
  {
    index: "02",
    label: "The Craft",
    headline: "Code is the\nmedium,\nnot the goal.",
    body: "Engineering serves experience. We write production-grade code that scales — fast, accessible, and built to last long after the launch week excitement fades.",
    accent: "oklch(65% 0.28 330)",
    accentRaw: "330",
  },
  {
    index: "03",
    label: "The Impact",
    headline: "We measure\nsuccess in\nreal outcomes.",
    body: "Not deliverables. Not Dribbble likes. We track what matters — conversions, retention, the moment a user says \"this just works.\" That's the work we're proud of.",
    accent: "oklch(65% 0.28 180)",
    accentRaw: "180",
  },
];

const CHAPTER_COUNT = chapters.length;
// Each chapter occupies 1 viewport height, plus 1 for entry and 1 for exit
const TOTAL_SECTIONS = CHAPTER_COUNT + 1;

// Map chapter index to its scroll range [enter, exit]
function chapterRange(i: number): [number, number] {
  const step = 1 / TOTAL_SECTIONS;
  const enter = i * step;
  const exit = (i + 1) * step;
  return [enter, exit];
}

// ─── Single chapter layer ────────────────────────────────────────────────────
function Chapter({
  chapter,
  index,
  scrollYProgress,
}: {
  chapter: (typeof chapters)[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const [enter, exit] = chapterRange(index);
  const midpoint = (enter + exit) / 2;
  const quarterIn = enter + (exit - enter) * 0.2;
  const quarterOut = enter + (exit - enter) * 0.8;

  // Opacity: fade in, hold, fade out
  const opacity = useTransform(
    scrollYProgress,
    [enter, quarterIn, quarterOut, exit],
    [0, 1, 1, 0]
  );

  // Y parallax: enters from below, exits upward — creates depth
  const y = useTransform(
    scrollYProgress,
    [enter, midpoint, exit],
    ["6vh", "0vh", "-6vh"]
  );

  // Depth scale: slightly smaller on enter/exit, full size in middle
  const scale = useTransform(
    scrollYProgress,
    [enter, quarterIn, quarterOut, exit],
    [0.94, 1, 1, 0.96]
  );

  // Text blur for cinematic depth
  const blurAmount = useTransform(
    scrollYProgress,
    [enter, quarterIn, quarterOut, exit],
    [8, 0, 0, 6]
  );
  const filter = useMotionTemplate`blur(${blurAmount}px)`;

  // Accent line width
  const lineWidth = useTransform(
    scrollYProgress,
    [enter, quarterIn, quarterOut, exit],
    ["0%", "100%", "100%", "0%"]
  );

  // Background glow
  const glowOpacity = useTransform(
    scrollYProgress,
    [enter, midpoint, exit],
    [0, 0.12, 0]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6 md:px-20 pointer-events-none"
      style={{ opacity, y, scale }}
    >
      {/* Depth glow orb */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background: chapter.accent,
          opacity: glowOpacity,
        }}
      />

      <div className="relative max-w-5xl w-full">
        <motion.div style={{ filter }}>
          {/* Chapter label */}
          <motion.div
            className="flex items-center gap-4 mb-8"
          >
            <span
              className="text-xs font-mono tracking-[0.35em] uppercase"
              style={{ color: chapter.accent }}
            >
              Chapter {chapter.index}
            </span>
            <motion.div
              className="h-px origin-left"
              style={{
                width: lineWidth,
                background: chapter.accent,
                maxWidth: "80px",
              }}
            />
            <span
              className="text-xs tracking-[0.18em] uppercase"
              style={{ color: "oklch(40% 0.01 270)" }}
            >
              {chapter.label}
            </span>
          </motion.div>

          {/* Headline */}
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.02] mb-10 whitespace-pre-line"
            style={{ fontFamily: "var(--font-sora-var)" }}
          >
            {chapter.headline.split("\n").map((line, li) => (
              <span key={li} className="block">
                {li === 0 ? (
                  line
                ) : li === 1 ? (
                  <span style={{ color: chapter.accent }}>{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h2>

          {/* Body */}
          <p
            className="text-base md:text-lg leading-relaxed max-w-xl"
            style={{ color: "oklch(55% 0.01 270)" }}
          >
            {chapter.body}
          </p>
        </motion.div>

        {/* Large number watermark — deeper parallax layer */}
        <WatermarkNumber number={chapter.index} scrollYProgress={scrollYProgress} chapterEnter={enter} chapterExit={exit} accent={chapter.accent} />
      </div>
    </motion.div>
  );
}

// Watermark number moves at a different parallax rate for depth
function WatermarkNumber({
  number,
  scrollYProgress,
  chapterEnter,
  chapterExit,
  accent,
}: {
  number: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  chapterEnter: number;
  chapterExit: number;
  accent: string;
}) {
  const mid = (chapterEnter + chapterExit) / 2;
  const opacity = useTransform(
    scrollYProgress,
    [chapterEnter, mid, chapterExit],
    [0, 0.06, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [chapterEnter, chapterExit],
    ["12vh", "-12vh"] // faster than the text = deeper parallax plane
  );

  return (
    <motion.div
      className="absolute -bottom-8 right-0 text-[18vw] font-black leading-none select-none pointer-events-none"
      style={{
        fontFamily: "var(--font-sora-var)",
        color: accent,
        opacity,
        y,
      }}
    >
      {number}
    </motion.div>
  );
}

// ─── Progress indicator ──────────────────────────────────────────────────────
function ProgressDots({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  return (
    <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
      {chapters.map((ch, i) => {
        const [enter, exit] = chapterRange(i);
        const mid = (enter + exit) / 2;
        const scale = useTransform(
          scrollYProgress,
          [enter, mid, exit],
          [0.6, 1.4, 0.6]
        );
        const opacity = useTransform(
          scrollYProgress,
          [enter, mid, exit],
          [0.25, 1, 0.25]
        );
        return (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: ch.accent, scale, opacity }}
          />
        );
      })}
    </div>
  );
}

// ─── Scroll progress bar ─────────────────────────────────────────────────────
function ScrollBar({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      className="absolute bottom-0 left-0 h-px origin-left z-20"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, oklch(65% 0.25 250), oklch(65% 0.28 290), oklch(65% 0.28 330))",
        width: "100%",
      }}
    />
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export function ScrollStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background gradient hue shifts across scroll
  const hue = useTransform(scrollYProgress, [0, 1], [250, 180]);
  const bgGradient = useMotionTemplate`radial-gradient(ellipse 80% 60% at 30% 50%, oklch(65% 0.18 ${hue} / 6%) 0%, transparent 65%)`;

  return (
    // Outer container: tall enough for smooth chapter progression
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${TOTAL_SECTIONS * 100}vh` }}
      aria-label="Our story"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Dynamic background */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ background: bgGradient }} />

        {/* Top + bottom fade vignettes */}
        <div
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
          style={{ background: "linear-gradient(to bottom, oklch(8% 0.015 270), transparent)" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
          style={{ background: "linear-gradient(to top, oklch(8% 0.015 270), transparent)" }}
        />

        {/* Section label */}
        <div className="absolute top-10 left-6 md:left-12 z-10">
          <span
            className="text-[10px] tracking-[0.4em] uppercase font-mono"
            style={{ color: "oklch(35% 0.01 270)" }}
          >
            Our Story
          </span>
        </div>

        {/* All chapter layers stacked */}
        <div className="absolute inset-0">
          {chapters.map((chapter, i) => (
            <Chapter
              key={i}
              chapter={chapter}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Progress indicators */}
        <ProgressDots scrollYProgress={scrollYProgress} />

        {/* Bottom progress bar */}
        <ScrollBar scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
