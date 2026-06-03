import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { preloadHeroVideo } from "@/lib/heroVideo";

// Kick off hero video fetch before React mounts so playback starts the instant the section paints.
preloadHeroVideo();

createRoot(document.getElementById("root")!).render(<App />);
