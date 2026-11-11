import { AnimatePresence, motion } from 'framer-motion'

export type VinylMode = 'playing' | 'paused'

export default function VinylRecord({ mode, label }: { mode: VinylMode; label: string }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      {/* Disco que gira */}
      <div
        className="vinyl-disc absolute inset-0 rounded-full"
        data-playing={mode === 'playing'}
        style={{
          background:
            'repeating-radial-gradient(circle at 50% 50%, #0d0d0d 0 2px, #1c1c1c 3px 4px), #111',
        }}
      >
        <div className="absolute inset-[8%] rounded-full border border-white/5" />
        <div className="absolute inset-[18%] rounded-full border border-white/10" />
        <div className="absolute inset-[28%] rounded-full border border-white/5" />
        {/* Etiqueta central */}
        <div
          className="absolute left-1/2 top-1/2 flex h-[36%] w-[36%] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border-4 border-wine-deep text-center"
          style={{ background: 'radial-gradient(circle at 35% 30%, #F8D7DC, #F4B6C2 40%, #8B2E29 100%)' }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={label} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
              className="absolute inset-x-1 bottom-[17%] z-10 font-script text-xs font-bold leading-tight text-wine sm:text-base"
            >
              {label}
            </motion.span>
          </AnimatePresence>
          <span className="absolute left-1/2 top-1/2 z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream shadow-inner" />
        </div>
      </div>

      {/* Reflejos de luz: no giran, así parece vinilo real */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full mix-blend-screen"
        style={{
          background:
            'conic-gradient(from 20deg, transparent 0 18%, rgba(255,255,255,0.22) 24%, transparent 32% 68%, rgba(244,182,194,0.2) 74%, transparent 82%)',
        }}
      />
      <div className="pointer-events-none absolute left-[12%] top-[8%] h-[14%] w-[30%] -rotate-[35deg] rounded-full bg-white/10 blur-md" />

      {/* Brazo del tocadiscos */}
      <motion.div
        className="absolute -right-3 top-2 h-[58%] w-3 origin-top rounded-full bg-gradient-to-b from-rose-soft to-rose shadow-lg sm:-right-6"
        animate={{ rotate: mode === 'playing' ? 24 : 2 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        aria-hidden
      >
        <span className="absolute -bottom-3 -left-1 h-6 w-5 rounded-md bg-wine-deep" />
        <span className="absolute -top-3 left-1/2 h-7 w-7 -translate-x-1/2 rounded-full bg-wine-deep shadow" />
      </motion.div>
    </div>
  )
}
