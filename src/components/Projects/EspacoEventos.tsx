import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECT_URL = 'https://espaco-eventos-ycb5.vercel.app/'

export function EspacoEventos() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLAnchorElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
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
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative px-6 pt-24 md:px-10 md:pt-32"
    >
      {/* Section heading */}
      <div className="mb-20">
        <span className="text-xs uppercase tracking-[0.25em] text-[#2563ff]">
          02 — Selected Work
        </span>
      </div>

      {/* Project metadata */}
      <div className="mb-12 flex items-center justify-between border-t border-[#1a2232] pt-5">
        <span className="text-xs uppercase tracking-[0.2em] text-[#2563ff]">
          01 / 03
        </span>

        <span className="text-xs uppercase tracking-[0.2em] text-[#8491a7]">
          2026
        </span>
      </div>

      {/* Project */}
      <div
        ref={contentRef}
        className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14"
      >
        <div className="flex flex-col justify-between lg:col-span-4">
          <div>
            <h2 className="text-[clamp(3.5rem,6vw,7rem)] font-semibold uppercase leading-[0.8] tracking-[-0.065em]">
              Espaço
              <br />
              Eventos
              <span className="text-[#2563ff]">.</span>
            </h2>

            <p className="mt-8 max-w-sm text-base leading-relaxed text-[#8491a7] md:text-lg">
              Website for an event venue in Porto Alegre, built to present the
              space, services and events while directing enquiries to
              WhatsApp.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.18em] text-[#8491a7]">
              <span>React</span>
              <span>TypeScript</span>
              <span>GSAP</span>
              <span>Tailwind</span>
            </div>
          </div>

          <div className="mt-10 lg:mt-0">
            <a
              href={PROJECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em]"
            >
              <span className="border-b border-[#2563ff] pb-1 transition-colors duration-300 group-hover:text-[#7cb9ff]">
                View live project
              </span>

              <span className="text-[#2563ff] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>
          </div>
        </div>

        <a
          ref={previewRef}
          href={PROJECT_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Espaço Eventos live website"
          className="group relative block overflow-hidden border border-[#1a2232] bg-[#0a1020] shadow-[0_30px_100px_rgba(37,99,255,0.06)] will-change-transform lg:col-span-8"
        >
          <div className="flex h-11 items-center justify-between border-b border-[#1a2232] bg-[#080c16] px-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#8491a7]/30" />
              <span className="h-2 w-2 rounded-full bg-[#8491a7]/30" />
              <span className="h-2 w-2 rounded-full bg-[#8491a7]/30" />
            </div>

            <span className="text-[9px] uppercase tracking-[0.2em] text-[#8491a7]">
              Live Preview
            </span>

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2563ff] shadow-[0_0_10px_#2563ff]" />

              <span className="text-[9px] uppercase tracking-[0.2em] text-[#2563ff]">
                Live
              </span>
            </div>
          </div>

          <div className="relative aspect-video overflow-hidden bg-[#05070d]">
            <iframe
              src={PROJECT_URL}
              title="Espaço Eventos website preview"
              loading="lazy"
              tabIndex={-1}
              className="pointer-events-none h-full w-full border-0"
            />

            <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/45" />

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="translate-y-3 text-center transition-transform duration-500 group-hover:translate-y-0">
                <span className="block text-[9px] uppercase tracking-[0.25em] text-white/60">
                  Live project
                </span>

                <span className="mt-3 block text-sm font-medium uppercase tracking-[0.18em] text-white">
                  Open website ↗
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#1a2232] bg-[#080c16] px-4 py-3">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#8491a7]">
              Website
            </span>

            <span className="text-[9px] uppercase tracking-[0.2em] transition-colors duration-300 group-hover:text-[#7cb9ff]">
              Visit ↗
            </span>
          </div>
        </a>
      </div>

      {/* Standard project divider */}
      <div className="mt-24 h-px w-full bg-[#1a2232]" />
    </section>
  )
}