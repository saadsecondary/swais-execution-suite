import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { preloadHeroVideo } from "@/lib/heroVideo";
import loaderBg from "@/assets/loader-bg.png";

const preloadHeroLoader = () => {
  if (typeof document === "undefined") return;
  const existing = document.head.querySelector('link[data-swais-hero-loader="true"]');
  if (!existing) {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = loaderBg;
    link.setAttribute("fetchpriority", "high");
    link.setAttribute("data-swais-hero-loader", "true");
    document.head.appendChild(link);
  }
  const img = new Image();
  img.decoding = "async";
  img.src = loaderBg;
};

preloadHeroLoader();
preloadHeroVideo();

createRoot(document.getElementById("root")!).render(<App />);
