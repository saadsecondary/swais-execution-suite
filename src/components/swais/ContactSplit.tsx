import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
import { ArrowRight, Mail, MessageCircle, Check, CalendarClock } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { toast } from "@/hooks/use-toast";

const CAL_URL = "https://cal.com/swais";
const WHATSAPP_NUMBER = "+1 503 508 8066";
const WHATSAPP_LINK =
  "https://wa.me/15035088066?text=Hi%20SWAIS%2C%20I%27d%20like%20to%20automate%20my%20business.";
const EMAIL = "team@swais.net";
const WEBHOOK_URL =
  "https://cloud.activepieces.com/api/v1/webhooks/ZGJf6QNfDgG5Ac3VVrLxd";
const STORAGE_FORM_SUBMITTED = "swais_consultation_submitted";

const services = [
  { value: "prime", label: "PRIME · AI Agents" },
  { value: "vector", label: "VECTOR · Automation Systems" },
  { value: "echo", label: "ECHO · AI Voice & Calling Agents" },
  { value: "nexus", label: "NEXUS · AI Dashboard" },
  { value: "forge", label: "FORGE · Website Development" },
  { value: "craft", label: "CRAFT · App Development" },
  { value: "unsure", label: "Not sure yet" },
];

const sources = [
  { value: "google", label: "Google Search" },
  { value: "social", label: "Social Media" },
  { value: "referral", label: "Referral" },
  { value: "outreach", label: "Cold Outreach" },
  { value: "other", label: "Other" },
];

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  source: string;
  goal: string;
};

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  address: "",
  service: "",
  source: "",
  goal: "",
};

const ContactSplit = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_FORM_SUBMITTED) === "true") {
      setSubmitted(true);
    }
  }, []);

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const serviceLabel =
      services.find((s) => s.value === form.service)?.label || form.service;
    const sourceLabel =
      sources.find((s) => s.value === form.source)?.label || form.source;
    const payload = {
      ...form,
      serviceLabel,
      sourceLabel,
      submittedAt: new Date().toISOString(),
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    };
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("Consultation webhook failed", err);
      toast({
        title: "Could not send your message",
        description:
          "Please try again, or reach us on WhatsApp / email while we look into it.",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }
    try {
      localStorage.setItem(STORAGE_FORM_SUBMITTED, "true");
      window.dispatchEvent(new CustomEvent("swais:consultation-submitted"));
    } catch {}
    toast({
      title: "Message received.",
      description:
        "We'll reach out via email or WhatsApp shortly. Pick a time below if you'd like.",
    });
    setSubmitted(true);
    setSubmitting(false);
    setForm(initialState);
    window.open(CAL_URL, "_blank", "noopener,noreferrer");
  };

  const inputCls =
    "bg-ice/[0.03] border-ice/10 rounded-xl h-11 text-ice placeholder:text-ice/30 focus-visible:ring-cobalt/50 focus-visible:shadow-[0_0_0_4px_hsl(220_100%_60%/0.12)] transition-shadow";

  return (
    <section id="contact" className="py-28 md:py-36 relative overflow-hidden">
      <div className="glow-orb h-[700px] w-[700px] bg-cobalt/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />
      <Spotlight size={520} />

      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 max-w-6xl mx-auto items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <p className="text-cobalt-bright text-[11px] tracking-[0.32em] uppercase font-mono mb-6">
              05 / Get in touch
            </p>
            <h2 className="text-5xl md:text-6xl font-medium tracking-[-0.035em] leading-[1.02] text-balance">
              <span className="text-gradient">Tell us your goal.</span>{" "}
              <span className="serif text-cobalt-bright font-normal">We'll engineer</span>{" "}
              <span className="text-gradient">the system.</span>
            </h2>
            <p className="text-ice/55 mt-7 text-[15px] leading-relaxed max-w-md">
              Fill the form, drop us a message on WhatsApp, or send an email. We review every
              request personally and respond within two business days.
            </p>

            <div className="mt-6 inline-flex items-center gap-2.5 glass rounded-full px-3.5 py-1.5 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cobalt-bright opacity-70 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cobalt-bright shadow-[0_0_10px_hsl(var(--cobalt-bright))]" />
              </span>
              <span className="text-ice/75">
                Consultations booked directly with the SWAIS team.
              </span>
            </div>




            <div className="mt-12 grid sm:grid-cols-2 gap-5">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="h-12 w-12 rounded-2xl glass flex items-center justify-center mb-5 group-hover:border-cobalt-bright/40 transition-colors duration-500">
                  <MessageCircle className="h-4.5 w-4.5 text-ice" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-medium text-ice tracking-tight">
                  WhatsApp
                </h3>
                <p className="text-ice/55 text-[13px] leading-relaxed mt-2">
                  Drop us a message anytime. We reply fast.
                </p>
                <p className="mt-3 text-ice/85 text-sm font-medium group-hover:text-cobalt-bright transition-colors">
                  {WHATSAPP_NUMBER}
                </p>
              </a>

              <a href={`mailto:${EMAIL}`} className="group block">
                <div className="h-12 w-12 rounded-2xl glass flex items-center justify-center mb-5 group-hover:border-cobalt-bright/40 transition-colors duration-500">
                  <Mail className="h-4.5 w-4.5 text-ice" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-medium text-ice tracking-tight">Email</h3>
                <p className="text-ice/55 text-[13px] leading-relaxed mt-2">
                  We reply within two business days.
                </p>
                <p className="mt-3 text-ice/85 text-sm font-medium group-hover:text-cobalt-bright transition-colors">
                  {EMAIL}
                </p>
              </a>

              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group block sm:col-span-2"
              >
                <div className="h-12 w-12 rounded-2xl glass flex items-center justify-center mb-5 group-hover:border-cobalt-bright/40 transition-colors duration-500">
                  <CalendarClock className="h-4.5 w-4.5 text-ice" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-medium text-ice tracking-tight">
                  Direct booking
                </h3>
                <p className="text-ice/55 text-[13px] leading-relaxed mt-2">
                  Skip the form and pick a time on the calendar.
                </p>
                <p className="mt-3 text-ice/85 text-sm font-medium group-hover:text-cobalt-bright transition-colors">
                  cal.com/swais
                </p>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative glass rounded-3xl p-7 md:p-9"
          >
            {!submitted ? (
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-cobalt-bright tracking-[0.25em] uppercase">
                    Request consultation
                  </span>
                  <span className="font-mono text-[10px] text-ice/35 tracking-[0.2em] uppercase">
                    30 min
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs text-ice/60 font-normal">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Smith"
                      className={inputCls}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-xs text-ice/60 font-normal">
                      Company / Business Name
                    </Label>
                    <Input
                      id="company"
                      required
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Acme Inc."
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs text-ice/60 font-normal">
                      Work Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@acme.com"
                      className={inputCls}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs text-ice/60 font-normal">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+1 555 000 0000"
                      className={inputCls}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-xs text-ice/60 font-normal">
                    Address{" "}
                    <span className="text-ice/30 font-mono text-[10px] uppercase tracking-wider ml-1">
                      Optional
                    </span>
                  </Label>
                  <Input
                    id="address"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Street, city, state, postal code, country"
                    autoComplete="street-address"
                    className={inputCls}
                  />
                </div>


                <div className="space-y-2">
                  <Label className="text-xs text-ice/60 font-normal">Service</Label>
                  <Select
                    value={form.service}
                    onValueChange={(v) => setForm({ ...form, service: v })}
                  >
                    <SelectTrigger className={inputCls}>
                      <SelectValue placeholder="Select a system" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-ice/60 font-normal">
                    Where did you hear about us
                  </Label>
                  <Select
                    value={form.source}
                    onValueChange={(v) => setForm({ ...form, source: v })}
                  >
                    <SelectTrigger className={inputCls}>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {sources.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal" className="text-xs text-ice/60 font-normal">
                    Tell us about your goal
                  </Label>
                  <Textarea
                    id="goal"
                    required
                    value={form.goal}
                    onChange={(e) => setForm({ ...form, goal: e.target.value })}
                    placeholder="What outcome do you want? More booked calls, less manual work, faster content..."
                    rows={4}
                    className="bg-ice/[0.03] border-ice/10 rounded-xl resize-none text-ice placeholder:text-ice/30 focus-visible:ring-cobalt/50 focus-visible:shadow-[0_0_0_4px_hsl(220_100%_60%/0.12)] transition-shadow"
                  />
                </div>

                <Button type="submit" variant="cobalt" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? "Sending…" : "Send Message"} <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="text-[11px] text-ice/40 text-center font-mono uppercase tracking-wider">
                  We'll also open the calendar so you can pick a time.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center py-10"
              >
                <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-cobalt shadow-cobalt flex items-center justify-center mb-6">
                  <Check className="h-6 w-6 text-ice" strokeWidth={2.5} />
                </div>
                <p className="font-mono text-[11px] text-cobalt-bright tracking-[0.25em] uppercase mb-3">
                  Request received
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-medium text-ice tracking-tight">
                  We have your details.
                </h3>
                <p className="text-ice/60 text-[15px] leading-relaxed mt-4 max-w-sm mx-auto">
                  Pick a time that works for you and we'll be there. Need to talk sooner? Use
                  WhatsApp or email on the left.
                </p>
                <Button variant="cobalt" size="lg" asChild className="mt-7">
                  <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
                    <CalendarClock className="h-4 w-4" /> Open scheduling
                  </a>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSplit;
