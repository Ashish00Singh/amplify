"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const LABEL = " Creative Intelligence . Engineered for Growth.   ";
const INITIAL_COUNT = 4; // enough to fill screen + 1 offscreen

export default function HorizontalText() {
  const trackRef = useRef<HTMLDivElement>(null);


  useEffect(() => {

    // --- Recycling marquee ---
    const track = trackRef.current;
    if (!track) return;

    let animFrameId: number;
    const speed = .8; // px per frame — increase for faster

    function tick() {
      const items = Array.from(track!.children) as HTMLElement[];
      if (!items.length) return;

      // Move track left by speed px
      const currentX = gsap.getProperty(track, "x") as number;
      const nextX = currentX - speed;
      gsap.set(track, { x: nextX });

      // Check if first child has scrolled fully off-screen to the left
      const first = items[0];
      const firstRight = first.getBoundingClientRect().right;

      if (firstRight < 0) {
        // Remove from front, append to end
        track!.removeChild(first);
        track!.appendChild(first);

        // Offset x by the removed element's width so position doesn't jump
        gsap.set(track, { x: nextX + first.offsetWidth });
      }

      animFrameId = requestAnimationFrame(tick);
    }

    animFrameId = requestAnimationFrame(tick);

  }, []);

  return (
    <div className="overflow-hidden w-full overflow-x-hidden">
      <div ref={trackRef} className="flex text-black whitespace-nowrap will-change-transform">
        {Array.from({ length: INITIAL_COUNT }).map((_, i) => (
          <h1
            key={i}
            className="marquee-text tracking-[8px] text-black text-[14px] my-5 font-thin whitespace-nowrap  px-8">
            {LABEL}
          </h1>
        ))}
      </div>
    </div>
  );
}