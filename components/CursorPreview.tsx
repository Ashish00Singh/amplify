"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

const items = [
    {
        title: "Creative",
        image: "/images/1.jpg",
    },
    {
        title: "Luxury",
        image: "/images/2.jpg",
    },
    {
        title: "Modern",
        image: "/images/3.jpeg",
    },
    {
        title: "Motion",
        image: "/images/4.jpg",
    },
];

export default function ImagePreviewSection() {
    const previewRef =
        useRef<HTMLDivElement>(null);

    const sectionRef =
        useRef<HTMLElement>(null);

    const [activeImage, setActiveImage] =
        useState(items[0].image);

    const [show, setShow] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const moveCursor = (e: MouseEvent) => {
            if (!previewRef.current) return;

            const rect =
                section.getBoundingClientRect();

            gsap.to(previewRef.current, {
                x: e.clientX - rect.left + 40,
                y: e.clientY - rect.top - 150,
                duration: 0.3,
                ease: "power3.out",
            });
        };

        section.addEventListener(
            "mousemove",
            moveCursor
        );

        return () => {
            section.removeEventListener(
                "mousemove",
                moveCursor
            );
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative flex min-h-screen items-center justify-center overflow-hidden border-y border-white/10"
        >
            {/* Content */}
            <div className="space-y-6 text-center">
                {items.map((item, index) => (
                    <h1
                        key={index}
                        onMouseEnter={() => {
                            setActiveImage(item.image);
                            setShow(true);
                        }}
                        onMouseLeave={() =>
                            setShow(false)
                        }
                        className="cursor-pointer text-7xl font-bold uppercase tracking-[10px]"
                    >
                        {item.title}
                    </h1>
                ))}
            </div>
            {/* Preview */}
            {show && (
                <div
                    ref={previewRef}
                    className="pointer-events-none absolute left-0 top-0 z-50 h-[320px] w-[240px] overflow-hidden rounded-3xl"
                >
                    <Image
                        src={activeImage}
                        alt=""
                        fill
                        className="object-cover"
                    />
                </div>
            )}


        </section>
    );
}