import { useEffect } from "react";
import { Link } from "react-router-dom";

import { ArrowLeft, ArrowRight, MapPin, Clock, Sparkles, Mail, Copy } from "lucide-react";
import Navbar from "@/components/swais/Navbar";
import Footer from "@/components/swais/Footer";
import BrandBackdrop from "@/components/swais/BrandBackdrop";
import WhatsAppButton from "@/components/swais/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { copyEmailHandler } from "@/lib/copyEmail";

type Role = {
  title: string;
  team: string;
  location: string;
  type: string;
  blurb: string;
};

const roles: Role[] = [];

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

          <div className="max-w-3xl">
            <p className="text-cobalt-bright text-[11px] tracking-[0.3em] uppercase font-mono mb-5">
              Careers at SWAIS
            </p>
            <h1 className="text-4xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-balance">
              <span className="text-gradient">Engineer the systems</span>{" "}
              <span className="serif text-cobalt-bright font-normal">businesses</span>{" "}
              <span className="text-gradient">will run on next.</span>
            </h1>
            <p className="text-ice/65 mt-7 text-[15.5px] leading-relaxed max-w-xl">
              We're a small studio of engineers, designers and operators building the AI
              infrastructure layer for real businesses. If you want to ship things people
              actually use, and own the result end to end, we'd like to meet.
            </p>
          </div>

          {/* Why SWAIS */}
          <div className="mt-16 grid md:grid-cols-3 gap-4">
            {[
              {
                icon: Sparkles,
                title: "Build the real thing",
                body: "No demos that never ship. Every project goes to production and gets monitored.",
              },
              {
                icon: MapPin,
                title: "Remote, on purpose",
                body: "Async-first, async-default. We optimise for deep work, not calendar tetris.",
              },
              {
                icon: Clock,
                title: "Own a surface",
                body: "Pick a product. Pick a customer outcome. Own it end to end, design, ship, support.",
              },
            ].map((b) => (
              <div key={b.title} className="glass rounded-2xl p-6">
                <span className="h-9 w-9 rounded-lg glass-cobalt flex items-center justify-center mb-4">
                  <b.icon className="h-4 w-4 text-cobalt-bright" strokeWidth={1.5} />
                </span>
                <h3 className="font-display text-base font-medium text-ice tracking-tight">
                  {b.title}
                </h3>
                <p className="text-ice/55 text-[13.5px] leading-relaxed mt-2">{b.body}</p>
              </div>
            ))}
          </div>

          {/* Open roles */}
          <div className="mt-20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-ice/40 mb-2">
                  Open Roles
                </p>
                <h2 className="text-2xl md:text-3xl font-display font-medium tracking-tight text-ice">
                  Who we're hiring right now.
                </h2>
              </div>
              <span className="hidden md:inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-ice/60">
                <span className="h-1.5 w-1.5 rounded-full bg-ice/40" />
                None open
              </span>
            </div>

            <div className="rounded-3xl border border-ice/[0.06] bg-ink/40 p-10 md:p-14 text-center">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-cobalt-bright mb-4">
                No open positions
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-medium text-ice tracking-tight max-w-xl mx-auto">
                We're not actively hiring right now.
              </h3>
              <p className="text-ice/60 text-[14.5px] leading-relaxed mt-4 max-w-lg mx-auto">
                The team is heads-down shipping for clients. Check back soon, or drop us a
                note below if you think you'd be impossible to ignore.
              </p>
            </div>

            <div className="mt-14 glass rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
              <div className="max-w-xl">
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-cobalt-bright mb-2">
                  Don't see your role?
                </p>
                <h3 className="font-display text-xl md:text-2xl font-medium text-ice tracking-tight">
                  Write to us anyway.
                </h3>
                <p className="text-ice/60 text-[14.5px] leading-relaxed mt-3">
                  If you're exceptional at something we'll one day need, that's a good enough
                  reason to start a conversation. Send a short note and a link to something
                  you've shipped.
                </p>
              </div>
              <Button variant="cobalt" size="lg" asChild>
                <a href="mailto:team@swais.net?subject=Open%20application%20%E2%80%94%20SWAIS&body=Hi%20SWAIS%20team%2C%0A%0AI%27m%20reaching%20out%20about%20joining%20the%20team.%20A%20bit%20about%20me%3A%0A%0A-%20%0A%0AHere%27s%20something%20I%27ve%20shipped%3A%0A%0A-%20%0A%0AThanks%2C%0A">
                  Email the team <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <a
                href="mailto:team@swais.net"
                className="text-[11px] font-mono uppercase tracking-[0.2em] text-ice/50 hover:text-cobalt-bright transition-colors -mt-2"
              >
                or copy → team@swais.net
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Careers;
