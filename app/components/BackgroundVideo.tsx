"use client";

import { useEffect, useRef } from "react";

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    void video.play().catch(() => {});
  }, []);

  return (
    <div className="background-video" aria-hidden="true">
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="auto"
        poster="/video/ascii-background-poster.jpg"
      >
        <source
          src="/video/ascii-background-960.mp4"
          media="(max-width: 700px)"
          type="video/mp4"
        />
        <source src="/video/ascii-background-1280.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
