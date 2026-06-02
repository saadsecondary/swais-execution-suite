import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import loaderBg from "@/assets/loader-bg.png";
import { getHeroVideo } from "@/lib/heroVideo";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Products from "./pages/Products.tsx";
import About from "./pages/About.tsx";
import Careers from "./pages/Careers.tsx";

const queryClient = new QueryClient();

const AppBootLoader = ({ progress, visible }: { progress: number; visible: boolean }) => (
  <div
    className={`fixed inset-0 z-[120] transition-opacity duration-500 ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}
    aria-hidden={!visible}
  >
    <img
      src={loaderBg}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
      loading="eager"
      decoding="async"
    />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--ink)/0.08),hsl(var(--ink)/0.18))]" />
    <div className="absolute inset-x-0 bottom-10 sm:bottom-14">
      <div className="mx-auto flex w-full max-w-lg px-6">
        <div className="w-full rounded-full border border-ice/15 bg-ink/40 p-1 shadow-[0_18px_50px_hsl(var(--ink)/0.45)] backdrop-blur-md">
          <div className="h-3 w-full overflow-hidden rounded-full bg-ice/10">
            <div
              className="relative h-full rounded-full bg-[linear-gradient(90deg,hsl(var(--azure)),hsl(var(--cobalt-bright))_45%,hsl(var(--primary-glow)))] shadow-[0_0_30px_hsl(var(--cobalt-bright)/0.85)] transition-[width] duration-200 ease-out"
              style={{ width: `${Math.max(progress, 12)}%` }}
            >
              <span className="absolute inset-y-0 right-0 w-12 rounded-full bg-ice/50 blur-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const App = () => {
  const shouldShowBootLoader = useMemo(() => {
    if (typeof window === "undefined") return true;
    return window.location.pathname === "/";
  }, []);
  const [bootVisible, setBootVisible] = useState(shouldShowBootLoader);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!shouldShowBootLoader) return;

    const startedAt = performance.now();
    const minVisibleMs = 1800;
    const video = getHeroVideo();
    let progressTimer = 0;
    let resolveTimer = 0;

    const clearTimers = () => {
      if (progressTimer) window.clearInterval(progressTimer);
      if (resolveTimer) window.clearTimeout(resolveTimer);
    };

    const kickPlayback = () => {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    };

    const updateBufferedProgress = () => {
      try {
        if (video.buffered.length && video.duration) {
          const end = video.buffered.end(video.buffered.length - 1);
          const percent = Math.round((end / video.duration) * 100);
          setProgress((current) => Math.max(current, Math.min(percent, 92)));
        }
      } catch {}
    };

    const finishBoot = () => {
      clearTimers();
      setProgress(100);
      const remaining = Math.max(0, minVisibleMs - (performance.now() - startedAt));
      resolveTimer = window.setTimeout(() => {
        setBootVisible(false);
      }, remaining);
    };

    progressTimer = window.setInterval(() => {
      setProgress((current) => Math.min(current + 1, 88));
    }, 45);

    const onCanPlay = () => {
      kickPlayback();
      finishBoot();
    };

    const onLoadedData = () => {
      kickPlayback();
      setProgress((current) => Math.max(current, 55));
    };

    updateBufferedProgress();
    kickPlayback();

    video.addEventListener("progress", updateBufferedProgress);
    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("canplay", onCanPlay);

    if (video.readyState >= 3) {
      onCanPlay();
    }

    return () => {
      clearTimers();
      video.removeEventListener("progress", updateBufferedProgress);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("canplay", onCanPlay);
    };
  }, [shouldShowBootLoader]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <AppBootLoader progress={progress} visible={bootVisible} />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
