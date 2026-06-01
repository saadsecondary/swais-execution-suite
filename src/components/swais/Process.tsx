import { motion } from "framer-motion";
import { Plug, Workflow, TrendingUp } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Plug,
    title: "Connect",
    desc: "We plug into your existing stack — CRM, inbox, calendar, payments — and map every workflow that's draining your team's time.",
  },
  {
    n: "02",
    icon: Workflow,
    title: "Automate",
    desc: "Our engineers ship custom AI agents and automations that take over the manual work — qualified leads, replies, follow-ups, ops.",
  },
  {
    n: "03",
    icon: TrendingUp,
    title: "Scale",
    desc: "We monitor, tune and expand your AI stack month over month — so output keeps compounding while your team stays lean.",
  },
];

const Process = () => {
  return (
    <section id="process" className="py-20 md:py-24 relative overflow-hidden">
      <div className="glow-orb h-[500px] w-[500px] bg-cobalt/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-cobalt-bright text-[11px] tracking-[0.3em] uppercase font-mono mb-5">
            03 — How it works
          </p>
          <h2 className="text-4xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-balance">
            <span className="text-gradient">Three steps from</span>{" "}
            <span className="serif text-cobalt-bright font-normal">manual to autopilot.</span>
          </h2>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-5">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-[88px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-cobalt-bright/40 to-transparent" />

          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative glass rounded-3xl p-8 hover:border-cobalt/30 transition-all duration-500 group"
            >
              <div className="relative z-10 flex items-center justify-between mb-10">
                <div className="h-14 w-14 rounded-2xl bg-gradient-cobalt flex items-center justify-center shadow-cobalt">
                  <s.icon className="h-6 w-6 text-ice" strokeWidth={1.5} />
                </div>
                <span className="font-mono text-[11px] tracking-[0.3em] text-cobalt-bright">
                  STEP {s.n}
                </span>
              </div>
              <h3 className="text-2xl font-display font-medium text-ice tracking-tight">
                {s.title}
              </h3>
              <p className="text-ice/60 text-[15px] leading-relaxed mt-3">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
