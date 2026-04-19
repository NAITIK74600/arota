import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/layout/InnerPageLayout";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How soft-era uses cookies and how you can control them.",
};

const sections = [
  {
    title: "What Are Cookies",
    body: `Cookies are small text files placed on your device when you visit a website. They help websites function correctly, remember preferences, and gather anonymous usage statistics. Cookies do not contain personally identifiable information unless you have provided that information to us directly.`,
  },
  {
    title: "Cookies We Use",
    body: `We use a minimal set of cookies to operate this website effectively. These include: strictly necessary cookies required for the site to function (e.g., session cookies), performance cookies that help us understand how visitors interact with our pages, and preference cookies that remember your settings between visits.`,
  },
  {
    title: "Strictly Necessary Cookies",
    body: `These cookies are essential for the website to work. They enable core functionality such as security, network management, and page routing. You cannot opt out of these cookies — without them, the site cannot function properly.`,
  },
  {
    title: "Analytics & Performance Cookies",
    body: `We may use analytics tools (such as Google Analytics or Netlify Analytics) that place cookies to collect aggregate, anonymised data about how visitors use our site — pages visited, time spent, and referral sources. This data helps us improve the site. No personal identity is tracked.`,
  },
  {
    title: "Third-Party Cookies",
    body: `Some embedded content or third-party integrations (such as video players or social media widgets) may set their own cookies. These are governed by the third party's cookie policies. We have no control over those cookies and recommend reviewing the privacy policies of any third-party services you interact with.`,
  },
  {
    title: "How to Control Cookies",
    body: `You can control and delete cookies through your browser settings. Most browsers allow you to block or delete cookies, though this may affect how the website functions. Here are direct links to cookie settings for common browsers: Chrome — Settings > Privacy and Security > Cookies. Firefox — Options > Privacy & Security > Cookies. Safari — Preferences > Privacy. Edge — Settings > Cookies and site permissions.`,
  },
  {
    title: "Cookie Retention",
    body: `Session cookies are deleted when you close your browser. Persistent cookies remain on your device for a set period (typically 12–24 months) or until you delete them manually. Analytics cookies are anonymised after 14 months.`,
  },
  {
    title: "Updates to This Policy",
    body: `We may update this Cookie Policy as our use of cookies evolves or regulations change. The updated effective date will always be shown at the top of this page. Continued use of our site after changes constitutes acceptance.`,
  },
  {
    title: "Contact",
    body: `If you have any questions about how we use cookies, contact us at hello@soft-era.studio.`,
  },
];

export default function CookiePolicyPage() {
  return (
    <InnerPageLayout>
      <LegalPage
        tag="Legal"
        title="Cookie Policy"
        subtitle="What cookies we use, why, and how you can control them."
        updated="April 19, 2026"
        sections={sections}
      />
    </InnerPageLayout>
  );
}

function LegalPage({
  tag,
  title,
  subtitle,
  updated,
  sections,
}: {
  tag: string;
  title: string;
  subtitle: string;
  updated: string;
  sections: { title: string; body: string }[];
}) {
  return (
    <div className="min-h-screen" style={{ background: "oklch(8% 0.015 270)" }}>
      {/* Hero */}
      <div
        className="relative pt-40 pb-20 px-6 text-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(65% 0.28 290 / 18%) 0%, transparent 65%)",
        }}
      >
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <span
          className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full"
          style={{
            color: "oklch(65% 0.28 290)",
            background: "oklch(65% 0.28 290 / 10%)",
            border: "1px solid oklch(65% 0.28 290 / 20%)",
          }}
        >
          {tag}
        </span>
        <h1
          className="font-black text-white mb-4"
          style={{
            fontFamily: "var(--font-sora-var)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 1,
          }}
        >
          {title}
        </h1>
        <p className="text-lg max-w-xl mx-auto mb-6" style={{ color: "oklch(55% 0.01 270)" }}>
          {subtitle}
        </p>
        <p className="text-xs tracking-widest uppercase" style={{ color: "oklch(38% 0.01 270)" }}>
          Last updated: {updated}
        </p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 md:px-8 pb-28">
        <div
          className="rounded-2xl p-8 md:p-12 space-y-10"
          style={{
            background: "oklch(11% 0.018 270)",
            border: "1px solid oklch(18% 0.022 270)",
          }}
        >
          {sections.map((s, i) => (
            <div key={i} className="space-y-3">
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-mono tabular-nums"
                  style={{ color: "oklch(65% 0.28 290 / 60%)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="h-px flex-1" style={{ background: "oklch(22% 0.025 270)" }} />
              </div>
              <h2
                className="text-lg font-bold text-white"
                style={{ fontFamily: "var(--font-sora-var)" }}
              >
                {s.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "oklch(55% 0.01 270)" }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs mt-10" style={{ color: "oklch(35% 0.01 270)" }}>
          Questions?{" "}
          <a
            href="mailto:hello@soft-era.studio"
            className="underline underline-offset-4 decoration-white/20 hover:text-white transition-colors"
          >
            hello@soft-era.studio
          </a>
        </p>
      </div>
    </div>
  );
}
