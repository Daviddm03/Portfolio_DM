import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Hero } from './Hero'
import { Intro } from './Intro'

gsap.registerPlugin(ScrollTrigger)

export function LandingExperience() {
  const sectionRef = useRef<HTMLElement>(null)

  const softwareRef = useRef<HTMLSpanElement>(null)
  const developerRef = useRef<HTMLSpanElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)

  const introRef = useRef<HTMLDivElement>(null)
  const introTextRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    // Keep the native position when media changes replace the landing pin.
    // Public revert/matchMedia events bracket GSAP's pin restoration.
    // https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.addEventListener()/
    let savedScroll = window.scrollY
    let restoring = false
    let refreshFrame = 0
    const rememberScroll = () => { if (!restoring) savedScroll = window.scrollY }
    const freezeScroll = () => { restoring = true }
    const refreshFinished = () => {
      cancelAnimationFrame(refreshFrame)
      refreshFrame = requestAnimationFrame(() => {
        restoring = false
        savedScroll = window.scrollY
      })
    }
    const restoreScroll = () => {
      window.scrollTo({ top: savedScroll, behavior: 'instant' })
      ScrollTrigger.update()
    }
    window.addEventListener('scroll', rememberScroll, { passive: true })
    ScrollTrigger.addEventListener('revert', freezeScroll)
    ScrollTrigger.addEventListener('refresh', refreshFinished)
    ScrollTrigger.addEventListener('matchMedia', restoreScroll)
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference) and (min-width: 768px) and (min-height: 600px), (prefers-reduced-motion: no-preference) and (min-height: 760px)', () => {
      const heroMeta = gsap.utils.toArray<HTMLElement>(
        '[data-hero-meta]',
      )

      const introDetails = gsap.utils.toArray<HTMLElement>(
        '[data-intro-detail]',
      )

      /*
       * HERO INITIAL STATE
       */

      gsap.set(roleRef.current, {
        opacity: 1,
        y: 0,
      })

      gsap.set(heroMeta, {
        opacity: 1,
        y: 0,
      })

      gsap.set(softwareRef.current, {
        xPercent: 0,
        yPercent: 0,
        opacity: 1,
      })

      gsap.set(developerRef.current, {
        xPercent: 0,
        yPercent: 0,
        opacity: 1,
      })

      gsap.set(dotRef.current, {
        opacity: 1,
        scale: 1,
      })

      /*
       * INTRO INITIAL STATE
       */

      gsap.set(introRef.current, {
        autoAlpha: 0,
      })

      gsap.set(introTextRef.current, {
        opacity: 1,
        y: 0,
      })

      gsap.set('[data-intro-title]', {
        yPercent: 115,
        opacity: 1,
      })

      gsap.set(introDetails, {
        opacity: 0,
        y: 24,
      })

      /*
       * HERO LOAD
       */

      const entrance = gsap.timeline({
        delay: 0.1,
      })

      entrance
        .from(softwareRef.current, {
          yPercent: 110,
          duration: 1,
          ease: 'power4.out',
        })
        .from(
          developerRef.current,
          {
            yPercent: 110,
            duration: 1,
            ease: 'power4.out',
          },
          '-=0.82',
        )

      /*
       * HERO → INTRO
       */

      const journey = gsap.timeline({
        defaults: {
          ease: 'none',
        },

        scrollTrigger: {
          id: 'landing-journey',
          trigger: sectionRef.current,
          start: 'top top',

          /*
           * Comfortable scroll distance.
           *
           * We are no longer spending part of this distance
           * hiding the Intro.
           */
          end: '+=120%',

          pin: true,

          /*
           * Smooth movement like the version we preferred.
           */
          scrub: 0.8,

          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      journey

        /*
         * HERO INFORMATION LEAVES
         */

        .to(
          roleRef.current,
          {
            opacity: 0,
            y: -20,
            duration: 0.2,
          },
          0,
        )

        .to(
          heroMeta,
          {
            opacity: 0,
            y: -24,
            duration: 0.2,
          },
          0,
        )

        /*
         * HERO TITLE SEPARATES
         */

        .to(
          softwareRef.current,
          {
            xPercent: 55,
            opacity: 0,
            duration: 0.42,
          },
          0.04,
        )

        .to(
          developerRef.current,
          {
            xPercent: -55,
            opacity: 0,
            duration: 0.42,
          },
          0.04,
        )

        /*
         * INTRO APPEARS
         */

        .to(
          introRef.current,
          {
            autoAlpha: 1,
            duration: 0.25,
            ease: 'power2.out',
          },
          0.27,
        )

        /*
         * TITLE ENTERS
         */

        .to(
          '[data-intro-title]',
          {
            yPercent: 0,
            duration: 0.38,
            ease: 'power4.out',
          },
          0.3,
        )

        /*
         * SUPPORTING INFORMATION ENTERS
         */

        .to(
          introDetails,
          {
            opacity: 1,
            y: 0,
            stagger: 0.055,
            duration: 0.3,
            ease: 'power3.out',
          },
          0.42,
        )

        /*
         * INTRO REMAINS COMPLETELY VISIBLE.
         *
         * This is deliberately the final part of the timeline.
         *
         * When the user reaches the end of the pin,
         * nothing disappears.
         */
    }, sectionRef)

    return () => {
      media.revert()
      window.removeEventListener('scroll', rememberScroll)
      ScrollTrigger.removeEventListener('revert', freezeScroll)
      ScrollTrigger.removeEventListener('refresh', refreshFinished)
      ScrollTrigger.removeEventListener('matchMedia', restoreScroll)
      cancelAnimationFrame(refreshFrame)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="top"
      className="landing-experience relative h-svh overflow-hidden"
    >
      <Hero
        softwareRef={softwareRef}
        developerRef={developerRef}
        dotRef={dotRef}
        roleRef={roleRef}
      />
      <Intro introRef={introRef} introTextRef={introTextRef} />
    </section>
  )
}
