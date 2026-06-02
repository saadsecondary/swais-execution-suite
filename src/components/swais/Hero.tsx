import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import loaderBg from "@/assets/loader-bg.png";
import { getHeroVideo } from "@/lib/heroVideo";

/**
 * Animated counter that ticks up to a target whenever it enters the viewport,
 * resetting each time it scrolls out so the animation re-triggers on return.
 */
const Counter = ({
  to,
  suffix = "",
  duration = 1.6,
  delay = 0,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let startTimer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVal(0);
          startTimer = window.setTimeout(() => {
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / (duration * 1000));
              const eased = 1 - Math.pow(1 - t, 3);
              setVal(Math.round(eased * to));
              if (t < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
          }, delay * 1000);
        } else {
          window.clearTimeout(startTimer);
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(startTimer);
      cancelAnimationFrame(raf);
    };
  }, [to, duration, delay]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
};

const Hero = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [progress, setProgress] = useState(0);

  // Make sure the video plays the instant it can — never wait for full load.
  useEffect(() => {
    const host = videoRef.current;
    if (!host) return;

    const video = getHeroVideo();
    host.appendChild(video);
    const mountedAt = performance.now();

    let progressTimer = 0;
    let revealTimer = 0;
    const clearProgressTimer = () => {
      if (progressTimer) {
        window.clearInterval(progressTimer);
        progressTimer = 0;
      }
    };
    const clearRevealTimer = () => {
      if (revealTimer) {
        window.clearTimeout(revealTimer);
        revealTimer = 0;
      }
    };

    const updateBufferedProgress = () => {
      try {
        if (video.buffered.length && video.duration) {
          const end = video.buffered.end(video.buffered.length - 1);
          const percent = Math.round((end / video.duration) * 100);
          setProgress((current) => Math.max(current, Math.min(percent, 92)));
        }
      } catch {}
    };

    const revealVideo = () => {
      clearProgressTimer();
      video.style.opacity = "1";
      setProgress(100);
      clearRevealTimer();
      const remaining = Math.max(0, 520 - (performance.now() - mountedAt));
      revealTimer = window.setTimeout(() => {
        setVideoReady(true);
      }, remaining);
    };

    const kickPlayback = () => {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    };

    const onCanPlay = () => {
      kickPlayback();
      revealVideo();
    };

    const onLoadedData = () => {
      kickPlayback();
      setProgress((current) => Math.max(current, 55));
    };

    progressTimer = window.setInterval(() => {
      setProgress((current) => Math.min(current + 1, 88));
    }, 45);

    updateBufferedProgress();
    kickPlayback();

    video.addEventListener("progress", updateBufferedProgress);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("loadeddata", onLoadedData);

    if (video.readyState >= 3) {
      onCanPlay();
    }

    return () => {
      clearProgressTimer();
      clearRevealTimer();
      video.removeEventListener("progress", updateBufferedProgress);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("loadeddata", onLoadedData);
      if (host.contains(video)) host.removeChild(video);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden"
      // Solid brand color matches the first video frame — no poster image, so it never reads as a paused picture.
      style={{ backgroundColor: "#04276d" }}
    >
      <div ref={videoRef} className="absolute inset-0 z-0" aria-hidden="true" />

      {!videoReady && (
        <div className="absolute inset-0 z-[1] overflow-hidden">
          <img
            src={loaderBg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--ink)/0.12),hsl(var(--ink)/0.22))]" />
        </div>
      )}

      {/* Visible loader until the video is actually ready and has had a beat to feel intentional. */}
      {!videoReady && (
        <div className="absolute inset-0 z-[3] pointer-events-none">
          <div className="absolute inset-x-0 bottom-8 sm:bottom-10">
            <div className="mx-auto flex w-full max-w-md px-6">
              <div className="w-full rounded-full border border-ice/15 bg-ink/40 p-1 shadow-[0_18px_50px_hsl(var(--ink)/0.45)] backdrop-blur-md">
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-ice/10">
                  <div
                    className="relative h-full rounded-full bg-[linear-gradient(90deg,hsl(var(--azure)),hsl(var(--cobalt-bright))_45%,hsl(var(--primary-glow)))] shadow-[0_0_30px_hsl(var(--cobalt-bright)/0.85)] transition-[width] duration-200 ease-out"
                    style={{ width: `${Math.max(progress, 12)}%` }}
                  >
                    <span className="absolute inset-y-0 right-0 w-12 rounded-full bg-ice/50 blur-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom blend into the page background — NOT an overlay on the video,
          purely a transition strip below the visible video area. */}
      <div className="absolute bottom-0 inset-x-0 h-72 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none z-[1]" />

      <div className="container-x relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 glass rounded-full px-4 py-1.5 mb-10 text-[11px] font-mono uppercase tracking-[0.22em]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cobalt-bright opacity-70 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cobalt-bright shadow-[0_0_12px_hsl(var(--cobalt-bright))]" />
            </span>
            <span className="text-ice/75">New · Direct consultations open with the SWAIS team</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-medium leading-[0.96] tracking-[-0.04em] text-balance">
            {["Automate", "the", "work,"].map((w, i) => (
              <motion.span
                key={`a-${i}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block text-gradient mr-[0.22em]"
              >
                {w}
              </motion.span>
            ))}
            <br />
            {["multiply", "the"].map((w, i) => (
              <motion.span
                key={`b-${i}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.45 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block text-gradient mr-[0.22em]"
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block serif text-cobalt-bright font-normal"
            >
              revenue.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-8 text-base md:text-lg text-ice/60 max-w-2xl mx-auto leading-relaxed"
          >
            The world's leading AI automation studio engineering done-for-you
            systems that crush bottlenecks, cut overhead, and compound revenue
            — so your team ships more without ever hiring more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button variant="cobalt" size="lg" asChild>
              <a href="#contact">
                Start with a Consultation <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <a href="#systems">
                <Compass className="h-4 w-4" /> See Our Systems
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12 inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[11px] md:text-[12px] uppercase tracking-[0.22em] text-ice/60"
          >
            <span>
              <Counter to={6} delay={1.3} duration={1.4} />
              <span className="text-ice/50"> AI Systems</span>
            </span>
            <span className="h-1 w-1 rounded-full bg-cobalt-bright shadow-[0_0_10px_hsl(var(--cobalt-bright))]" />
            <span>
              <Counter to={40} suffix="+" delay={1.5} duration={1.6} />
              <span className="text-ice/50"> Businesses Transformed</span>
            </span>
            <span className="h-1 w-1 rounded-full bg-cobalt-bright shadow-[0_0_10px_hsl(var(--cobalt-bright))]" />
            <span>
              <Counter to={3} suffix="x" delay={1.7} duration={1.4} />
              <span className="text-ice/50"> Average Revenue Lift</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
