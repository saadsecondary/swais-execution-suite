import { motion } from "framer-motion";
import {
  Brain,
  Zap,
  PhoneCall,
  LayoutDashboard,
  Globe,
  Smartphone,
  ArrowUpRight,
  Check,
  Star,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Spotlight } from "@/components/ui/spotlight";

type Tier = {
  name: "Starter" | "Growth" | "Elite";
  tagline: string;
  highlights: string[];
};

type ProductCode = "PRIME" | "VECTOR" | "ECHO" | "NEXUS" | "FORGE" | "CRAFT";
type MotifKind = "orbit" | "flow" | "wave" | "grid" | "build" | "mobile";

type Product = {
  code: ProductCode;
  index: string;
  label: string;
  icon: typeof Brain;
  headline: string;
  outcome: string;
  audience: string;
  tiers: Tier[];
  motif: MotifKind;
};

/**
 * Tier philosophy — BY SCOPE.
 * Same feature names across Starter / Growth / Elite, scaled by quantity & depth.
 * Starter = 1 use case · Growth = full department · Elite = full organisation.
 */
const products: Product[] = [
  {
    code: "PRIME",
    index: "01",
    label: "AI Agents & Chatbots",
    icon: Brain,
    headline: "Intelligent agents that work while you sleep.",
    outcome: "Automated conversations, lead qualification, and task execution — 24/7.",
    audience: "Businesses losing leads, time, and revenue to manual responses.",
    motif: "orbit",
    tiers: [
      {
        name: "Starter",
        tagline: "One agent. One channel. Live in weeks.",
        highlights: [
          "1 AI agent · 1 channel",
          "Up to 2,000 conversations / month",
          "Lead capture + CRM handoff",
          "Standard knowledge base",
          "30-day onboarding support",
        ],
      },
      {
        name: "Growth",
        tagline: "A team of agents across every channel.",
        highlights: [
          "Up to 5 AI agents · 4 channels",
          "Up to 25,000 conversations / month",
          "Lead capture + CRM + booking flows",
          "Custom-trained knowledge base",
          "Quarterly optimisation sprints",
        ],
      },
      {
        name: "Elite",
        tagline: "An autonomous agent network across the org.",
        highlights: [
          "Unlimited agents · all channels",
          "Unlimited conversations",
          "Voice + chat + email + outbound",
          "Custom-fine-tuned models",
          "Dedicated engineering pod",
        ],
      },
    ],
  },
  {
    code: "VECTOR",
    index: "02",
    label: "Automation Systems",
    icon: Zap,
    headline: "Every repetitive task, eliminated.",
    outcome: "End-to-end business workflows that run without human input.",
    audience: "Teams burning hours on tasks a machine should handle.",
    motif: "flow",
    tiers: [
      {
        name: "Starter",
        tagline: "Automate your biggest time drain.",
        highlights: [
          "Up to 3 workflows",
          "Up to 5 tool integrations",
          "10,000 task runs / month",
          "Error alerts + logs",
          "30-day onboarding support",
        ],
      },
      {
        name: "Growth",
        tagline: "A connected, self-running operation.",
        highlights: [
          "Up to 20 workflows",
          "Up to 20 tool integrations",
          "100,000 task runs / month",
          "Error alerts + logs + dashboards",
          "Quarterly optimisation sprints",
        ],
      },
      {
        name: "Elite",
        tagline: "Enterprise automation infrastructure.",
        highlights: [
          "Unlimited workflows",
          "Unlimited integrations (custom-built)",
          "Unlimited task runs",
          "Real-time monitoring + SLA",
          "Dedicated engineering pod",
        ],
      },
    ],
  },
  {
    code: "ECHO",
    index: "03",
    label: "AI Voice & Calling Agents",
    icon: PhoneCall,
    headline: "Voice agents that call, qualify and close.",
    outcome: "Inbound and outbound calls handled by AI that sounds human and stays on script.",
    audience: "Sales, support and ops teams losing revenue to missed calls and slow follow-up.",
    motif: "wave",
    tiers: [
      {
        name: "Starter",
        tagline: "One number. One use case. Live in weeks.",
        highlights: [
          "1 voice agent · 1 phone number",
          "Inbound or outbound (pick one)",
          "Up to 1,500 call minutes / month",
          "CRM handoff + call transcripts",
          "30-day onboarding support",
        ],
      },
      {
        name: "Growth",
        tagline: "A calling team that never sleeps.",
        highlights: [
          "Up to 5 voice agents · multi-number",
          "Inbound + outbound campaigns",
          "Up to 20,000 call minutes / month",
          "CRM + booking + live handoff to humans",
          "Quarterly optimisation sprints",
        ],
      },
      {
        name: "Elite",
        tagline: "A full voice operation across the business.",
        highlights: [
          "Unlimited voice agents + numbers",
          "Unlimited inbound + outbound minutes",
          "Custom voices + multilingual",
          "Real-time analytics + QA scoring",
          "Dedicated engineering pod",
        ],
      },
    ],
  },
  {
    code: "NEXUS",
    index: "04",
    label: "AI Dashboard & Analytics",
    icon: LayoutDashboard,
    headline: "See everything. Decide faster.",
    outcome: "A real-time intelligence layer over your entire business operation.",
    audience: "Decision-makers flying blind without unified data.",
    motif: "grid",
    tiers: [
      {
        name: "Starter",
        tagline: "Your key metrics, always visible.",
        highlights: [
          "1 dashboard · up to 3 data sources",
          "Up to 10 KPIs tracked",
          "Weekly automated reports",
          "Basic alerts",
          "30-day onboarding support",
        ],
      },
      {
        name: "Growth",
        tagline: "Full-business visibility in one place.",
        highlights: [
          "Up to 5 dashboards · 10 data sources",
          "Unlimited KPIs",
          "Daily automated reports",
          "Alerts + anomaly detection",
          "Quarterly optimisation sprints",
        ],
      },
      {
        name: "Elite",
        tagline: "Predictive intelligence, not just reporting.",
        highlights: [
          "Unlimited dashboards + sources",
          "Custom data models",
          "Real-time executive briefings",
          "AI-powered forecasting",
          "Dedicated data engineering pod",
        ],
      },
    ],
  },
  {
    code: "FORGE",
    index: "05",
    label: "Custom Website Development",
    icon: Globe,
    headline: "A website that works as hard as you do.",
    outcome: "High-performance, conversion-focused websites — built fast, built right.",
    audience: "Businesses with outdated, slow, or non-existent web presence.",
    motif: "build",
    tiers: [
      {
        name: "Starter",
        tagline: "A polished, live presence — fast.",
        highlights: [
          "Up to 5 pages",
          "Mobile-first responsive build",
          "Basic SEO setup",
          "Contact + lead capture forms",
          "30-day post-launch support",
        ],
      },
      {
        name: "Growth",
        tagline: "A full web presence that grows with you.",
        highlights: [
          "Up to 15 pages",
          "CMS + blog integration",
          "Advanced SEO + analytics",
          "Custom animations + interactions",
          "Quarterly optimisation sprints",
        ],
      },
      {
        name: "Elite",
        tagline: "A fully engineered web platform.",
        highlights: [
          "Unlimited pages",
          "Custom web-app features + AI",
          "Multi-region performance tuning",
          "Conversion experiments built-in",
          "Dedicated engineering pod",
        ],
      },
    ],
  },
  {
    code: "CRAFT",
    index: "06",
    label: "Custom App Development",
    icon: Smartphone,
    headline: "Apps built for how your business actually works.",
    outcome: "Custom web apps and mobile apps — designed around your operations, not a template.",
    audience: "Businesses that need a tool built specifically for them, not a SaaS workaround.",
    motif: "mobile",
    tiers: [
      {
        name: "Starter",
        tagline: "A focused app for one core need.",
        highlights: [
          "1 platform (web or mobile)",
          "Up to 5 core features",
          "Auth + basic backend",
          "Up to 1,000 users",
          "30-day post-launch support",
        ],
      },
      {
        name: "Growth",
        tagline: "A full-featured custom application.",
        highlights: [
          "Web + mobile (both)",
          "Up to 20 features · roles & permissions",
          "Third-party integrations",
          "Up to 25,000 users",
          "Quarterly optimisation sprints",
        ],
      },
      {
        name: "Elite",
        tagline: "A scalable product, engineered from the ground up.",
        highlights: [
          "Full-stack custom platform",
          "Unlimited features + AI built-in",
          "Unlimited users · enterprise scale",
          "Ongoing roadmap + retainer",
          "Dedicated engineering team",
        ],
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                              Animated motifs                               */
/* -------------------------------------------------------------------------- */

const Motif = ({ kind }: { kind: MotifKind }) => {
  if (kind === "orbit") {
    // Two concentric rings. Dots ride exactly on each ring, anchored from the
    // dot center (translate -50%/-50%) so nothing drifts off the line.
    const ringOuter = 128; // radius matches h-64 / w-64 (256px diameter)
    const ringInner = 88;  // radius matches h-44 / w-44 (176px diameter)
    return (
      <div className="relative h-[360px] w-full overflow-hidden">
        {/* ambient cobalt glow behind */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(220_100%_55%/0.22),transparent_60%)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="absolute h-64 w-64 rounded-full border border-cobalt-bright/25"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute h-44 w-44 rounded-full border border-cobalt-bright/35"
            animate={{ rotate: -360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          />
          {/* Center brain with pulse */}
          <motion.div
            className="relative h-16 w-16 rounded-full bg-gradient-cobalt shadow-cobalt flex items-center justify-center z-10"
            animate={{ scale: [1, 1.08, 1], boxShadow: [
              "0 0 30px hsl(220 100% 55% / 0.4)",
              "0 0 55px hsl(220 100% 55% / 0.75)",
              "0 0 30px hsl(220 100% 55% / 0.4)",
            ] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Brain className="h-6 w-6 text-ice" strokeWidth={1.5} />
          </motion.div>
          <motion.span
            className="absolute h-16 w-16 rounded-full border border-cobalt-bright/40"
            animate={{ scale: [1, 2.2], opacity: [0.55, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
          />

          {/* Outer ring dots — anchored exactly on the ring */}
          {[0, 72, 144, 216, 288].map((deg, i) => (
            <motion.span
              key={`o-${i}`}
              className="absolute h-2.5 w-2.5 rounded-full bg-cobalt-bright shadow-[0_0_18px_hsl(var(--cobalt-bright))]"
              style={{ top: "50%", left: "50%", marginTop: -5, marginLeft: -5 }}
              animate={{
                x: Array.from({ length: 73 }, (_, k) =>
                  Math.cos(((deg + k * 5) * Math.PI) / 180) * ringOuter,
                ),
                y: Array.from({ length: 73 }, (_, k) =>
                  Math.sin(((deg + k * 5) * Math.PI) / 180) * ringOuter,
                ),
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
            />
          ))}
          {/* Inner ring dots — orbit the other way */}
          {[36, 144, 252].map((deg, i) => (
            <motion.span
              key={`i-${i}`}
              className="absolute h-2 w-2 rounded-full bg-ice/80 shadow-[0_0_12px_hsl(var(--ice)/0.8)]"
              style={{ top: "50%", left: "50%", marginTop: -4, marginLeft: -4 }}
              animate={{
                x: Array.from({ length: 73 }, (_, k) =>
                  Math.cos(((deg - k * 5) * Math.PI) / 180) * ringInner,
                ),
                y: Array.from({ length: 73 }, (_, k) =>
                  Math.sin(((deg - k * 5) * Math.PI) / 180) * ringInner,
                ),
              }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
            />
          ))}
        </div>
      </div>
    );
  }


  if (kind === "flow") {
    return (
      <div className="relative h-[360px] w-full">
        <svg viewBox="0 0 400 360" className="absolute inset-0 h-full w-full" fill="none">
          <defs>
            <linearGradient id="flowGrad" x1="0" x2="1">
              <stop offset="0" stopColor="hsl(var(--cobalt-bright))" stopOpacity="0" />
              <stop offset="0.5" stopColor="hsl(var(--cobalt-bright))" stopOpacity="0.9" />
              <stop offset="1" stopColor="hsl(var(--cobalt-bright))" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[80, 140, 200, 260, 320].map((y, i) => (
            <motion.path
              key={y}
              d={`M 0 ${y} C 100 ${y - 30}, 300 ${y + 30}, 400 ${y}`}
              stroke="url(#flowGrad)"
              strokeWidth="1.2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
          {[80, 140, 200, 260, 320].map((y, i) => (
            <motion.circle
              key={`d-${y}`}
              r="3"
              fill="hsl(var(--ice))"
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5,
              }}
              style={{
                offsetPath: `path("M 0 ${y} C 100 ${y - 30}, 300 ${y + 30}, 400 ${y}")`,
              }}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (kind === "wave") {
    const bars = Array.from({ length: 36 });
    return (
      <div className="relative h-[360px] w-full flex items-center justify-center gap-1.5">
        {bars.map((_, i) => (
          <motion.span
            key={i}
            className="w-1.5 rounded-full bg-gradient-to-t from-cobalt to-cobalt-bright"
            animate={{
              height: [
                `${20 + Math.sin(i * 0.4) * 30 + 30}px`,
                `${60 + Math.sin(i * 0.4 + 1) * 60 + 30}px`,
                `${20 + Math.sin(i * 0.4) * 30 + 30}px`,
              ],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.6 + (i % 5) * 0.18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.04,
            }}
          />
        ))}
      </div>
    );
  }

  if (kind === "grid") {
    return (
      <div className="relative h-[360px] w-full grid grid-cols-6 grid-rows-6 gap-1.5 p-2">
        {Array.from({ length: 36 }).map((_, i) => (
          <motion.span
            key={i}
            className="rounded-md bg-cobalt-bright/15 border border-cobalt-bright/20"
            animate={{
              backgroundColor: [
                "hsl(var(--cobalt-bright) / 0.12)",
                "hsl(var(--cobalt-bright) / 0.45)",
                "hsl(var(--cobalt-bright) / 0.12)",
              ],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: ((i * 37) % 36) * 0.07,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  }

  if (kind === "build") {
    // Rectangles assembling left → right, snapping into a layout
    const blocks = [
      { x: 30, y: 40, w: 140, h: 22, d: 0 },
      { x: 30, y: 75, w: 220, h: 60, d: 0.1 },
      { x: 30, y: 150, w: 100, h: 100, d: 0.2 },
      { x: 145, y: 150, w: 105, h: 48, d: 0.3 },
      { x: 145, y: 205, w: 105, h: 45, d: 0.4 },
      { x: 270, y: 40, w: 100, h: 100, d: 0.15 },
      { x: 270, y: 150, w: 100, h: 60, d: 0.25 },
      { x: 270, y: 220, w: 100, h: 30, d: 0.35 },
      { x: 30, y: 270, w: 340, h: 18, d: 0.5 },
    ];
    return (
      <div className="relative h-[360px] w-full">
        <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full">
          {blocks.map((b, i) => (
            <motion.rect
              key={i}
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx={6}
              fill="hsl(var(--cobalt-bright) / 0.18)"
              stroke="hsl(var(--cobalt-bright) / 0.45)"
              strokeWidth="1"
              initial={{ opacity: 0, x: b.x - 80 }}
              whileInView={{ opacity: 1, x: b.x }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: b.d,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </svg>
      </div>
    );
  }

  // mobile — phone frame assembling, screen lighting up
  return (
    <div className="relative h-[360px] w-full flex items-center justify-center">
      <svg viewBox="0 0 200 320" className="h-full w-auto">
        <defs>
          <linearGradient id="phoneScreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--cobalt-bright) / 0.4)" />
            <stop offset="100%" stopColor="hsl(var(--cobalt) / 0.15)" />
          </linearGradient>
        </defs>
        {/* Frame */}
        <motion.rect
          x="40"
          y="20"
          width="120"
          height="280"
          rx="22"
          fill="hsl(222 78% 9%)"
          stroke="hsl(var(--cobalt-bright) / 0.4)"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Screen */}
        <motion.rect
          x="48"
          y="34"
          width="104"
          height="252"
          rx="14"
          fill="url(#phoneScreen)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
        {/* Notch */}
        <motion.rect
          x="86"
          y="30"
          width="28"
          height="6"
          rx="3"
          fill="hsl(222 78% 6%)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
        />
        {/* UI elements */}
        {[
          { y: 60, w: 60, d: 0.55 },
          { y: 78, w: 84, d: 0.65 },
          { y: 110, w: 84, h: 48, d: 0.75 },
          { y: 170, w: 38, h: 38, d: 0.85 },
          { y: 170, w: 38, h: 38, x: 102, d: 0.95 },
          { y: 220, w: 84, h: 14, d: 1.05 },
          { y: 244, w: 60, h: 14, d: 1.15 },
        ].map((b, i) => (
          <motion.rect
            key={i}
            x={b.x ?? 58}
            y={b.y}
            width={b.w}
            height={b.h ?? 8}
            rx="3"
            fill="hsl(var(--ice) / 0.85)"
            initial={{ opacity: 0, y: b.y + 8 }}
            whileInView={{ opacity: 1, y: b.y }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: b.d, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
        {/* Glow */}
        <motion.ellipse
          cx="100"
          cy="160"
          rx="90"
          ry="110"
          fill="hsl(var(--cobalt-bright) / 0.18)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
          style={{ filter: "blur(28px)" }}
        />
      </svg>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                Tier card                                   */
/* -------------------------------------------------------------------------- */

const TierCard = ({
  tier,
  productCode,
}: {
  tier: Tier;
  productCode: string;
}) => {
  const highlighted = tier.name === "Growth";
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col h-full p-6 rounded-2xl border transition-colors duration-500 ${
        highlighted
          ? "border-cobalt-bright/45 bg-gradient-to-b from-cobalt/[0.12] to-transparent shadow-cobalt"
          : "border-ice/10 bg-ice/[0.02] hover:border-ice/20"
      }`}
    >
      {highlighted && (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-gradient-cobalt px-2.5 py-1 text-[10px] font-mono tracking-[0.2em] uppercase text-ice shadow-cobalt">
          <Star className="h-3 w-3" strokeWidth={2} fill="currentColor" /> Most Popular
        </span>
      )}
      <div className="flex items-baseline justify-between">
        <h4 className="font-display text-lg font-medium text-ice tracking-tight">{tier.name}</h4>
        <span className="font-mono text-[10px] tracking-[0.2em] text-ice/40 uppercase">
          {productCode}
        </span>
      </div>
      <p className="text-ice/60 text-[13px] leading-relaxed mt-2 min-h-[42px]">{tier.tagline}</p>

      <ul className="mt-5 space-y-2.5 flex-1">
        {tier.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2.5 text-[13px] text-ice/75">
            <Check
              className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${
                highlighted ? "text-cobalt-bright" : "text-ice/50"
              }`}
              strokeWidth={2.5}
            />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <a
        href={`#contact`}
        className={`mt-6 inline-flex items-center gap-1.5 text-[12px] font-mono uppercase tracking-[0.2em] transition-colors ${
          highlighted ? "text-cobalt-bright hover:text-ice" : "text-ice/60 hover:text-cobalt-bright"
        }`}
      >
        Book consultation <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/*                            Single product block                            */
/* -------------------------------------------------------------------------- */

const ProductBlock = ({ product, flip }: { product: Product; flip: boolean }) => {
  const Icon = product.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-20 md:py-28 border-t border-ice/[0.06]"
    >
      <div className="absolute -top-px left-0 h-px w-32 bg-gradient-to-r from-cobalt-bright to-transparent" />

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[11px] tracking-[0.32em] text-cobalt-bright uppercase">
              {product.index} / {product.code}
            </span>
            <span className="h-px flex-1 bg-ice/10" />
            <div className="h-10 w-10 rounded-xl glass-cobalt flex items-center justify-center">
              <Icon className="h-4 w-4 text-cobalt-bright" strokeWidth={1.5} />
            </div>
          </div>

          <p className="font-mono text-[11px] tracking-[0.25em] text-ice/45 uppercase mb-4">
            {product.label}
          </p>

          <h3 className="text-3xl md:text-5xl font-medium tracking-[-0.03em] leading-[1.06] text-balance">
            <span className="serif text-cobalt-bright font-normal">{product.code}.</span>{" "}
            <span className="text-gradient">{product.headline}</span>
          </h3>

          <div className="mt-8 grid sm:grid-cols-2 gap-6 max-w-2xl">
            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-ice/40 uppercase mb-2">
                Outcome
              </p>
              <p className="text-ice/80 text-[15px] leading-relaxed">{product.outcome}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-ice/40 uppercase mb-2">
                Built for
              </p>
              <p className="text-ice/80 text-[15px] leading-relaxed">{product.audience}</p>
            </div>
          </div>
        </div>

        <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
          <div className="relative rounded-3xl border border-ice/[0.06] bg-gradient-to-br from-ice/[0.03] to-transparent overflow-hidden">
            <Motif kind={product.motif} />
            <span className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-cobalt-bright/10" />
          </div>
        </div>
      </div>

      <div className="mt-14">
        <div className="flex items-center justify-between mb-5">
          <p className="font-mono text-[10px] tracking-[0.3em] text-ice/45 uppercase">
            Access tiers · {product.code}
          </p>
          <p className="font-mono text-[10px] tracking-[0.2em] text-ice/35 uppercase">
            Pricing tailored after consultation
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {product.tiers.map((tier) => (
            <TierCard key={tier.name} tier={tier} productCode={product.code} />
          ))}
        </div>
      </div>
    </motion.article>
  );
};

const ProductSystems = () => {
  return (
    <section id="systems" className="py-28 md:py-36 relative overflow-hidden">
      <div className="glow-orb h-[600px] w-[600px] bg-cobalt/15 top-[20%] -right-40" />
      <div className="glow-orb h-[500px] w-[500px] bg-cobalt/10 bottom-0 -left-40" />
      <Spotlight size={520} />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="02 / SWAIS Systems"
          description="Six products. One intelligence layer. Deploy a single system or compose the entire stack into a coordinated AI operation. Each scales from launch to enterprise."
        >
          <span className="text-gradient">Six systems</span>{" "}
          <span className="serif text-cobalt-bright font-normal">engineered</span>{" "}
          <span className="text-gradient">to compound revenue.</span>
        </SectionHeading>

        <div className="mt-20">
          {products.map((p, i) => (
            <ProductBlock key={p.code} product={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSystems;
