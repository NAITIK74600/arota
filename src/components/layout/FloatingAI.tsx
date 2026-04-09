"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, ArrowUpRight } from "lucide-react";

export function FloatingAIButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            className="w-72 rounded-2xl overflow-hidden glass-strong"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <div className="px-5 py-4" style={{ background: "linear-gradient(135deg, oklch(65% 0.28 290 / 12%), oklch(65% 0.28 330 / 8%))", borderBottom: "1px solid oklch(22% 0.025 270)" }}>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white" style={{ background: "linear-gradient(135deg, oklch(65% 0.28 290), oklch(65% 0.28 330))" }}>A</div>
                <div>
                  <div className="text-sm font-semibold" style={{ fontFamily: "var(--font-sora-var)" }}>Arota AI</div>
                  <div className="text-[10px] flex items-center gap-1" style={{ color: "oklch(65% 0.28 290)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    Online now
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm mb-4" style={{ color: "oklch(60% 0.01 270)" }}>
                Hey! Want to talk about a project or get a quick quote? We usually reply within 2 hours.
              </p>
              <a
                href="/#contact"
                className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                style={{ background: "linear-gradient(135deg, oklch(65% 0.28 290), oklch(65% 0.28 330))" }}
                onClick={() => setOpen(false)}
              >
                Start conversation <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="w-13 h-13 rounded-2xl flex items-center justify-center text-white shadow-xl"
        style={{ width: 52, height: 52, background: "linear-gradient(135deg, oklch(65% 0.28 290), oklch(65% 0.28 330))" }}
        whileHover={{ scale: 1.1, boxShadow: "0 0 30px oklch(65% 0.28 290 / 50%)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        aria-label="Toggle AI chat"
        data-cursor
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={22} /></motion.div>
            : <motion.div key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><MessageSquare size={22} /></motion.div>
          }
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
