"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

const items = [
  {
    title: "BRAND STRATEGY + POSITIONING",
    subheading: "Narratives, messaging, launch thinking, campaign direction, and brand architecture",
    image: "/images/Amplify-WebsiteBrand-positioning.png",
  },
  {
    title: "SOCIAL MEDIA MANAGEMENT",
    subheading: "Instagram and Facebook-first content systems built for consistency, culture, and growth",
    image: "/images/Amplify-WebsiteSocial-Media-Management.png",
  },
  {
    title: "CREATIVE CAMPAIGNS",
    subheading: "Concepts, scripts, shoots, reels, motion assets, and platform-ready campaign rollouts.",  
    image: "/images/Amplify-WebsiteContent-Production_2.png",
  },
  {
    title: "PERFORMANCE MARKETING",
    subheading: "Ad creatives, Meta campaigns, funnel thinking, testing, optimisation, and reporting",
    image: "/images/Amplify-Websiteperfomance.png",
  },
  {
    title: "CONTENT PRODUCTION",
    subheading: "Photography, reels, video edits, motion graphics, branded content, and always-on assets.",
    image: "/images/Amplify-WebsiteContent-Production_1.png",
  }
];

export default function CursorPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [activeImage, setActiveImage] = useState(items[0].image);

  useEffect(() => {
    const section = sectionRef.current;
    const preview = previewRef.current;

    if (!section || !preview) return;

    const xTo = gsap.quickTo(preview, "x", {
      duration: 0.4,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(preview, "y", {
      duration: 0.4,
      ease: "power3.out",
    });

    const moveCursor = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();

      xTo(e.clientX - rect.left - 60); // 240 / 2
      yTo(e.clientY - rect.top - 80); // 320 / 2
    };

    section.addEventListener("mousemove", moveCursor);

    return () => {
      section.removeEventListener(
        "mousemove",
        moveCursor
      );
    };
  }, []);

  const showPreview = (image: string) => {
    setActiveImage(image);

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const hidePreview = () => {
    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center gap-20  px-8 py-8 md-px-42 lg-px-60 "
    >
      {/* Text */}
      <div className=" min-w-[100%]">
        {items.map((item, index) => (
         <div
         key={index}
            onMouseEnter={() =>
              showPreview(item.image)
            }
            onMouseLeave={hidePreview}
         >
           <h3
            
            className="cursor-pointer font-bold uppercase tracking-[1px] text-white"
          >
            {item.title}
          </h3>
          <p>
            {item.subheading}
          </p>
          <hr className="my-8 border-white" />
          </div>
        ))}
      </div>

      {/* Image Preview */}
      <div
        ref={previewRef}
        className="pointer-events-none absolute left-0 top-0 z-50 h-[300px] w-[220px] overflow-hidden rounded-3xl opacity-0"
        style={{
          transform: "translate(-50%, -50%) scale(0.8)",
        }}
      >
        <Image
          src={activeImage}
          alt={activeImage}
          fill
          priority
          className="object-cover"
        />
      </div>
    </section>
  );
}