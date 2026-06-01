import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Wordmark from "@/components/swais/Wordmark";

const CAL_URL = "https://cal.com/swais";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  // Stay transparent across scroll — only a very subtle blur kicks in so text behind
  // the bar stays readable without ever covering the page with a dark fill.
  const blur = useTransform(scrollY, [0, 120], [0, 10]);
  const backdrop = useTransform(blur, (v) => `blur(${v}px) saturate(140%)`);
  // Faint top-down fade so the navbar visually melts into the page instead of
  // sitting as a hard dark bar over the hero/content.
  const fadeOpacity = useTransform(scrollY, [0, 120], [0, 0.55]);
  const fadeBg = useTransform(
    fadeOpacity,
    (v) => `linear-gradient(to bottom, hsl(224 70% 4% / ${v}) 0%, transparent 100%)`,
  );

  const links: { label: string; href: string; route?: boolean }[] = [
    { label: "Products", href: "/products", route: true },
    { label: "Process", href: "/#process" },
    { label: "About", href: "/about", route: true },
    { label: "Careers", href: "/careers", route: true },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backdropFilter: backdrop,
        WebkitBackdropFilter: backdrop,
        top: "var(--swais-banner-height, 0px)",
        backgroundImage: fadeBg,
      }}
      className="fixed inset-x-0 z-50 transition-[top] duration-500"
    >
      <div className="container-x">
        <nav className="flex items-center justify-between h-16">
          <Link to="/" className="group inline-flex items-center" aria-label="SWAIS, home">
            <Wordmark className="text-[22px] transition-transform duration-500 group-hover:translate-x-[1px]" />
          </Link>

          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {links.map((l) =>
              l.route ? (
                <Link
                  key={l.href}
                  to={l.href}
                  className="px-3 py-1.5 text-[13px] text-ice/60 hover:text-ice rounded-full hover:bg-ice/5 transition-colors"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  className="px-3 py-1.5 text-[13px] text-ice/60 hover:text-ice rounded-full hover:bg-ice/5 transition-colors"
                >
                  {l.label}
                </a>
              ),
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="cobalt" size="sm" asChild className="hidden md:inline-flex">
              <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
                Book a Call
              </a>
            </Button>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden h-9 w-9 rounded-full glass flex items-center justify-center text-ice"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -16, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -16, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden"
            >
              <div className="glass rounded-2xl p-4 mb-4 flex flex-col gap-1">
                {links.map((l) =>
                  l.route ? (
                    <Link
                      key={l.href}
                      to={l.href}
                      onClick={() => setOpen(false)}
                      className="px-4 py-2.5 text-sm text-ice/70 hover:text-ice rounded-lg hover:bg-ice/5"
                    >
                      {l.label}
                    </Link>
                  ) : (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="px-4 py-2.5 text-sm text-ice/70 hover:text-ice rounded-lg hover:bg-ice/5"
                    >
                      {l.label}
                    </a>
                  ),
                )}
                <Button variant="cobalt" size="sm" asChild className="mt-2">
                  <a
                    href={CAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    Book a Call
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
