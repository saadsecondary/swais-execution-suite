import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "swais_banner_dismissed";
const DELAY_MS = 35_000;

const AnnouncementBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY) === "true") return;
    const t = window.setTimeout(() => setVisible(true), DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  // Push page content down when banner is visible
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.style.setProperty(
      "--swais-banner-height",
      visible ? "52px" : "0px",
    );
    return () => {
      document.documentElement.style.setProperty("--swais-banner-height", "0px");
    };
  }, [visible]);

  const dismiss = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="banner"
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label="Announcement"
          className="fixed top-0 inset-x-0 z-[60] border-b border-ice/[0.08] border-l-[3px] border-l-cobalt-bright bg-[hsl(224_70%_4%/0.85)] backdrop-blur-xl"
          style={{ minHeight: 52 }}
        >
          <div className="container-x flex items-center justify-between gap-4 py-3 md:py-0 md:h-[52px]">
            <div className="flex items-center gap-3 min-w-0">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-70 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
              </span>
              <p className="text-[13px] text-ice/85 leading-snug truncate">
                <span className="text-ice font-medium">Limited offer</span>
                <span className="text-ice/50"> — Book a direct consultation with our founder.</span>
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="#contact"
                className="font-mono uppercase tracking-[0.22em] text-[10px] md:text-[11px] text-cobalt-bright hover:text-ice transition-colors"
              >
                Claim your spot →
              </a>
              <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss announcement"
                className="text-ice/40 hover:text-ice/80 transition-colors p-1"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBanner;
