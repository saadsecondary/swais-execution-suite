import { Bot, Workflow, Mic, Activity, Code2, Boxes, type LucideIcon } from "lucide-react";

export type Tier = {
  name: "Starter" | "Growth" | "Elite";
  tagline: string;
  highlights: string[];
};

export type ProductCode = "PRIME" | "VECTOR" | "ECHO" | "NEXUS" | "FORGE" | "CRAFT";

export type Product = {
  code: ProductCode;
  index: string;
  label: string;
  icon: LucideIcon;
  headline: string;
  outcome: string;
  audience: string;
  description: string;
  tiers: Tier[];
};

/**
 * Single source of truth for the SWAIS product stack.
 * Tiers describe SCOPE, never price. Pricing is set after the
 * discovery consultation, on a per-engagement basis.
 */
export const products: Product[] = [
  {
    code: "PRIME",
    index: "01",
    label: "AI Agents & Chatbots",
    icon: Bot,
    headline: "Intelligent agents that work while you sleep.",
    outcome: "Automated conversations, lead qualification and task execution, 24/7.",
    audience: "Businesses losing leads, time, and revenue to manual responses.",
    description:
      "PRIME deploys goal-driven AI agents trained on your playbook. They qualify leads, answer questions, book calls and resolve tickets across every channel you operate on, without supervision, without burnout, and without going off-brand.",
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
    icon: Workflow,
    headline: "Every repetitive task, eliminated.",
    outcome: "End-to-end business workflows that run without human input.",
    audience: "Teams burning hours on tasks a machine should handle.",
    description:
      "VECTOR wires your entire tool stack into a single nervous system. Repeatable work like onboarding, billing, reporting and handoffs runs by itself in the background, with full logs and error alerts. The business keeps moving while your team focuses on what only humans can do.",
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
    icon: Mic,
    headline: "Voice agents that call, qualify and close.",
    outcome: "Inbound and outbound calls handled by AI agents that sound human and stay on script.",
    audience: "Sales, support and operations teams losing revenue to missed calls and slow follow-up.",
    description:
      "ECHO deploys real-time voice agents on your phone lines. They answer inbound calls without hold times, run outbound campaigns at scale, qualify leads, book meetings and route the right calls to your team, with full transcripts and CRM sync built in.",
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
    icon: Activity,
    headline: "See everything. Decide faster.",
    outcome: "A real-time intelligence layer over your entire business operation.",
    audience: "Decision-makers flying blind without unified data.",
    description:
      "NEXUS is the operating layer on top of every system you already run. Conversations, conversions, costs and forecasts converge into one live dashboard, so the people making decisions see the same numbers, at the same time, as the systems generating them.",
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
    icon: Code2,
    headline: "A website that works as hard as you do.",
    outcome: "High-performance, conversion-focused websites. Built fast, built right.",
    audience: "Businesses with outdated, slow, or non-existent web presence.",
    description:
      "FORGE delivers websites engineered for performance and conversion. Hand-built front-ends, real SEO foundations, and lead-capture wired into the rest of your SWAIS stack from day one. No template, no compromise.",
    tiers: [
      {
        name: "Starter",
        tagline: "A polished, live presence. Fast.",
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
    icon: Boxes,
    headline: "Apps built for how your business actually works.",
    outcome: "Custom web apps and mobile apps, designed around your operation rather than a template.",
    audience: "Businesses that need a tool built specifically for them, not a SaaS workaround.",
    description:
      "CRAFT builds software around your actual workflow, not the other way around. Web apps, mobile apps, internal tooling and customer-facing platforms, engineered from the ground up and shaped to the way your business already runs.",
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
