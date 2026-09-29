import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    command: './push_swap',
    name: 'push_swap',
    description:
      'Sorting integers with a restricted set of operations while optimizing the number of moves.',
    output: '100 numbers → optimized instruction set',
  },
  {
    command: './so_long',
    name: 'so_long',
    description:
      'A small 2D game built in C, working with maps, textures, movement and event handling.',
    output: 'map.ber → game initialized',
  },
  {
    command: './philo 5 800 200 200',
    name: 'philosophers',
    description:
      'A concurrency simulation built with threads and mutexes, exploring synchronization, shared resources and race conditions.',
    output: '5 philosophers → simulation running',
  },
]

export function FortyTwo() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

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

      const terminal = gsap.timeline({
        scrollTrigger: {
          trigger: terminalRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      terminal
        .from(terminalRef.current, {
          y: 60,
          opacity: 0,
          scale: 0.97,
          duration: 0.8,
          ease: 'power3.out',
        })
        .from(
          '[data-terminal-line]',
          {
            y: 15,
            opacity: 0,
            stagger: 0.1,
            duration: 0.3,
            ease: 'power2.out',
          },
          '-=0.4',
        )

      gsap.utils.toArray<HTMLElement>('[data-42-project]').forEach((project) => {
        gsap.from(project, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: project,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative px-6 pb-32 pt-20 md:px-10 md:pb-40 md:pt-24"
    >
      {/* Project metadata */}
      <div className="mb-12 flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.2em] text-[#2563ff]">
          03 / 03
        </span>

        <span className="text-xs uppercase tracking-[0.2em] text-[#8491a7]">
          42 Porto
        </span>
      </div>

      <div
        ref={contentRef}
        className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14"
      >
        <div className="lg:col-span-5">
          <h2 className="text-[clamp(4rem,7vw,8rem)] font-semibold uppercase leading-[0.78] tracking-[-0.07em]">
            42
            <br />
            Porto
            <span className="text-[#2563ff]">.</span>
          </h2>

          <p className="mt-8 max-w-md text-base leading-relaxed text-[#8491a7] md:text-lg">
            Learning software engineering from the foundations through
            algorithms, memory management, UNIX, concurrency and problem
            solving in C.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#8491a7]">
            <span>C</span>
            <span>UNIX</span>
            <span>Algorithms</span>
            <span>Git</span>
          </div>
        </div>

        <div
          ref={terminalRef}
          className="overflow-hidden border border-[#1a2232] bg-[#05070d] font-mono shadow-[0_30px_100px_rgba(37,99,255,0.05)] lg:col-span-7"
        >
          <div className="flex h-11 items-center justify-between border-b border-[#1a2232] bg-[#080c16] px-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#8491a7]/30" />
              <span className="h-2 w-2 rounded-full bg-[#8491a7]/30" />
              <span className="h-2 w-2 rounded-full bg-[#8491a7]/30" />
            </div>

            <span className="text-[9px] tracking-[0.2em] text-[#8491a7]">
              david@42porto
            </span>

            <span className="text-[9px] text-[#2563ff]">
              ~/projects
            </span>
          </div>

          <div className="min-h-82.5 p-6 text-xs leading-7 md:p-8 md:text-sm">
            <div data-terminal-line>
              <span className="text-[#2563ff]">
                david@42porto
              </span>

              <span className="text-[#8491a7]">:</span>

              <span className="text-[#7cb9ff]">
                ~/projects
              </span>

              <span className="text-[#8491a7]">$</span>{' '}

              <span>ls</span>
            </div>

            <div
              data-terminal-line
              className="mt-2 flex flex-wrap gap-x-6 text-[#8491a7]"
            >
              <span>libft/</span>
              <span>ft_printf/</span>
              <span>get_next_line/</span>
              <span className="text-[#f4f7ff]">push_swap/</span>
              <span className="text-[#f4f7ff]">so_long/</span>
              <span className="text-[#f4f7ff]">philosophers/</span>
            </div>

            <div data-terminal-line className="mt-8">
              <span className="text-[#2563ff]">
                david@42porto
              </span>

              <span className="text-[#8491a7]">:</span>

              <span className="text-[#7cb9ff]">
                ~/projects
              </span>

              <span className="text-[#8491a7]">$</span>{' '}

              <span>cat selected_projects.txt</span>
            </div>

            <div
              data-terminal-line
              className="mt-3 text-[#8491a7]"
            >
              Loading selected projects...
            </div>

            <div
              data-terminal-line
              className="mt-8 flex items-center"
            >
              <span className="text-[#2563ff]">→</span>

              <span className="ml-3">
                projects loaded
              </span>

              <span className="ml-2 inline-block h-4 w-1.75 bg-[#2563ff]" />
            </div>
          </div>
        </div>
      </div>

      {/* Selected 42 projects */}
      <div className="mt-24 border-t border-[#1a2232]">
        {projects.map((project, index) => (
          <article
            key={project.name}
            data-42-project
            className="grid grid-cols-1 gap-6 border-b border-[#1a2232] py-9 md:grid-cols-12 md:gap-8"
          >
            <div className="md:col-span-1">
              <span className="font-mono text-xs text-[#8491a7]">
                0{index + 1}
              </span>
            </div>

            <div className="md:col-span-3">
              <span className="font-mono text-sm text-[#2563ff]">
                $
              </span>

              <span className="ml-3 font-mono text-sm">
                {project.command}
              </span>
            </div>

            <div className="md:col-span-5">
              <h3 className="text-xl font-medium uppercase tracking-[-0.03em] md:text-2xl">
                {project.name}
              </h3>

              <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#8491a7]">
                {project.description}
              </p>
            </div>

            <div className="flex items-end md:col-span-3 md:justify-end">
              <div className="font-mono text-xs md:text-right">
                <span className="block uppercase tracking-[0.18em] text-[#8491a7]">
                  Output
                </span>

                <span className="mt-2 block text-[#7cb9ff]">
                  {project.output}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}