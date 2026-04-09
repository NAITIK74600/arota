"use client";

const clients = [
  "Batla Medicos",
  "Live Demo",
  "Startup Agency",
  "Established 2026",
  "Next.js Build",
  "Responsive UI",
  "Launch Ready",
  "Netlify Ready",
  "Production Copy",
  "Real Case Study",
  "Frontend Delivery",
  "Design Systems",
];

export function MarqueeTicker() {
  const doubled = [...clients, ...clients];

  return (
    <section className="relative py-10 overflow-hidden" style={{ borderTop: "1px solid oklch(18% 0.022 270)", borderBottom: "1px solid oklch(18% 0.022 270)", background: "oklch(9% 0.016 270)" }}>
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, oklch(9% 0.016 270), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, oklch(9% 0.016 270), transparent)" }} />

      <div className="animate-marquee flex gap-14 whitespace-nowrap">
        {doubled.map((client, i) => (
          <span
            key={i}
            className="text-sm font-semibold tracking-[0.12em] uppercase flex items-center gap-4"
            style={{ color: "oklch(38% 0.01 270)" }}
          >
            {client}
            <span className="w-1 h-1 rounded-full" style={{ background: "oklch(65% 0.28 290 / 50%)" }} />
          </span>
        ))}
      </div>
    </section>
  );
}
