import type { RefObject } from 'react'

type IntroProps = {
  introRef: RefObject<HTMLDivElement | null>
  introTextRef: RefObject<HTMLDivElement | null>
}

export function Intro({
  introRef,
  introTextRef,
}: IntroProps) {
  return (
    <div
      ref={introRef}
      id="introduction"
      tabIndex={-1}
      role="region"
      aria-labelledby="introduction-title"
      className="landing-intro absolute inset-0 flex items-center px-6 pb-12 pt-24 md:px-10"
    >
      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-3">
          <span
            data-intro-detail
            className="text-xs uppercase tracking-[0.25em] text-[#7cb9ff]"
          >
            01 — Introduction
          </span>
        </div>

        <div
          ref={introTextRef}
          className="md:col-span-9"
        >
          <div className="overflow-hidden">
            <h2
              data-intro-title
              id="introduction-title"
              className="text-[clamp(2.7rem,8vw,9rem)] font-semibold uppercase leading-[0.9] tracking-[-0.07em]"
            >
              I'm David Montano
              <span className="text-[#2563ff]">.</span>
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2 md:gap-12">
            <p
              data-intro-detail
              className="max-w-lg text-base leading-relaxed text-[#8491a7] md:text-xl"
            >
            I'm a software developer based in Porto, originally from Brazil. Before software, I worked in hospitality.            
            </p>
            <p
              data-intro-detail
              className="max-w-lg text-base leading-relaxed text-[#8491a7] md:text-xl"
            >
              I started programming with C at 42 Porto and now study Software Engineering at ISTEC. Most of my current work is built with React and TypeScript.
            </p>
          </div>

          <div
            data-intro-detail
            className="mt-8 grid grid-cols-2 gap-x-5 gap-y-5 border-t border-[#1a2232] pt-6 md:mt-12 md:grid-cols-3"
          >
            <div>
              <span className="block text-xs text-[#8491a7]">
                Based in
              </span>

              <span className="mt-3 block text-xs uppercase tracking-[0.18em]">
                Porto, Portugal
              </span>
            </div>

            <div>
              <span className="block text-xs text-[#8491a7]">
                Education
              </span>

              <span className="mt-3 block text-xs uppercase tracking-[0.18em]">
                42 Porto + ISTEC
              </span>
            </div>

            <div className="col-span-2 md:col-span-1">
              <span className="block text-xs text-[#8491a7]">
                Focus
              </span>

              <span className="mt-3 block text-xs uppercase tracking-[0.18em]">
                Software Engineering
              </span>
            </div>
          </div>

          <div
            data-intro-detail
            className="mt-8 flex items-center gap-4 md:mt-12"
          >
            <span className="text-xs text-[#8491a7]">
              Selected work below
            </span>

            <span className="text-xs text-[#7cb9ff]">
              ↓
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
