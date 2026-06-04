"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(ScrollTrigger, Flip);

const IMAGES = [
  "https://assets.codepen.io/16327/portrait-pattern-1.jpg",
  "https://assets.codepen.io/16327/portrait-image-12.jpg",
  "https://assets.codepen.io/16327/portrait-image-8.jpg",
  "https://assets.codepen.io/16327/portrait-pattern-2.jpg",
  "https://assets.codepen.io/16327/portrait-image-4.jpg",
  "https://assets.codepen.io/16327/portrait-image-3.jpg",
  "https://assets.codepen.io/16327/portrait-pattern-3.jpg",
  "https://assets.codepen.io/16327/portrait-image-1.jpg",
];

const FINAL_CLASS = "gallery--final";

export default function BentoFlipGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  

useLayoutEffect(() => {
  const gallery = galleryRef.current;
  const section = sectionRef.current;

  if (!gallery || !section) return;

  const timer = setTimeout(() => {
    const items =
      gallery.querySelectorAll<HTMLElement>(
        "[data-gallery-item]"
      );

    gallery.classList.add(FINAL_CLASS);

    const state = Flip.getState(items);

    gallery.classList.remove(FINAL_CLASS);

    const flipAnimation = Flip.to(state, {
      absolute: true,
      ease: "none",
      paused: true,
    });

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=2000",
      scrub: true,
      animation: flipAnimation,
    });

    ScrollTrigger.refresh();
  }, 500);

  return () => {
    clearTimeout(timer);
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}, []);

  return (
    <>
      <style>{`
        .gallery-bento {
          grid-template-columns: repeat(3, 30vw);
          grid-template-rows: repeat(4, 22vh);
        }

        .gallery--final.gallery-bento {
          grid-template-columns: repeat(3, 95vw);
          grid-template-rows: repeat(4, 45vh);
          gap: 2vw;
        }

        [data-gallery-item="1"] {
          grid-area: 1 / 1 / 3 / 2;
        }

        [data-gallery-item="2"] {
          grid-area: 1 / 2 / 2 / 3;
        }

        [data-gallery-item="3"] {
          grid-area: 2 / 2 / 4 / 3;
        }

        [data-gallery-item="4"] {
          grid-area: 1 / 3 / 3 / 4;
        }

        [data-gallery-item="5"] {
          grid-area: 3 / 1 / 4 / 2;
        }

        [data-gallery-item="6"] {
          grid-area: 3 / 3 / 5 / 4;
        }

        [data-gallery-item="7"] {
          grid-area: 4 / 1 / 5 / 2;
        }

        [data-gallery-item="8"] {
          grid-area: 4 / 2 / 5 / 3;
        }
      `}</style>

      {/* Gallery Scroll Section */}
      <section
        ref={sectionRef}
        className="relative h-[300vh]"
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          <div className="flex h-full items-center justify-center">
            <div
              ref={galleryRef}
              className="gallery-bento grid gap-[1vh]"
            >
              {IMAGES.map((src, index) => (
                <div
                  key={index}
                  data-gallery-item={index + 1}
                  className="overflow-hidden rounded-xl"
                >
                  <img
                    src={src}
                    alt={`Gallery ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative z-10 px-8 py-20 md:px-20">
        <h2 className="mb-8 text-5xl font-bold">
          Content Starts Here
        </h2>

        {Array.from({ length: 12 }).map((_, index) => (
          <p
            key={index}
            className="mb-6 max-w-4xl text-lg leading-8"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem, deserunt. Quisquam natus velit nihil
            consequatur, aspernatur possimus sint. Voluptatibus,
            molestiae. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Exercitationem, deserunt.
          </p>
        ))}
      </section>
    </>
  );
}