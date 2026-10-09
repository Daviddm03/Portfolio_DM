import type { RefObject } from 'react'

type HeroProps = {
  softwareRef: RefObject<HTMLSpanElement | null>
  developerRef: RefObject<HTMLSpanElement | null>
  dotRef: RefObject<HTMLSpanElement | null>
  roleRef: RefObject<HTMLDivElement | null>
}

export function Hero({
  softwareRef,
  developerRef,
  dotRef,
  roleRef,
}: HeroProps) {
  return (
    <div
      className="landing-hero absolute inset-0 flex flex-col px-6 pb-6 pt-24 md:px-10 md:pb-8"
    >
      {/* Main hero */}
      <div className="flex flex-1 items-center">
        <div className="w-full">
          {/* Role / location */}
          <div
            ref={roleRef}
            className="mb-6 flex items-center gap-4"
          >
            <span className="text-xs uppercase tracking-[0.16em] text-[#8491a7]">
              Software Developer — Porto, Portugal
            </span>
          </div>

          {/* Main title */}
          <h1 className="text-[clamp(2.8rem,12.5vw,13rem)] font-semibold uppercase leading-[0.8] tracking-[-0.075em]">
            <span className="block overflow-hidden">
              <span
                ref={softwareRef}
                className="block"
              >
                Software
              </span>
            </span>

            <span className="block overflow-hidden">
              <span
                ref={developerRef}
                className="block"
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
            <span className="text-xs uppercase tracking-[0.12em] text-[#8491a7]">
              React.js × TypeScript × C
            </span>
          </div>
        </div>
      </div>

      {/* Bottom information */}
      <footer
        data-hero-meta
        className="flex items-end justify-between gap-5 text-xs uppercase tracking-[0.12em]"
      >
        <div className="flex items-end gap-5">
          <p className="max-w-65 leading-relaxed text-[#8491a7]">
            LEARNING BY
            <br />
            BUILDING SOFTWARE
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
