"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(hover: none)").matches;
    if (isMobile) return;
    setIsVisible(true);

    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onEnter = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("[data-cursor]")) setIsHovering(true);
    };
    const onLeave = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("[data-cursor]")) setIsHovering(false);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        animate={{ x: pos.x - 4, y: pos.y - 4, scale: isHovering ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.3 }}
        style={{ width: 8, height: 8, background: "oklch(65% 0.28 290)" }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border"
        animate={{
          x: pos.x - (isHovering ? 22 : 16),
          y: pos.y - (isHovering ? 22 : 16),
          width:  isHovering ? 44 : 32,
          height: isHovering ? 44 : 32,
          opacity: isHovering ? 0.7 : 0.4,
          borderColor: isHovering ? "oklch(65% 0.28 290)" : "oklch(65% 0.28 290 / 60%)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8 }}
      />
    </>
  );
}
