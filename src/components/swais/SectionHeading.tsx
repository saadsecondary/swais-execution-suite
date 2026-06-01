import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  children: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Shared editorial heading.
 * Renders an eyebrow, a large display headline (children) and optional description,
 * with consistent reveal motion across every section.
 */
const SectionHeading = ({
  eyebrow,
  children,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) => {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-3xl ${alignClass} ${className}`}
    >
      <p className="text-cobalt-bright text-[11px] tracking-[0.32em] uppercase font-mono mb-6">
        {eyebrow}
      </p>
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.035em] leading-[1.02] text-balance">
        {children}
      </h2>
      {description && (
        <p className="text-ice/55 mt-7 text-[15px] md:text-base max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
