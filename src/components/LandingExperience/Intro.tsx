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
      className="absolute inset-0 flex items-center px-6 py-24 opacity-0 md:px-10"
    >
      <div className="grid w-full grid-cols-1 gap-14 md:grid-cols-12">
        <div className="md:col-span-3">
          <span
            data-intro-detail
            className="text-xs uppercase tracking-[0.25em] text-[#2563ff]"
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
              className="text-[clamp(4rem,8vw,9rem)] font-semibold uppercase leading-[0.82] tracking-[-0.07em]"
            >
              I'm David
              <span className="text-[#2563ff]">.</span>
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
            <p
              data-intro-detail
              className="max-w-lg text-lg leading-relaxed text-[#8491a7] md:text-xl"
            >
              Software developer based in Porto, focused on turning ideas and
              real-world problems into functional software.
            </p>

            <p
              data-intro-detail
              className="max-w-lg text-lg leading-relaxed text-[#8491a7] md:text-xl"
            >
              Building my path through software engineering, hands-on projects
              and a strong foundation in programming fundamentals.
            </p>
          </div>

          <div
            data-intro-detail
            className="mt-20 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-[#1a2232] pt-6 md:grid-cols-3"
          >
            <div>
              <span className="block text-[9px] uppercase tracking-[0.24em] text-[#8491a7]">
                Based in
              </span>

              <span className="mt-3 block text-xs uppercase tracking-[0.18em]">
                Porto, Portugal
              </span>
            </div>

            <div>
              <span className="block text-[9px] uppercase tracking-[0.24em] text-[#8491a7]">
                Education
              </span>

              <span className="mt-3 block text-xs uppercase tracking-[0.18em]">
                42 Porto + ISTEC
              </span>
            </div>

            <div className="col-span-2 md:col-span-1">
              <span className="block text-[9px] uppercase tracking-[0.24em] text-[#8491a7]">
                Focus
              </span>

              <span className="mt-3 block text-xs uppercase tracking-[0.18em]">
                Software Engineering
              </span>
            </div>
          </div>

          <div
            data-intro-detail
            className="mt-16 flex items-center gap-4"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#2563ff] shadow-[0_0_12px_#2563ff]" />

            <span className="text-[9px] uppercase tracking-[0.25em] text-[#8491a7]">
              Selected work below
            </span>

            <span className="text-xs text-[#2563ff]">
              ↓
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}