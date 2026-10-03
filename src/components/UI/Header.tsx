import { useEffect, useState } from 'react'

type HeaderProps = {
  onOpenMenu: () => void
  isMenuOpen: boolean
}

export function Header({ onOpenMenu, isMenuOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }

  return (
    <header
      className={`
        pointer-events-none fixed left-0 top-0 z-100
        flex w-full items-center justify-between
        px-6 py-4
        text-xs uppercase tracking-[0.2em]
        transition-[background-color,backdrop-filter,border-color]
        duration-500
        md:px-10 md:py-5
        ${
          isScrolled
            ? 'border-b border-[#1a2232]/70 bg-[#05070d]/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }
      `}
    >
      <button
        type="button"
        aria-label="Back to top"
        onClick={scrollToTop}
        className="pointer-events-auto cursor-pointer font-semibold tracking-[0.12em]"
      >
        DM<span className="text-[#2563ff]">.</span>
      </button>

      <button
        type="button"
        onClick={onOpenMenu}
        aria-expanded={isMenuOpen}
        aria-controls="portfolio-menu"
        aria-haspopup="dialog"
        className="pointer-events-auto min-h-11 cursor-pointer transition-colors duration-300 hover:text-[#7cb9ff]"
      >
        Menu +
      </button>
    </header>
  )
}
