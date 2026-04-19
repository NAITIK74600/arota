import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/layout/InnerPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms and conditions governing your use of soft-era's website and services.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    body: `By accessing or using the soft-era website and engaging our services, you agree to be bound by these Terms of Service. If you do not agree, please discontinue use of our website and do not engage our services. These terms apply to all visitors, clients, and collaborators.`,
  },
  {
    title: "Services Provided",
    body: `soft-era provides creative and digital services including but not limited to UI/UX design, web development, branding, motion graphics, and VFX. The scope, timeline, and deliverables for each project are defined in individual project agreements or statements of work signed by both parties.`,
  },
  {
    title: "Intellectual Property",
    body: `Upon receipt of full payment, intellectual property rights for custom deliverables (designs, code, assets) transfer to the client as specified in the project agreement. Until full payment is made, soft-era retains all rights to the work. soft-era reserves the right to showcase completed work in its portfolio unless explicitly agreed otherwise in writing.`,
  },
  {
    title: "Client Responsibilities",
    body: `Clients are responsible for providing accurate content, timely feedback, and required assets within agreed timelines. Delays caused by late client feedback may result in revised delivery dates. Clients warrant that any materials provided to soft-era do not infringe third-party intellectual property rights.`,
  },
  {
    title: "Payment Terms",
    body: `Payment schedules are outlined in individual project agreements. Typically, a deposit is required before work commences, with the balance due upon project completion. Overdue payments may attract a late fee of 2% per month. soft-era reserves the right to suspend work on accounts with outstanding balances.`,
  },
  {
    title: "Limitation of Liability",
    body: `soft-era is not liable for indirect, incidental, or consequential damages arising from the use of our services or deliverables. Our total liability for any claim is limited to the amount paid by the client for the specific service giving rise to the claim. We do not guarantee specific business outcomes from our work.`,
  },
  {
    title: "Confidentiality",
    body: `Both parties agree to keep confidential any proprietary information shared during the course of a project. This obligation survives termination of the engagement. soft-era will not disclose client business information to third parties without written consent.`,
  },
  {
    title: "Termination",
    body: `Either party may terminate a project agreement with 14 days written notice. The client is responsible for payment of all work completed up to the termination date. Deposits are non-refundable unless soft-era fails to commence work within the agreed timeframe.`,
  },
  {
    title: "Governing Law",
    body: `These terms are governed by the laws of India. Any disputes arising from these terms or our services shall be subject to the jurisdiction of courts in New Delhi, India.`,
  },
  {
    title: "Amendments",
    body: `soft-era may update these Terms of Service at any time. Continued use of our website or services after changes constitutes acceptance of the revised terms. Material changes will be communicated via email to active clients.`,
  },
  {
    title: "Contact",
    body: `For questions about these terms, email us at hello@soft-era.studio.`,
  },
];

export default function TermsOfServicePage() {
  return (
    <InnerPageLayout>
      <LegalPage
        tag="Legal"
        title="Terms of Service"
        subtitle="The rules of engagement — clear, fair, and straightforward."
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
