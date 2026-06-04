"use client";

import { useEffect } from "react";
import gsap from "gsap";
import SplitType from "split-type";

export default function HorizontalText() {
  useEffect(() => {
    const split = new SplitType(".marquee-text", {
      types: "chars",
    });

    gsap.from(split.chars, {
      y: () => gsap.utils.random(-200, 200),
      rotation: () => gsap.utils.random(-25, 25),
      opacity: 0,
      stagger: 0.02,
      ease: "back.out(1.7)",
      duration: 1.2,
    });

    // gsap.to(".track", {
    //   xPercent: -50,
    //   duration: 18,
    //   repeat: -1,
    //   ease: "linear",
    // });

    return () => split.revert();
  }, []);

  return (
    <div className="overflow-hidden py-10">
      <div className="track ">
        <h1 className="marquee-text tracking-[8px] text-white text-[14px] text-center font-thin whitespace-nowrap mt-10">
          | Creative Intelligence . Engineered for Growth |
        </h1>

        {/* <h1 className="marquee-text text-white text-[50px] font-bold whitespace-nowrap mr-20">
          GSAP HORIZONTAL —
        </h1> */}
      </div>
    </div>
  );
}