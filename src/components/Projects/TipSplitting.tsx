import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const distributions = [
  {
    name: 'Sky Bar',
    value: '€ 1,428.40',
    width: 86,
  },
  {
    name: 'Wine Bar 1638',
    value: '€ 1,196.20',
    width: 72,
  },
  {
    name: 'Restaurant 1638',
    value: '€ 1,282.60',
    width: 77,
  },
  {
    name: 'Pool Bar',
    value: '€ 919.30',
    width: 55,
  },
]

export function TipSplitting() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const interfaceRef = useRef<HTMLDivElement>(null)

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

      const calculator = gsap.timeline({
        scrollTrigger: {
          trigger: interfaceRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      calculator
        .from(interfaceRef.current, {
          y: 60,
          scale: 0.97,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
        .from(
          '[data-distribution-row]',
          {
            x: -20,
            opacity: 0,
            stagger: 0.08,
            duration: 0.35,
            ease: 'power2.out',
          },
          '-=0.4',
        )
        .from(
          '[data-distribution-bar]',
          {
            scaleX: 0,
            transformOrigin: 'left center',
            stagger: 0.08,
            duration: 0.5,
            ease: 'power3.inOut',
          },
          '-=0.45',
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative px-6 pt-20 md:px-10 md:pt-24"
    >
      {/* Project metadata */}
      <div className="mb-12 flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.2em] text-[#2563ff]">
          02 / 03
        </span>

        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2563ff] shadow-[0_0_10px_#2563ff]" />

          <span className="text-[10px] uppercase tracking-[0.2em] text-[#8491a7]">
            In development
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        <div
          ref={contentRef}
          className="flex flex-col justify-between lg:col-span-5"
        >
          <div>
            <h2 className="text-[clamp(3.2rem,5.5vw,6.5rem)] font-semibold uppercase leading-[0.8] tracking-[-0.065em]">
              Tip Splitting
              <br />
              Calculator
              <span className="text-[#2563ff]">.</span>
            </h2>

            <p className="mt-8 max-w-md text-base leading-relaxed text-[#8491a7] md:text-lg">
              A tool for calculating and distributing staff tips across
              multiple hotel outlets using working hours and distribution
              rules.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.18em] text-[#8491a7]">
              <span>JavaScript</span>
              <span>HTML</span>
              <span>CSS</span>
              <span>Local Storage</span>
            </div>
          </div>
        </div>

        <div
          ref={interfaceRef}
          className="overflow-hidden border border-[#1a2232] bg-[#080c16] shadow-[0_30px_100px_rgba(37,99,255,0.05)] lg:col-span-7"
        >
          <div className="flex items-center justify-between border-b border-[#1a2232] px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#2563ff] shadow-[0_0_12px_#2563ff]" />

              <span className="text-[9px] uppercase tracking-[0.22em] text-[#8491a7]">
                Distribution Engine
              </span>
            </div>

            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8491a7]">
              Demo
            </span>
          </div>

          <div className="p-6 md:p-8">
            <div className="border-b border-[#1a2232] pb-7">
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#8491a7]">
                Total tips
              </span>

              <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                <span className="text-[clamp(2.8rem,5vw,5.5rem)] font-semibold leading-none tracking-[-0.06em]">
                  € 4,826
                  <span className="text-[#2563ff]">
                    .50
                  </span>
                </span>

                <span className="pb-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[#8491a7]">
                  Preview
                </span>
              </div>
            </div>

            <div className="mt-4">
              {distributions.map((item, index) => (
                <div
                  key={item.name}
                  data-distribution-row
                  className="grid grid-cols-[32px_1fr] items-center gap-4 border-b border-[#1a2232] py-5"
                >
                  <span className="font-mono text-[10px] text-[#8491a7]">
                    0{index + 1}
                  </span>

                  <div>
                    <div className="flex items-center justify-between gap-5">
                      <span className="text-xs uppercase tracking-[0.12em]">
                        {item.name}
                      </span>

                      <span className="text-xs font-medium">
                        {item.value}
                      </span>
                    </div>

                    <div className="mt-3 h-px overflow-hidden bg-[#1a2232]">
                      <div
                        data-distribution-bar
                        style={{
                          width: `${item.width}%`,
                        }}
                        className="h-0.5 bg-[#2563ff] shadow-[0_0_12px_rgba(37,99,255,0.5)]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#8491a7]">
                Demo data
              </span>

              <span className="text-[9px] uppercase tracking-[0.2em] text-[#2563ff]">
                Multi-outlet
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Standard project divider */}
      <div className="mt-24 h-px w-full bg-[#1a2232]" />
    </section>
  )
}