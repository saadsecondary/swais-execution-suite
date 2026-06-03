import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  const videoHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = videoHostRef.current;
    if (!host) return;
    const video = getHeroVideo();
    host.appendChild(video);
    // Show video immediately — first paint or as soon as the browser allows.
    video.style.opacity = "1";
    const play = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    play();
    video.addEventListener("canplay", play);
    video.addEventListener("loadeddata", play);
    return () => {
      video.removeEventListener("canplay", play);
      video.removeEventListener("loadeddata", play);
      if (host.contains(video)) host.removeChild(video);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden"
      // Solid brand color matches the first video frame — no poster image needed.
      style={{ backgroundColor: "#04276d" }}
    >
      <div ref={videoHostRef} className="absolute inset-0 z-0" aria-hidden="true" />

      {/* Bottom blend into the page background */}
      <div className="absolute bottom-0 inset-x-0 h-56 sm:h-72 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none z-[1]" />

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
            className="inline-flex items-center gap-2.5 glass rounded-full px-3.5 sm:px-4 py-1.5 mb-8 sm:mb-10 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] sm:tracking-[0.22em]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cobalt-bright opacity-70 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cobalt-bright shadow-[0_0_12px_hsl(var(--cobalt-bright))]" />
            </span>
            <span className="text-ice/75">New · Direct consultations open</span>
          </motion.div>

          <h1 className="text-[2.6rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-medium leading-[1] sm:leading-[0.96] tracking-[-0.035em] sm:tracking-[-0.04em] text-balance">
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
            className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-ice/65 max-w-2xl mx-auto leading-relaxed px-2"
          >
            The world's leading AI automation studio engineering done-for-you
            systems that crush bottlenecks, cut overhead, and compound revenue
            — so your team ships more without ever hiring more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button variant="cobalt" size="lg" asChild className="w-full sm:w-auto">
              <a href="#contact">
                Start with a Consultation <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="glass" size="lg" asChild className="w-full sm:w-auto">
              <a href="#systems">
                <Compass className="h-4 w-4" /> See Our Systems
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-10 sm:mt-12 inline-flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-5 gap-y-2 font-mono text-[10px] sm:text-[11px] md:text-[12px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-ice/60"
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
