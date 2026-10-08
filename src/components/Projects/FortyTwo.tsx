import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { revealGroup } from '../../animations/reveal'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    command: './push_swap',
    name: 'push_swap',
    description:
      'Sorting integers with a restricted set of operations while optimizing the number of moves.',
    source: 'https://github.com/Daviddm03/push_swap-42',
  },
  {
    command: './so_long',
    name: 'so_long',
    description:
      'A small 2D game built in C, working with maps, textures, movement and event handling.',
    source: 'https://github.com/Daviddm03/so_long-42',
  },
  {
    command: './philo 5 800 200 200',
    name: 'philosophers',
    description:
      'A concurrency simulation built with threads and mutexes, exploring synchronization, shared resources and race conditions.',
    source: 'https://github.com/Daviddm03/philo',
  },
]

export function FortyTwo() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

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

      const terminal = gsap.timeline({
        scrollTrigger: {
          trigger: terminalRef.current,
          start: 'top 85%',
          once: true,
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

      terminal.scrollTrigger?.refresh()

      gsap.utils.toArray<HTMLElement>('[data-42-project]').forEach((project) => {
        gsap.from(project, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: project,
            start: 'top 88%',
            once: true,
          },
        })
      })
    }, sectionRef)

    return () => media.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="forty-two-title"
      className="relative px-6 pb-20 pt-20 md:px-10 md:pb-24 md:pt-24"
    >
      {/* Project metadata */}
      <div data-scroll-reveal data-reveal className="mb-12 flex items-center justify-between border-t border-[#1a2232] pt-5">
        <span className="text-xs uppercase tracking-[0.2em] text-[#7cb9ff]">
          03 / 03
        </span>

        <span className="text-xs uppercase tracking-[0.2em] text-[#8491a7]">
          2024
        </span>
      </div>

      <div
        className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10"
      >
        <div ref={contentRef} data-reveal className="min-w-0 lg:col-span-5">
          <h3 id="forty-two-title" className="text-[clamp(3rem,7vw,8rem)] font-semibold uppercase leading-[0.78] tracking-[-0.07em]">
            42
            <br />
            Porto
            <span className="text-[#2563ff]">.</span>
          </h3>

          <p className="mt-8 max-w-md text-base leading-relaxed text-[#8491a7] md:text-lg">
            C projects from 42 Porto covering algorithms, memory management, UNIX and concurrency.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.16em] text-[#8491a7]">
            <span>C</span>
            <span>UNIX</span>
            <span>Algorithms</span>
            <span>Git</span>
          </div>
        </div>

        <div
          ref={terminalRef}
          data-reveal
          className="min-w-0 overflow-hidden border border-[#1a2232] bg-[#05070d] font-mono shadow-[0_30px_100px_rgba(37,99,255,0.05)] lg:col-span-7"
        >
          <div className="flex h-11 items-center justify-between border-b border-[#1a2232] bg-[#080c16] px-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#8491a7]/30" />
              <span className="h-2 w-2 rounded-full bg-[#8491a7]/30" />
              <span className="h-2 w-2 rounded-full bg-[#8491a7]/30" />
            </div>

            <span className="text-xs tracking-[0.2em] text-[#8491a7]">
              david@42porto
            </span>

            <span className="text-xs text-[#7cb9ff]">
              ~/projects
            </span>
          </div>

          <div className="min-h-72 p-4 text-xs leading-7 md:p-8 md:text-sm">
            <div data-terminal-line>
              <span className="text-[#7cb9ff]">
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
              <span className="text-[#7cb9ff]">
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
              className="mt-8 flex items-center"
            >
              <span className="text-[#7cb9ff]">→</span>

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
            data-reveal
            className="grid grid-cols-1 gap-6 border-b border-[#1a2232] py-9 md:grid-cols-12 md:gap-8"
          >
            <div className="md:col-span-1">
              <span className="font-mono text-xs text-[#8491a7]">
                0{index + 1}
              </span>
            </div>

            <div className="wrap-break-word md:col-span-3">
              <span className="font-mono text-sm text-[#7cb9ff]">
                $
              </span>

              <span className="ml-3 font-mono text-sm">
                {project.command}
              </span>
            </div>

            <div className="md:col-span-5">
              <h4 className="text-xl font-medium uppercase tracking-[-0.03em] md:text-2xl">
                {project.name}
              </h4>

              <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#8491a7]">
                {project.description}
              </p>
            </div>

            <div className="flex items-center md:col-span-3 md:justify-end">
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em]"
              >
                <span className="border-b border-[#2563ff] pb-1 transition-colors duration-300 group-hover:text-[#7cb9ff]">
                  View source code
                </span>

                <span className="text-[#7cb9ff] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
