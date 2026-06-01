import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";

type Outcome = {
  value: number;
  decimals: number;
  prefix?: string;
  suffix: string;
  descriptor: string;
  client: string;
};

const outcomes: Outcome[] = [
  {
    value: 4.2,
    decimals: 1,
    suffix: "x",
    descriptor: "leads qualified without a human in the loop",
    client: "Real Estate Agency, UAE",
  },
  {
    value: 18,
    decimals: 0,
    suffix: " hrs/week",
    descriptor: "handed back to the founding team",
    client: "SaaS Startup, UK",
  },
  {
    value: 3,
    decimals: 0,
    suffix: "-day",
    descriptor: "deployment, from first call to a live system",
    client: "Marketing Agency, US",
  },
];

const CountUp = ({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.8,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVal(0);
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / (duration * 1000));
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(eased * to);
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
};

const ResultsStrip = () => {
  return (
    <section id="results" className="py-24 md:py-32 relative overflow-hidden">
      <div className="glow-orb h-[500px] w-[500px] bg-cobalt/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="03 / Outcomes"
          description="Real numbers from real engagements. Pricing depends on scope. Outcomes do not."
        >
          <span className="text-gradient">Outcomes,</span>{" "}
          <span className="serif text-cobalt-bright font-normal">measured</span>{" "}
          <span className="text-gradient">in revenue and reclaimed hours.</span>
        </SectionHeading>

        <div className="grid md:grid-cols-3 gap-5 mt-16">
          {outcomes.map((o, i) => (
            <motion.article
              key={o.descriptor}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="glass rounded-3xl p-7 md:p-8 flex flex-col h-full"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-ice/40 mb-6">
                Outcome / {String(i + 1).padStart(2, "0")}
              </p>
              <p className="font-display text-5xl md:text-6xl font-medium tracking-[-0.04em] text-cobalt-bright leading-none">
                <CountUp
                  to={o.value}
                  decimals={o.decimals}
                  prefix={o.prefix}
                  suffix={o.suffix}
                />
              </p>
              <p className="text-ice/55 text-[15px] leading-relaxed mt-5 flex-1">
                {o.descriptor}
              </p>
              <p className="mt-6 pt-5 border-t border-ice/[0.06] font-mono text-[11px] tracking-[0.2em] uppercase text-ice/45">
                {o.client}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsStrip;
