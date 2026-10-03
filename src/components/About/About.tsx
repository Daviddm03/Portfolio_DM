import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const journey = [
  {
    number: '01',
    label: 'Brazil',
    title: 'Where it started.',
    description:
      'Born in Brazil, where curiosity for technology and building things started long before software became the direction.',
  },
  {
    number: '02',
    label: 'Portugal',
    title: 'A new environment.',
    description:
      'Moving to Portugal meant adapting quickly, learning through experience and building a new path from the ground up.',
  },
  {
    number: '03',
    label: 'Hospitality',
    title: 'Learning from real operations.',
    description:
      'Working in hospitality developed communication, attention to detail and the ability to solve problems in fast-moving environments.',
  },
  {
    number: '04',
    label: '42 Porto',
    title: 'Engineering from the foundations.',
    description:
      'At 42 Porto, software became more than interfaces — algorithms, memory, UNIX, concurrency and learning how to solve difficult problems independently.',
  },
  {
    number: '05',
    label: 'ISTEC',
    title: 'Taking software further.',
    description:
      'Studying Software Engineering at ISTEC, expanding the practical foundation with a broader understanding of software development, systems and engineering principles.',
  },
  {
    number: '06',
    label: 'Software',
    title: 'Turning problems into products.',
    description:
      'Today, I combine engineering, design and real-world experience to build digital products that are useful, intentional and enjoyable to use.',
  },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)

  const eyebrowRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const introRef = useRef<HTMLDivElement>(null)

  const journeyRef = useRef<HTMLDivElement>(null)
  const journeyLineRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      /*
       * ABOUT INTRO
       */
      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          end: 'top 20%',
          scrub: 1,
          once: true,
        },
      })

      intro
        .from(eyebrowRef.current, {
          opacity: 0,
          x: -30,
          duration: 0.25,
        })
        .from(
          titleRef.current,
          {
            y: 140,
            opacity: 0,
            duration: 0.55,
            ease: 'power4.out',
          },
          0,
        )
        .from(
          introRef.current,
          {
            y: 60,
            opacity: 0,
            duration: 0.4,
            ease: 'power3.out',
          },
          0.15,
        )

      // Initialize the populated timeline before later triggers refresh it.
      // A once-only timeline can remove itself during a deferred refresh.
      intro.scrollTrigger?.refresh()

      /*
       * JOURNEY LINE
       */
      gsap.fromTo(
        journeyLineRef.current,
        {
          scaleY: 0,
          transformOrigin: 'top center',
        },
        {
          scaleY: 1,
          ease: 'none',

          scrollTrigger: {
            trigger: journeyRef.current,
            start: 'top 65%',
            end: 'bottom 65%',
            scrub: 1,
          },
        },
      )

      /*
       * JOURNEY ITEMS
       */
      gsap.utils
        .toArray<HTMLElement>('[data-journey-item]')
        .forEach((item) => {
          const content = item.querySelector('[data-journey-content]')
          const dot = item.querySelector('[data-journey-dot]')

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'center 58%',
              scrub: 1,
              once: true,
            },
          })

          timeline
            .from(dot, {
              scale: 0,
              opacity: 0,
              duration: 0.2,
              ease: 'back.out(2)',
            })
            .from(
              content,
              {
                opacity: 0,
                y: 60,
                duration: 0.45,
                ease: 'power3.out',
              },
              0.05,
            )

          timeline.scrollTrigger?.refresh()
        })

      /*
       * LARGE BACKGROUND WORD
       */
      gsap.fromTo(
        '[data-about-background]',
        {
          xPercent: 10,
        },
        {
          xPercent: -15,
          ease: 'none',

          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        },
      )
    }, sectionRef)

    return () => media.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      tabIndex={-1}
      aria-labelledby="about-title"
      className="relative overflow-hidden px-6 pb-20 pt-24 md:px-10 md:pb-24"
    >
      {/* Decorative background word */}
      <div
        data-about-background
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[24%] whitespace-nowrap text-[28vw] font-semibold uppercase leading-none tracking-[-0.08em] text-[#0a1020]"
      >
        About
      </div>

      {/* Section label */}
      <div
        ref={eyebrowRef}
        className="relative z-10 mb-16 flex items-center gap-5"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-[#7cb9ff]">
          04 — About
        </span>
      </div>

      {/* Heading */}
      <div className="relative z-10 grid grid-cols-1 gap-14 md:grid-cols-12">
        <div className="overflow-hidden md:col-span-8">
          <h2
            ref={titleRef}
            id="about-title"
            className="text-[clamp(3rem,11vw,12rem)] font-semibold uppercase leading-[0.85] tracking-[-0.075em]"
          >
            Beyond
            <br />
            The Code
            <span className="text-[#2563ff]">.</span>
          </h2>
        </div>

        <div
          ref={introRef}
          className="flex items-end md:col-span-4"
        >
          <div>
            <p className="max-w-md text-xl leading-relaxed text-[#f4f7ff]">
              Software is where different parts of my experience finally
              started connecting.
            </p>

            <p className="mt-6 max-w-md leading-relaxed text-[#8491a7]">
              Moving countries, working with people and learning engineering
              shaped the way I approach problems today.
            </p>
          </div>
        </div>
      </div>

      {/* Journey */}
      <div
        ref={journeyRef}
        className="relative z-10 mx-auto mt-20 max-w-6xl md:mt-24"
      >
        {/* Timeline */}
        <div className="absolute bottom-0 left-1.75 top-0 w-px bg-[#1a2232] md:left-1/2 md:-translate-x-1/2">
          <div
            ref={journeyLineRef}
            className="absolute inset-0 origin-top bg-[#2563ff] shadow-[0_0_20px_rgba(37,99,255,0.35)]"
          />
        </div>

        {journey.map((item, index) => {
          const isRight = index % 2 !== 0
          return (
            <article key={item.number} data-journey-item
              className="relative grid grid-cols-[16px_minmax(0,1fr)] gap-6 pb-16 md:grid-cols-2 md:gap-0 md:pb-20">
              <div data-journey-dot aria-hidden="true"
                className="absolute left-0 top-1 z-20 h-4 w-4 rounded-full border-2 border-[#2563ff] bg-[#05070d] md:left-1/2 md:h-5 md:w-5 md:-translate-x-1/2" />
              <span data-journey-number aria-hidden="true"
                className={`absolute top-1 hidden font-mono text-xs text-[#8491a7] md:block ${isRight ? 'right-[calc(50%+4rem)]' : 'left-[calc(50%+4rem)]'}`}>
                {item.number}
              </span>
              <div data-journey-content
                className={`col-start-2 min-w-0 md:row-start-1 ${isRight ? 'md:col-start-2 md:pl-16' : 'md:col-start-1 md:pr-16 md:text-right'}`}>
                <span className="text-xs uppercase tracking-[0.16em] text-[#7cb9ff]">{item.label}</span>
                <h3 className="mt-4 text-[clamp(1.75rem,3.3vw,3rem)] font-medium uppercase leading-[1.05] tracking-[-0.045em]">{item.title}</h3>
                <p className="mt-5 leading-relaxed text-[#8491a7]">{item.description}</p>
              </div>
            </article>
          )
        })}

        {/* Timeline end */}
        <div className="relative grid grid-cols-[16px_1fr] gap-8 md:block">
          <div className="relative z-20 flex justify-center md:absolute md:left-1/2 md:-translate-x-1/2">
            <div className="h-4 w-4 rounded-full bg-[#2563ff] shadow-[0_0_30px_#2563ff] md:h-5 md:w-5" />
          </div>

          <div className="pb-6 md:pt-16 md:text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8491a7]">
              Still building.
            </span>
          </div>
        </div>
      </div>

    </section>
  )
}
