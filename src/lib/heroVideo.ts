/**
 * Persistent hero video element.
 *
 * The video is created once (lazily) and reused across route navigations so the
 * Hero section never has to re-fetch or re-decode the file. When the Hero
 * unmounts we detach the node from the DOM but keep it alive in module scope,
 * so re-mounting the Hero just re-attaches the same already-buffered element.
 */
let videoEl: HTMLVideoElement | null = null;
let loopGuardFrame = 0;

const HERO_LOOP_IN_POINT = 0.12;
const HERO_LOOP_OUT_PADDING = 0.18;

const attemptPlay = (video: HTMLVideoElement) => {
  const playPromise = video.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {});
  }
};

const stopLoopGuard = () => {
  if (loopGuardFrame) {
    cancelAnimationFrame(loopGuardFrame);
    loopGuardFrame = 0;
  }
};

const startLoopGuard = (video: HTMLVideoElement) => {
  stopLoopGuard();
  const tick = () => {
    if (video.duration && video.currentTime >= video.duration - HERO_LOOP_OUT_PADDING) {
      try {
        video.currentTime = HERO_LOOP_IN_POINT;
      } catch {}
    }
    loopGuardFrame = requestAnimationFrame(tick);
  };
  loopGuardFrame = requestAnimationFrame(tick);
};

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
    v.style.opacity = "0";
    v.style.transition = "opacity 360ms var(--ease-elite)";
    v.addEventListener("loadedmetadata", () => {
      if (v.currentTime <= 0.01) {
        try {
          v.currentTime = HERO_LOOP_IN_POINT;
        } catch {}
      }
      attemptPlay(v);
    });
    v.addEventListener("canplay", () => {
      attemptPlay(v);
    });
    v.addEventListener("play", () => {
      startLoopGuard(v);
    });
    v.addEventListener("pause", stopLoopGuard);
    v.addEventListener("ended", () => {
      try {
        v.currentTime = HERO_LOOP_IN_POINT;
      } catch {}
      attemptPlay(v);
    });
    // Kick off the fetch immediately so it can buffer before Hero mounts.
    v.load();
    attemptPlay(v);
    videoEl = v;
  }
  return videoEl;
};

/** Begin loading the hero video early (call once at app boot). */
export const preloadHeroVideo = () => {
  getHeroVideo();
};
