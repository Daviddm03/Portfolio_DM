import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LivePreview } from './LivePreview'
import { revealGroup } from '../../animations/reveal'

gsap.registerPlugin(ScrollTrigger)

const PROJECT_URL = 'https://espaco-eventos-ycb5.vercel.app/'

export function EspacoEventos() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLAnchorElement>(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      sectionRef.current?.querySelectorAll('[data-scroll-reveal]').forEach(group => revealGroup(group, group))

      gsap.from(contentRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 82%',
          once: true,
        },
      })

      gsap.from(previewRef.current, {
        y: 70,
        rotateX: 5,
        scale: 0.96,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        transformPerspective: 1200,
        transformOrigin: 'center center',
        scrollTrigger: {
          trigger: previewRef.current,
          start: 'top 88%',
          once: true,
        },
      })
    }, sectionRef)

    return () => media.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      tabIndex={-1}
      aria-labelledby="work-title"
      className="relative px-6 pt-24 md:px-10 md:pt-32"
    >
      {/* Section heading */}
      <div data-scroll-reveal data-reveal className="mb-12">
        <h2 id="work-title" className="text-xs uppercase tracking-[0.2em] text-[#7cb9ff]">
          02 — Selected Work
        </h2>
      </div>

      {/* Project metadata */}
      <div data-scroll-reveal data-reveal className="mb-12 flex items-center justify-between border-t border-[#1a2232] pt-5">
        <span className="text-xs uppercase tracking-[0.2em] text-[#7cb9ff]">
          01 / 03
        </span>

        <span className="text-xs uppercase tracking-[0.2em] text-[#8491a7]">
          2026
        </span>
      </div>

      {/* Project */}
      <div
        className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10"
      >
        <div ref={contentRef} data-reveal className="flex min-w-0 flex-col justify-between lg:col-span-4">
          <div>
            <h3 id="espaco-title" className="text-[clamp(2.9rem,5.7vw,7rem)] font-semibold uppercase leading-[0.9] tracking-[-0.065em]">
              Espaço
              <br />
              Eventos
              <span className="text-[#2563ff]">.</span>
            </h3>

            <p className="mt-8 max-w-sm text-base leading-relaxed text-[#8491a7] md:text-lg">
              Website for an event venue in Porto Alegre, built to present the
              space, services and events while directing enquiries to
              WhatsApp.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-widest text-[#8491a7]">
              <span>React</span>
              <span>TypeScript</span>
              <span>GSAP</span>
              <span>Tailwind</span>
            </div>
          </div>

          <div className="mt-10">
            <a
              href="https://github.com/Daviddm03/EspacoEventos"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em]"
            >
              <span className="border-b border-[#2563ff] pb-1 transition-colors duration-300 group-hover:text-[#7cb9ff]">
                View source code
              </span>

              <span className="text-[#2563ff] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>
          </div>
        </div>

        <LivePreview ref={previewRef} url={PROJECT_URL} name="Espaço Eventos" className="lg:col-span-8" />
      </div>

    </section>
  )
}
