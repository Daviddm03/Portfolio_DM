import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function BuildingNext() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const siteRef = useRef<HTMLDivElement>(null)
  const craneTrolleyRef = useRef<SVGGElement>(null)
  const craneCableRef = useRef<SVGLineElement>(null)
  const craneHookRef = useRef<SVGGElement>(null)
  const shiftBlockRef = useRef<SVGGElement>(null)
  const truckRef = useRef<HTMLDivElement>(null)
  const blueprintRef = useRef<HTMLDivElement>(null)
  const qrRef = useRef<HTMLDivElement>(null)
  const cranePanelRef = useRef<HTMLDivElement>(null)
  const truckPanelRef = useRef<HTMLDivElement>(null)
  const hasPlayedRef = useRef(false)

  useLayoutEffect(() => {
    let refreshing = false
    let refreshFrame = 0

    const refreshStarted = () => {
      refreshing = true
    }

    const refreshFinished = () => {
      cancelAnimationFrame(refreshFrame)
      refreshFrame = requestAnimationFrame(() => {
        refreshing = false
      })
    }

    ScrollTrigger.addEventListener('refreshInit', refreshStarted)
    ScrollTrigger.addEventListener('refresh', refreshFinished)

    const media = gsap.matchMedia()

    media.add(
      {
        all: 'all',
        desktop: '(min-width: 1024px)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      context => {
        const site = siteRef.current
        const panel = truckPanelRef.current

        if (!site || !panel) return

        const reduce = context.conditions?.reduce
        const desktop = context.conditions?.desktop

        const truckScale = () =>
          Math.min(1, (panel.clientWidth * 0.9) / 288)

        const truckPosition = () =>
          (panel.clientWidth - 288 * truckScale()) / 2 -
          panel.clientWidth * 0.05

        const setInitialState = () => {
          site.dataset.state = 'armed'

          gsap.set(craneTrolleyRef.current, {
            x: -115,
          })

          gsap.set(craneCableRef.current, {
            attr: { y2: 140 },
          })

          gsap.set(craneHookRef.current, {
            y: -30,
          })

          gsap.set(shiftBlockRef.current, {
            x: -115,
            y: -105,
          })

          gsap.set(truckRef.current, {
            x: -320,
            scale: truckScale(),
            transformOrigin: 'left bottom',
          })

          gsap.set('[data-blueprint-line-x]', {
            scaleX: 0,
            transformOrigin: 'left center',
          })

          gsap.set('[data-blueprint-line-y]', {
            scaleY: 0,
            transformOrigin: 'center top',
          })

          gsap.set('[data-blueprint-content]', {
            opacity: 0,
            y: 12,
          })

          gsap.set(qrRef.current, {
            opacity: 0,
            scale: 0.85,
          })
        }

        const setFinishedState = () => {
          site.dataset.state = 'finished'

          gsap.set(craneTrolleyRef.current, {
            x: -40,
          })

          gsap.set(craneCableRef.current, {
            attr: { y2: 140 },
          })

          gsap.set(craneHookRef.current, {
            y: -30,
          })

          gsap.set(shiftBlockRef.current, {
            x: -40,
            y: 0,
          })

          gsap.set(truckRef.current, {
            x: truckPosition(),
            scale: truckScale(),
            transformOrigin: 'left bottom',
          })

          gsap.set('[data-blueprint-line-x]', {
            scaleX: 1,
          })

          gsap.set('[data-blueprint-line-y]', {
            scaleY: 1,
          })

          gsap.set('[data-blueprint-content]', {
            opacity: 1,
            y: 0,
          })

          gsap.set(qrRef.current, {
            opacity: 1,
            scale: 1,
          })
        }

        if (reduce) {
          setFinishedState()

          if (window.scrollY > 10) {
            hasPlayedRef.current = true
          }

          const rememberPosition = () => {
            if (!refreshing) {
              hasPlayedRef.current = window.scrollY > 10
            }
          }

          window.addEventListener('scroll', rememberPosition, {
            passive: true,
          })

          const resize = new ResizeObserver(setFinishedState)
          resize.observe(panel)

          return () => {
            window.removeEventListener('scroll', rememberPosition)
            resize.disconnect()
          }
        }

        gsap.from(headingRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 82%',
            once: true,
          },
        })

        setInitialState()

        const construction = gsap.timeline({
          paused: true,
          onComplete: setFinishedState,
        })

        construction
          .to(
            craneTrolleyRef.current,
            {
              x: -40,
              duration: 1.5,
              ease: 'power2.inOut',
            },
            0.35,
          )
          .to(
            shiftBlockRef.current,
            {
              x: -40,
              duration: 1.5,
              ease: 'power2.inOut',
            },
            0.35,
          )
          .to(
            craneCableRef.current,
            {
              attr: { y2: 245 },
              duration: 1,
              ease: 'power2.inOut',
            },
            2,
          )
          .to(
            craneHookRef.current,
            {
              y: 75,
              duration: 1,
              ease: 'power2.inOut',
            },
            2,
          )
          .to(
            shiftBlockRef.current,
            {
              y: 0,
              duration: 1,
              ease: 'power2.inOut',
            },
            2,
          )
          .to(
            craneHookRef.current,
            {
              y: -30,
              duration: 0.75,
              ease: 'power2.inOut',
            },
            3.15,
          )
          .to(
            craneCableRef.current,
            {
              attr: { y2: 140 },
              duration: 0.75,
              ease: 'power2.inOut',
            },
            3.15,
          )
          .to(
            truckRef.current,
            {
              x: truckPosition,
              duration: 1.8,
              ease: 'power3.out',
            },
            4.15,
          )
          .to(
            '[data-blueprint-line-x]',
            {
              scaleX: 1,
              stagger: 0.14,
              duration: 0.65,
              ease: 'power2.inOut',
            },
            6.15,
          )
          .to(
            '[data-blueprint-line-y]',
            {
              scaleY: 1,
              stagger: 0.12,
              duration: 0.55,
              ease: 'power2.inOut',
            },
            6.45,
          )
          .to(
            '[data-blueprint-content]',
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: 'power3.out',
            },
            7.05,
          )
          .to(
            qrRef.current,
            {
              opacity: 1,
              scale: 1,
              duration: 0.45,
              ease: 'back.out(1.6)',
            },
            7.4,
          )

        let truckEntered = false
        let blueprintEntered = false

        if (!desktop) {
          construction.addPause(4.1, () => {
            if (truckEntered) {
              construction.play()
            }
          })

          construction.addPause(6.1, () => {
            if (blueprintEntered) {
              construction.play()
            }
          })
        }

        if (hasPlayedRef.current) {
          construction.progress(1).pause()
          setFinishedState()
        }

        ScrollTrigger.create({
          trigger: desktop ? site : cranePanelRef.current,
          start: 'top 60%',
          onEnter: () => {
            if (hasPlayedRef.current) return

            hasPlayedRef.current = true
            site.dataset.state = 'playing'
            construction.restart()
          },
        })

        if (!desktop) {
          ScrollTrigger.create({
            trigger: panel,
            start: 'top 70%',
            onEnter: () => {
              truckEntered = true

              if (
                hasPlayedRef.current &&
                construction.paused() &&
                construction.time() < 6.1
              ) {
                construction.play()
              }
            },
          })

          ScrollTrigger.create({
            trigger: blueprintRef.current,
            start: 'top 70%',
            onEnter: () => {
              blueprintEntered = true

              if (
                hasPlayedRef.current &&
                construction.paused() &&
                construction.time() < construction.duration()
              ) {
                construction.play()
              }
            },
          })
        }

        let atTop = window.scrollY <= 10

        const handleScroll = () => {
          const nextAtTop = window.scrollY <= 10

          if (!refreshing && nextAtTop && !atTop) {
            hasPlayedRef.current = false
            truckEntered = false
            blueprintEntered = false

            construction.invalidate().pause(0)
            setInitialState()
          }

          atTop = nextAtTop
        }

        window.addEventListener('scroll', handleScroll, {
          passive: true,
        })

        let previousWidth = panel.clientWidth

        const resize = new ResizeObserver(() => {
          if (panel.clientWidth === previousWidth) return

          previousWidth = panel.clientWidth

          if (hasPlayedRef.current) {
            construction.progress(1).pause()
            setFinishedState()
          } else {
            gsap.set(truckRef.current, {
              scale: truckScale(),
            })
          }
        })

        resize.observe(panel)

        return () => {
          window.removeEventListener('scroll', handleScroll)
          resize.disconnect()
        }
      },
    )

    return () => {
      media.revert()

      ScrollTrigger.removeEventListener(
        'refreshInit',
        refreshStarted,
      )

      ScrollTrigger.removeEventListener(
        'refresh',
        refreshFinished,
      )

      cancelAnimationFrame(refreshFrame)
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
        ref={headingRef}
        data-reveal
        className="mx-auto max-w-7xl"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-[#7cb9ff]">
          03 — Building Next
        </span>

        <div className="mt-14">
          <h2
            id="building-title"
            className="text-[clamp(3.5rem,8vw,9rem)] font-semibold uppercase leading-[0.78] tracking-[-0.07em]"
          >
            Currently
            <br />
            Building
            <span className="text-[#2563ff]">.</span>
          </h2>

          <p className="mt-8 max-w-lg text-base leading-relaxed text-[#8491a7] md:text-lg">
            Ideas currently moving from concept into functional software.
          </p>
        </div>
      </div>

      <div
        ref={siteRef}
        data-construction-site
        className="relative mx-auto mt-16 max-w-7xl overflow-hidden border-y border-[#1a2232]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div
            ref={cranePanelRef}
            className="relative min-h-70 overflow-hidden border-b border-[#1a2232] lg:col-span-6 lg:min-h-107.5 lg:border-b-0 lg:border-r"
          >
            <div className="absolute left-5 top-5 z-20">
              <span className="font-mono text-xs text-[#7cb9ff]">
                01
              </span>

              <h3 id="shift-schedule-label" className="ml-4 inline text-xs font-normal uppercase tracking-[0.08em] text-[#8491a7]">
                Shift Schedule · Planned
              </h3>
            </div>
            <svg
              viewBox="0 0 700 430"
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-labelledby="shift-schedule-label"
              aria-describedby="shift-schedule-description"
            >
              <line
                x1="135"
                y1="90"
                x2="135"
                y2="390"
                stroke="#1a2232"
                strokeWidth="2"
              />

              <line
                x1="165"
                y1="90"
                x2="165"
                y2="390"
                stroke="#1a2232"
                strokeWidth="2"
              />

              <line
                x1="135"
                y1="120"
                x2="165"
                y2="160"
                stroke="#1a2232"
              />

              <line
                x1="165"
                y1="120"
                x2="135"
                y2="160"
                stroke="#1a2232"
              />

              <line
                x1="135"
                y1="160"
                x2="165"
                y2="200"
                stroke="#1a2232"
              />

              <line
                x1="165"
                y1="160"
                x2="135"
                y2="200"
                stroke="#1a2232"
              />

              <line
                x1="135"
                y1="200"
                x2="165"
                y2="240"
                stroke="#1a2232"
              />

              <line
                x1="165"
                y1="200"
                x2="135"
                y2="240"
                stroke="#1a2232"
              />

              <line
                x1="135"
                y1="240"
                x2="165"
                y2="280"
                stroke="#1a2232"
              />

              <line
                x1="165"
                y1="240"
                x2="135"
                y2="280"
                stroke="#1a2232"
              />

              <line
                x1="135"
                y1="280"
                x2="165"
                y2="320"
                stroke="#1a2232"
              />

              <line
                x1="165"
                y1="280"
                x2="135"
                y2="320"
                stroke="#1a2232"
              />

              <line
                x1="85"
                y1="90"
                x2="590"
                y2="90"
                stroke="#2563ff"
                strokeWidth="2"
              />

              <line
                x1="150"
                y1="55"
                x2="590"
                y2="90"
                stroke="#1a2232"
              />

              <line
                x1="150"
                y1="55"
                x2="85"
                y2="90"
                stroke="#1a2232"
              />

              <line
                x1="210"
                y1="60"
                x2="250"
                y2="90"
                stroke="#1a2232"
              />

              <line
                x1="290"
                y1="66"
                x2="330"
                y2="90"
                stroke="#1a2232"
              />

              <line
                x1="370"
                y1="72"
                x2="410"
                y2="90"
                stroke="#1a2232"
              />

              <line
                x1="450"
                y1="78"
                x2="490"
                y2="90"
                stroke="#1a2232"
              />

              <g ref={craneTrolleyRef}>
                <rect
                  x="455"
                  y="84"
                  width="30"
                  height="12"
                  fill="#080c16"
                  stroke="#2563ff"
                />

                <circle
                  cx="461"
                  cy="96"
                  r="3"
                  fill="#2563ff"
                />

                <circle
                  cx="479"
                  cy="96"
                  r="3"
                  fill="#2563ff"
                />

                <line
                  ref={craneCableRef}
                  data-crane-cable
                  x1="470"
                  y1="96"
                  x2="470"
                  y2="170"
                  stroke="#2563ff"
                />

                <g ref={craneHookRef}>
                  <circle
                    data-crane-hook
                    cx="470"
                    cy="170"
                    r="5"
                    fill="#2563ff"
                  />

                  <path
                    d="M470 175 C470 190 485 190 485 177"
                    fill="none"
                    stroke="#2563ff"
                    strokeWidth="2"
                  />
                </g>
              </g>

              <line
                x1="50"
                y1="390"
                x2="650"
                y2="390"
                stroke="#1a2232"
              />

              <line
                x1="410"
                y1="382"
                x2="590"
                y2="382"
                stroke="#2563ff"
                strokeDasharray="5 7"
                opacity="0.45"
              />

              <g
                ref={shiftBlockRef}
                data-shift-block
              >
                <foreignObject
                  x="340"
                  y="270"
                  width="290"
                  height="145"
                >
                  <div className="flex h-full flex-col justify-center border border-[#2563ff]/50 bg-[#080c16] px-5">
                    <div className="text-[40px] font-medium uppercase leading-[0.88] tracking-[-0.04em]">
                      Shift
                      <br />
                      Schedule
                      <span className="text-[#2563ff]">.</span>
                    </div>
                    <p id="shift-schedule-description" className="mt-4 max-w-61.25 text-[11px] normal-case leading-normal tracking-normal text-[#8491a7]">
                      Staff scheduling built around shifts, availability and daily operations.
                    </p>
                  </div>
                </foreignObject>
              </g>
            </svg>
          </div>

          <div className="grid lg:col-span-6 lg:grid-rows-2">
            <div
              ref={truckPanelRef}
              data-truck-panel
              className="relative min-h-53.75 overflow-hidden border-b border-[#1a2232]"
            >
              <div className="absolute left-5 top-5 z-20">
                <span className="font-mono text-xs text-[#7cb9ff]">
                  02
                </span>

                <span className="ml-4 text-xs uppercase tracking-[0.08em] text-[#8491a7]">
                  Operations
                </span>
              </div>
              <div
                ref={truckRef}
                data-truck
                className="absolute bottom-5 left-[5%] z-10 w-72"
              >
                <div className="ml-16 w-52 border border-[#1a2232] bg-[#080c16] px-4 py-4">
                  <h3 className="text-lg font-medium uppercase leading-[0.95] tracking-[-0.035em]">
                    Event & OS
                    <br />
                    Manager
                    <span className="text-[#2563ff]">.</span>
                  </h3>

                  <p className="mt-3 text-[10px] normal-case leading-4 tracking-normal text-[#8491a7]">
                    Managing events, tasks and service workflows in one place.
                  </p>
                </div>

                <div className="relative mt-1 h-14 w-72">
                  <div className="absolute bottom-4 left-0 h-5 w-64 border border-[#2563ff]/50" />

                  <div className="absolute bottom-9 left-5 h-7 w-14 border border-[#1a2232]" />

                  <div className="absolute bottom-0 left-7 h-8 w-8 rounded-full border border-[#2563ff] bg-[#05070d]">
                    <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563ff]" />
                  </div>

                  <div className="absolute bottom-0 left-58.75 h-8 w-8 rounded-full border border-[#2563ff] bg-[#05070d]">
                    <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563ff]" />
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={blueprintRef}
              className="relative min-h-53.75 overflow-hidden"
            >
              <div className="absolute left-5 top-5">
                <span className="font-mono text-xs text-[#7cb9ff]">
                  03
                </span>

                <span className="ml-4 text-xs uppercase tracking-[0.08em] text-[#8491a7]">
                  Guest Experience
                </span>
              </div>

              <div className="absolute bottom-8 left-[8%] right-[8%]">
                <div className="relative px-5 py-5">
                  <div
                    data-blueprint-line-x
                    className="absolute left-0 right-0 top-0 h-px bg-[#2563ff]/60"
                  />

                  <div
                    data-blueprint-line-x
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#2563ff]/60"
                  />

                  <div
                    data-blueprint-line-y
                    className="absolute bottom-0 left-0 top-0 w-px bg-[#2563ff]/60"
                  />

                  <div
                    data-blueprint-line-y
                    className="absolute bottom-0 right-0 top-0 w-px bg-[#2563ff]/60"
                  />

                  <div
                    data-blueprint-content
                    className="flex items-end justify-between gap-6"
                  >
                    <div>
                      <h3 className="mt-2 text-lg font-medium uppercase leading-[0.95] tracking-[-0.035em]">
                        Room Service
                        <br />
                        QR
                        <span className="text-[#2563ff]">.</span>
                      </h3>

                      <p className="mt-3 max-w-82.5 text-[11px] leading-5 text-[#8491a7]">
                        A QR-based ordering experience designed to simplify
                        room service for guests and hotel teams.
                      </p>
                    </div>

                    <div
                      ref={qrRef}
                      aria-hidden="true"
                      className="grid h-14 w-14 grid-cols-4 grid-rows-4 gap-1"
                    >
                      <span className="border border-[#2563ff]" />
                      <span className="bg-[#2563ff]" />
                      <span />
                      <span className="border border-[#2563ff]" />

                      <span className="bg-[#2563ff]" />
                      <span />
                      <span className="bg-[#2563ff]" />
                      <span />

                      <span />
                      <span className="bg-[#2563ff]" />
                      <span />
                      <span className="bg-[#2563ff]" />

                      <span className="border border-[#2563ff]" />
                      <span />
                      <span className="bg-[#2563ff]" />
                      <span className="border border-[#2563ff]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
