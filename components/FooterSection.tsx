"use client";

import { useEffect } from "react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

const down =
  "M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z";

const center =
  "M0-0.3C0-0.3,464,0,1139,0s1139-0.3,1139-0.3V683H0V-0.3z";

export default function FooterSection() {
  useEffect(() => {
    ScrollTrigger.create({
      trigger: ".footer",
      start: "top bottom",

      onEnter: (self) => {
        const velocity = self.getVelocity();
        const variation = 2;
        console.log(variation)

        gsap.fromTo(
          "#bouncy-path",
          {
            morphSVG: down,
          },
          {
            morphSVG: center,
            duration: 2,
            ease: `elastic.out(${1 + variation}, ${1 - variation
              })`,
          }
        );
      },
    });
  }, []);

  return (
    <>
      {/* Separate SVG */}

      

      {/* Footer */}
      <footer
        className=" h-[500px] flex-row items-center justify-center bg-cover bg-center text-white text-5xl"
        style={{
          backgroundImage:
            "url(https://img.magnific.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg)",
        }}
      >
        <div className="w-full overflow-hidden" >
        <svg
          className="w-full block"
          viewBox="0 0 2278 200"
          preserveAspectRatio="none"
        >
         
          <path
            id="bouncy-path"
            className="footer"
            d={down}
          />
        </svg>
      </div>
        Footer Section
      </footer>
    </>
  );
}