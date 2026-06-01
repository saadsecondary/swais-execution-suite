import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/swais/Navbar";
import Footer from "@/components/swais/Footer";
import BrandBackdrop from "@/components/swais/BrandBackdrop";
import WhatsAppButton from "@/components/swais/WhatsAppButton";
import ProductExplorer from "@/components/swais/ProductExplorer";

const Products = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <BrandBackdrop />
      <Navbar />

      <section className="relative z-10 pt-32 md:pt-40 pb-4">
        <div className="container-x">
          <div className="max-w-3xl">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase font-mono text-ice/50 hover:text-cobalt-bright transition-colors mb-8"
            >
              <ArrowLeft className="h-3 w-3" /> Back to home
            </Link>
            <p className="text-cobalt-bright text-[11px] tracking-[0.3em] uppercase font-mono mb-5">
              The Full Stack
            </p>
            <h1 className="text-4xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-balance">
              <span className="text-gradient">Six products.</span>{" "}
              <span className="serif text-cobalt-bright font-normal">One</span>{" "}
              <span className="text-gradient">intelligence layer.</span>
            </h1>
            <p className="text-ice/55 mt-6 text-[15px] max-w-xl leading-relaxed">
              Pick a system to see what it does, who it's for, and what's included at each access tier.
              Pricing is set after the discovery consultation, once we know the shape of your operation.
            </p>
          </div>
        </div>
      </section>

      <ProductExplorer variant="page" />

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Products;
