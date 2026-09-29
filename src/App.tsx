import { LandingExperience } from './components/LandingExperience/LandingExperience'
import { EspacoEventos } from './components/Projects/EspacoEventos'
import { TipSplitting } from './components/Projects/TipSplitting'
import { FortyTwo } from './components/Projects/FortyTwo'
import { BuildingNext } from './components/Projects/BuildingNext'
import { About } from './components/About/About'
import { Stack } from './components/About/Stack'
import { CursorGlow } from './components/UI/CursorGlow'

function App() {
  return (
    <main className="relative bg-[#05070d] text-[#f4f7ff]">
      <CursorGlow />

      <LandingExperience />

      <EspacoEventos />

      <TipSplitting />

      <FortyTwo />

      <BuildingNext />

      <About />

      <Stack />
    </main>
  )
}

export default App