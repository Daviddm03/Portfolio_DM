import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    number: '01',
    title: 'Shift Schedule',
    status: 'Planned',
    type: 'Web App',
    description:
      'Staff scheduling built around shifts, availability and daily operations.',
    tech: ['React', 'TypeScript', 'Supabase'],
    visual: 'schedule',
  },
  {
    number: '02',
    title: 'Event & OS Manager',
    status: 'Exploring',
    type: 'Platform',
    description:
      'A workspace for events, tasks and service workflows in one place.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    visual: 'operations',
  },
  {
    number: '03',
    title: 'Room Service QR',
    status: 'Concept',
    type: 'Web App',
    description:
      'A QR-based ordering experience for hotel guests and service teams.',
    tech: ['React', 'TypeScript', 'QR'],
    visual: 'room-service',
  },
]

function ScheduleVisual() {
  return (
    <div className="w-full max-w-80 font-mono text-[10px] uppercase tracking-[0.12em] text-[#8491a7]">
      <div className="grid grid-cols-4 border-b border-[#1a2232] pb-3 text-center">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-x-3 gap-y-3">
        <span className="h-1 bg-[#2563ff]" />
        <span className="h-1 bg-[#1a2232]" />
        <span className="h-1 bg-[#2563ff]/40" />
        <span className="h-1 bg-[#2563ff]" />

        <span className="h-1 bg-[#1a2232]" />
        <span className="h-1 bg-[#2563ff]" />
        <span className="h-1 bg-[#2563ff]" />
        <span className="h-1 bg-[#1a2232]" />

        <span className="h-1 bg-[#2563ff]/40" />
        <span className="h-1 bg-[#2563ff]" />
        <span className="h-1 bg-[#1a2232]" />
        <span className="h-1 bg-[#2563ff]" />
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-[#1a2232] pt-3">
        <span>12 shifts</span>
        <span className="text-[#7cb9ff]">Week 04</span>
      </div>
    </div>
  )
}

function OperationsVisual() {
  return (
    <div className="w-full max-w-80 font-mono text-[10px] uppercase tracking-[0.12em]">
      <div className="flex items-center justify-between border-b border-[#1a2232] pb-3">
        <span className="text-[#8491a7]">Event 04</span>

        <span className="flex items-center gap-2 text-[#7cb9ff]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2563ff]" />
          Live
        </span>
      </div>

      <div className="space-y-3 pt-4">
        <div className="flex justify-between">
          <span className="text-[#8491a7]">Service</span>
          <span className="text-[#f4f7ff]">Active</span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#8491a7]">Team</span>
          <span className="text-[#f4f7ff]">08</span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#8491a7]">Tasks</span>
          <span className="text-[#f4f7ff]">12 / 16</span>
        </div>
      </div>

      <div className="mt-5 h-px w-full bg-[#1a2232]">
        <div className="h-px w-3/4 bg-[#2563ff]" />
      </div>
    </div>
  )
}

function RoomServiceVisual() {
  return (
    <div className="w-full max-w-80 font-mono text-[10px] uppercase tracking-[0.12em]">
      <div className="flex items-center justify-between border-b border-[#1a2232] pb-3">
        <span className="text-[#8491a7]">Room 412</span>
        <span className="text-[#7cb9ff]">Order #024</span>
      </div>

      <div className="space-y-3 pt-4">
        <div className="flex justify-between">
          <span className="text-[#8491a7]">Club Sandwich</span>
          <span className="text-[#f4f7ff]">01</span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#8491a7]">Sparkling Water</span>
          <span className="text-[#f4f7ff]">02</span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-[#1a2232] pt-3">
        <span className="text-[#8491a7]">3 items</span>
        <span className="text-[#7cb9ff]">Ready →</span>
      </div>
    </div>
  )
}

function ProjectVisual({ type }: { type: string }) {
  if (type === 'schedule') {
    return <ScheduleVisual />
  }

  if (type === 'operations') {
    return <OperationsVisual />
  }

  return <RoomServiceVisual />
}

export function BuildingNext() {
  const sectionRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const introRef = useRef<HTMLParagraphElement>(null)

  const [openProject, setOpenProject] = useState<string | null>(null)

  const hasHover = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

  useLayoutEffect(() => {
    const section = sectionRef.current

    if (!section) return

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (reduce) return

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          once: true,
        },
      })

      intro
        .from(eyebrowRef.current, {
          opacity: 0,
          x: -30,
          duration: 0.45,
          ease: 'power3.out',
        })
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 100,
            duration: 0.8,
            ease: 'power4.out',
          },
          0,
        )
        .from(
          introRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.55,
            ease: 'power3.out',
          },
          0.25,
        )

      const rows = gsap.utils.toArray<HTMLElement>(
        '[data-building-row]',
      )

      rows.forEach(row => {
        const line = row.querySelector('[data-building-line]')
        const content = row.querySelectorAll(
          '[data-building-content]',
        )

        gsap.set(line, {
          scaleX: 0,
          transformOrigin: 'left center',
        })

        gsap.set(content, {
          opacity: 0,
          y: 24,
        })

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 84%',
            once: true,
          },
        })

        timeline
          .to(line, {
            scaleX: 1,
            duration: 0.8,
            ease: 'power3.inOut',
          })
          .to(
            content,
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.05,
              ease: 'power3.out',
            },
            0.15,
          )
      })
    }, section)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="building-next"
      tabIndex={-1}
      aria-labelledby="building-title"
      className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32"
    >
      <div
        ref={eyebrowRef}
        className="mb-16 flex items-center gap-5"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-[#7cb9ff]">
          03 — Building Next
        </span>
      </div>

      <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
        <div className="overflow-hidden md:col-span-8">
          <h2
            ref={titleRef}
            id="building-title"
            className="text-[clamp(3rem,11vw,12rem)] font-semibold uppercase leading-[0.85] tracking-[-0.075em]"
          >
            Currently
            <br />
            Building
            <span className="text-[#2563ff]">.</span>
          </h2>
        </div>

        <div className="flex items-end md:col-span-4">
          <p
            ref={introRef}
            className="max-w-md text-base leading-relaxed text-[#8491a7] md:text-lg"
          >
            Ideas currently moving from concept into functional software.
          </p>
        </div>
      </div>

      <div className="mt-20 md:mt-28">
        <div className="hidden grid-cols-[80px_minmax(0,1fr)_180px_140px_40px] items-center gap-6 border-b border-[#1a2232] pb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8491a7] lg:grid">
          <span>Index</span>
          <span>Project</span>
          <span>Status</span>
          <span>Type</span>
          <span />
        </div>

        {projects.map(project => {
          const isOpen = openProject === project.number

          return (
            <article
              key={project.number}
              data-building-row
              onMouseEnter={() => {
                if (hasHover()) {
                  setOpenProject(project.number)
                }
              }}
              onMouseLeave={() => {
                if (hasHover()) {
                  setOpenProject(null)
                }
              }}
              className="group relative"
            >
              <div
                data-building-line
                className={`absolute bottom-0 left-0 h-px w-full transition-colors duration-500 ${
                  isOpen
                    ? 'bg-[#2563ff]'
                    : 'bg-[#1a2232] group-hover:bg-[#2563ff]/60'
                }`}
              />

              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => {
                  if (!hasHover()) {
                    setOpenProject(current =>
                      current === project.number
                        ? null
                        : project.number,
                    )
                  }
                }}
                className="grid w-full cursor-pointer grid-cols-[1fr_auto] gap-x-6 py-8 text-left lg:grid-cols-[80px_minmax(0,1fr)_180px_140px_40px] lg:items-center lg:gap-6 lg:py-10"
              >
                <div
                  data-building-content
                  className="col-start-1 row-start-1 lg:col-auto lg:row-auto"
                >
                  <span className="font-mono text-xs text-[#7cb9ff]">
                    {project.number}
                  </span>
                </div>

                <div
                  data-building-content
                  className="col-span-2 mt-8 lg:col-span-1 lg:mt-0"
                >
                  <h3 className="text-[clamp(2rem,3.4vw,3.5rem)] font-medium uppercase leading-[0.9] tracking-[-0.045em] transition-colors duration-300 group-hover:text-[#7cb9ff]">
                    {project.title}
                    <span className="text-[#2563ff]">.</span>
                  </h3>
                </div>

                <div
                  data-building-content
                  className="col-start-2 row-start-1 flex justify-end lg:col-auto lg:row-auto lg:justify-start"
                >
                  <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#7cb9ff]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2563ff]" />
                    {project.status}
                  </span>
                </div>

                <div
                  data-building-content
                  className="col-start-1 mt-5 lg:col-auto lg:mt-0"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8491a7]">
                    {project.type}
                  </span>
                </div>

                <div
                  data-building-content
                  className="col-start-2 mt-5 flex justify-end lg:col-auto lg:mt-0"
                >
                  <span
                    aria-hidden="true"
                    className={`text-lg text-[#7cb9ff] transition-transform duration-500 ${
                      isOpen ? 'rotate-90' : ''
                    }`}
                  >
                    →
                  </span>
                </div>
              </button>

              <div
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                  isOpen
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="grid gap-10 pb-10 lg:grid-cols-[80px_minmax(0,1fr)_minmax(280px,0.7fr)] lg:gap-6 lg:pb-12">
                    <div className="hidden lg:block" />

                    <div>
                      <p className="max-w-lg text-sm leading-relaxed text-[#8491a7] md:text-base">
                        {project.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                        {project.tech.map(tech => (
                          <span
                            key={tech}
                            className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8491a7]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div
                      aria-hidden="true"
                      className="flex items-center border-[#1a2232] lg:border-l lg:pl-10"
                    >
                      <ProjectVisual type={project.visual} />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}