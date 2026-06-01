import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const STORAGE_FORM_SUBMITTED = "swais_consultation_submitted";
const STORAGE_SUBSCRIBED = "swais_newsletter_subscribed";
const STORAGE_DISMISSED = "swais_newsletter_dismissed";

const NewsletterPopup = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const tryOpen = () => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_SUBSCRIBED)) return;
    if (localStorage.getItem(STORAGE_DISMISSED)) return; // dismissed = never show again
    setOpen(true);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // If the consultation form was submitted in a previous visit, surface the popup
    // shortly after this page loads (one-time per visitor).
    if (
      localStorage.getItem(STORAGE_FORM_SUBMITTED) === "true" &&
      !localStorage.getItem(STORAGE_SUBSCRIBED) &&
      !localStorage.getItem(STORAGE_DISMISSED)
    ) {
      const t = setTimeout(tryOpen, 1800);
      return () => clearTimeout(t);
    }
  }, []);

  // Listen for the consultation form submit event (fires immediately when user submits)
  useEffect(() => {
    const onSubmitted = () => {
      // small delay so the toast lands first, then the popup slides in
      setTimeout(tryOpen, 1200);
    };
    window.addEventListener("swais:consultation-submitted", onSubmitted);
    return () => window.removeEventListener("swais:consultation-submitted", onSubmitted);
  }, []);

  const close = () => {
    setOpen(false);
    // Permanent dismissal — the popup will never appear again for this visitor.
    localStorage.setItem(STORAGE_DISMISSED, "true");
  };

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setTimeout(() => {
      localStorage.setItem(STORAGE_SUBSCRIBED, "true");
      setSubmitting(false);
      setOpen(false);
      toast({
        title: "You're in.",
        description: "Monthly playbooks and product drops, no spam.",
      });
    }, 600);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: 420, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 420, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)]"
          role="dialog"
          aria-label="Subscribe to SWAIS newsletter"
        >
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[hsl(220_90%_22%)] via-[hsl(222_85%_15%)] to-[hsl(224_90%_10%)] border border-cobalt-bright/30 shadow-cobalt p-6">
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cobalt-bright/60 to-transparent" />

            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-3.5 left-3.5 h-7 w-7 rounded-full bg-ice/5 hover:bg-ice/10 flex items-center justify-center text-ice/60 hover:text-ice transition-colors z-10"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <div className="flex items-center gap-3 mb-5 pl-10">
              <div
                aria-hidden
                className="h-11 w-11 rounded-2xl glass-cobalt flex items-center justify-center"
              >
                <Mail className="h-4 w-4 text-cobalt-bright" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] text-cobalt-bright uppercase">
                  SWAIS Insider
                </p>
                <h3 className="font-display text-base font-medium text-ice leading-tight">
                  Stay ahead of the curve.
                </h3>
              </div>
            </div>

            <p className="text-ice/65 text-[13px] leading-relaxed mb-5">
              Monthly AI automation playbooks, case studies and product drops. Unsubscribe anytime.
            </p>

            <form onSubmit={subscribe} className="space-y-3">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="Email address"
                className="bg-ice/[0.05] border-ice/10 rounded-xl h-11 text-ice placeholder:text-ice/30 focus-visible:ring-cobalt/50"
              />
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>

            <p className="text-[10px] text-ice/40 text-center mt-4 font-mono uppercase tracking-wider">
              One email a month. Opt out anytime.
            </p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;
