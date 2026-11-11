import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import Screen from './Screen'
import Sticker from './Sticker'
import { TulipCluster } from './TulipDecorations'
import { content, decorations } from '../data/content'

const rand = (a: number, b: number) => a + Math.random() * (b - a)

export default function EnvelopeIntro({ onNext }: { onNext: () => void }) {
  const { intro } = content
  const [opening, setOpening] = useState(false)
  const [flapBack, setFlapBack] = useState(false)
  const [burst, setBurst] = useState(false)
  const [noCount, setNoCount] = useState(0)
  const [msg, setMsg] = useState<string | null>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const dodges = useRef(0)
  const lastDodge = useRef(0)
  const noRef = useRef<HTMLButtonElement>(null)
  const timers = useRef<number[]>([])

  const burstHearts = useMemo(
    () => Array.from({ length: 26 }, (_, i) => ({ id: i, x: rand(0, 100), y: rand(0, 100), s: rand(3, 8), d: rand(0, 0.5) })),
    [],
  )

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), [])

  // El botón NO se aparta un poco cuando el cursor se acerca (solo con mouse y solo unas veces).
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || dodges.current >= 4 || opening) return
      const el = noRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const now = Date.now()
      if (Math.hypot(dx, dy) < 70 && now - lastDodge.current > 450) {
        lastDodge.current = now
        dodges.current += 1
        setOffset({ x: rand(-70, 70), y: rand(-28, 28) })
      }
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [opening])

  const handleNo = () => {
    setMsg(intro.noMessages[noCount % intro.noMessages.length])
    setNoCount((n) => n + 1)
  }

  const handleYes = () => {
    if (opening) return
    setMsg(null)
    setOpening(true)
    timers.current.push(window.setTimeout(() => setFlapBack(true), 450))
    timers.current.push(window.setTimeout(() => setBurst(true), 1900))
    timers.current.push(window.setTimeout(onNext, 3100))
  }

  return (
    <Screen className="bg-wine" tones={['#F4B6C2', '#F8D7DC', '#FFFAF5']} heartCount={22}>
      <div className="relative mx-auto flex min-h-full max-w-2xl flex-col items-center justify-center px-5 pb-24 pt-14 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="font-script text-4xl font-bold leading-tight text-warm sm:text-6xl"
        >
          {intro.title}
        </motion.h1>

        {/* Sobre */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative my-10"
        >
          <Sticker {...decorations.snoopy} size={84} tilt={-10} className="absolute -left-8 -top-10 z-50 sm:-left-14" />
          <Sticker {...decorations.spiderman} size={84} tilt={9} className="absolute -bottom-8 -right-6 z-50 sm:-right-14" />

          <div className="relative" style={{ width: 'min(78vw, 380px)', aspectRatio: '3 / 2', perspective: 900 }}>
            <div className="absolute inset-0 rounded-md bg-[#EBDCC8] shadow-[0_20px_40px_rgba(0,0,0,0.35)]" />
            <motion.div
              className="absolute inset-x-[6%] bottom-[8%] z-10 flex h-[88%] items-start justify-center rounded bg-warm pt-5 shadow"
              animate={opening ? { y: '-58%' } : { y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: 'easeInOut' }}
            >
              <p className="font-script text-3xl font-bold text-wine">{intro.envelopeLabel}</p>
            </motion.div>
            <div
              className="absolute inset-0 z-20 rounded-md bg-gradient-to-b from-warm to-[#F6EBDD]"
              style={{ clipPath: 'polygon(0 0, 50% 58%, 100% 0, 100% 100%, 0 100%)' }}
            />
            <motion.div
              className="absolute inset-x-0 top-0 h-[58%] bg-[#F3E6D4]"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', transformOrigin: 'top', zIndex: flapBack ? 5 : 30 }}
              animate={{ rotateX: opening ? 180 : 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute left-1/2 top-[50%] z-40 -translate-x-1/2 -translate-y-1/2"
              animate={opening ? { opacity: 0, scale: 1.6 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Heart size={44} fill="#8B2E29" color="#8B2E29" className="animate-pulse-heart" />
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: opening ? 0 : 1 }}
          transition={{ delay: opening ? 0 : 0.9 }}
          className="font-script text-3xl text-rose-soft sm:text-4xl"
        >
          {intro.question}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: opening ? 0 : 1 }}
          transition={{ delay: opening ? 0 : 1.1 }}
          className="mt-5 flex items-center gap-4"
          style={{ pointerEvents: opening ? 'none' : 'auto' }}
        >
          <motion.button
            ref={noRef}
            onClick={handleNo}
            animate={offset}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
            className="btn-ghost min-w-[110px]"
          >
            {intro.no}
          </motion.button>
          <button onClick={handleYes} className="btn-soft min-w-[110px] animate-pulse-heart">
            {intro.yes}
          </button>
        </motion.div>

        <div className="mt-5 min-h-[4rem] max-w-md" aria-live="polite">
          <AnimatePresence mode="wait">
            {msg && !opening && (
              <motion.p
                key={noCount}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl bg-warm/10 px-4 py-2 text-base font-semibold text-rose-soft"
              >
                {msg}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <TulipCluster className="absolute bottom-0 left-2 sm:left-10" />
        <TulipCluster className="absolute bottom-0 right-2 sm:right-10" scale={0.9} />
      </div>

      {burst && (
        <motion.div
          className="fixed inset-0 z-[70] overflow-hidden"
          initial={{ backgroundColor: 'rgba(244,182,194,0)' }}
          animate={{ backgroundColor: 'rgba(244,182,194,1)' }}
          transition={{ duration: 1 }}
        >
          {burstHearts.map((h) => (
            <motion.span
              key={h.id}
              className="absolute"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: h.s, opacity: 1 }}
              transition={{ duration: 1.1, delay: h.d, ease: 'easeOut' }}
            >
              <Heart size={40} fill="#8B2E29" color="#8B2E29" />
            </motion.span>
          ))}
        </motion.div>
      )}
    </Screen>
  )
}
