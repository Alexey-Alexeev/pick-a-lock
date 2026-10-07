"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const POSTER_SRC = "/videos/hero-padlock-poster.webp";
const VIDEO_SRC = "/videos/hero-padlock.mp4";

/**
 * Autoplaying hero video of a padlock opening. Intentionally has no `loop`: the
 * browser's native end-of-playback behavior already holds the final (open) frame,
 * and onEnded re-pins currentTime to duration as a safety net for the iOS Safari
 * quirk where the element can otherwise flash back to the poster frame.
 */
export function HeroPadlockVideo({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Markup never branches on this value (only the imperative .play() call below does),
  // so computing it eagerly here carries no hydration-mismatch risk.
  const [allowMotion, setAllowMotion] = useState(() =>
    typeof window === "undefined" ? true : !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => setAllowMotion(!e.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !allowMotion) return;

    function attemptPlay() {
      video!.play().catch(() => {
        // Chrome can abort video-only autoplay while the tab is backgrounded/unfocused
        // ("video-only background media was paused to save power"); retry once it's visible.
      });
    }

    attemptPlay();

    function handleVisibilityChange() {
      if (document.visibilityState === "visible" && video!.paused && video!.currentTime === 0) {
        attemptPlay();
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [allowMotion]);

  return (
    <video
      ref={videoRef}
      className={cn("h-full w-full object-cover", className)}
      style={{ objectPosition: "72% 38%" }}
      muted
      playsInline
      preload="metadata"
      poster={POSTER_SRC}
      aria-hidden="true"
      onEnded={(e) => {
        const video = e.currentTarget;
        video.pause();
        video.currentTime = video.duration;
      }}
    >
      <source src={VIDEO_SRC} type="video/mp4" />
    </video>
  );
}
