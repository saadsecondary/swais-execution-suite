import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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

/**
 * Lights up the orb the instant 2% of it enters the viewport, so the activation
 * lines up exactly with the cobalt line visually touching the orb's outer edge.
 * Re-triggers every time the orb scrolls back into view.
 */
const useOrbActive = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.02 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, active };
};

const HowItWorks = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);


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
            {steps.map((s) => (
              <Step key={s.n} n={s.n} title={s.title} desc={s.desc} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
