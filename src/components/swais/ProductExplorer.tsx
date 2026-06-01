import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, type ProductCode } from "@/data/products";

type Props = {
  /** Render in compact (home section) mode with eyebrow + heading, or as page (no heading). */
  variant?: "section" | "page";
};

const ProductExplorer = ({ variant = "section" }: Props) => {
  const [active, setActive] = useState<ProductCode>(products[0].code);
  const product = products.find((p) => p.code === active)!;

  return (
    <section
      id="systems"
      className={
        variant === "section"
          ? "relative z-10 py-28 md:py-36"
          : "relative z-10 pt-32 md:pt-40 pb-24"
      }
    >
      <div className="container-x">
        {variant === "section" && (
          <div className="max-w-3xl mb-16">
            <p className="text-cobalt-bright text-[11px] tracking-[0.3em] uppercase font-mono mb-5">
              02 / The Stack
            </p>
            <h2 className="text-4xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-balance">
              <span className="text-gradient">Six products.</span>{" "}
              <span className="serif text-cobalt-bright font-normal">One</span>{" "}
              <span className="text-gradient">intelligence layer.</span>
            </h2>
            <p className="text-ice/55 mt-6 text-[15px] max-w-xl leading-relaxed">
              Pick a system to see what it does, who it's for, and what comes
              with each access tier. Final pricing is set after the discovery
              call, once we know the shape of your operation.
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          <aside className="lg:col-span-4">
            <div className="glass rounded-3xl p-3 lg:sticky lg:top-28">
              <ul className="flex flex-col gap-1">
                {products.map((p) => {
                  const isActive = p.code === active;
                  return (
                    <li key={p.code}>
                      <button
                        type="button"
                        onClick={() => setActive(p.code)}
                        className={`group w-full text-left rounded-2xl px-4 py-4 transition-all duration-300 flex items-center gap-4 ${
                          isActive
                            ? "bg-cobalt/15 border border-cobalt-bright/30"
                            : "border border-transparent hover:bg-ice/[0.04]"
                        }`}
                      >
                        <span
                          className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
                            isActive ? "bg-gradient-cobalt shadow-cobalt" : "glass-cobalt"
                          }`}
                        >
                          <p.icon
                            className={`h-4 w-4 ${isActive ? "text-ice" : "text-cobalt-bright"}`}
                            strokeWidth={1.5}
                          />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="flex items-baseline gap-2">
                            <span
                              className={`font-display text-base font-medium tracking-tight ${
                                isActive ? "text-ice" : "text-ice/85"
                              }`}
                            >
                              {p.code}
                            </span>
                            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ice/40">
                              {p.index}
                            </span>
                          </span>
                          <span className="block text-[12px] text-ice/55 mt-0.5 truncate">
                            {p.label}
                          </span>
                        </span>
                        <ArrowRight
                          className={`h-4 w-4 shrink-0 transition-all ${
                            isActive
                              ? "text-cobalt-bright translate-x-0 opacity-100"
                              : "text-ice/30 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                          }`}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-8 min-w-0">
            <AnimatePresence mode="wait">
              <motion.article
                key={product.code}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="glass rounded-3xl p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ice/40">
                      {product.index}
                    </span>
                    <span className="h-px w-8 bg-cobalt-bright/40" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-cobalt-bright">
                      {product.label}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight text-ice">
                    {product.code}
                  </h2>
                  <p className="serif italic text-ice/85 text-xl md:text-2xl leading-snug mt-4 max-w-2xl">
                    {product.headline}
                  </p>
                  <p className="text-ice/65 text-[15px] leading-relaxed mt-6 max-w-2xl">
                    {product.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-5 mt-8">
                    <div className="rounded-2xl border border-ice/10 p-5">
                      <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-ice/40 mb-2">
                        The Outcome
                      </p>
                      <p className="text-ice/85 text-sm leading-relaxed">{product.outcome}</p>
                    </div>
                    <div className="rounded-2xl border border-ice/10 p-5">
                      <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-ice/40 mb-2">
                        Built For
                      </p>
                      <p className="text-ice/85 text-sm leading-relaxed">{product.audience}</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        {/* Access Tiers — full-width, centered below the product detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`tiers-${product.code}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 md:mt-20 max-w-5xl mx-auto"
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 text-center md:text-left">
              <div className="mx-auto md:mx-0">
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-ice/40 mb-2">
                  Access Tiers
                </p>
                <h3 className="text-2xl md:text-3xl font-display font-medium tracking-tight text-ice">
                  Scope, not price.
                </h3>
              </div>
              <p className="text-[11px] text-ice/40 font-mono uppercase tracking-wider max-w-[280px] md:text-right mx-auto md:mx-0">
                Final tier is confirmed after consultation, on a per-engagement basis.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {product.tiers.map((t, i) => {
                const isMid = i === 1;
                return (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative rounded-3xl p-7 transition-colors duration-500 ${
                      isMid
                        ? "glass border border-cobalt-bright/30 bg-cobalt/10"
                        : "glass"
                    }`}
                  >
                    {isMid && (
                      <span className="absolute -top-2.5 left-7 bg-gradient-cobalt text-ice rounded-full px-2.5 py-0.5 text-[10px] font-medium tracking-wider uppercase shadow-cobalt">
                        Most chosen
                      </span>
                    )}
                    <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-cobalt-bright mb-3">
                      {t.name}
                    </p>
                    <p className="serif italic text-ice/90 text-base leading-snug min-h-[3rem]">
                      {t.tagline}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {t.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2.5 text-[13.5px] text-ice/75 leading-snug"
                        >
                          <Check
                            className="h-3.5 w-3.5 mt-1 shrink-0 text-cobalt-bright"
                            strokeWidth={2.5}
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 text-center">
              <Button variant="cobalt" size="lg" asChild>
                <Link to="/#contact">
                  Book a consultation for {product.code}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <p className="text-[11px] text-ice/45 font-mono uppercase tracking-wider">
                Pricing is decided after discovery, never before.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProductExplorer;
