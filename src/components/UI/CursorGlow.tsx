import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return
    const media = gsap.matchMedia()
    media.add('(pointer: fine) and (min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.set(glow, { xPercent: -50, yPercent: -50, opacity: 0 })
      const moveX = gsap.quickTo(glow, 'x', { duration: 0.6, ease: 'power3.out' })
      const moveY = gsap.quickTo(glow, 'y', { duration: 0.6, ease: 'power3.out' })
      const fade = gsap.quickTo(glow, 'opacity', { duration: 0.4 })
      let visible = false
      const move = (event: PointerEvent) => {
        moveX(event.clientX)
        moveY(event.clientY)
        if (!visible) { visible = true; fade(1) }
      }
      const leave = () => { visible = false; fade(0) }
      window.addEventListener('pointermove', move, { passive: true })
      window.addEventListener('blur', leave)
      document.documentElement.addEventListener('pointerleave', leave)
      return () => {
        window.removeEventListener('pointermove', move)
        window.removeEventListener('blur', leave)
        document.documentElement.removeEventListener('pointerleave', leave)
        moveX.tween.kill()
        moveY.tween.kill()
        fade.tween.kill()
      }
    }, glow)
    return () => media.revert()
  }, [])

  return (
    <div ref={glowRef} aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-100 hidden h-130 w-130 rounded-full opacity-0 blur-[20px] md:block"
      style={{ background: 'radial-gradient(circle, rgba(37, 99, 255, 0.10) 0%, rgba(37, 99, 255, 0.045) 30%, rgba(37, 99, 255, 0.015) 52%, rgba(37, 99, 255, 0) 72%)' }} />
  )
}
