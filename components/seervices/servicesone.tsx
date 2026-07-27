"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Align = "left" | "right";

interface ServiceItem {
  id: number;
  align: Align;
  title: string;
  desc: string;
  image: string;
}

const services: ServiceItem[] = [
  { id: 1, align: "right", title: "OUR METHOD", desc: "Every Brand Moves Differently", image: "" },
  { id: 2, align: "left", title: "UNDERSTAND THE BRAND", desc: "Narratives, messaging, launch thinking, campaign direction, and brand architecture.", image: "/images/method-01.jpg" },
  { id: 3, align: "right", title: "DEFINE THE SYSTEM", desc: "Narratives, messaging, launch thinking, campaign direction, and brand architecture.", image: "/images/method-02.jpg" },
  { id: 4, align: "left", title: "INTEGRATE WITH YOUR WORKFLOW", desc: "Narratives, messaging, launch thinking, campaign direction, and brand architecture.", image: "/images/method-03.jpg" },
  { id: 5, align: "right", title: "BUILD BEYOND THE BRIEF", desc: "Narratives, messaging, launch thinking, campaign direction, and brand.", image: "/images/method-04.jpg" },
];

export default function ServicesOne() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const rows = gsap.utils.toArray<HTMLElement>(".method-row");
      rows.forEach((row) => {
        const image = row.querySelector<HTMLElement>(".method-image");
        const text = row.querySelector<HTMLElement>(".method-text");
        const imageOnLeft = row.dataset.align === "left";

        if (image) gsap.set(image, { autoAlpha: 0, x: imageOnLeft ? -120 : 120 });
        if (text) gsap.set(text, { autoAlpha: 0, x: imageOnLeft ? 120 : -120 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
            end: "bottom 80%",
            toggleActions: "play reverse play reverse",
          },
        });

        if (image) {
          tl.to(image, { autoAlpha: 1, x: 0, duration: .8, ease: "power3.out" }, 0);
        }
        if (text) {
          tl.to(text, { autoAlpha: 1, x: 0, duration: .8, ease: "power3.out" }, 0.15);
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
      className=" px-6 py-24 sm:px-10 md:py-32 motion-reduce:[&_.method-intro]:opacity-100 motion-reduce:[&_.method-image]:opacity-100 motion-reduce:[&_.method-text]:opacity-100"
    >
      <div className="mx-auto max-w-6xl">
        {/* Intro */}
        <div className="method-intro mb-20 ml-auto max-w-2xl text-right md:mb-28">
          <span className="mb-4 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#c98a2c]">
            {intro.title}
          </span>
          <h2 className="font-serif text-4xl font-medium leading-[1.1] text-[#1b2a22] sm:text-5xl md:text-6xl">
            {intro.desc}
          </h2>
        </div>

        {/* Alternating image / text rows */}
        <div className="flex flex-col gap-20 md:gap-32">
          {steps.map((step, i) => {
            const imageOnLeft = step.align === "left";
            return (
              <div
                key={step.id}
                data-align={step.align}
                className="method-row grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16"
              >
                {/* Image */}
                <div
                  className={
                    "method-image relative aspect-[4/3] w-full overflow-hidden rounded bg-[#7c8c6b] md:aspect-[4/5] " +
                    (imageOnLeft ? "md:order-1" : "md:order-2")
                  }
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Text */}
                <div
                  className={
                    "method-text " +
                    (imageOnLeft ? "md:order-2" : "md:order-1")
                  }
                >
                  <span className="mb-3 block font-sans text-sm font-semibold ">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                  <h3 className="mb-4 font-sans text-2xl font-semibold uppercase tracking-wide  sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="max-w-md font-sans text-[16px] leading-relaxed ">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}