"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 18 + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setLoading(false), 400);
      }
      setProgress(current);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "oklch(8% 0.015 270)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 grid-bg opacity-20" />

          {/* Logo */}
          <motion.div
            className="relative mb-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
              style={{ background: "linear-gradient(135deg, oklch(65% 0.28 290), oklch(65% 0.28 330))" }}
            >
              A
            </div>
            <div
              className="absolute -inset-1 rounded-2xl blur-lg opacity-50"
              style={{ background: "linear-gradient(135deg, oklch(65% 0.28 290), oklch(65% 0.28 330))" }}
            />
          </motion.div>

          {/* Progress bar */}
          <div className="w-48">
            <div className="h-px w-full rounded-full overflow-hidden" style={{ background: "oklch(20% 0.025 270)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, oklch(65% 0.28 290), oklch(65% 0.28 330))", width: `${progress}%` }}
                transition={{ duration: 0.15 }}
              />
            </div>
            <motion.p
              className="text-center text-xs mt-3 font-mono"
              style={{ color: "oklch(45% 0.01 270)" }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {Math.round(progress)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
