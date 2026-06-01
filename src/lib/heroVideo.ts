/**
 * Persistent hero video element.
 *
 * The video is created once (lazily) and reused across route navigations so the
 * Hero section never has to re-fetch or re-decode the file. When the Hero
 * unmounts we detach the node from the DOM but keep it alive in module scope,
 * so re-mounting the Hero just re-attaches the same already-buffered element.
 */
let videoEl: HTMLVideoElement | null = null;

export const getHeroVideo = (): HTMLVideoElement => {
  if (typeof document === "undefined") {
    // SSR fallback — not used in this app, but keeps types clean.
    return null as unknown as HTMLVideoElement;
  }
  if (!videoEl) {
    const v = document.createElement("video");
    v.src = "/hero-bg.mp4";
    v.autoplay = true;
    v.muted = true;
    v.defaultMuted = true;
    v.loop = true;
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("muted", "");
    v.preload = "auto";
    v.setAttribute("aria-hidden", "true");
    v.setAttribute("fetchpriority", "high");
    v.className =
      "absolute inset-0 w-full h-full object-cover pointer-events-none z-0";
    v.addEventListener("loadedmetadata", () => {
      try {
        v.currentTime = 0.3;
      } catch {}
    });
    v.addEventListener("timeupdate", () => {
      if (v.duration && v.currentTime >= v.duration - 0.35) {
        try {
          v.currentTime = 0.3;
        } catch {}
      }
    });
    // Kick off the fetch immediately so it can buffer before Hero mounts.
    v.load();
    videoEl = v;
  }
  return videoEl;
};

/** Begin loading the hero video early (call once at app boot). */
export const preloadHeroVideo = () => {
  getHeroVideo();
};
