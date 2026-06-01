import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const faqs = [
  {
    q: "What types of AI systems do you build?",
    a: "Six core systems: PRIME (AI agents and chatbots), VECTOR (automation workflows), ECHO (AI voice and calling agents), NEXUS (analytics dashboards), FORGE (custom websites), and CRAFT (custom apps). Every system is engineered from scratch for your business. Nothing is templated.",
  },
  {
    q: "How long does implementation take?",
    a: "Most systems go live within 7 to 21 days depending on scope. A single PRIME agent or FORGE website can be live in under a week. CRAFT apps and full VECTOR pipelines typically take 2 to 4 weeks.",
  },
  {
    q: "Will this work with my existing tools?",
    a: "We integrate with CRMs, inboxes, calendars, WhatsApp, Slack, Notion, Airtable, Stripe, and basically anything with an API or webhook. If it connects, we connect to it.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "Yes. Every client gets ongoing monitoring, tuning, and monthly check-ins. As your business scales, we expand the system with it. You are never handed off and left alone.",
  },
  {
    q: "How do we get started?",
    a: "Book a consultation at cal.com/swais. In 30 minutes we will understand your goals and walk you through exactly what is possible.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 md:py-28 relative overflow-hidden">
      <div className="glow-orb h-[500px] w-[500px] bg-cobalt/20 top-1/2 -right-40 -translate-y-1/2" />

      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15, margin: "0px 0px -60px 0px" }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <p className="text-cobalt-bright text-[11px] tracking-[0.3em] uppercase font-mono mb-5">
              06 / Questions
            </p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.03em] leading-[1.05] text-balance">
              <span className="text-gradient">Answers before</span>{" "}
              <span className="serif text-cobalt-bright font-normal">you ask.</span>
            </h2>
            <p className="text-ice/55 mt-6 text-[15px] max-w-md leading-relaxed">
              The essentials, upfront. Anything deeper is a 30-minute conversation away.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15, margin: "0px 0px -60px 0px" }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7"
          >
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="glass rounded-2xl border-ice/10 px-6 data-[state=open]:border-cobalt/40 transition-colors"
                >
                  <AccordionTrigger className="text-left text-base md:text-lg font-display font-medium text-ice hover:no-underline py-5">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-ice/65 text-[15px] leading-relaxed pb-5">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-10 glass rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-display text-lg text-ice">Still have questions?</p>
                <p className="text-ice/55 text-sm mt-1">
                  Get a custom answer in a 30-minute consultation.
                </p>
              </div>
              <Button variant="cobalt" size="lg" asChild className="shrink-0">
                <a href="#contact">
                  Book a Call <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
