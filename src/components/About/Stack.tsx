import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const groups = [
  {
    number: '01',
    label: 'Frontend',
    technologies: [
      'React',
      'TypeScript',
      'JavaScript',
      'HTML',
      'CSS',
      'Tailwind CSS',
    ],
  },
  {
    number: '02',
    label: 'Motion & UI',
    technologies: [
      'GSAP',
      'Responsive Design',
      'Accessibility',
      'Interaction Design',
    ],
  },
  {
    number: '03',
    label: 'Systems',
    technologies: [
      'C',
      'UNIX',
      'Algorithms',
      'Threads',
      'Mutexes',
      'Memory',
    ],
  },
  {
    number: '04',
    label: 'Tools',
    technologies: [
      'Git',
      'GitHub',
      'Vite',
      'VS Code',
      'Figma',
      'Linux',
    ],
  },
]

export function Stack() {
  const sectionRef = useRef<HTMLElement>(null)

  const eyebrowRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  const matrixRef = useRef<HTMLDivElement>(null)
  const scannerRef = useRef<HTMLDivElement>(null)

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
          titleRef.current,
          {
            y: 130,
            opacity: 0,
            duration: 0.55,
            ease: 'power4.out',
          },
          0,
        )
        .from(
          descriptionRef.current,
          {
            opacity: 0,
            y: 50,
            duration: 0.4,
            ease: 'power3.out',
          },
          0.15,
        )

      /*
       * MATRIX ENTRANCE
       */
      gsap.from(matrixRef.current, {
        opacity: 0,
        y: 80,

        scrollTrigger: {
          trigger: matrixRef.current,
          start: 'top 85%',
          end: 'top 55%',
          scrub: 1,
        },
      })

      /*
       * MATRIX ROWS
       */
      gsap.utils
        .toArray<HTMLElement>('[data-stack-row]')
        .forEach((row) => {
          const number = row.querySelector('[data-stack-number]')
          const label = row.querySelector('[data-stack-label]')
          const technologies = row.querySelectorAll('[data-technology]')

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: 'top 82%',
              end: 'center 60%',
              scrub: 1,
            },
          })

          timeline
            .from(number, {
              opacity: 0,
              x: -20,
              duration: 0.2,
            })
            .from(
              label,
              {
                opacity: 0,
                x: -30,
                duration: 0.25,
              },
              0,
            )
            .from(
              technologies,
              {
                opacity: 0,
                y: 25,
                stagger: 0.06,
                duration: 0.3,
              },
              0.08,
            )
        })

      /*
       * BLUE SCANNER
       */
      gsap.fromTo(
        scannerRef.current,
        {
          yPercent: -100,
        },
        {
          yPercent: 500,
          ease: 'none',

          scrollTrigger: {
            trigger: matrixRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        },
      )

      /*
       * LARGE DECORATIVE TEXT
       */
      gsap.fromTo(
        '[data-stack-background]',
        {
          xPercent: -10,
        },
        {
          xPercent: 8,
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

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 pb-40 pt-24 md:px-10"
    >
      {/* Decorative word */}
      <div
        data-stack-background
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[20%] whitespace-nowrap text-[25vw] font-semibold uppercase leading-none tracking-[-0.08em] text-[#0a1020]"
      >
        Stack
      </div>

      {/* Section label */}
      <div
        ref={eyebrowRef}
        className="relative z-10 mb-16 flex items-center gap-5"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-[#2563ff]">
          06
        </span>

        <div className="h-px flex-1 bg-[#1a2232]" />

        <span className="text-xs uppercase tracking-[0.25em] text-[#8491a7]">
          Tools & Technologies
        </span>
      </div>

      {/* Heading */}
      <div className="relative z-10 grid grid-cols-1 gap-14 md:grid-cols-12">
        <div className="overflow-hidden md:col-span-8">
          <h2
            ref={titleRef}
            className="text-[clamp(4.5rem,11vw,12rem)] font-semibold uppercase leading-[0.76] tracking-[-0.075em]"
          >
            What I
            <br />
            Work With
            <span className="text-[#2563ff]">.</span>
          </h2>
        </div>

        <div className="flex items-end md:col-span-4">
          <p
            ref={descriptionRef}
            className="max-w-md text-lg leading-relaxed text-[#8491a7]"
          >
            Technologies are tools. I choose them around the problem,
            the experience and what the product actually needs.
          </p>
        </div>
      </div>

      {/* Technical matrix */}
      <div
        ref={matrixRef}
        className="relative z-10 mx-auto mt-32 max-w-7xl overflow-hidden border-t border-[#1a2232]"
      >
        {/* Scanner */}
        <div
          ref={scannerRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-0 z-20 h-px bg-[#2563ff] opacity-60 shadow-[0_0_30px_4px_rgba(37,99,255,0.2)]"
        />

        {groups.map((group) => (
          <div
            key={group.label}
            data-stack-row
            className="group grid grid-cols-1 border-b border-[#1a2232] py-10 transition-colors duration-500 hover:bg-[#0a1020]/40 md:grid-cols-12 md:py-14"
          >
            {/* Number */}
            <div className="md:col-span-1">
              <span
                data-stack-number
                className="font-mono text-xs text-[#2563ff]"
              >
                {group.number}
              </span>
            </div>

            {/* Category */}
            <div className="mt-4 md:col-span-3 md:mt-0">
              <h3
                data-stack-label
                className="text-xl font-medium uppercase tracking-tight md:text-2xl"
              >
                {group.label}
              </h3>
            </div>

            {/* Technologies */}
            <div className="mt-8 flex flex-wrap gap-x-3 gap-y-3 md:col-span-8 md:mt-0">
              {group.technologies.map((technology) => (
                <span
                  key={technology}
                  data-technology
                  className="border border-[#1a2232] px-4 py-2 text-xs uppercase tracking-[0.16em] text-[#8491a7] transition-all duration-300 hover:border-[#2563ff] hover:text-[#f4f7ff]"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Philosophy */}
      <div className="relative z-10 mx-auto mt-32 max-w-7xl">
        <div className="grid grid-cols-1 gap-12 border-b border-[#1a2232] pb-24 md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#2563ff]">
              Approach
            </span>
          </div>

          <div className="md:col-span-9">
            <p className="max-w-5xl text-[clamp(2rem,4vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.045em]">
              I don't want to collect technologies.
              <span className="text-[#8491a7]">
                {' '}
                I want to understand how to use them to build better
                products.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Current focus */}
      <div className="relative z-10 mx-auto mt-20 max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8491a7]">
              Current Focus
            </span>
          </div>

          <div className="md:col-span-9">
            <div className="flex flex-wrap gap-x-10 gap-y-5">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#2563ff] shadow-[0_0_12px_#2563ff]" />

                <span className="text-sm uppercase tracking-[0.16em]">
                  Frontend Engineering
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#2563ff] shadow-[0_0_12px_#2563ff]" />

                <span className="text-sm uppercase tracking-[0.16em]">
                  Software Engineering
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#2563ff] shadow-[0_0_12px_#2563ff]" />

                <span className="text-sm uppercase tracking-[0.16em]">
                  Product Development
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transition to final section */}
      <div className="relative z-10 mt-40 flex items-center gap-5">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#8491a7]">
          One last thing
        </span>

        <div className="h-px flex-1 bg-[#1a2232]" />

        <span className="text-[#2563ff]">
          ↓
        </span>
      </div>
    </section>
  )
}