import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Hero } from './Hero'
import { Intro } from './Intro'

gsap.registerPlugin(ScrollTrigger)

export function LandingExperience() {
  const sectionRef = useRef<HTMLElement>(null)

  const heroContentRef = useRef<HTMLDivElement>(null)
  const softwareRef = useRef<HTMLSpanElement>(null)
  const developerRef = useRef<HTMLSpanElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)

  const introRef = useRef<HTMLDivElement>(null)
  const introTextRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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
        opacity: 0,
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
          trigger: sectionRef.current,
          start: 'top top',

          /*
           * Comfortable scroll distance.
           *
           * We are no longer spending part of this distance
           * hiding the Intro.
           */
          end: '+=180%',

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
            opacity: 1,
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

        .to({}, { duration: 0.5 })
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      <Intro
        introRef={introRef}
        introTextRef={introTextRef}
      />

      <Hero
        softwareRef={softwareRef}
        developerRef={developerRef}
        heroContentRef={heroContentRef}
        dotRef={dotRef}
        roleRef={roleRef}
      />
    </section>
  )
}