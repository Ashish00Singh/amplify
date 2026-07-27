"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Align = "left" | "right";

interface ServiceItem {
  id: number;
  align: Align;
  title: string;
  desc: string;
}

const services: ServiceItem[] = [
  { id: 1, align: "right", title: "OUR METHOD", desc: "Every Brand Moves Differently" },
  { id: 2, align: "left", title: "UNDERSTAND THE BRAND", desc: "Narratives, messaging, launch thinking, campaign direction, and brand architecture." },
  { id: 3, align: "right", title: "DEFINE THE SYSTEM", desc: "Narratives, messaging, launch thinking, campaign direction, and brand architecture." },
  { id: 4, align: "left", title: "INTEGRATE WITH YOUR WORKFLOW", desc: "Narratives, messaging, launch thinking, campaign direction, and brand architecture." },
  { id: 5, align: "right", title: "BUILD BEYOND THE BRIEF", desc: "Narratives, messaging, launch thinking, campaign direction, and brand." },
];

export default function OurMethod() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Intro block (id 1) ---
      const intro = gsap.utils.toArray<HTMLElement>(".method-intro")[0];
      if (intro) {
        gsap.set(intro, { autoAlpha: 0, y: 40 });
        gsap.to(intro, {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: intro,
            start: "top 82%",
            end: "top 50%",
            toggleActions: "play reverse play reverse",
          },
        });
      }

      // --- Steps (ids 2-5), each reveals on its own as it enters the viewport
      // and reverses when you scroll back up past it. ---
      const rows = gsap.utils.toArray<HTMLElement>(".method-row");
      rows.forEach((row) => {
        const fromLeft = row.dataset.align === "left";
        gsap.set(row, { autoAlpha: 0, x: fromLeft ? -56 : 56, y: 16 });
        gsap.to(row, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play reverse play reverse",
          },
        });

        // dot marker gets a tiny pop of its own, slightly after the row starts
        const dot = row.querySelector(".method-dot");
        if (dot) {
          gsap.set(dot, { scale: 0 });
          gsap.to(dot, {
            scale: 1,
            duration: 0.4,
            ease: "back.out(3)",
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play reverse play reverse",
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const intro = services.find((s) => s.id === 1)!;
  const steps = services.filter((s) => s.id !== 1);

  return (
    <section
      ref={sectionRef}
      className="relative px-6 py-24 sm:px-10 md:py-32 motion-reduce:[&_.method-intro]:opacity-100 motion-reduce:[&_.method-row]:opacity-100 motion-reduce:[&_.method-dot]:scale-100"
    >
      <div className="mx-auto max-w-4xl">
        {/* Intro */}
        <div className="method-intro mb-20 ml-auto max-w-2xl text-right md:mb-28">
          <span className="mb-4 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#c98a2c]">
            {intro.title}
          </span>
          <h2 className="font-serif text-4xl font-medium leading-[1.1] text-[#1b2a22] sm:text-5xl md:text-6xl">
            {intro.desc}
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* center spine, desktop only */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#1b2a22]/10 md:block" />

          <ol className="relative flex flex-col gap-16 md:gap-10">
            {steps.map((step, i) => {
              const isLeft = step.align === "left";
              return (
                <li
                  key={step.id}
                  data-align={step.align}
                  className="method-row relative grid grid-cols-1 items-center md:grid-cols-2 md:gap-12"
                >
                  {/* center dot marker, desktop only */}
                  <span className="method-dot pointer-events-none absolute left-1/2 top-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c98a2c] md:block" />

                  <div
                    className={
                      isLeft
                        ? "md:order-1 md:pr-12 md:text-right"
                        : "md:order-2 md:col-start-2 md:pl-12 md:text-left"
                    }
                  >
                    <span className="mb-3 block font-sans text-sm font-semibold text-[#7c8c6b]">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <h3 className="mb-3 font-sans text-lg font-semibold uppercase tracking-wide text-[#1b2a22] sm:text-xl">
                      {step.title}
                    </h3>
                    <p className="max-w-md font-sans text-[15px] leading-relaxed text-[#1b2a22]/70">
                      {step.desc}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}