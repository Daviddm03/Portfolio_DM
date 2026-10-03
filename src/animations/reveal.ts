import gsap from 'gsap'

// Call inside the section's scoped matchMedia context so GSAP owns cleanup.
// https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
export function revealGroup(targets: gsap.TweenTarget, trigger: Element | null) {
  if (!trigger) return

  return gsap.from(targets, {
    opacity: 0,
    y: 32,
    duration: 0.7,
    stagger: 0.08,
    ease: 'power3.out',
    clearProps: 'opacity,transform',
    scrollTrigger: {
      trigger,
      start: 'top 85%',
      once: true,
    },
  })
}
