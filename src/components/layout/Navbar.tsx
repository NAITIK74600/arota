"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Work",     href: "/work"     },
  { label: "Services", href: "/services" },
  { label: "About",    href: "/about"    },
  { label: "Insights", href: "/blog"     },
  { label: "Gallery",  href: "/gallery"  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
        style={{ scaleX, background: "linear-gradient(90deg, oklch(65% 0.28 290), oklch(65% 0.28 330))" }}
      />

      <header
        className={`fixed top-2 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-6`}
      >
        <motion.nav
          className="max-w-6xl mx-auto rounded-2xl px-5 py-3 flex items-center justify-between"
          animate={scrolled
            ? { background: "oklch(10% 0.018 270 / 80%)", backdropFilter: "blur(20px)", border: "1px solid oklch(22% 0.025 270 / 60%)" }
            : { background: "oklch(8% 0.015 270 / 0%)", backdropFilter: "blur(0px)", border: "1px solid transparent" }
          }
          transition={{ duration: 0.4 }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0 group" data-cursor>
            <span
              className="tracking-tight text-white transition-opacity group-hover:opacity-80"
              style={{ fontFamily: "var(--font-dancing-script)", fontSize: "1.75rem", lineHeight: 1 }}
            >
              soft-era
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ label, href }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className="relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 group"
                  style={{ color: active ? "oklch(96% 0.005 270)" : "oklch(55% 0.01 270)" }}
                  data-cursor
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: "oklch(65% 0.28 290 / 12%)", border: "1px solid oklch(65% 0.28 290 / 25%)" }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 group-hover:text-white transition-colors duration-200">{label}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/#contact" data-cursor>
              <motion.span
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, oklch(65% 0.28 290), oklch(65% 0.28 330))" }}
                whileHover={{ scale: 1.04, boxShadow: "0 0 22px oklch(65% 0.28 290 / 45%)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Let's Talk
              </motion.span>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl"
            style={{ background: "oklch(15% 0.02 270)", color: "oklch(80% 0.01 270)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            data-cursor
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </motion.nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="md:hidden mt-2 max-w-6xl mx-auto rounded-2xl overflow-hidden glass-strong"
              initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{ transformOrigin: "top" }}
            >
              <div className="p-4 flex flex-col gap-1">
                {links.map(({ label, href }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={href}
                      className="block px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                      style={{ color: pathname === href ? "oklch(65% 0.28 290)" : "oklch(70% 0.01 270)" }}
                      data-cursor
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-2 pt-2" style={{ borderTop: "1px solid oklch(22% 0.025 270)" }}>
                  <Link href="/#contact" className="block" data-cursor>
                    <span className="block text-center px-4 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, oklch(65% 0.28 290), oklch(65% 0.28 330))" }}>
                      Let's Talk
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
