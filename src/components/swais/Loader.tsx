import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Wordmark from "@/components/swais/Wordmark";
import swaisBg from "@/assets/swais-bg.png";
import loaderBg from "@/assets/loader-bg.png";
import { getHeroVideo } from "@/lib/heroVideo";

/**
 * Brand loader. Doubles as a buffer-window for the hero video: the bar
 * advances on a smooth time curve, but we only let it reach 100% once the
 * hero video reports it has enough data to play through. A hard cap
 * guarantees the loader never overstays its welcome.
 */
// Module-level flag: the very first time the app mounts the Loader we skip it
// (the hero video is preloaded at app boot via preloadHeroVideo, so the page
// can render instantly). Every subsequent mount — e.g. returning to the home
// route from another tab — shows the loader as a polished transition.
let hasShownOnce = false;

const Loader = () => {
  const skip = hasShownOnce;
  const [progress, setProgress] = useState(skip ? 1 : 0);
  const [done, setDone] = useState(skip);
  useEffect(() => {
    hasShownOnce = true;
  }, []);

  useEffect(() => {
    if (skip) return;
    // Kick the hero video into loading immediately.
    const video = getHeroVideo();

    const start = performance.now();
    const minDuration = 1100;
    const softDuration = 2200; // bar reaches ~92% by here
    const hardCap = 4500;      // absolute max wait
    let raf = 0;
    let finished = false;

    const videoReady = () =>
      !!video &&
      (video.readyState >= 3 /* HAVE_FUTURE_DATA */ ||
        (video.buffered.length > 0 &&
          video.buffered.end(0) >= Math.min(2.5, video.duration || 2.5)));

    const finish = () => {
      if (finished) return;
      finished = true;
      const elapsed = performance.now() - start;
      const wait = Math.max(0, minDuration - elapsed);
      window.setTimeout(() => {
        setProgress(1);
        window.setTimeout(() => setDone(true), 420);
      }, wait);
    };

    const tick = (now: number) => {
      const elapsed = now - start;
      // Ease toward 0.92 over softDuration, then crawl toward 0.97 until ready.
      const t = Math.min(1, elapsed / softDuration);
      const eased = 1 - Math.pow(1 - t, 3);
      let p = eased * 0.92;
      if (elapsed > softDuration) {
        const extra = Math.min(1, (elapsed - softDuration) / (hardCap - softDuration));
        p = 0.92 + extra * 0.05;
      }
      setProgress(p);

      if (elapsed >= minDuration && videoReady()) {
        finish();
        return;
      }
      if (elapsed >= hardCap) {
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onCanPlay = () => {
      if (performance.now() - start >= minDuration) finish();
    };
    video?.addEventListener("canplaythrough", onCanPlay);
    video?.addEventListener("loadeddata", onCanPlay);

    return () => {
      cancelAnimationFrame(raf);
      video?.removeEventListener("canplaythrough", onCanPlay);
      video?.removeEventListener("loadeddata", onCanPlay);
    };
  }, []);

  // Lock scroll while loading
  useEffect(() => {
    if (done) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[hsl(222_78%_8%)] overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${loaderBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 55% 40% at 50% 50%, hsl(220 100% 35% / 0.35), transparent 70%)",
            }}
          />

          <div className="relative flex flex-col items-center gap-7 w-[280px] sm:w-[340px]">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Wordmark className="text-[44px]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="w-full"
            >
            <div className="relative h-2 w-full overflow-hidden rounded-full border border-ice/10 bg-ice/5">
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${progress * 100}%`,
                    backgroundImage: `url(${swaisBg})`,
                    backgroundSize: `${100 / Math.max(progress, 0.01)}% 100%`,
                    backgroundPosition: "left center",
                    backgroundRepeat: "no-repeat",
                    transition: "width 120ms linear",
                  }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.3em] uppercase text-ice/40">
                <span>Loading</span>
                <span className="text-ice/70 tabular-nums">
                  {String(Math.round(progress * 100)).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
