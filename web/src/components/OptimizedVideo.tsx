"use client";

import { useState, useRef, useEffect } from "react";

interface OptimizedVideoProps {
  src: string;
  alt: string;
  caption?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
  className?: string;
}

export function OptimizedVideo({
  src,
  alt,
  caption,
  size = "md",
  priority = false,
  className = "",
}: OptimizedVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showVideo, setShowVideo] = useState(priority);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [aspect, setAspect] = useState<string | undefined>(undefined);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Size configuration
  const sizeConfig = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-7xl",
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setShowVideo(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowVideo(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [priority]);

  // Handle video events
  const handleVideoCanPlay = () => {
    console.log("Video can start playing");
    setIsVideoReady(true);
  };

  const handleVideoError = (e: unknown) => {
    console.error("Video error:", e);
    setHasError(true);
  };

  const handleVideoPlay = () => {
    console.log("Video started playing");
    setIsPlaying(true);
  };

  const handleVideoLoadedData = () => {
    console.log("Video data loaded");
    setIsVideoReady(true);
  };

  // Try to start playback as soon as possible
  useEffect(() => {
    if (!showVideo) return;
    const video = videoRef.current;
    if (!video) return;
    const p = video.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        // Autoplay can be blocked on some platforms; ignore
      });
    }
  }, [showVideo, isVideoReady]);

  return (
    <figure ref={containerRef} className={`w-full ${sizeConfig[size]} mx-auto ${className}`}>
      <div className="relative min-h-[200px] overflow-hidden rounded-xl shadow-lg">
        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
            <div className="p-6 text-center">
              <p className="mb-2 text-slate-600 dark:text-slate-400">Video failed to load</p>
              <p className="text-xs text-slate-500">{alt}</p>
            </div>
          </div>
        )}

        {/* No thumbnail/play icon: we show video element immediately */}

        {/* Video element (hidden until playing) */}
        {showVideo && !hasError && (
          <video
            ref={videoRef}
            className={`h-auto w-full transition-opacity duration-300 ${
              isPlaying || isVideoReady ? "opacity-100" : "opacity-0"
            }`}
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={handleVideoCanPlay}
            onLoadedData={handleVideoLoadedData}
            onLoadedMetadata={() => {
              console.log("Video metadata loaded");
              setIsVideoReady(true);
              if (videoRef.current) {
                const vw = videoRef.current.videoWidth || 0;
                const vh = videoRef.current.videoHeight || 0;
                if (vw > 0 && vh > 0) {
                  setAspect(`${vw} / ${vh}`);
                }
              }
            }}
            onPlay={handleVideoPlay}
            onError={handleVideoError}
            style={{
              aspectRatio: aspect,
              backgroundColor: "var(--muted)",
              objectFit: "contain",
              display: "block",
            }}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support video playback.
          </video>
        )}

        {/* Placeholder when video not loaded */}
        {!showVideo && (
          <div
            className="flex w-full items-center justify-center bg-slate-200 dark:bg-slate-700"
            style={{ aspectRatio: aspect }}
          >
            <div className="p-6 text-center text-slate-500 dark:text-slate-400">
              <p className="text-sm">Video will load when visible</p>
            </div>
          </div>
        )}
      </div>

      {/* Caption */}
      {caption && !isPlaying && (
        <figcaption className="mt-4 text-center text-sm text-slate-600 italic dark:text-slate-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
