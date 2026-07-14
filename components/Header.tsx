"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);
  const line3Ref = useRef<HTMLSpanElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!menuRef.current || !navRef.current) return;

    tl.current = gsap.timeline({ paused: true, reversed: true });

    tl.current
      .set(menuRef.current, {
        display: "block",
      })
      .fromTo(
        menuRef.current,
        {
          clipPath: "circle(0% at top right)",
        },
        {
          clipPath: "circle(150% at top right)",
          duration: 1,
          ease: "power4.inOut",
        }
      )
      .fromTo(
        navRef.current.children,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      )
      // Hamburger -> X, synced with the menu opening
      .to(
        line1Ref.current,
        { rotate: 38, y: 12, duration: 0.4, ease: "power3.inOut" },
        0
      )
      .to(
        line2Ref.current,
        { opacity: 0, duration: 0.2, ease: "power3.inOut" },
        0
      )
      .to(
        line3Ref.current,
        { rotate: -38, y: -12, duration: 0.4, ease: "power3.inOut" },
        0
      );

    tl.current.reverse();
  }, []);

  const toggleMenu = () => {
    if (!tl.current) return;

    if (tl.current.reversed()) {
      tl.current.play();
      setIsOpen(true);
    } else {
      tl.current.reverse();
      setIsOpen(false);
    }
  };

  const closeMenu = () => {
    if (!tl.current) return;
    tl.current.reverse();
    setIsOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header
        // className="mx-auto max-w-6xl px-6 py-16"
        className=" mx-auto fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-3 text-black/90 ">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/AmplifyNewLogo.svg" alt="Logo" width={120} height={40} />
        </Link>

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="relative z-50 border-1 border-white rounded-[5px] flex h-12 w-14 flex-col items-center mix-blend-difference justify-center gap-[8px]"

        >
          <span
            ref={line1Ref}
            className="block rounded-lg h-[4px] w-12 origin-center "
            style={{ background: 'linear-gradient(170deg,#1a5fa8 0%,#1a9fbf 50%,#1ecdb8 100%)' }}
          />
          <span
            ref={line2Ref}
            className="block rounded-lg h-[4px] w-12 origin-center "
            style={{ background: 'linear-gradient(170deg,#1a5fa8 0%,#1a9fbf 50%,#1ecdb8 100%)' }}
          />
          <span
            ref={line3Ref}
            className="block rounded-lg h-[4px] w-12 origin-center "
            style={{ background: 'linear-gradient(170deg,#1a5fa8 0%,#1a9fbf 50%,#1ecdb8 100%)' }}
          />
        </button>
      </header>

      {/* Fullscreen Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-blue-400 hidden z-40 overflow-hidden"
        style={{
          clipPath: "circle(0% at top right)",
        }}
      >
        <nav
          ref={navRef}
          className="h-full flex flex-col items-center justify-center gap-10 text-white text-6xl font-semibold"
        >
          <Link href="/" onClick={closeMenu}>
            Home
          </Link>

          <Link href="/about" onClick={closeMenu}>
            About
          </Link>

          <Link href="/services" onClick={closeMenu}>
            Services
          </Link>

          <Link href="/projects" onClick={closeMenu}>
            Projects
          </Link>

          <Link href="/contact" onClick={closeMenu}>
            Contact
          </Link>
        </nav>
      </div>
    </>
  );
}