"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type CellType = "svg" | "image" | "video";

interface Cell {
  id: string;
  type: CellType;
  label: string;
  title: string;
  span: { col: string; row: string };
  bg?: string;
  // SVG
  art?: React.ReactNode;
  // Image
  src?: string;
  alt?: string;
  // Video
  videoSrc?: string;
  poster?: string;
}

// ─── Cell Data ────────────────────────────────────────────────────────────────
// Replace src/videoSrc/poster with your own assets.
const cells: Cell[] = [
  {
    id: "c1", type: "video",
    label: "01 — Motion", title: "Reel",
    span: { col: "1 / 3", row: "1 / 2" },
    videoSrc: "/videos/AmplifyBanner.mp4",
    poster: "/images/reel-poster.jpg",
  },
  {
    id: "c2", type: "image",
    label: "02 — Still", title: "Portrait",
    span: { col: "3 / 4", row: "1 / 3" },
    src: "/images/1.jpg",
    alt: "Portrait photograph",
  },
  {
    id: "c3", type: "svg",
    label: "03 — Geo", title: "Triangulation",
    span: { col: "4 / 5", row: "1 / 2" },
    bg: "linear-gradient(135deg, #0d2137 0%, #1a3a5c 100%)",
    art: (
      <svg viewBox="0 0 100 100" fill="none" style={{ width: "80%", height: "80%" }}>
        <polygon points="50,10 90,80 10,80" stroke="#60b0ff" strokeWidth="0.8" />
        <polygon points="50,25 78,75 22,75" stroke="#60b0ff" strokeWidth="0.5" />
      </svg>
    ),
  },
  {
    id: "c4", type: "video",
    label: "04 — Texture", title: "Loop",
    span: { col: "1 / 2", row: "2 / 4" },
    videoSrc: "/videos/AmplifyBanner.mp4",
    poster: "/images/texture-poster.jpg",
  },
  {
    id: "c5", type: "image",
    label: "05 — Scene", title: "Landscape",
    span: { col: "2 / 3", row: "2 / 3" },
    src: "/images/2.jpg",
    alt: "Landscape photograph",
  },
  {
    id: "c6", type: "svg",
    label: "06 — Overlap", title: "Intersection",
    span: { col: "4 / 5", row: "2 / 3" },
    bg: "linear-gradient(135deg, #1a1400 0%, #3d3200 100%)",
    art: (
      <svg viewBox="0 0 100 100" fill="none" style={{ width: "80%", height: "80%" }}>
        <circle cx="30" cy="50" r="20" stroke="#e0c040" strokeWidth="0.8" />
        <circle cx="70" cy="50" r="20" stroke="#e0c040" strokeWidth="0.8" />
        <circle cx="50" cy="28" r="20" stroke="#e0c040" strokeWidth="0.5" />
      </svg>
    ),
  },
  {
    id: "c7", type: "video",
    label: "07 — Flow", title: "Abstract",
    span: { col: "2 / 4", row: "3 / 4" },
    videoSrc: "/videos/AmplifyBanner.mp4",
    poster: "/images/abstract-poster.jpg",
  },
  {
    id: "c8", type: "image",
    label: "08 — Detail", title: "Close-up",
    span: { col: "4 / 5", row: "3 / 4" },
    src: "/images/4.jpg",
    alt: "Close-up detail shot",
  },
];

const offsets: Record<string, { x: number; y: number }> = {
  c1: { x: -60, y: -40 }, c2: { x: 60, y: -60 }, c3: { x: 40, y: -40 },
  c4: { x: -50, y:  60 }, c5: { x: -30, y:  40 }, c6: { x: 50, y:  30 },
  c7: { x: -40, y:  60 }, c8: { x: 40,  y:  60 },
};

const animOrder = ["c1","c3","c2","c4","c5","c6","c7","c8"];

// ─── Sub-components ───────────────────────────────────────────────────────────

function VideoCell({ src, poster }: { src: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => videoRef.current?.play();
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "absolute", inset: 0 }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      {/* Play icon hint */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: 0,
        transition: "opacity 0.2s",
        pointerEvents: "none",
      }}
        className="play-hint"
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="19" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
          <polygon points="16,13 30,20 16,27" fill="rgba(255,255,255,0.8)"/>
        </svg>
      </div>
    </div>
  );
}

function ImageCell({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          transition: "transform 0.5s ease",
        }}
        className="bento-img"
      />
    </div>
  );
}

function SvgCell({ art, bg }: { art: React.ReactNode; bg?: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: bg ?? "#111" }}>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: 0.22, pointerEvents: "none",
      }}>
        {art}
      </div>
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────

const typeBadge: Record<CellType, { icon: string; color: string }> = {
  video: { icon: "▶", color: "rgba(255,100,80,0.85)" },
  image: { icon: "◼", color: "rgba(80,160,255,0.85)" },
  svg:   { icon: "✦", color: "rgba(180,130,255,0.85)" },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BentoGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cellRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const gsapRef    = useRef<any>(null);
  const ctxRef     = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger }  = await import("gsap/ScrollTrigger");
      if (!mounted) return;

      gsap.registerPlugin(ScrollTrigger);
      gsapRef.current = gsap;

      const ctx = gsap.context(() => {
        const active = cellRefs.current.filter(Boolean) as HTMLDivElement[];

        gsap.set(active, { opacity: 0, scale: 0.72, filter: "blur(10px)" });
        active.forEach((el) => {
          const off = offsets[el.dataset.id!] ?? { x: 0, y: 0 };
          gsap.set(el, off);
        });

        const sorted = animOrder.map((id) => active.find((c) => c.dataset.id === id));

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=180%",
            scrub: 1.4,
            pin: true,
            anticipatePin: 1,
          },
        });

        sorted.forEach((el, i) => {
          tl.to(el, {
            opacity: 1, scale: 1, x: 0, y: 0,
            filter: "blur(0px)", duration: 0.4, ease: "power2.out",
          }, i * 0.12);
        });

        tl.to(active, {
          scale: 1.012, duration: 0.5, stagger: 0.04,
          ease: "sine.inOut", yoyo: true, repeat: 1,
        }, "+=0.1");

        ScrollTrigger.create({
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self: any) => {
            if (progressRef.current)
              progressRef.current.style.width = `${self.progress * 100}%`;
          },
        });
      }, sectionRef);

      ctxRef.current = ctx;
    })();

    return () => {
      mounted = false;
      ctxRef.current?.revert();
    };
  }, []);

  const onEnter = (i: number) => {
    gsapRef.current?.to(cellRefs.current[i], { scale: 1.04, duration: 0.3, ease: "power2.out", zIndex: 10 });
    // Also scale image on hover
    const img = cellRefs.current[i]?.querySelector(".bento-img") as HTMLElement | null;
    if (img) img.style.transform = "scale(1.06)";
  };

  const onLeave = (i: number) => {
    gsapRef.current?.to(cellRefs.current[i], { scale: 1, duration: 0.4, ease: "power2.inOut", zIndex: 1 });
    const img = cellRefs.current[i]?.querySelector(".bento-img") as HTMLElement | null;
    if (img) img.style.transform = "scale(1)";
  };

  return (
    <>
      <style>{`
        @keyframes bentoPulse { 0%,100%{opacity:.4} 50%{opacity:1} }
        .cell-wrap:hover .play-hint { opacity: 1 !important; }
      `}</style>

      {/* Progress bar */}
      <div ref={progressRef} style={{
        position: "fixed", bottom: 0, left: 0,
        height: 2, background: "#c9a96e", width: 0, zIndex: 999,
      }} />

      {/* Hero */}
      <div style={{
        height: "100vh", background: "#080808",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 12,
      }}>
        <h1 style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(2.5rem,6vw,5rem)",
          fontWeight: 400, letterSpacing: "-0.03em",
          color: "#f0ece4", margin: 0,
        }}>
          Project Gallery
        </h1>
        {/* <p style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "1rem", letterSpacing: "0.15em",
          textTransform: "uppercase", color: "#555", margin: 0,
        }}>
          Video · Image · SVG · GSAP Scrub
        </p>
        <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
          {(["video","image","svg"] as CellType[]).map((t) => (
            <span key={t} style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "0.7rem", letterSpacing: "0.1em",
              padding: "4px 10px", borderRadius: 20,
              background: typeBadge[t].color, color: "#fff",
            }}>
              {typeBadge[t].icon} {t}
            </span>
          ))}
        </div>
        <span style={{
          marginTop: "2rem", fontFamily: "'Courier New', monospace",
          fontSize: "0.8rem", letterSpacing: "0.1em", color: "#444",
          animation: "bentoPulse 2s ease-in-out infinite",
        }}>↓ scroll to animate</span> */}
      </div>

      {/* Bento sticky section */}
      <div ref={sectionRef} style={{
        position: "sticky", top: 0, height: "100vh",
        background: "#080808", display: "flex",
        alignItems: "center", justifyContent: "center",
        padding: "2rem", overflow: "hidden",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          gap: 10,
          width: "min(940px, 100%)",
          height: "min(580px, 90vh)",
        }}>
          {cells.map((cell, i) => {
            const badge = typeBadge[cell.type];
            return (
              <div
                key={cell.id}
                ref={(el) => { cellRefs.current[i] = el; }}
                data-id={cell.id}
                className="cell-wrap"
                onMouseEnter={() => onEnter(i)}
                onMouseLeave={() => onLeave(i)}
                style={{
                  gridColumn: cell.span.col,
                  gridRow: cell.span.row,
                  borderRadius: 16,
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                  background: "#111",
                  willChange: "transform, opacity, filter",
                }}
              >
                {/* Content layer */}
                {cell.type === "video" && cell.videoSrc && (
                  <Link href="/projects">
                    <VideoCell src={cell.videoSrc} poster={cell.poster} />
                  </Link>
                )}
                {cell.type === "image" && cell.src && (
                  <ImageCell src={cell.src} alt={cell.alt ?? ""} />
                )}
                {cell.type === "svg" && (
                  <SvgCell art={cell.art} bg={cell.bg} />
                )}

                {/* Gradient overlay for legibility */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)",
                  pointerEvents: "none", zIndex: 1,
                }} />

                {/* Type badge */}
                <div style={{
                  position: "absolute", top: 10, right: 10, zIndex: 3,
                  background: badge.color,
                  borderRadius: 20, padding: "3px 8px",
                  fontFamily: "'Courier New', monospace",
                  fontSize: "0.6rem", letterSpacing: "0.1em",
                  color: "#fff", textTransform: "uppercase",
                }}>
                  {badge.icon} {cell.type}
                </div>

                {/* Labels */}
                <div style={{
                  position: "absolute", bottom: 14, left: 14,
                  zIndex: 3, display: "flex", flexDirection: "column", gap: 2,
                }}>
                  <span style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "0.65rem", letterSpacing: "0.12em",
                    textTransform: "uppercase", color: "rgba(255,255,255,0.55)",
                  }}>
                    {cell.label}
                  </span>
                  <span style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1rem", fontWeight: 400, color: "#f0ece4",
                  }}>
                    {cell.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll space */}
      {/* <div style={{ height: "200vh", background: "#080808" }} /> */}
    </>
  );
}