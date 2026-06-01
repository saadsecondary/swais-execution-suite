import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import { Spotlight } from "@/components/ui/spotlight";

const steps = [
  {
    n: "01",
    title: "Connect",
    desc: "We map your stack and your bottlenecks. Every tool, every workflow, every hour your team is spending on work AI can do.",
  },
  {
    n: "02",
    title: "Automate",
    desc: "We deploy the AI systems you actually need: agents, automations, voice, dashboards, websites and apps, all wired into how your business already runs.",
  },
  {
    n: "03",
    title: "Scale",
    desc: "You compound revenue without adding headcount. We monitor, tune and expand the system as your business grows.",
  },
];

const HowItWorks = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [reached, setReached] = useState<boolean[]>([false, false, false]);

  // Each orb activates as the drawn line crosses its position.
  // Steps are evenly spaced, so thresholds are 0.15, 0.5, 0.85.
  const thresholds = [0.15, 0.5, 0.85];
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setReached((prev) => {
      const next = thresholds.map((t) => v >= t);
      // Avoid re-renders when nothing changed
      if (next.every((r, i) => r === prev[i])) return prev;
      return next;
    });
  });

  return (
    <section id="process" className="py-28 md:py-36 relative overflow-hidden">
      <div className="glow-orb h-[500px] w-[500px] bg-cobalt/15 top-1/3 left-1/2 -translate-x-1/2" />
      <Spotlight size={500} />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="04 / How It Works"
          description="A simple, three-step path from manual work to autopilot. No black boxes, no jargon."
        >
          <span className="text-gradient">From manual work</span>{" "}
          <span className="serif text-cobalt-bright font-normal">to autopilot.</span>
        </SectionHeading>

        <div ref={ref} className="relative mt-20 max-w-4xl mx-auto">
          <svg
            className="absolute left-[28px] sm:left-[40px] -translate-x-1/2 top-6 bottom-6 w-px hidden sm:block"
            viewBox="0 0 2 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line x1="1" y1="0" x2="1" y2="1000" stroke="hsl(var(--ice) / 0.08)" strokeWidth="1" />
            <motion.line
              x1="1"
              y1="0"
              x2="1"
              y2="1000"
              stroke="hsl(var(--cobalt-bright))"
              strokeWidth="1.5"
              style={{ pathLength }}
            />
          </svg>

          <div className="space-y-16">
            {steps.map((s, i) => {
              const active = reached[i];
              return (
                <motion.div
                  key={s.n}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3, margin: "-80px" }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1 } },
                  }}
                  className="relative grid grid-cols-[64px_1fr] sm:grid-cols-[88px_1fr] gap-6 sm:gap-10 items-start"
                >
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                    className="relative z-10 flex sm:justify-center"
                  >
                    <div
                      className="relative h-14 w-14 sm:h-20 sm:w-20 rounded-full flex items-center justify-center bg-background border overflow-hidden transition-all duration-500"
                      style={{
                        borderColor: active
                          ? "hsl(var(--cobalt-bright) / 0.7)"
                          : "hsl(var(--ice) / 0.12)",
                        boxShadow: active
                          ? "0 0 30px hsl(220 100% 50% / 0.45)"
                          : "none",
                      }}
                    >
                      <div
                        className="absolute inset-0 transition-opacity duration-500"
                        style={{
                          background:
                            "radial-gradient(circle at 30% 30%, hsl(220 100% 55% / 0.45), transparent 70%)",
                          opacity: active ? 1 : 0,
                        }}
                      />
                      <span
                        className="relative font-mono text-sm sm:text-base tracking-widest transition-colors duration-500"
                        style={{
                          color: active
                            ? "hsl(var(--cobalt-bright))"
                            : "hsl(var(--ice) / 0.55)",
                        }}
                      >
                        {s.n}
                      </span>
                    </div>
                  </motion.div>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                    className="pt-2 sm:pt-4"
                  >
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-[-0.03em] text-ice">
                      {s.title}
                    </h3>
                    <p className="text-ice/60 text-[15px] md:text-base leading-relaxed mt-4 max-w-xl">
                      {s.desc}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
