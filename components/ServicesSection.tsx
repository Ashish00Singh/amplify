'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const services = [
  { id: 1, align: 'right', title: 'Define the System',           desc: 'Narratives, messaging, launch thinking, campaign direction, and brand architecture.' },
  { id: 2, align: 'left',  title: 'Integrate with your Workflow', desc: 'Narratives, messaging, launch thinking, campaign direction, and brand architecture.' },
  { id: 3, align: 'right', title: 'Build Beyond the Brief',       desc: 'Narratives, messaging, launch thinking, campaign direction, and brand architecture.' },
  { id: 4, align: 'left',  title: 'Build Beyond the Brief',       desc: 'Narratives, messaging, launch thinking, campaign direction, and brand architecture.' },
]

function GlobeIcon() {
  return (
    <svg viewBox="0 0 110 110" width="100%" height="100%" aria-hidden="true">
      <rect x="14" y="14" width="82" height="82" rx="14"
        fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"
        transform="rotate(45 55 55)" />
      <circle cx="55" cy="55" r="22" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.1" />
      <ellipse cx="55" cy="55" rx="10" ry="22" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.1" />
      <line x1="33" y1="55" x2="77" y2="55" stroke="rgba(255,255,255,0.75)" strokeWidth="1.1" />
      <path d="M37 43 Q55 49 73 43" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.1" />
      <path d="M37 67 Q55 61 73 67" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.1" />
    </svg>
  )
}

export default function ServicesSection() {
  const sectionRef   = useRef<HTMLElement>(null)
  const pathRef      = useRef<SVGPathElement>(null)
  const travellerRef = useRef<HTMLDivElement>(null)
  const iconRefs     = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let st: { kill: () => void } | undefined
    let roCleanup: (() => void) | undefined

    const init = async () => {
      gsap.registerPlugin(ScrollTrigger)

      const section   = sectionRef.current
      const pathEl    = pathRef.current
      const traveller = travellerRef.current
      if (!section || !pathEl || !traveller) return

      await new Promise<void>(res =>
        requestAnimationFrame(() => requestAnimationFrame(() => res()))
      )

      const buildPath = () => {
        const H = section.scrollHeight

        const ptsFixed = iconRefs.current.map(el => {
          if (!el) return { x: section.offsetWidth / 2, y: 0 }
          let top = 0, left = 0
          let node: HTMLElement | null = el
          while (node && node !== section) {
            top  += node.offsetTop
            left += node.offsetLeft
            node  = node.offsetParent as HTMLElement | null
          }
          return { x: left + el.offsetWidth / 2, y: top + el.offsetHeight / 2 }
        })

        const [p0, p1, p2, p3] = ptsFixed
        const d = [
          `M ${p0.x} 0`,
          `C ${p0.x} ${p0.y * 0.4}, ${p0.x} ${p0.y * 0.8}, ${p0.x} ${p0.y}`,
          `C ${p0.x} ${(p0.y + p1.y) / 2}, ${p1.x} ${(p0.y + p1.y) / 2}, ${p1.x} ${p1.y}`,
          `C ${p1.x} ${(p1.y + p2.y) / 2}, ${p2.x} ${(p1.y + p2.y) / 2}, ${p2.x} ${p2.y}`,
          `C ${p2.x} ${(p2.y + p3.y) / 2}, ${p3.x} ${(p2.y + p3.y) / 2}, ${p3.x} ${p3.y}`,
          `C ${p3.x} ${(p3.y + H) / 2}, ${p3.x} ${(p3.y + H) / 2}, ${p3.x} ${H}`,
          `L ${p3.x} ${H}`,
        ].join(' ')

        pathEl.setAttribute('d', d)
        return pathEl.getTotalLength()
      }

      let pathLen = buildPath()

      const createST = () => {
        st?.kill()
        st = ScrollTrigger.create({
          trigger: section,
          start:   'top bottom',
          end:     'bottom top',
          scrub:   0.6,
          onEnter:     () => { traveller.style.opacity = '1' },
          onLeave:     () => { traveller.style.opacity = '0' },
          onEnterBack: () => { traveller.style.opacity = '1' },
          onLeaveBack: () => { traveller.style.opacity = '0' },
          onUpdate(self) {
            const dist  = self.progress * pathLen
            const pt    = pathEl.getPointAtLength(dist)
            const pt2   = pathEl.getPointAtLength(Math.min(dist + 4, pathLen))
            const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180 / Math.PI
            traveller.style.left      = `${pt.x}px`
            traveller.style.top       = `${pt.y}px`
            traveller.style.transform = `translate(-50%,-50%) rotate(${angle}deg)`
          },
        })
      }

      createST()

      const ro = new ResizeObserver(() => {
        pathLen = buildPath()
        ScrollTrigger.refresh()
        createST()
      })
      ro.observe(section)
      roCleanup = () => ro.disconnect()
    }

    init()
    return () => {
      st?.kill()
      roCleanup?.()
    }
  }, [])

  return (
    // Background gradient via inline style — Tailwind can't express arbitrary 170deg gradients
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-x-hidden py-16 pb-24 md:py-24 md:pb-40 font-sans text-white"
      // style={{ background: 'linear-gradient(170deg,#1a5fa8 0%,#1a9fbf 50%,#1ecdb8 100%)' }}
    >
      {/* Dashed S-curve SVG — stays absolute/full so JS coordinates map 1-to-1 */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          fill="none"
          strokeWidth="1.5"
          strokeDasharray="8 10"
        />
      </svg>

      {/* Travelling globe */}
      <div
        ref={travellerRef}
        className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20
                   opacity-0 transition-opacity duration-300 pointer-events-none z-10
                   drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]"
      >
        <GlobeIcon />
      </div>

      {/* Service rows */}
      {services.map((s, i) => {
        const isRight = s.align === 'right'
        return (
          <div
            key={s.id}
            className={[
              // Base: vertical stack on mobile, horizontal on sm+
              'flex flex-col items-center text-center gap-4 px-5 py-10',
              'sm:flex-row sm:text-left sm:gap-8 sm:py-20 sm:max-w-[560px]',
              // Alternate sides on sm+
              isRight
                ? 'sm:flex-row-reverse sm:ml-auto sm:mr-[8%]'
                : 'sm:flex-row     sm:mr-auto sm:ml-[8%]',
            ].join(' ')}
          >
            {/* Icon */}
            <div
              ref={el => { iconRefs.current[i] = el }}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0"
            >
              <GlobeIcon />
            </div>

            {/* Text */}
            <div>
              <p className="text-[0.65rem] sm:text-[0.7rem] tracking-[0.22em] uppercase
                            font-semibold mb-2 text-white/90">
                {s.title}
              </p>
              <p className="text-sm sm:text-[0.95rem] font-light leading-7 text-white/65">
                {s.desc}
              </p>
            </div>
          </div>
        )
      })}
    </section>
  )
}


