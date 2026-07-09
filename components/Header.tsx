"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

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
      );

    tl.current.reverse();
  }, []);

  const toggleMenu = () => {
    if (!tl.current) return;

    if (tl.current.reversed()) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  };

  const closeMenu = () => {
  if (!tl.current) return;
  tl.current.reverse();
};

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-3 text-black/90 ">
        <Image src="/images/AmplifyNewLogo.svg" alt="Logo" width={120} height={40} />
        {/* <h1 className="text-2xl font-bold">LOGO</h1> */}

        <button
          onClick={toggleMenu}
          className="uppercase tracking-widest text-sm"
        >
          Menu
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