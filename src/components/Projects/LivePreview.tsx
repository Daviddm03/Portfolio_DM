import type { Ref } from 'react'

type LivePreviewProps = {
  url: string
  name: string
  className: string
  ref: Ref<HTMLAnchorElement>
}

export function LivePreview({ url, name, className, ref }: LivePreviewProps) {
  return (
    <a ref={ref} data-reveal href={url} target="_blank" rel="noopener noreferrer"
      aria-label={`Open ${name} live website`}
      className={`group relative block min-w-0 self-start border border-[#1a2232] bg-[#0a1020] ${className}`}>
      <div className="flex h-11 items-center justify-between border-b border-[#1a2232] bg-[#080c16] px-4">
        <div aria-hidden="true" className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#8491a7]/30" />
          <span className="h-2 w-2 rounded-full bg-[#8491a7]/30" />
          <span className="h-2 w-2 rounded-full bg-[#8491a7]/30" />
        </div>
        <span className="text-xs text-[#8491a7]">Live preview</span>
      </div>
      <div className="relative aspect-video overflow-hidden bg-[#05070d]">
        <iframe src={url} title={`${name} website preview`} loading="lazy"
          tabIndex={-1} aria-hidden="true" className="pointer-events-none h-full w-full border-0" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 transition-colors duration-300 group-hover:bg-black/15 group-focus-visible:bg-black/15" />
      </div>
      <div className="border-t border-[#1a2232] bg-[#080c16] px-4 py-3 text-right text-xs transition-colors group-hover:text-[#7cb9ff] group-focus-visible:text-[#7cb9ff]">
        Open website <span aria-hidden="true">↗</span>
      </div>
    </a>
  )
}
