import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current

    if (!glow) {
      return
    }

    const finePointer = window.matchMedia('(pointer: fine)')

    if (!finePointer.matches) {
      return
    }

    /*
     * quickTo gives us a smooth delayed movement without
     * creating a new GSAP tween on every mouse event.
     */
    const moveX = gsap.quickTo(glow, 'x', {
      duration: 0.6,
      ease: 'power3.out',
    })

    const moveY = gsap.quickTo(glow, 'y', {
      duration: 0.6,
      ease: 'power3.out',
    })

    /*
     * Start hidden.
     */
    gsap.set(glow, {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
    })

    const handleMouseMove = (event: MouseEvent) => {
      moveX(event.clientX)
      moveY(event.clientY)

      gsap.to(glow, {
        opacity: 1,
        duration: 0.4,
        overwrite: 'auto',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(glow, {
        opacity: 0,
        duration: 0.5,
        overwrite: 'auto',
      })
    }

    const handleMouseEnter = () => {
      gsap.to(glow, {
        opacity: 1,
        duration: 0.4,
        overwrite: 'auto',
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.documentElement.addEventListener(
      'mouseleave',
      handleMouseLeave,
    )
    document.documentElement.addEventListener(
      'mouseenter',
      handleMouseEnter,
    )

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)

      document.documentElement.removeEventListener(
        'mouseleave',
        handleMouseLeave,
      )

      document.documentElement.removeEventListener(
        'mouseenter',
        handleMouseEnter,
      )
    }
  }, [])

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-100 hidden h-130 w-130 rounded-full opacity-0 blur-[20px] md:block"
      style={{
        background:
          'radial-gradient(circle, rgba(37, 99, 255, 0.10) 0%, rgba(37, 99, 255, 0.045) 30%, rgba(37, 99, 255, 0.015) 52%, rgba(37, 99, 255, 0) 72%)',
      }}
    />
  )
}