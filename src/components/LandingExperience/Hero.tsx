import type { RefObject } from 'react'

type HeroProps = {
  softwareRef: RefObject<HTMLSpanElement | null>
  developerRef: RefObject<HTMLSpanElement | null>
  heroContentRef: RefObject<HTMLDivElement | null>
  dotRef: RefObject<HTMLSpanElement | null>
  roleRef: RefObject<HTMLDivElement | null>
}

export function Hero({
  softwareRef,
  developerRef,
  heroContentRef,
  dotRef,
  roleRef,
}: HeroProps) {
  return (
    <div
      ref={heroContentRef}
      className="absolute inset-0 flex flex-col px-6 py-6 md:px-10 md:py-8"
    >
      {/* Persistent navigation */}
      <header
        data-hero-nav
        className="relative z-50 flex items-center justify-between text-xs uppercase tracking-[0.2em]"
      >
        <button
          type="button"
          aria-label="Back to top"
          className="cursor-pointer font-semibold tracking-[0.12em]"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }}
        >
          DM<span className="text-[#2563ff]">.</span>
        </button>

        <button
          type="button"
          className="cursor-pointer transition-colors duration-300 hover:text-[#7cb9ff]"
        >
          Menu +
        </button>
      </header>

      {/* Main hero */}
      <div className="flex flex-1 items-center">
        <div className="w-full">
          {/* Role / location */}
          <div
            ref={roleRef}
            className="mb-6 flex items-center gap-4"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#2563ff] shadow-[0_0_12px_#2563ff]" />

            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8491a7] md:text-xs">
              Software Developer — Porto, Portugal
            </span>
          </div>

          {/* Main title */}
          <h1 className="text-[clamp(4rem,13vw,13rem)] font-semibold uppercase leading-[0.75] tracking-[-0.075em]">
            <span className="block overflow-hidden">
              <span
                ref={softwareRef}
                className="block will-change-transform"
              >
                Software
              </span>
            </span>

            <span className="block overflow-hidden">
              <span
                ref={developerRef}
                className="block will-change-transform"
              >
                Developer
                <span
                  ref={dotRef}
                  className="inline-block text-[#2563ff]"
                >
                  .
                </span>
              </span>
            </span>
          </h1>

          {/* Information under title */}
          <div
            data-hero-meta
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            <span className="font-mono text-[10px] text-[#2563ff]">
              01 / PORTFOLIO
            </span>

            <div className="hidden h-px w-12 bg-[#1a2232] sm:block" />

            <span className="text-[10px] uppercase tracking-[0.24em] text-[#8491a7]">
              Frontend × Software × Problem Solving
            </span>
          </div>
        </div>
      </div>

      {/* Bottom information */}
      <footer
        data-hero-meta
        className="flex items-end justify-between gap-8 text-[10px] uppercase tracking-[0.2em] md:text-xs"
      >
        <div className="flex items-end gap-5">
          <span className="hidden font-mono text-[10px] text-[#2563ff] md:block">
            00
          </span>

          <p className="max-w-65 leading-relaxed text-[#8491a7]">
            Building software
            <br />
            to solve real problems.
          </p>
        </div>

        <div className="flex items-end gap-5 text-right">
          <div>
            <span className="block text-[#8491a7]">
              Scroll to
            </span>

            <span className="mt-1 block">
              Explore
            </span>
          </div>

          <span className="text-lg leading-none text-[#2563ff]">
            ↓
          </span>
        </div>
      </footer>
    </div>
  )
}