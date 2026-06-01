/**
 * Global smooth-scroll handler for in-page anchor links.
 * Eases to the target with a brand cubic-bezier and offsets for the fixed navbar.
 */

const NAV_OFFSET = 72; // fixed navbar height
const DURATION = 900;

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

const animateScroll = (toY: number) => {
  const startY = window.scrollY;
  const distance = toY - startY;
  if (Math.abs(distance) < 2) return;
  const start = performance.now();
  const step = (now: number) => {
    const elapsed = now - start;
    const p = Math.min(1, elapsed / DURATION);
    window.scrollTo(0, startY + distance * easeOutQuart(p));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

export const installSmoothScroll = () => {
  if (typeof window === "undefined") return;

  // Disable native smooth so our easing wins
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";

  const onClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    const link = target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    let id: string | null = null;
    if (href.startsWith("#") && href.length > 1) {
      id = href.slice(1).split("?")[0];
    } else if (href.startsWith("/#") && window.location.pathname === "/") {
      id = href.slice(2).split("?")[0];
    }
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;

    e.preventDefault();
    const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    animateScroll(y);
    history.replaceState(null, "", `#${id}`);
  };

  document.addEventListener("click", onClick);
  return () => {
    document.removeEventListener("click", onClick);
    html.style.scrollBehavior = prev;
  };
};
