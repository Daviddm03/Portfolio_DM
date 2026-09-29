import type { RefObject } from 'react'

type SelectedWorkRevealProps = {
  selectedRef: RefObject<HTMLDivElement | null>
  selectedTitleRef: RefObject<HTMLHeadingElement | null>
}

export function SelectedWorkReveal({
  selectedRef,
  selectedTitleRef,
}: SelectedWorkRevealProps) {
  return (
    <div
      ref={selectedRef}
      className="pointer-events-none absolute inset-0 flex items-center px-6 py-8 opacity-0 md:px-10"
    >
      <div className="w-full">
        <div
          data-selected-meta
          className="mb-10 flex items-center gap-5"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#2563ff]">
            02
          </span>

          <div className="h-px flex-1 bg-[#2563ff]" />

          <span className="text-xs uppercase tracking-[0.25em] text-[#8491a7]">
            Selected Work
          </span>
        </div>

        <h2
          ref={selectedTitleRef}
          className="text-[clamp(4rem,13vw,13rem)] font-semibold uppercase leading-[0.75] tracking-[-0.075em]"
        >
          <span className="block">
            Selected
          </span>

          <span className="block">
            Work<span className="text-[#2563ff]">.</span>
          </span>
        </h2>

        <div
          data-selected-meta
          className="mt-12 flex items-end justify-between"
        >
          <p className="max-w-xs text-sm leading-relaxed text-[#8491a7]">
            A selection of products, interfaces and experiences built through
            code, design and experimentation.
          </p>

          <div className="text-right text-xs uppercase tracking-[0.2em]">
            <span className="block text-[#8491a7]">
              First project
            </span>

            <span className="mt-2 block">
              Espaço Eventos ↓
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}