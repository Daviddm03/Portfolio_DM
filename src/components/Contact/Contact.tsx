import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
    const ctx = gsap.context(() => {
      /*
       * SECTION INTRO
       */
      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          end: 'top 20%',
          scrub: 1,
        },
      })

      intro
        .from(eyebrowRef.current, {
          opacity: 0,
          x: -30,
          duration: 0.25,
        })
        .from(
          pretitleRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.25,
          },
          0.05,
        )
        .from(
          titleRef.current,
          {
            y: 150,
            opacity: 0,
            duration: 0.6,
            ease: 'power4.out',
          },
          0.1,
        )
        .from(
          infoRef.current,
          {
            opacity: 0,
            y: 50,
            duration: 0.4,
            ease: 'power3.out',
          },
          0.3,
        )

      /*
       * CONTACT LINKS
       */
      gsap.from('[data-contact-link]', {
        opacity: 0,
        x: -50,
        stagger: 0.12,

        scrollTrigger: {
          trigger: '[data-contact-links]',
          start: 'top 85%',
          end: 'center 65%',
          scrub: 1,
        },
      })

      /*
       * CLOSING MOMENT
       */
      const closing = gsap.timeline({
        scrollTrigger: {
          trigger: closingRef.current,
          start: 'top 75%',
          end: 'bottom bottom',
          scrub: 1,
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

      /*
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

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <section
      ref={sectionRef}
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
        className="relative z-10 mb-20 flex items-center gap-5"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-[#2563ff]">
          07
        </span>

        <div className="h-px flex-1 bg-[#1a2232]" />

        <span className="text-xs uppercase tracking-[0.25em] text-[#8491a7]">
          Contact
        </span>
      </div>

      {/* Hero contact */}
      <div className="relative z-10">
        <p
          ref={pretitleRef}
          className="mb-8 text-xs uppercase tracking-[0.28em] text-[#8491a7]"
        >
          Have an idea?
        </p>

        <div className="overflow-hidden">
          <h2
            ref={titleRef}
            className="text-[clamp(4.5rem,13vw,14rem)] font-semibold uppercase leading-[0.74] tracking-[-0.08em]"
          >
            Let's Build
            <br />

            <span className="inline-flex items-end">
              Something

              <span
                ref={dotRef}
                className="mb-[0.08em] ml-[0.04em] inline-block h-[0.12em] w-[0.12em] origin-center rounded-full bg-[#2563ff] shadow-[0_0_25px_rgba(37,99,255,0.7)]"
              />
            </span>
          </h2>
        </div>
      </div>

      {/* Contact information */}
      <div
        ref={infoRef}
        className="relative z-10 mt-28 grid grid-cols-1 gap-16 border-t border-[#1a2232] pt-10 md:grid-cols-12"
      >
        {/* Availability */}
        <div className="md:col-span-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8491a7]">
            Currently
          </span>

          <div className="mt-5 flex items-center gap-3">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute h-full w-full animate-ping rounded-full bg-[#2563ff] opacity-30" />

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
          className="md:col-span-8"
        >
          {/* Email */}
          <a
            data-contact-link
            href={`mailto:${EMAIL}`}
            className="group grid grid-cols-[80px_1fr_auto] items-center border-b border-[#1a2232] py-6"
          >
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#8491a7]">
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
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid grid-cols-[80px_1fr_auto] items-center border-b border-[#1a2232] py-6"
          >
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#8491a7]">
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
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid grid-cols-[80px_1fr_auto] items-center border-b border-[#1a2232] py-6"
          >
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#8491a7]">
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
        className="relative z-10 flex min-h-[65vh] flex-col justify-end pb-8 pt-32"
      >
        <div
          ref={closingTextRef}
          className="border-t border-[#1a2232] pt-6"
        >
          <div className="flex flex-col gap-8 text-[10px] uppercase tracking-[0.22em] text-[#8491a7] md:flex-row md:items-end md:justify-between">
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