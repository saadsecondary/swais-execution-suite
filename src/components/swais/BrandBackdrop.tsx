/**
 * Ambient brand backdrop — fully static, GPU-light.
 * No blur, no motion, no rAF loops. Pure painted gradients that the browser
 * can cache as a single layer, so scroll and overlapping animations stay smooth.
 */
const BrandBackdrop = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,hsl(220_95%_22%/0.55),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_110%,hsl(220_95%_18%/0.55),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,hsl(220_100%_45%/0.22),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_55%,hsl(218_100%_55%/0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_85%,hsl(222_90%_35%/0.2),transparent_55%)]" />

      {/* Soft vignette so foreground text stays legible */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,transparent_0%,hsl(224_80%_5%/0.45)_100%)]" />

      {/* Faint grain */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 200%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.6%22/></svg>')]" />
    </div>
  );
};

export default BrandBackdrop;
