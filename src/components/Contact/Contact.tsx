import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { revealGroup } from '../../animations/reveal'

gsap.registerPlugin(ScrollTrigger)

const EMAIL = 'diasmontanodavid@gmail.com'
const GITHUB_URL = 'https://github.com/Daviddm03'
const LINKEDIN_URL = 'https://www.linkedin.com/in/ddias-mo03/'

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  const eyebrowRef = useRef<HTMLDivElement>(null)
  const pretitleRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  const dotRef = useRef<HTMLSpanElement>(null)
  const closingRef = useRef<HTMLDivElement>(null)
  const closingTextRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      /**
       * SECTION INTRO
       */
      revealGroup([eyebrowRef.current, pretitleRef.current, titleRef.current], sectionRef.current)
      revealGroup(infoRef.current, infoRef.current)

      /**
       * CONTACT LINKS
       */
      const links = sectionRef.current?.querySelector('[data-contact-links]') ?? null
      revealGroup(links, links)

      /**
       * CLOSING MOMENT
       */
      const closing = gsap.timeline({
        scrollTrigger: {
          trigger: closingRef.current,
          start: 'top 92%',
          once: true,
        },
      })

      closing
        .from(closingTextRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.3,
        })
        .to(
          dotRef.current,
          {
            scale: 2.5,
            boxShadow: '0 0 45px rgba(37, 99, 255, 0.9)',
            duration: 0.25,
            ease: 'power2.out',
          },
          0.2,
        )

      closing.scrollTrigger?.refresh()

      /**
       * BACKGROUND BLUE GLOW
       */
      gsap.fromTo(
        '[data-contact-glow]',
        {
          opacity: 0,
          scale: 0.7,
        },
        {
          opacity: 1,
          scale: 1.2,
          ease: 'none',

          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom bottom',
            scrub: 1,
          },
        },
      )
    }, sectionRef)

    return () => media.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
      className="relative min-h-screen overflow-hidden px-6 pt-24 md:px-10"
    >
      {/* Background glow */}
      <div
        data-contact-glow
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-30vw] left-1/2 h-[70vw] w-[70vw] -translate-x-1/2 rounded-full bg-[#2563ff]/10 blur-[140px]"
      />

      {/* Section label */}
      <div
        ref={eyebrowRef}
        data-scroll-reveal
        data-reveal
        className="relative z-10 mb-20 flex items-center gap-5"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-[#7cb9ff]">
          06 — Contact
        </span>
      </div>

      {/* Hero contact */}
      <div className="relative z-10">
        <p
          ref={pretitleRef}
          data-scroll-reveal
          data-reveal
          className="mb-8 text-xs uppercase tracking-[0.28em] text-[#8491a7]"
        >
          Have an idea?
        </p>

        <div className="overflow-hidden">
          <h2
            ref={titleRef}
            data-scroll-reveal
            data-reveal
            id="contact-title"
            className="text-[clamp(2.9rem,12vw,14rem)] font-semibold uppercase leading-[0.85] tracking-[-0.08em]"
          >
            Let's Build
            <br />

            <span className="inline-flex items-end">
              Something

              <span
                ref={dotRef}
                aria-hidden="true"
                className="mb-[0.08em] ml-[0.04em] inline-block h-[0.12em] w-[0.12em] origin-center rounded-full bg-[#2563ff] shadow-[0_0_25px_rgba(37,99,255,0.7)]"
              />
            </span>
          </h2>
        </div>
      </div>

      {/* Contact information */}
      <div
        className="relative z-10 mt-16 grid grid-cols-1 gap-16 border-t border-[#1a2232] pt-10 md:grid-cols-12"
      >
        {/* Availability */}
        <div ref={infoRef} data-scroll-reveal data-reveal className="md:col-span-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3 items-center justify-center">

              <span className="relative h-2 w-2 rounded-full bg-[#2563ff]" />
            </span>

            <span className="text-sm uppercase tracking-[0.16em]">
              Open to opportunities
            </span>
          </div>

          <p className="mt-6 max-w-xs text-sm leading-relaxed text-[#8491a7]">
            Interested in software engineering opportunities, collaborations
            and products worth building.
          </p>
        </div>

        {/* Links */}
        <div
          data-contact-links
          data-scroll-reveal
          data-reveal
          className="md:col-span-8"
        >
          {/* Email */}
          <a
            data-contact-link
            data-reveal
            href={`mailto:${EMAIL}`}
            className="group grid grid-cols-[56px_minmax(0,1fr)_auto] gap-3 md:grid-cols-[80px_minmax(0,1fr)_auto] items-center border-b border-[#1a2232] py-6"
          >
            <span className="text-xs uppercase tracking-[0.22em] text-[#8491a7]">
              Email
            </span>

            <span className="break-all text-lg transition-colors duration-300 group-hover:text-[#7cb9ff] md:text-2xl">
              {EMAIL}
            </span>

            <span className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
              ↗
            </span>
          </a>

          {/* GitHub */}
          <a
            data-contact-link
            data-reveal
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid grid-cols-[56px_minmax(0,1fr)_auto] gap-3 md:grid-cols-[80px_minmax(0,1fr)_auto] items-center border-b border-[#1a2232] py-6"
          >
            <span className="text-xs uppercase tracking-[0.22em] text-[#8491a7]">
              GitHub
            </span>

            <span className="text-lg transition-colors duration-300 group-hover:text-[#7cb9ff] md:text-2xl">
              Daviddm03
            </span>

            <span className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
              ↗
            </span>
          </a>

          {/* LinkedIn */}
          <a
            data-contact-link
            data-reveal
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid grid-cols-[56px_minmax(0,1fr)_auto] gap-3 md:grid-cols-[80px_minmax(0,1fr)_auto] items-center border-b border-[#1a2232] py-6"
          >
            <span className="text-xs uppercase tracking-[0.22em] text-[#8491a7]">
              LinkedIn
            </span>

            <span className="text-lg transition-colors duration-300 group-hover:text-[#7cb9ff] md:text-2xl">
              David Montaño
            </span>

            <span className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
              ↗
            </span>
          </a>
        </div>
      </div>

      {/* Closing */}
      <div
        ref={closingRef}
        className="relative z-10 flex flex-col justify-end pb-8 pt-24"
      >
        <div
          ref={closingTextRef}
          className="border-t border-[#1a2232] pt-6"
        >
          <div className="flex flex-col gap-8 text-xs uppercase tracking-[0.22em] text-[#8491a7] md:flex-row md:items-end md:justify-between">
            <div>
              <span className="block">
                David Montaño
              </span>

              <span className="mt-2 block">
                Software Developer
              </span>
            </div>

            <div className="md:text-center">
              <span className="block">
                Porto, Portugal
              </span>

              <span className="mt-2 block">
                2026
              </span>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="group w-fit cursor-pointer text-left text-[#f4f7ff]"
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">
                ↑
              </span>

              <span className="ml-3">
                Back to top
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
