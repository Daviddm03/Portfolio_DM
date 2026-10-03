import { useCallback, useState } from 'react'
import { MenuOverlay } from './components/UI/MenuOverlay'
import { Header } from './components/UI/Header'
import { LandingExperience } from './components/LandingExperience/LandingExperience'
import { EspacoEventos } from './components/Projects/EspacoEventos'
import { TipSplitting } from './components/Projects/TipSplitting'
import { FortyTwo } from './components/Projects/FortyTwo'
import { BuildingNext } from './components/Projects/BuildingNext'
import { About } from './components/About/About'
import { Stack } from './components/About/Stack'
import { CursorGlow } from './components/UI/CursorGlow'
import { Contact } from './components/Contact/Contact'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  return (
    <>
      <a className="skip-link" href="#work">Skip to selected work</a>
      <CursorGlow />

      <Header
        onOpenMenu={() => setIsMenuOpen(true)}
        isMenuOpen={isMenuOpen}
      />

      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={closeMenu}
      />

      <main id="main-content" className="relative bg-[#05070d] text-[#f4f7ff]">
        <LandingExperience />
        <EspacoEventos />
        <TipSplitting />
        <FortyTwo />
        <BuildingNext />
        <About />
        <Stack />
        <Contact />
      </main>
    </>
  )
}

export default App
