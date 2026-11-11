import { useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import EnvelopeIntro from './components/EnvelopeIntro'
import LoveLetter from './components/LoveLetter'
import MemoriesCarousel from './components/MemoriesCarousel'
import MusicSection from './components/MusicSection'
import VideoSection from './components/VideoSection'
import FinalLetter from './components/FinalLetter'
import Navigation from './components/Navigation'
import Screen from './components/Screen'

const LAST = 4

// Transición tipo diapositiva: entra desde el lado hacia el que avanzas.
const slide: Variants = {
  enter: (d: number) => ({ opacity: 0, x: d * 70, scale: 0.98 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (d: number) => ({ opacity: 0, x: d * -70, scale: 0.98 }),
}

export default function App() {
  const [step, setStep] = useState(0)
  const [max, setMax] = useState(0)
  const [dir, setDir] = useState(1)

  const go = (n: number) => {
    if (n < 0 || n > LAST || n === step) return
    setDir(n > step ? 1 : -1)
    setStep(n)
    setMax((m) => Math.max(m, n))
  }
  const next = () => go(step + 1)

  const screens = [
    <EnvelopeIntro key="s0" onNext={next} />,
    <LoveLetter key="s1" onNext={next} />,
    <MemoriesCarousel key="s2" onNext={next} />,
    <MusicSection key="s3" onNext={next} />,
    <Screen key="s4" className="final-screen bg-gradient-to-b from-rose-soft to-cream" hearts={false}>
      <VideoSection />
      <FinalLetter onRestart={() => go(0)} />
    </Screen>,
  ]

  return (
    <MotionConfig reducedMotion="user">
      <div className="fixed inset-0 overflow-hidden bg-wine">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={step}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {screens[step]}
          </motion.div>
        </AnimatePresence>
        {step > 0 && <Navigation step={step} max={max} onGo={go} />}
      </div>
    </MotionConfig>
  )
}
