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
  const shiftBlockRef = useRef<HTMLDivElement>(null)

  const truckRef = useRef<HTMLDivElement>(null)

  const blueprintRef = useRef<HTMLDivElement>(null)
  const qrRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      let constructionHasPlayed = false
      let reachedPageTop = window.scrollY <= 10

      /*
       * =====================================================
       * SECTION ENTRANCE
       * =====================================================
       */

      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from(siteRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: siteRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      /*
       * =====================================================
       * HELPERS
       * =====================================================
       */

      const setInitialState = () => {
        gsap.set(craneTrolleyRef.current, {
          x: -115,
        })

        gsap.set(craneCableRef.current, {
          attr: {
            y2: 170,
          },
        })

        gsap.set(craneHookRef.current, {
          y: -35,
        })

        gsap.set(shiftBlockRef.current, {
          x: -115,
          y: -105,
          rotation: -2,
          opacity: 1,
        })

        gsap.set(truckRef.current, {
          x: -430,
          opacity: 1,
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
        gsap.set(craneTrolleyRef.current, {
          x: -40,
        })

        gsap.set(craneCableRef.current, {
          attr: {
            y2: 170,
          },
        })

        gsap.set(craneHookRef.current, {
          y: -35,
        })

        gsap.set(shiftBlockRef.current, {
          x: -40,
          y: 0,
          rotation: 0,
          opacity: 1,
        })

        gsap.set(truckRef.current, {
          x: 0,
          opacity: 1,
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

      /*
       * =====================================================
       * REDUCED MOTION
       * =====================================================
       */

      if (reduceMotion) {
        setFinishedState()
        return
      }

      /*
       * =====================================================
       * INITIAL STATE
       * =====================================================
       */

      setInitialState()

      /*
       * =====================================================
       * CONSTRUCTION TIMELINE
       * =====================================================
       *
       * No repeat.
       * Once finished, everything stays in place.
       */

      const construction = gsap.timeline({
        paused: true,
      })

      /*
       * -----------------------------------------------------
       * 01 — SHIFT SCHEDULE
       * -----------------------------------------------------
       */

      construction
        /*
         * Crane moves horizontally with the project.
         */

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

        /*
         * Crane lowers the project.
         */

        .to(
          craneCableRef.current,
          {
            attr: {
              y2: 215,
            },
            duration: 1,
            ease: 'power2.inOut',
          },
          2,
        )

        .to(
          craneHookRef.current,
          {
            y: 10,
            duration: 1,
            ease: 'power2.inOut',
          },
          2,
        )

        .to(
          shiftBlockRef.current,
          {
            y: 0,
            rotation: 0,
            duration: 1,
            ease: 'power2.inOut',
          },
          2,
        )

        /*
         * Hook goes back up.
         */

        .to(
          craneHookRef.current,
          {
            y: -35,
            duration: 0.75,
            ease: 'power2.inOut',
          },
          3.15,
        )

        .to(
          craneCableRef.current,
          {
            attr: {
              y2: 170,
            },
            duration: 0.75,
            ease: 'power2.inOut',
          },
          3.15,
        )

        /*
         * -----------------------------------------------------
         * 02 — EVENT & OS MANAGER
         * -----------------------------------------------------
         *
         * Truck arrives carrying the project.
         * Nothing is unloaded.
         */

        .to(
          truckRef.current,
          {
            x: 0,
            duration: 1.8,
            ease: 'power3.out',
          },
          4.15,
        )

        /*
         * -----------------------------------------------------
         * 03 — ROOM SERVICE QR
         * -----------------------------------------------------
         */

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

      /*
       * =====================================================
       * PLAY ONCE
       * =====================================================
       */

      ScrollTrigger.create({
        trigger: siteRef.current,
        start: 'top 82%',

        onEnter: () => {
          if (constructionHasPlayed) {
            return
          }

          constructionHasPlayed = true
          reachedPageTop = false

          construction.restart()
        },
      })

      /*
       * =====================================================
       * RESET ONLY AT PAGE TOP
       * =====================================================
       *
       * Going back to the Building Next section alone does
       * NOT replay the animation.
       *
       * The user must return to the top of the portfolio.
       */

      const handleScroll = () => {
        const isAtTop = window.scrollY <= 10

        if (isAtTop && !reachedPageTop) {
          reachedPageTop = true
          constructionHasPlayed = false

          construction.pause(0)
          setInitialState()
        }

        if (!isAtTop) {
          reachedPageTop = false
        }
      }

      window.addEventListener('scroll', handleScroll, {
        passive: true,
      })

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32"
    >
      {/* =====================================================
          SECTION HEADER
      ====================================================== */}

      <div ref={headingRef}>
        <span className="text-xs uppercase tracking-[0.25em] text-[#2563ff]">
          03 — Building Next
        </span>

        <div className="mt-16">
          <h2 className="text-[clamp(3.8rem,8vw,9rem)] font-semibold uppercase leading-[0.78] tracking-[-0.07em]">
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

      {/* =====================================================
          CONSTRUCTION SITE
      ====================================================== */}

      <div
        ref={siteRef}
        className="relative mx-auto mt-24 max-w-7xl overflow-hidden border-y border-[#1a2232]"
      >
        {/* Site header */}

        <div className="flex flex-wrap items-center justify-between gap-5 border-b border-[#1a2232] py-4">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2563ff] shadow-[0_0_12px_#2563ff]" />

            <span className="text-[9px] uppercase tracking-[0.22em] text-[#8491a7]">
              Development site active
            </span>
          </div>

          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8491a7]">
            03 projects / queue
          </span>
        </div>

        {/* =================================================
            PROJECT GRID
        ================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* =================================================
              SHIFT SCHEDULE
          ================================================== */}

          <div className="relative min-h-107.5 overflow-hidden border-b border-[#1a2232] lg:col-span-6 lg:border-b-0 lg:border-r">
            <div className="absolute left-5 top-5 z-20">
              <span className="font-mono text-[10px] text-[#2563ff]">
                01
              </span>

              <span className="ml-4 text-[9px] uppercase tracking-[0.2em] text-[#8491a7]">
                Shift Schedule
              </span>
            </div>

            {/* Crane */}

            <svg
              viewBox="0 0 700 430"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              {/* Tower */}

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

              {/* Tower braces */}

              <line x1="135" y1="120" x2="165" y2="160" stroke="#1a2232" />
              <line x1="165" y1="120" x2="135" y2="160" stroke="#1a2232" />

              <line x1="135" y1="160" x2="165" y2="200" stroke="#1a2232" />
              <line x1="165" y1="160" x2="135" y2="200" stroke="#1a2232" />

              <line x1="135" y1="200" x2="165" y2="240" stroke="#1a2232" />
              <line x1="165" y1="200" x2="135" y2="240" stroke="#1a2232" />

              <line x1="135" y1="240" x2="165" y2="280" stroke="#1a2232" />
              <line x1="165" y1="240" x2="135" y2="280" stroke="#1a2232" />

              <line x1="135" y1="280" x2="165" y2="320" stroke="#1a2232" />
              <line x1="165" y1="280" x2="135" y2="320" stroke="#1a2232" />

              {/* Crane arm */}

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

              <line x1="210" y1="60" x2="250" y2="90" stroke="#1a2232" />
              <line x1="290" y1="66" x2="330" y2="90" stroke="#1a2232" />
              <line x1="370" y1="72" x2="410" y2="90" stroke="#1a2232" />
              <line x1="450" y1="78" x2="490" y2="90" stroke="#1a2232" />

              {/* Moving trolley */}

              <g ref={craneTrolleyRef}>
                <rect
                  x="455"
                  y="84"
                  width="30"
                  height="12"
                  fill="#080c16"
                  stroke="#2563ff"
                />

                <circle cx="461" cy="96" r="3" fill="#2563ff" />
                <circle cx="479" cy="96" r="3" fill="#2563ff" />

                <line
                  ref={craneCableRef}
                  x1="470"
                  y1="96"
                  x2="470"
                  y2="170"
                  stroke="#2563ff"
                />

                <g ref={craneHookRef}>
                  <circle
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

              {/* Ground */}

              <line
                x1="50"
                y1="390"
                x2="650"
                y2="390"
                stroke="#1a2232"
              />

              {/* Placement zone */}

              <line
                x1="410"
                y1="382"
                x2="590"
                y2="382"
                stroke="#2563ff"
                strokeDasharray="5 7"
                opacity="0.45"
              />
            </svg>

            {/* Shift Schedule */}

            <div
              ref={shiftBlockRef}
              className="absolute bottom-9.75 right-[10%] w-[42%] border border-[#2563ff]/50 bg-[#080c16] px-5 py-5 shadow-[0_0_35px_rgba(37,99,255,0.08)]"
            >
              <span className="text-[8px] uppercase tracking-[0.22em] text-[#8491a7]">
                Project / 01
              </span>

              <h3 className="mt-3 text-xl font-medium uppercase leading-none tracking-[-0.035em] md:text-2xl">
                Shift
                <br />
                Schedule
                <span className="text-[#2563ff]">.</span>
              </h3>

              <div className="mt-5 flex items-center justify-between border-t border-[#1a2232] pt-3">
                <span className="text-[8px] uppercase tracking-[0.2em] text-[#8491a7]">
                  Status
                </span>

                <span className="text-[8px] uppercase tracking-[0.2em] text-[#2563ff]">
                  Planned
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================== */}

          <div className="grid lg:col-span-6 lg:grid-rows-2">
            {/* =================================================
                EVENT & OS MANAGER
            ================================================== */}

            <div className="relative min-h-53.75 overflow-hidden border-b border-[#1a2232]">
              <div className="absolute left-5 top-5 z-20">
                <span className="font-mono text-[10px] text-[#2563ff]">
                  02
                </span>

                <span className="ml-4 text-[9px] uppercase tracking-[0.2em] text-[#8491a7]">
                  Operations
                </span>
              </div>

              {/* Truck enters carrying the project and stays */}

              <div
                ref={truckRef}
                className="absolute bottom-5 left-[5%] z-10"
              >
                {/* Cargo */}

                <div className="ml-16 w-52 border border-[#1a2232] bg-[#080c16] px-4 py-4">
                  <span className="text-[8px] uppercase tracking-[0.2em] text-[#8491a7]">
                    Project / 02
                  </span>

                  <h3 className="mt-2 text-lg font-medium uppercase leading-[0.95] tracking-[-0.035em]">
                    Event & OS
                    <br />
                    Manager
                    <span className="text-[#2563ff]">.</span>
                  </h3>
                </div>

                {/* Truck */}

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

            {/* =================================================
                ROOM SERVICE QR
            ================================================== */}

            <div
              ref={blueprintRef}
              className="relative min-h-53.75 overflow-hidden"
            >
              <div className="absolute left-5 top-5">
                <span className="font-mono text-[10px] text-[#2563ff]">
                  03
                </span>

                <span className="ml-4 text-[9px] uppercase tracking-[0.2em] text-[#8491a7]">
                  Guest Experience
                </span>
              </div>

              <div className="absolute bottom-8 left-[8%] right-[8%]">
                <div className="relative px-5 py-5">
                  {/* Blueprint frame */}

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
                      <span className="text-[8px] uppercase tracking-[0.2em] text-[#8491a7]">
                        Blueprint / 03
                      </span>

                      <h3 className="mt-2 text-lg font-medium uppercase leading-[0.95] tracking-[-0.035em]">
                        Room Service
                        <br />
                        QR
                        <span className="text-[#2563ff]">.</span>
                      </h3>
                    </div>

                    <div
                      ref={qrRef}
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

        {/* =================================================
            SITE FOOTER
        ================================================== */}

        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-[#1a2232] py-4">
          <span className="text-[9px] uppercase tracking-[0.22em] text-[#8491a7]">
            Digital construction site
          </span>

          <div className="flex items-center gap-6">
            <span className="font-mono text-[9px] text-[#8491a7]">
              IDEA
            </span>

            <span className="text-[#2563ff]">→</span>

            <span className="font-mono text-[9px] text-[#8491a7]">
              BUILD
            </span>

            <span className="text-[#2563ff]">→</span>

            <span className="font-mono text-[9px] text-[#f4f7ff]">
              SHIP
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}