import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LivePreview } from './LivePreview'
import { revealGroup } from '../../animations/reveal'

gsap.registerPlugin(ScrollTrigger)

const PROJECT_URL =
  'https://tipsplittingcalculator.vercel.app/#calculation'

const GITHUB_URL =
  'https://github.com/Daviddm03/tipSplittingCalculator'

export function TipSplitting() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLAnchorElement>(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const metadata = sectionRef.current?.querySelector('[data-scroll-reveal]') ?? null
      revealGroup(metadata, metadata)

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
      aria-labelledby="tip-title"
      className="relative px-6 pt-20 md:px-10 md:pt-24"
    >
      {/* Project metadata */}
      <div data-scroll-reveal data-reveal className="mb-12 flex items-center justify-between border-t border-[#1a2232] pt-5">
        <span className="text-xs uppercase tracking-[0.2em] text-[#7cb9ff]">
          02 / 03
        </span>

        <span className="text-xs uppercase tracking-[0.2em] text-[#8491a7]">
          2026
        </span>
      </div>

      {/* Project */}
      <div
        className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10"
      >
        {/* Project information */}
        <div ref={contentRef} data-reveal className="flex min-w-0 flex-col justify-between lg:col-span-5">
          <div>
            <h3 id="tip-title" className="text-[clamp(2.3rem,5.3vw,6.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.065em]">
              Tip Splitting
              <br />
              Calculator
              <span className="text-[#2563ff]">.</span>
            </h3>

            <p className="mt-8 max-w-sm text-base leading-relaxed text-[#8491a7] md:text-lg">
              A tip calculator inspired by my work in hospitality, distributing staff tips across hotel outlets based on days worked.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-widest text-[#8491a7]">
              <span>JavaScript</span>
              <span>HTML</span>
              <span>CSS</span>
            </div>
          </div>

          <div className="mt-10">
            <a
              href={GITHUB_URL}
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

        {/* Live preview */}
        <LivePreview ref={previewRef} url={PROJECT_URL} name="Tip Splitting Calculator" className="lg:col-span-7" />
      </div>

    </section>
  )
}
