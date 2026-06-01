import { useEffect } from "react";
import Navbar from "@/components/swais/Navbar";
import Hero from "@/components/swais/Hero";
import LogoCloud from "@/components/swais/LogoCloud";
import ProductExplorer from "@/components/swais/ProductExplorer";
import ResultsStrip from "@/components/swais/ResultsStrip";
import HowItWorks from "@/components/swais/HowItWorks";
import ContactSplit from "@/components/swais/ContactSplit";
import FAQ from "@/components/swais/FAQ";
import Footer from "@/components/swais/Footer";
import WhatsAppButton from "@/components/swais/WhatsAppButton";
import BrandBackdrop from "@/components/swais/BrandBackdrop";
import { installSmoothScroll } from "@/lib/smooth-scroll";

const Index = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      window.scrollTo(0, 0);
    }
    const cleanup = installSmoothScroll();
    return cleanup;
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <BrandBackdrop />
      <Navbar />
      <div
        className="relative z-10"
        style={{ paddingTop: "var(--swais-banner-height, 0px)" }}
      >
        <Hero />
        <LogoCloud />
        <ProductExplorer variant="section" />
        <ResultsStrip />
        <HowItWorks />
        <ContactSplit />
        <FAQ />
        <Footer />
      </div>
      <WhatsAppButton />
    </main>
  );
};

export default Index;
