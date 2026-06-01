import { motion } from "framer-motion";
import { Icon, addCollection } from "@iconify/react/offline";
import logos from "@iconify-json/logos/icons.json";
import simpleIcons from "@iconify-json/simple-icons/icons.json";

addCollection(logos);
addCollection(simpleIcons);

/**
 * Each platform renders in its actual brand colour. For brands whose
 * primary mark is pure black or pure white, we use ice (near-white) so it
 * stays visible on the deep cobalt background without being recoloured.
 */
type Platform = { name: string; icon: string; color?: string };

const ICE = "hsl(210 60% 98%)";

const platforms: Platform[] = [
  { name: "Slack", icon: "logos:slack-icon" },
  { name: "Discord", icon: "logos:discord-icon" },
  { name: "Telegram", icon: "logos:telegram" },
  { name: "Gmail", icon: "logos:google-gmail" },
  { name: "Google Calendar", icon: "logos:google-calendar" },
  { name: "Google Drive", icon: "logos:google-drive" },
  { name: "Google Sheets", icon: "simple-icons:googlesheets", color: "#0F9D58" },
  { name: "Notion", icon: "simple-icons:notion", color: ICE },
  { name: "Airtable", icon: "logos:airtable" },
  { name: "ClickUp", icon: "simple-icons:clickup", color: "#7B68EE" },
  { name: "Asana", icon: "logos:asana-icon" },
  { name: "Trello", icon: "logos:trello" },
  { name: "HubSpot", icon: "simple-icons:hubspot", color: "#FF7A59" },
  { name: "Salesforce", icon: "logos:salesforce" },
  { name: "Mailchimp", icon: "logos:mailchimp-freddie" },
  { name: "Stripe", icon: "simple-icons:stripe", color: "#635BFF" },
  { name: "Shopify", icon: "logos:shopify" },
  { name: "GitHub", icon: "simple-icons:github", color: ICE },
  { name: "Calendly", icon: "simple-icons:calendly", color: "#006BFF" },
  { name: "OpenAI", icon: "simple-icons:openai", color: "#10A37F" },
];

const Row = () => (
  <>
    {platforms.map((p, i) => (
      <div
        key={i}
        className="group inline-flex shrink-0 items-center gap-3 pr-10 align-middle"
        title={p.name}
      >
        <span
          className="relative inline-flex h-8 w-8 items-center justify-center"
          style={{ color: p.color ?? "currentColor" }}
        >
          <Icon
            icon={p.icon}
            ssr
            width="28"
            height="28"
            className="h-7 w-7 transition-transform duration-500 group-hover:scale-110"
            aria-hidden="true"
          />
        </span>
        <span className="text-[13px] font-medium tracking-tight text-ice/80 group-hover:text-ice transition-colors duration-500 whitespace-nowrap">
          {p.name}
        </span>
      </div>
    ))}
  </>
);

const LogoCloud = () => {
  return (
    <section className="py-16 relative">
      <div className="container-x">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          className="text-center text-[11px] tracking-[0.3em] uppercase text-ice/40 font-mono mb-10"
        >
          Built for seamless workflows with trusted platforms
        </motion.p>
      </div>

      <div
        className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%)",
        }}
      >
        <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform py-2">
          <div className="flex shrink-0">
            <Row />
          </div>
          <div className="flex shrink-0" aria-hidden="true">
            <Row />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCloud;
