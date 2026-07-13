"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import FooterSection from "../components/FooterSection";
import Header from "../components/Header";
import HorizontalText from "../components/home/HorizontalText";
import BrandSystemSection from "@/components/home/BrandSystemSection";
import CursorPreview from "@/components/CursorPreview";
import Methodology from "@/components/ServicesSection";
import BentoGallery from "@/components/BentoGallery";
import SliderSection from "@/components/SliderSection";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const cards = [
  {
    imgUel:
      "https://img.magnific.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg",
    title: "Card 1",
  },
  {
    imgUel:
      "https://img.magnific.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg",
    title: "Card 2",
  },
  {
    imgUel:
      "https://img.magnific.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg",
    title: "Card 3",
  },
  {
    imgUel:
      "https://img.magnific.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg",
    title: "Card 4",
  },
  {
    imgUel:
      "https://img.magnific.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg",
    title: "Card 5",
  },
];

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth Scroll
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
    });

    const section = sectionRef.current;
    const cardsContainer = cardsRef.current;

    if (!section || !cardsContainer) return;

    const totalScroll =
      cardsContainer.scrollWidth - window.innerWidth;

    // Horizontal Scroll
    gsap.to(cardsContainer, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${totalScroll}`,
        scrub: 1,
        pin: true,
      },
    });

    return () => {
      smoother.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* <Header /> */}
      <div id="smooth-wrapper" style={{ background: 'linear-gradient(170deg,#1a5fa8 0%,#1a9fbf 50%,#1ecdb8 100%)' }}>
        <div id="smooth-content">
          <div className="overflow-hidden h-screen mt-10  " >
            <div className="flex items-center justify-center mt-10" >
              <div className=" w-[60%] my-14 flex items-center justify-center">
                <span className="mt-10 tracking-[8px] text-black text-[18px] font-thin whitespace-nowrap px-4">|</span>
                <HorizontalText />
                <span className="mt-10 tracking-[8px] text-black text-[18px] font-thin whitespace-nowrap px-4">|</span>
              </div>
            </div>

            <div className="w-[100%] h-[100%]">

              {/* <h1 className="text-6xl">GSAP Section 1</h1> */}

              <video className=" object-cover h-[100vh] w-[100%] object-contain" src="/videos/AmplifyBanner.mp4" autoPlay loop muted />
            </div>
          </div>


          <BrandSystemSection />


          <div className="relative" >
            <CursorPreview /> {/* // Cursor Preview Section -- responsive and has image preview on hover */}
          </div>
          {/* Section 1 */}

          <section>
            <Methodology />
          </section>

          {/* Horizontal Section */}
          <div
            ref={sectionRef}
            className="h-screen overflow-hidden "
          >
            <div className=" pt-8 flex items-center justify-center">
              <h1 className="text-6xl text-white">
                CASE STUDIES
              </h1>
            </div>
            <div
              ref={cardsRef}
              className="flex gap-10 h-full items-center px-10 w-max"
            >
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="min-w-[350px] h-[500px] rounded-xl  bg-black overflow-hidden"
                >
                  <img
                    src={card.imgUel}
                    alt={card.title}
                    className="w-full h-[85%] object-cover"
                  />

                  <div className="p-4">
                    <h2 className="text-2xl font-semibold text-white">
                      {card.title}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <BentoGallery /> */}

<SliderSection/>

          {/* Last Section */}
          <section className="h-screen flex items-center justify-center bg-black text-white mt-20">
            <video className="w-[100%]  object-contain" src="/videos/amplifyLastS.mp4" autoPlay loop muted />
          </section>

          {/* <FooterSection /> */}
        </div>
      </div>

    </>
  );
}