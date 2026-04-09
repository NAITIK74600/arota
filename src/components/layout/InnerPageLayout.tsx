"use client";

import { motion } from "framer-motion";
import { CustomCursor } from "./CustomCursor";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SmoothScroll } from "./SmoothScroll";
import { FloatingAIButton } from "./FloatingAI";

export function InnerPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <Navbar />
        <motion.main
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          {children}
        </motion.main>
        <Footer />
        <FloatingAIButton />
      </SmoothScroll>
    </>
  );
}
