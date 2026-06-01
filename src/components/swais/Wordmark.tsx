import { cn } from "@/lib/utils";

/**
 * SWAIS wordmark — typographic logo only.
 * Per brand decision, the bitmap logo is kept for OG/social use only and is
 * never rendered inside the website itself.
 */
type Props = {
  className?: string;
  label?: string;
  /** Deprecated — wordmark is always text-only now. Kept for prop compat. */
  textOnly?: boolean;
};

const Wordmark = ({ className, label = "SWAIS" }: Props) => {
  return (
    <span
      role="img"
      aria-label={label}
      className={cn(
        "inline-flex items-center select-none font-display font-extrabold text-ice leading-none",
        "tracking-[-0.02em] text-[22px]",
        className,
      )}
      style={{ letterSpacing: "-0.02em" }}
    >
      <span>SWAIS</span>
    </span>
  );
};

export default Wordmark;
