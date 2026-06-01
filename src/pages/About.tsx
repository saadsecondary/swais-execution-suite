import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/swais/Navbar";
import Footer from "@/components/swais/Footer";
import BrandBackdrop from "@/components/swais/BrandBackdrop";
import WhatsAppButton from "@/components/swais/WhatsAppButton";
import { Button } from "@/components/ui/button";

const principles = [
  {
    number: "01",
    title: "Outcomes over output",
    body: "We do not ship features for the sake of activity. Every system we build is tied to a number the business actually cares about, and we do not stop until it moves.",
  },
  {
    number: "02",
    title: "Modular by design",
    body: "PRIME, VECTOR, ECHO, NEXUS, FORGE and CRAFT are independent products that compose into one stack. Start with one. Add the rest when it earns its place.",
  },
  {
    number: "03",
    title: "Owned, not rented",
    body: "Your data stays yours. Your workflows stay yours. We engineer infrastructure you control, never a black box you have to keep paying us to keep open.",
  },
  {
    number: "04",
    title: "Engineering, not prompts",
    body: "AI is a component, not the product. Behind every agent we deploy there is real software, real monitoring, and real engineers on call.",
  },
];

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [hovered, setHovered] = useState<number | null>(null);
  const [revealed, setRevealed] = useState<Set<number>>(() => new Set());

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <BrandBackdrop />
      <Navbar />

      <section className="relative z-10 pt-32 md:pt-40 pb-24">
        <div className="container-x">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase font-mono text-ice/50 hover:text-cobalt-bright transition-colors mb-8"
          >
            <ArrowLeft className="h-3 w-3" /> Back to home
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <p className="text-cobalt-bright text-[11px] tracking-[0.3em] uppercase font-mono mb-5">
                About SWAIS
              </p>
              <h1 className="text-4xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-balance">
                <span className="text-gradient">The world's number one</span>{" "}
                <span className="serif text-cobalt-bright font-normal">AI automation</span>{" "}
                <span className="text-gradient">company.</span>
              </h1>
              <p className="text-ice/55 mt-8 text-[15px] leading-relaxed max-w-xl">
                SWAIS engineers the AI infrastructure that high-growth
                businesses run on. We do not sell tools. We deploy the layer
                between every tool you already own, the one that quietly turns
                hours into seconds and headcount into margin. End to end,
                owned by you.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button variant="cobalt" size="lg" asChild>
                  <Link to="/#contact">
                    Start the conversation <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/products">Explore the stack</Link>
                </Button>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <div className="glass rounded-3xl p-8">
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-ice/40 mb-6">
                  In numbers
                </p>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
                  {[
                    { k: "6", v: "Modular products in the stack" },
                    { k: "24/7", v: "Always-on automation coverage" },
                    { k: "100%", v: "Engineered, not templated" },
                    { k: "No", v: "Long-term lock-in contracts" },
                  ].map((s) => (
                    <div key={s.v}>
                      <dt className="font-display text-4xl font-medium tracking-tight text-ice">
                        {s.k}
                      </dt>
                      <dd className="text-[12.5px] text-ice/55 mt-1 leading-snug">{s.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.aside>
          </div>

          {/* Founder */}
          <div className="mt-28 grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-4">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-ice/40 mb-3">
                The founder
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-ice">
                Saad Waqas
              </h2>
              <p className="text-cobalt-bright text-[12px] font-mono uppercase tracking-[0.2em] mt-2">
                Founder & CEO
              </p>
            </div>
            <div className="md:col-span-8 glass rounded-3xl p-8 md:p-10">
              <p className="text-ice/70 text-[15px] leading-relaxed">
                SWAIS was founded by Saad Waqas on a single conviction: that
                the next decade of business advantage will not come from
                buying more software, but from engineering the intelligence
                layer that sits between everything you already run.
              </p>
              <p className="text-ice/60 text-[14.5px] leading-relaxed mt-5">
                Under his direction, SWAIS has grown into the studio that
                serious operators turn to when they want AI that actually
                ships — built by engineers, owned by the business, and tied
                to numbers that move.
              </p>
            </div>
          </div>

          {/* Principles — blank tiles; content assembles in on hover */}
          <div className="mt-28">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-ice/40 mb-3">
              How we work
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-ice max-w-2xl">
              Four principles that hold every engagement together.
            </h2>
            <p className="text-ice/65 text-[15px] leading-relaxed mt-6 max-w-2xl">
              SWAIS is built on a small set of non-negotiable commitments. They
              shape every system we ship, every roadmap we agree to, and every
              edge case we engineer around. Move your cursor across the grid to
              see them, one at a time.
            </p>

            <div
              className="grid md:grid-cols-2 gap-px bg-ice/[0.06] rounded-3xl overflow-hidden border border-ice/[0.06] mt-10"
              onMouseLeave={() => setHovered(null)}
            >
              {principles.map((p, i) => {
                const isActive = hovered === i || revealed.has(i);
                return (
                  <div
                    key={p.title}
                    onMouseEnter={() => {
                      setHovered(i);
                      setRevealed((prev) => {
                        if (prev.has(i)) return prev;
                        const next = new Set(prev);
                        next.add(i);
                        return next;
                      });
                    }}
                    className="relative bg-ink p-9 md:p-10 min-h-[260px] cursor-pointer overflow-hidden transition-colors duration-500 hover:bg-navy-deep"
                  >
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          key="content"
                          initial={{ opacity: 0, y: 28, scale: 0.94, filter: "blur(8px)" }}
                          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: 16, scale: 0.96, filter: "blur(6px)" }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="flex items-baseline gap-4 mb-5">
                            <motion.span
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: 0.05 }}
                              className="font-display text-3xl font-medium tracking-tight text-cobalt-bright"
                            >
                              {p.number}
                            </motion.span>
                            <motion.span
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                              className="h-px flex-1 bg-ice/10 origin-left"
                            />
                          </div>
                          <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.12 }}
                            className="font-display text-xl font-medium tracking-tight text-ice"
                          >
                            {p.title}
                          </motion.h3>
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.18 }}
                            className="text-ice/65 text-[14.5px] leading-relaxed mt-3 max-w-md"
                          >
                            {p.body}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default About;
