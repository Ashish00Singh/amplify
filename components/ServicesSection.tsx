'use client'

import { useEffect, useRef } from 'react'

const services = [
  { id: 1, align: 'right', title: 'Define the System', desc: 'Narratives, messaging, launch thinking, campaign direction, and brand architecture.' },
  { id: 2, align: 'left',  title: 'Integrate with your Workflow', desc: 'Narratives, messaging, launch thinking, campaign direction, and brand architecture.' },
  { id: 3, align: 'right', title: 'Build Beyond the Brief', desc: 'Narratives, messaging, launch thinking, campaign direction, and brand architecture.' },
  { id: 4, align: 'left',  title: 'Build Beyond the Brief', desc: 'Narratives, messaging, launch thinking, campaign direction, and brand architecture.' },
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

    const init = async () => {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const section   = sectionRef.current
      const pathEl    = pathRef.current
      const traveller = travellerRef.current
      if (!section || !pathEl || !traveller) return

      // ── wait one extra frame so all rows are fully painted ──
      await new Promise<void>(res => requestAnimationFrame(() => requestAnimationFrame(() => res())))

      const buildPath = () => {
        // positions relative to the section's top-left
        const sr  = section.getBoundingClientRect()
        const H   = section.scrollHeight          // use scrollHeight, not offsetHeight
        const pts = iconRefs.current.map(el => {
          if (!el) return { x: section.offsetWidth / 2, y: 0 }
          const er = el.getBoundingClientRect()
          return {
            x: er.left - sr.left + er.width  / 2,
            y: er.top  - sr.top  + er.height / 2 + window.scrollY - (sr.top + window.scrollY) + (sr.top + window.scrollY - window.scrollY),
          }
        })

        // simpler: use offsetTop of each icon relative to section
        const ptsFixed = iconRefs.current.map(el => {
          if (!el) return { x: section.offsetWidth / 2, y: 0 }
          // walk up the DOM to get offset relative to section
          let top = 0, left = 0
          let node: HTMLElement | null = el
          while (node && node !== section) {
            top  += node.offsetTop
            left += node.offsetLeft
            node  = node.offsetParent as HTMLElement | null
          }
          return { x: left + el.offsetWidth / 2, y: top + el.offsetHeight / 2 }
        })

        const [p0, p1, p2, p4] = ptsFixed
        const d = [
          `M ${p0.x} 0`,
          `C ${p0.x} ${p0.y * 0.4}, ${p0.x} ${p0.y * 0.8}, ${p0.x} ${p0.y}`,
          `C ${p0.x} ${(p0.y + p1.y) / 2}, ${p1.x} ${(p0.y + p1.y) / 2}, ${p1.x} ${p1.y}`,
          `C ${p1.x} ${(p1.y + p2.y) / 2}, ${p2.x} ${(p1.y + p2.y) / 2}, ${p2.x} ${p2.y}`,
          `C ${p2.x} ${(p2.y + p4.y) / 2}, ${p4.x} ${(p2.y + p4.y) / 2}, ${p4.x} ${p4.y}`,
          `C ${p4.x} ${(p4.y + H) / 2}, ${p4.x} ${(p4.y + H) / 2}, ${p4.x} ${H}`,
          `L ${p4.x} ${H}`,
        ].join(' ')

        pathEl.setAttribute('d', d)
        return pathEl.getTotalLength()
      }

      let pathLen = buildPath()

      st = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',      // icon becomes visible as soon as section enters viewport
        end: 'bottom top',
        scrub: 0.6,               // snappier follow
        onEnter:      () => { traveller.style.opacity = '1' },
        onLeave:      () => { traveller.style.opacity = '0' },
        onEnterBack:  () => { traveller.style.opacity = '1' },
        onLeaveBack:  () => { traveller.style.opacity = '0' },
        onUpdate(self) {
          const dist = self.progress * pathLen
          const pt   = pathEl.getPointAtLength(dist)
          const pt2  = pathEl.getPointAtLength(Math.min(dist + 4, pathLen))
          const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180 / Math.PI
          traveller.style.left      = `${pt.x}px`
          traveller.style.top       = `${pt.y}px`
          traveller.style.transform = `translate(-50%,-50%) rotate(${angle}deg)`
        },
      })

      const onResize = () => {
        st?.kill()
        pathLen = buildPath()
      }
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }

    init()
    return () => { st?.kill() }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'linear-gradient(170deg,#1a5fa8 0%,#1a9fbf 50%,#1ecdb8 100%)',
        minHeight: '100vh',
        position: 'relative',
        padding: '6rem 0 10rem',
        fontFamily: 'sans-serif',
        color: '#fff',
        overflowX: 'hidden',
      }}
    >
      {/* Dashed S-curve — position:absolute so pt.x/pt.y map 1-to-1 */}
      <svg
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none', overflow: 'visible',
        }}
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          fill="none"
          // stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.5"
          strokeDasharray="8 10"
        />
      </svg>

      {/* Travelling icon — absolute inside section, moved by JS */}
      <div
        ref={travellerRef}
        style={{
          position: 'absolute', top: 0, left: 0,
          width: 80, height: 80,
          opacity: 0,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
          zIndex: 10,
          filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.25))',
        }}
      >
        <GlobeIcon />
      </div>

      {/* Service rows */}
      {services.map((s, i) => (
        <div
          key={s.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            padding: '5rem 0',
            maxWidth: 560,
            marginLeft:  s.align === 'left'  ? '8%' : 'auto',
            marginRight: s.align === 'right' ? '8%' : 'auto',
            flexDirection: s.align === 'right' ? 'row-reverse' : 'row',
          }}
        >
          <div
            ref={el => { iconRefs.current[i] = el }}
            style={{ width: 100, height: 100, flexShrink: 0 }}
          >
            <GlobeIcon />
          </div>

          <div>
            <p style={{
              fontSize: '0.7rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', fontWeight: 600,
              marginBottom: '0.5rem', color: 'rgba(255,255,255,0.9)',
            }}>
              {s.title}
            </p>
            <p style={{
              fontSize: '0.95rem', fontWeight: 300,
              lineHeight: 1.75, color: 'rgba(255,255,255,0.65)',
            }}>
              {s.desc}
            </p>
          </div>
        </div>
      ))}
    </section>
  )
}