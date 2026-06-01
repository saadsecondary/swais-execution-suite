import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { getHeroVideo } from "@/lib/heroVideo";

/**
 * Animated counter that ticks up to a target on mount.
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
  useEffect(() => {
    let raf = 0;
    let started = false;
    const startTimer = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / (duration * 1000));
        // ease [0.22, 1, 0.36, 1] approx
        const eased = 1 - Math.pow(1 - t, 3);
        setVal(Math.round(eased * to));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      started = true;
      raf = requestAnimationFrame(tick);
    }, delay * 1000);
    return () => {
      window.clearTimeout(startTimer);
      if (started) cancelAnimationFrame(raf);
    };
  }, [to, duration, delay]);
  return (
    <span>
      {val}
      {suffix}
    </span>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoSlotRef = useRef<HTMLDivElement>(null);

  // Mount the persistent hero <video> element into our slot so it survives
  // route navigations and replays instantly on every return to the Home tab.
  useEffect(() => {
    const slot = videoSlotRef.current;
    if (!slot) return;
    const v = getHeroVideo();
    if (!v) return;
    slot.appendChild(v);
    const playPromise = v.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
    return () => {
      if (v.parentElement === slot) slot.removeChild(v);
    };
  }, []);

  // Starfield
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
      })),
    [],
  );

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_45%,hsl(220_100%_28%),hsl(222_78%_10%)_70%)]"
      />

      <div
        ref={videoSlotRef}
        aria-hidden="true"
        className="absolute inset-0 z-0"
      />


      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_40%,hsl(220_100%_22%/0.35),transparent_75%)]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/40 via-transparent to-background/85" />

      <div className="absolute inset-0 pointer-events-none opacity-30 z-[1]">
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-ice animate-twinkle"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-0 inset-x-0 h-72 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none z-[1]" />

      <div className="container-x relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Eyebrow pill */}
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

          {/* Headline */}
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

          {/* Animated metric strip */}
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

      <div className="noise" />
    </section>
  );
};

export default Hero;
