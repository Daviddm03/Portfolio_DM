import { useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type MenuOverlayProps = { isOpen: boolean; onClose: () => void }

const menuItems = [
  { number: '01', label: 'Introduction', target: 'introduction' },
  { number: '02', label: 'Selected Work', target: 'work' },
  { number: '03', label: 'Building Next', target: 'building-next' },
  { number: '04', label: 'About', target: 'about' },
  { number: '05', label: 'Stack', target: 'stack' },
  { number: '06', label: 'Contact', target: 'contact' },
]

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const destinationRef = useRef<string | null>(null)
  const pendingFocusRef = useRef<(() => void) | null>(null)

  useLayoutEffect(() => {
    const overlay = overlayRef.current
    const content = contentRef.current
    if (!overlay || !content) return
    // https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
    const media = gsap.matchMedia()
    media.add({ all: 'all', reduce: '(prefers-reduced-motion: reduce)' }, context => {
      const duration = context.conditions?.reduce ? 0 : 0.25
      if (isOpen) {
        if (pendingFocusRef.current) window.removeEventListener('scrollend', pendingFocusRef.current)
        gsap.set(overlay, { visibility: 'visible' })
        gsap.timeline()
          .fromTo(overlay, { opacity: 0 }, { opacity: 1, duration })
          .fromTo(content, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration, ease: 'power3.out' }, 0)
      } else {
        gsap.to(overlay, {
          autoAlpha: 0, duration,
          onComplete: () => {
            const target = destinationRef.current
            destinationRef.current = null
            if (target) {
              const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
              if (target === 'top') window.scrollTo({ top: 0, behavior })
              else {
                const section = document.getElementById(target)
                const focus = () => section?.focus({ preventScroll: true })
                if (behavior === 'smooth') {
                  pendingFocusRef.current = focus
                  window.addEventListener('scrollend', focus, { once: true })
                }
                const journey = target === 'introduction' ? ScrollTrigger.getById('landing-journey') : undefined
                if (journey) window.scrollTo({ top: journey.end, behavior })
                else section?.scrollIntoView({ behavior, block: 'start' })
                focus()
              }
            }
          },
        })
      }
    }, overlay)
    return () => {
      media.revert()
      if (pendingFocusRef.current) window.removeEventListener('scrollend', pendingFocusRef.current)
    }
  }, [isOpen])

  useLayoutEffect(() => {
    if (!isOpen) return
    const root = document.getElementById('root')
    const previousInert = root?.inert ?? false
    const previousOverflow = document.body.style.overflow
    openerRef.current = document.activeElement as HTMLElement
    if (root) root.inert = true
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    // https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose() }
      if (event.key !== 'Tab') return
      const controls = overlayRef.current?.querySelectorAll<HTMLElement>('a[href], button')
      if (!controls?.length) return
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      if (root) root.inert = previousInert
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      openerRef.current?.focus({ preventScroll: true })
    }
  }, [isOpen, onClose])

  const navigateTo = (target: string) => {
    destinationRef.current = target
    onClose()
  }

  return createPortal(
    <div ref={overlayRef} id="portfolio-menu" role="dialog" aria-modal="true"
      aria-label="Portfolio navigation" aria-hidden={!isOpen} inert={!isOpen}
      className="invisible fixed inset-0 z-9999 overflow-y-auto bg-[#05070d] px-6 py-5 text-[#f4f7ff] opacity-0 md:px-10 md:py-8">
      <div ref={contentRef} className="flex min-h-full flex-col">
        <header className="flex items-center justify-between text-xs uppercase tracking-[0.2em]">
          <button type="button" onClick={() => navigateTo('top')} aria-label="Back to top" className="min-h-11 cursor-pointer font-semibold tracking-[0.12em]">
            DM<span className="text-[#2563ff]">.</span>
          </button>
          <button ref={closeRef} type="button" onClick={onClose} className="min-h-11 cursor-pointer transition-colors hover:text-[#7cb9ff]">Close ×</button>
        </header>
        <nav aria-label="Main navigation" className="my-auto py-8">
          {menuItems.map(item => (
            <a key={item.target} href={`#${item.target}`} onClick={event => { event.preventDefault(); navigateTo(item.target) }}
              className="group grid w-full grid-cols-[36px_minmax(0,1fr)_auto] items-center border-b border-[#1a2232] py-4 text-left md:grid-cols-[100px_minmax(0,1fr)_auto] md:py-5">
              <span className="font-mono text-xs text-[#8491a7]">{item.number}</span>
              <span className="text-[clamp(1.4rem,4vw,4.5rem)] font-medium uppercase leading-none tracking-[-0.045em] transition-colors group-hover:text-[#7cb9ff]">{item.label}</span>
              <span aria-hidden="true" className="text-lg text-[#7cb9ff] transition-transform group-hover:translate-x-2">→</span>
            </a>
          ))}
        </nav>
        <footer className="flex flex-wrap items-end justify-between gap-5 text-xs text-[#8491a7]">
          <div><span className="block">Porto, Portugal</span><span className="mt-2 block">Software Developer</span></div>
          <div className="flex gap-5">
            <a href="https://github.com/Daviddm03" target="_blank" rel="noopener noreferrer" className="py-3 transition-colors hover:text-[#f4f7ff]">GitHub</a>
            <a href="https://www.linkedin.com/in/ddias-mo03/" target="_blank" rel="noopener noreferrer" className="py-3 transition-colors hover:text-[#f4f7ff]">LinkedIn</a>
          </div>
        </footer>
      </div>
    </div>, document.body,
  )
}
