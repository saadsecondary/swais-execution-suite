"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useSpring, useTransform, type SpringOptions } from "framer-motion";
import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
};

/**
 * Mouse-following spotlight. Drops into any relatively-positioned parent.
 * Uses cobalt brand tokens — no foreign palette.
 */
export function Spotlight({
  className,
  size = 360,
  springOptions = { bounce: 0, stiffness: 120, damping: 22 },
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentEl, setParentEl] = useState<HTMLElement | null>(null);

  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  const left = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const top = useTransform(mouseY, (y) => `${y - size / 2}px`);

  useEffect(() => {
    if (!containerRef.current) return;
    const parent = containerRef.current.parentElement;
    if (!parent) return;
    const cs = getComputedStyle(parent);
    if (cs.position === "static") parent.style.position = "relative";
    parent.style.overflow = "hidden";
    setParentEl(parent);
  }, []);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      if (!parentEl) return;
      const r = parentEl.getBoundingClientRect();
      mouseX.set(e.clientX - r.left);
      mouseY.set(e.clientY - r.top);
    },
    [mouseX, mouseY, parentEl]
  );

  useEffect(() => {
    if (!parentEl) return;
    const enter = () => setIsHovered(true);
    const leave = () => setIsHovered(false);
    parentEl.addEventListener("mousemove", handleMove);
    parentEl.addEventListener("mouseenter", enter);
    parentEl.addEventListener("mouseleave", leave);
    return () => {
      parentEl.removeEventListener("mousemove", handleMove);
      parentEl.removeEventListener("mouseenter", enter);
      parentEl.removeEventListener("mouseleave", leave);
    };
  }, [parentEl, handleMove]);

  return (
    <motion.div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-0 rounded-full blur-3xl transition-opacity duration-500",
        "bg-[radial-gradient(circle_at_center,hsl(var(--cobalt-bright)/0.35),hsl(var(--cobalt)/0.18)_40%,transparent_70%)]",
        isHovered ? "opacity-100" : "opacity-0",
        className
      )}
      style={{ width: size, height: size, left, top }}
    />
  );
}
