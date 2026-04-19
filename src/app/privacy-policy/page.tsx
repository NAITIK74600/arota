import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/layout/InnerPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How soft-era collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "Information We Collect",
    body: `When you visit our website or contact us through a form, we may collect: your name, email address, company name, and any information you voluntarily provide in messages. We also collect standard server logs including IP addresses, browser type, referring pages, and timestamps for security and performance monitoring.`,
  },
  {
    title: "How We Use Your Information",
    body: `We use the information you share to respond to your enquiries, send project proposals, and communicate about ongoing work. We do not sell, rent, or share your personal data with third parties for their marketing purposes. Internal project data may be shared with trusted contractors under confidentiality agreements.`,
  },
  {
    title: "Cookies and Tracking",
    body: `Our website uses cookies to enhance your browsing experience and analyse traffic. We use first-party analytical cookies to understand how visitors interact with our site. You can control cookies through your browser settings. See our Cookie Policy for full details.`,
  },
  {
    title: "Third-Party Services",
    body: `We use Netlify for hosting (subject to Netlify's Privacy Policy) and may use Google Analytics or similar tools for aggregate traffic analysis. These services have their own privacy policies and data-handling practices which we encourage you to review.`,
  },
  {
    title: "Data Retention",
    body: `We retain contact enquiry data for up to 24 months, unless you request deletion sooner. Project-related communications may be retained for up to 5 years for accounting and legal compliance. Server logs are automatically purged after 90 days.`,
  },
  {
    title: "Your Rights",
    body: `You have the right to request access to, correction of, or deletion of your personal data held by us. To exercise these rights, email us at hello@soft-era.studio. We will respond within 30 days. If you are based in the EU/EEA, you also have the right to lodge a complaint with your local supervisory authority.`,
  },
  {
    title: "Security",
    body: `We implement industry-standard security measures including HTTPS encryption and restricted data access. No method of transmission over the internet is 100% secure; we cannot guarantee absolute security, but we take every reasonable precaution to protect your information.`,
  },
  {
    title: "Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of our website after changes constitutes acceptance of the revised policy.`,
  },
  {
    title: "Contact",
    body: `For any privacy-related questions, email us at hello@soft-era.studio or write to: soft-era Studio, New Delhi, India.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <InnerPageLayout>
      <LegalPage
        tag="Legal"
        title="Privacy Policy"
        subtitle="We respect your data. Here's exactly how we handle it."
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

        {/* Footer note */}
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
