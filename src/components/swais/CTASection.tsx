import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CTASection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    heardFrom: "",
    goal: "",
  });
  const [isActive, setIsActive] = useState(false);
  const [booked, setBooked] = useState(false);
  const calMounted = useRef(false);

  // Lazy-load the Cal embed script and initialise the inline scheduler once booked.
  useEffect(() => {
    if (!booked || calMounted.current) return;
    calMounted.current = true;

    const w = window as unknown as {
      Cal?: ((...args: unknown[]) => void) & {
        loaded?: boolean;
        ns?: Record<string, (...args: unknown[]) => void>;
        q?: unknown[];
      };
    };

    // Standard Cal.com inline embed bootstrapping
    (function (C: typeof window, A: string, L: string) {
      const p = function (a: { q: unknown[] }, ar: unknown) {
        a.q.push(ar);
      };
      const d = C.document;
      const Cw = C as unknown as {
        Cal?: ((...args: unknown[]) => void) & {
          loaded?: boolean;
          ns?: Record<string, unknown>;
          q?: unknown[];
        };
      };
      Cw.Cal =
        Cw.Cal ||
        function (...args: unknown[]) {
          const cal = Cw.Cal!;
          const ar = args;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            const s = d.createElement("script");
            s.src = A;
            d.head.appendChild(s);
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: ((...inner: unknown[]) => void) & { q?: unknown[] } = function (
              ...inner: unknown[]
            ) {
              p(api as unknown as { q: unknown[] }, inner);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              (cal.ns as Record<string, unknown>)[namespace] =
                (cal.ns as Record<string, unknown>)[namespace] || api;
              p(((cal.ns as Record<string, unknown>)[namespace] as unknown) as { q: unknown[] }, ar);
              p((cal as unknown) as { q: unknown[] }, ["initNamespace", namespace]);
            } else {
              p((cal as unknown) as { q: unknown[] }, ar);
            }
            return;
          }
          p((cal as unknown) as { q: unknown[] }, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    const Cal = w.Cal!;
    Cal("init", "consultation", { origin: "https://app.cal.com" });

    const ns = Cal.ns!.consultation;
    ns("inline", {
      elementOrSelector: "#my-cal-inline-consultation",
      config: {
        layout: "month_view",
        useSlotsViewOnSmallScreen: "true",
        theme: "dark",
        ...(form.name ? { name: form.name } : {}),
        ...(form.email ? { email: form.email } : {}),
        ...(form.goal ? { notes: form.goal } : {}),
      },
      calLink: "swais/consultation",
    });
    ns("ui", {
      theme: "dark",
      cssVarsPerTheme: {
        light: { "cal-brand": "#002bff" },
        dark: { "cal-brand": "#002fff" },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, [booked, form.name, form.email, form.goal]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.service) {
      toast({
        title: "Select a service",
        description: "Please choose what you're interested in so we can route your request correctly.",
        variant: "destructive",
      });
      return;
    }
    if (!form.heardFrom) {
      toast({
        title: "One last thing",
        description: "Please let us know where you heard about us.",
        variant: "destructive",
      });
      return;
    }
    try {
      localStorage.setItem("swais_booked_consultation", "true");
      localStorage.setItem("swais_consultation_submitted", "true");
    } catch {}
    // Fire event so the newsletter popup can pick it up
    try {
      window.dispatchEvent(new CustomEvent("swais:consultation-submitted"));
    } catch {}
    toast({
      title: "Pick a time below",
      description: "Your scheduler is loading — choose a slot that works for you.",
    });
    setIsActive(false);
    setBooked(true);
    // Scroll the embedded scheduler into view
    setTimeout(() => {
      document.getElementById("cal-embed")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };


  return (
    <section id="contact" className="py-20 md:py-24 relative overflow-hidden">
      <div className="glow-orb h-[700px] w-[700px] bg-cobalt/25 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Backdrop dim when form is active — no blur for performance */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-obsidian/60 pointer-events-none"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="container-x relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            animate={{ opacity: isActive ? 0.35 : 1, filter: isActive ? "blur(2px)" : "blur(0px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-cobalt-bright text-[11px] tracking-[0.3em] uppercase font-mono mb-5">
              07 — Let's build
            </p>
            <h2 className="text-4xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.02] text-balance">
              <span className="text-gradient">Stop doing work</span>
              <br />
              <span className="serif text-cobalt-bright font-normal">AI can do</span>{" "}
              <span className="text-gradient">for you.</span>
            </h2>
            <p className="text-ice/55 mt-8 text-[15px] max-w-md leading-relaxed">
              Book a 30-minute consultation. We'll map your highest-leverage automations
              and show you exactly what's possible.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "No-pitch consultation",
                "Custom AI roadmap delivered",
                "ROI projection within 48 hours",
              ].map((p) => (
                <div key={p} className="flex items-center gap-3 text-sm">
                  <span className="h-1 w-6 bg-cobalt-bright" />
                  <span className="text-ice/80">{p}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            id="contact-form"
            onSubmit={onSubmit}
            onFocus={() => setIsActive(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsActive(false);
            }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            animate={{
              scale: isActive ? 1.03 : 1,
              boxShadow: isActive
                ? "0 30px 80px -20px hsl(220 100% 50% / 0.45), 0 0 0 1px hsl(215 100% 60% / 0.3)"
                : "0 10px 40px -10px hsl(224 80% 2% / 0.7), 0 0 0 1px hsl(210 50% 96% / 0.06)",
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative glass rounded-3xl p-8 space-y-5 origin-center will-change-transform"
          >
            <div className="font-mono text-[11px] text-cobalt-bright tracking-widest uppercase">
              REQUEST.CONSULTATION
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs text-ice/60 font-normal">Name</Label>
                <Input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="bg-ice/[0.03] border-ice/10 rounded-xl h-11 text-ice placeholder:text-ice/30 focus-visible:ring-cobalt/50 focus-visible:shadow-[0_0_0_4px_hsl(220_100%_60%/0.12),0_8px_24px_-8px_hsl(220_100%_50%/0.45)] transition-shadow"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-xs text-ice/60 font-normal">Company</Label>
                <Input
                  id="company"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Acme Inc."
                  className="bg-ice/[0.03] border-ice/10 rounded-xl h-11 text-ice placeholder:text-ice/30 focus-visible:ring-cobalt/50 focus-visible:shadow-[0_0_0_4px_hsl(220_100%_60%/0.12),0_8px_24px_-8px_hsl(220_100%_50%/0.45)] transition-shadow"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs text-ice/60 font-normal">Work email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jane@acme.com"
                  className="bg-ice/[0.03] border-ice/10 rounded-xl h-11 text-ice placeholder:text-ice/30 focus-visible:ring-cobalt/50 focus-visible:shadow-[0_0_0_4px_hsl(220_100%_60%/0.12),0_8px_24px_-8px_hsl(220_100%_50%/0.45)] transition-shadow"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs text-ice/60 font-normal">Phone number</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="bg-ice/[0.03] border-ice/10 rounded-xl h-11 text-ice placeholder:text-ice/30 focus-visible:ring-cobalt/50 focus-visible:shadow-[0_0_0_4px_hsl(220_100%_60%/0.12),0_8px_24px_-8px_hsl(220_100%_50%/0.45)] transition-shadow"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service" className="text-xs text-ice/60 font-normal">
                Service interested in <span className="text-cobalt-bright">*</span>
              </Label>
              <Select
                value={form.service}
                onValueChange={(v) => {
                  setForm({ ...form, service: v });
                  setIsActive(true);
                }}
                required
              >
                <SelectTrigger
                  id="service"
                  onFocus={() => setIsActive(true)}
                  className="bg-ice/[0.03] border-ice/10 rounded-xl h-11 text-ice data-[placeholder]:text-ice/30 focus:ring-cobalt/50 focus:shadow-[0_0_0_4px_hsl(220_100%_60%/0.12),0_8px_24px_-8px_hsl(220_100%_50%/0.45)] transition-shadow"
                >
                  <SelectValue placeholder="Choose a product" />
                </SelectTrigger>
                <SelectContent className="bg-ink border-ice/10 text-ice">
                  <SelectItem value="prime">PRIME — AI Agents</SelectItem>
                  <SelectItem value="vector">VECTOR — Automation</SelectItem>
                  <SelectItem value="echo">ECHO — Voice Bots</SelectItem>
                  <SelectItem value="nexus">NEXUS — Dashboards</SelectItem>
                  <SelectItem value="not-sure">Not sure yet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="heardFrom" className="text-xs text-ice/60 font-normal">
                Where did you hear about us? <span className="text-cobalt-bright">*</span>
              </Label>
              <Select
                value={form.heardFrom}
                onValueChange={(v) => {
                  setForm({ ...form, heardFrom: v });
                  setIsActive(true);
                }}
                required
              >
                <SelectTrigger
                  id="heardFrom"
                  onFocus={() => setIsActive(true)}
                  className="bg-ice/[0.03] border-ice/10 rounded-xl h-11 text-ice data-[placeholder]:text-ice/30 focus:ring-cobalt/50 focus:shadow-[0_0_0_4px_hsl(220_100%_60%/0.12),0_8px_24px_-8px_hsl(220_100%_50%/0.45)] transition-shadow"
                >
                  <SelectValue placeholder="Select a source" />
                </SelectTrigger>
                <SelectContent className="bg-ink border-ice/10 text-ice">
                  <SelectItem value="referral">Referral from a client or partner</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="x">X (Twitter)</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="search">Google / Search</SelectItem>
                  <SelectItem value="event">Event or conference</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal" className="text-xs text-ice/60 font-normal">What do you want to automate?</Label>
              <Textarea
                id="goal"
                value={form.goal}
                onChange={(e) => setForm({ ...form, goal: e.target.value })}
                placeholder="Tell us about your business and biggest bottleneck..."
                rows={4}
                className="bg-ice/[0.03] border-ice/10 rounded-xl resize-none text-ice placeholder:text-ice/30 focus-visible:ring-cobalt/50 focus-visible:shadow-[0_0_0_4px_hsl(220_100%_60%/0.12),0_8px_24px_-8px_hsl(220_100%_50%/0.45)] transition-shadow"
              />
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full">
              Book Consultation <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="text-[11px] text-ice/40 text-center font-mono uppercase tracking-wider">
              Your scheduler will load right here — no redirects.
            </p>
          </motion.form>
        </div>

        {booked && (
          <motion.div
            id="cal-embed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-[11px] text-cobalt-bright tracking-widest uppercase">
                SCHEDULE.CONSULTATION
              </p>
              <button
                type="button"
                onClick={() => setBooked(false)}
                className="text-[11px] text-ice/50 hover:text-ice font-mono uppercase tracking-wider transition-colors"
              >
                Close
              </button>
            </div>
            <div className="relative glass rounded-3xl overflow-hidden border border-ice/10 shadow-cobalt p-2">
              <div
                id="my-cal-inline-consultation"
                style={{ width: "100%", height: "720px", overflow: "auto" }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CTASection;
