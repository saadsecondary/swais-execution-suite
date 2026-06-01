import { motion } from "framer-motion";
import { Brain, Zap, Mic, LayoutDashboard } from "lucide-react";

const products = [
  {
    code: "PRIME",
    label: "AI Agents",
    icon: Brain,
    tagline: "Autonomous agents that think, decide and act.",
    desc: "Goal-driven AI workers trained on your playbook — qualifying leads, closing deals and resolving tickets without supervision.",
  },
  {
    code: "VECTOR",
    label: "Automations",
    icon: Zap,
    tagline: "Every workflow, every tool, one nervous system.",
    desc: "End-to-end automation that wires your entire stack together. Handoffs disappear, hours come back, and the business runs itself.",
  },
  {
    code: "ECHO",
    label: "Voice Bots",
    icon: Mic,
    tagline: "Human-grade voice that answers, qualifies and books.",
    desc: "Real-time voice agents for inbound and outbound calls — natural latency, native objection handling and seamless sync into your operation.",
  },
  {
    code: "NEXUS",
    label: "Dashboards",
    icon: LayoutDashboard,
    tagline: "The operating layer for your AI infrastructure.",
    desc: "Unified dashboards that surface every conversation, conversion and cost — so you can run the business from a single screen.",
  },
];

const Products = () => {
  return (
    <section id="products" className="py-20 md:py-28 relative overflow-hidden">
      <div className="glow-orb h-[400px] w-[400px] bg-cobalt/15 top-1/3 right-0" />

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          className="max-w-3xl mx-auto text-center mb-14 md:mb-20"
        >
          <p className="text-cobalt-bright text-[11px] tracking-[0.3em] uppercase font-mono mb-5">
            02 — The Stack
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-balance">
            <span className="text-gradient">Four products.</span>{" "}
            <span className="serif text-cobalt-bright font-normal">One</span>{" "}
            <span className="text-gradient">intelligence layer.</span>
          </h2>
          <p className="text-ice/55 mt-6 text-[15px] max-w-xl mx-auto">
            Modular by design. Deploy a single product or compose the entire stack into a coordinated AI operation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ice/[0.06] rounded-3xl overflow-hidden border border-ice/[0.06]">
          {products.map((p, i) => (
            <motion.div
              key={p.code}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group relative bg-ink p-7 sm:p-9 md:p-12 transition-all duration-500 hover:bg-navy-deep flex flex-col"
            >
              <div className="flex items-start justify-between mb-8 md:mb-10">
                <div className="h-11 w-11 md:h-12 md:w-12 rounded-2xl glass-cobalt flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <p.icon className="h-5 w-5 text-cobalt-bright" strokeWidth={1.5} />
                </div>
                <p className="font-mono text-[10px] tracking-[0.3em] text-ice/40 uppercase">
                  0{i + 1}
                </p>
              </div>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium tracking-tight text-ice">
                  {p.code}
                </h3>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-cobalt-bright">
                  {p.label}
                </span>
              </div>

              <p className="serif italic text-ice/85 text-lg md:text-xl leading-snug mt-3">
                {p.tagline}
              </p>

              <p className="text-ice/55 text-[14px] sm:text-[15px] leading-relaxed mt-4">
                {p.desc}
              </p>

              <div className="mt-8 md:mt-10 h-px w-12 bg-cobalt-bright/60 transition-all duration-500 group-hover:w-24" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
