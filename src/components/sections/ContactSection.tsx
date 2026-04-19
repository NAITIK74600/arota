"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Clock } from "lucide-react";

const contactInfo = [
  { icon: Mail,    label: "Email us",       value: "hello@soft-era.studio",       href: "mailto:hello@soft-era.studio" },
  { icon: MapPin,  label: "Based in",       value: "London · NYC · Nairobi",   href: null },
  { icon: Clock,   label: "Response time",  value: "Within 2 hours",           href: null },
];

const budgets = ["Under $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Let's Discuss"];
const services = ["UI/UX & Web Dev", "Branding & Identity", "Video / VFX / 3D", "Multiple Services"];

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", company: "", budget: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  const inputStyle = {
    background: "oklch(14% 0.02 270)",
    border: "1px solid oklch(22% 0.025 270)",
    color: "oklch(88% 0.005 270)",
    borderRadius: "0.75rem",
  };

  return (
    <section id="contact" className="relative py-28 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, oklch(65% 0.28 290 / 7%) 0%, transparent 60%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(65% 0.28 290 / 35%), transparent)" }} />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT */}
          <div>
            <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-[0.18em] uppercase mb-5 glass" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ color: "oklch(65% 0.28 290)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Let's Build Together
            </motion.div>
            <motion.h2 className="text-4xl md:text-6xl font-bold leading-[1.05] mb-6" style={{ fontFamily: "var(--font-sora-var)" }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              Got a project?<br /><span className="text-gradient">Let's talk.</span>
            </motion.h2>
            <motion.p className="text-base leading-relaxed mb-10 max-w-sm" style={{ color: "oklch(55% 0.01 270)" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              Tell us about what you're building. We'll get back to you within 2 hours — usually faster.
            </motion.p>

            {/* Contact info */}
            <div className="flex flex-col gap-4">
              {contactInfo.map(({ icon: Icon, label, value, href }, i) => (
                <motion.div key={label} className="flex items-center gap-4" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "oklch(65% 0.28 290 / 12%)", color: "oklch(65% 0.28 290)" }}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="text-xs mb-0.5" style={{ color: "oklch(42% 0.01 270)" }}>{label}</div>
                    {href
                      ? <a href={href} className="text-sm font-medium hover:text-white transition-colors" style={{ color: "oklch(78% 0.01 270)" }} data-cursor>{value}</a>
                      : <div className="text-sm font-medium" style={{ color: "oklch(78% 0.01 270)" }}>{value}</div>
                    }
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT — Form */}
          <motion.div className="rounded-3xl p-8" style={{ background: "oklch(11% 0.017 270)", border: "1px solid oklch(20% 0.025 270)" }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            {sent ? (
              <motion.div className="flex flex-col items-center justify-center py-12 text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: "oklch(65% 0.28 290 / 15%)" }}>
                  <Send size={28} style={{ color: "oklch(65% 0.28 290)" }} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-sora-var)" }}>Message received!</h3>
                <p className="text-sm" style={{ color: "oklch(55% 0.01 270)" }}>We'll be in your inbox within 2 hours. Seriously.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs mb-1.5" style={{ color: "oklch(45% 0.01 270)" }}>Your name *</label>
                    <input required value={form.name} onChange={set("name")} className="w-full px-4 py-2.5 text-sm outline-none" style={inputStyle} placeholder="Jane Smith" data-cursor />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs mb-1.5" style={{ color: "oklch(45% 0.01 270)" }}>Email *</label>
                    <input required type="email" value={form.email} onChange={set("email")} autoComplete="email" className="w-full px-4 py-2.5 text-sm outline-none" style={inputStyle} placeholder="jane@company.com" data-cursor />
                  </div>
                </div>

                <div>
                  <label className="block text-xs mb-1.5" style={{ color: "oklch(45% 0.01 270)" }}>Company</label>
                  <input value={form.company} onChange={set("company")} className="w-full px-4 py-2.5 text-sm outline-none" style={inputStyle} placeholder="Acme Corp" data-cursor />
                </div>

                {/* Budget chips */}
                <div>
                  <label className="block text-xs mb-2" style={{ color: "oklch(45% 0.01 270)" }}>Budget range</label>
                  <div className="flex flex-wrap gap-2">
                    {budgets.map((b) => (
                      <button key={b} type="button" onClick={() => setForm((p) => ({ ...p, budget: b }))}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={form.budget === b
                          ? { background: "oklch(65% 0.28 290 / 18%)", color: "oklch(65% 0.28 290)", border: "1px solid oklch(65% 0.28 290 / 40%)" }
                          : { background: "oklch(15% 0.02 270)", color: "oklch(50% 0.01 270)", border: "1px solid oklch(22% 0.025 270)" }
                        }
                        data-cursor
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service chips */}
                <div>
                  <label className="block text-xs mb-2" style={{ color: "oklch(45% 0.01 270)" }}>Service needed</label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => (
                      <button key={s} type="button" onClick={() => setForm((p) => ({ ...p, service: s }))}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={form.service === s
                          ? { background: "oklch(65% 0.28 330 / 18%)", color: "oklch(65% 0.28 330)", border: "1px solid oklch(65% 0.28 330 / 40%)" }
                          : { background: "oklch(15% 0.02 270)", color: "oklch(50% 0.01 270)", border: "1px solid oklch(22% 0.025 270)" }
                        }
                        data-cursor
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs mb-1.5" style={{ color: "oklch(45% 0.01 270)" }}>Tell us about your project *</label>
                  <textarea required value={form.message} onChange={set("message")} rows={4} className="w-full px-4 py-2.5 text-sm outline-none resize-none" style={inputStyle} placeholder="What are you building? What's the timeline? Any other context…" data-cursor />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, oklch(65% 0.28 290), oklch(65% 0.28 330))", opacity: loading ? 0.8 : 1 }}
                  whileHover={{ scale: loading ? 1 : 1.02, boxShadow: "0 0 30px oklch(65% 0.28 290 / 45%)" }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  data-cursor
                >
                  {loading ? (
                    <motion.div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                  ) : (
                    <><Send size={15} /> Send Message</>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
