import { Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import Wordmark from "@/components/swais/Wordmark";

const socials = [
  { Icon: Twitter, label: "SWAIS on X" },
  { Icon: Linkedin, label: "SWAIS on LinkedIn" },
  { Icon: Instagram, label: "SWAIS on Instagram" },
];

const Footer = () => {
  return (
    <footer className="border-t border-ice/5 pt-20 pb-10 relative">
      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center mb-6" aria-label="SWAIS, home">
              <Wordmark className="text-[34px]" />
            </Link>
            <p className="text-ice/55 max-w-sm leading-relaxed text-[15px]">
              Engineering the AI-powered businesses of tomorrow.
            </p>
            <div className="flex items-center gap-2 mt-8">
              {socials.map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  title="Coming soon"
                  onClick={(e) => e.preventDefault()}
                  className="h-9 w-9 rounded-full border border-ice/10 flex items-center justify-center text-ice/50 hover:border-cobalt/40 hover:text-cobalt-bright transition-colors cursor-pointer"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-ice/40 mb-5">
              Systems
            </h4>
            <ul className="space-y-3 text-sm text-ice/65">
              <li>
                <Link to="/products" className="hover:text-ice transition-colors">
                  All products →
                </Link>
              </li>
              <li><Link to="/products" className="hover:text-ice transition-colors">PRIME</Link></li>
              <li><Link to="/products" className="hover:text-ice transition-colors">VECTOR</Link></li>
              <li><Link to="/products" className="hover:text-ice transition-colors">ECHO</Link></li>
              <li><Link to="/products" className="hover:text-ice transition-colors">NEXUS</Link></li>
              <li><Link to="/products" className="hover:text-ice transition-colors">FORGE</Link></li>
              <li><Link to="/products" className="hover:text-ice transition-colors">CRAFT</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-ice/40 mb-5">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-ice/65">
              <li><Link to="/about" className="hover:text-ice transition-colors">About</Link></li>
              <li><Link to="/careers" className="hover:text-ice transition-colors">Careers</Link></li>
              <li><Link to="/#process" className="hover:text-ice transition-colors">Process</Link></li>
              <li><Link to="/#contact" className="hover:text-ice transition-colors">Contact</Link></li>
              <li><Link to="/#faq" className="hover:text-ice transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-ice/40 mb-5">
              Connect
            </h4>
            <ul className="space-y-3 text-sm text-ice/65">
              <li>
                <a href="mailto:team@swais.net" className="hover:text-ice transition-colors">
                  team@swais.net
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/15035088066"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ice transition-colors"
                >
                  +1 503 508 8066
                </a>
              </li>
              <li>
                <a
                  href="https://cal.com/swais"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cobalt-bright hover:text-ice transition-colors"
                >
                  cal.com/swais →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-ice/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ice/40 font-mono uppercase tracking-wider">
          <p>© 2026 SWAIS. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href="mailto:team@swais.net?subject=Privacy%20policy%20request"
              className="hover:text-ice transition-colors"
            >
              Privacy
            </a>
            <a
              href="mailto:team@swais.net?subject=Terms%20of%20service%20request"
              className="hover:text-ice transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
