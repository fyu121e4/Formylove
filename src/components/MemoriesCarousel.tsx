import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Camera, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import Screen from './Screen'
import Sticker from './Sticker'
import { TulipCluster } from './TulipDecorations'
import { photos } from '../data/photos'
import { content, decorations } from '../data/content'

const TILTS = [-3, 2.5, -1.5, 3, -2.5, 1.5, -3.5, 2]
const INTERVAL = 5500 / 1.5

export default function MemoriesCarousel({ onNext }: { onNext: () => void }) {
  const reduce = useReducedMotion()
  const total = photos.length
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [hovered, setHovered] = useState(false)
  const [autoplay, setAutoplay] = useState<boolean | null>(null)
  const rotating = autoplay ?? !reduce
  const [broken, setBroken] = useState<Record<number, boolean>>({})

  const go = useCallback(
    (delta: number) => {
      setDir(delta >= 0 ? 1 : -1)
      setIndex((i) => (i + delta + total) % total)
    },
    [total],
  )

  // Avance automático en bucle: tras la última vuelve a la primera.
  useEffect(() => {
    if (!rotating || hovered || total < 2) return
    const t = window.setTimeout(() => go(1), INTERVAL)
    return () => window.clearTimeout(t)
  }, [index, rotating, hovered, total, go])

  // Precarga la siguiente foto.
  useEffect(() => {
    const next = photos[(index + 1) % total]
    if (next?.src) new Image().src = next.src
  }, [index, total])

  const photo = photos[index]
  const tilt = TILTS[index % TILTS.length]
  const showPlaceholder = !photo.src || broken[index]

  return (
    <Screen className="bg-gradient-to-br from-rose to-cream" tones={['#8B2E29', '#F8D7DC', '#FFFAF5']} heartCount={16}>
      <div className="relative mx-auto flex min-h-full max-w-xl flex-col items-center px-4 pb-24 pt-20">
        <TulipCluster className="absolute bottom-0 left-0" scale={1.1} />
        <TulipCluster className="absolute bottom-0 right-0" />

        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center font-script text-4xl font-bold text-wine sm:text-5xl"
        >
          {content.memories.title}
        </motion.h2>

        <div
          className="relative z-10 album-stack mt-8 w-[calc(100%_-_2rem)] max-w-sm"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          role="group"
          aria-roledescription="carrusel"
          aria-label="Fotografías"
        >
          <Sticker {...decorations.spiderman} size={72} tilt={10} className="absolute -right-4 -top-8 z-30 sm:-right-12" />
          <Sticker {...decorations.snoopy} size={72} tilt={-9} className="absolute -bottom-6 -left-4 z-30 sm:-left-12" />

          <AnimatePresence mode="popLayout" custom={dir}>
            <motion.figure
              key={index}
              custom={dir}
              drag={reduce || total < 2 ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1)
                else if (info.offset.x > 60) go(-1)
              }}
              initial={reduce ? false : { opacity: 0, x: dir * 70, rotate: tilt + dir * 8, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, rotate: tilt, scale: 1 }}
              exit={{ opacity: 0, x: dir * -90, rotate: tilt - dir * 8, scale: 0.94 }}
              whileHover={reduce ? undefined : { y: -5, scale: 1.025, rotate: tilt * 0.6 }}
              transition={{ duration: reduce ? 0 : 0.55 / 1.5, ease: 'easeInOut' }}
              className="polaroid relative m-0 cursor-grab touch-pan-y p-3 pb-6 active:cursor-grabbing"
            >
              <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" />
              <div className="relative aspect-[4/4.4] overflow-hidden bg-rose-soft">
                {showPlaceholder ? (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-rose-soft to-rose p-6 text-center text-wine">
                    <Camera size={40} />
                    <p className="font-script text-2xl font-bold">{photo.filename ? 'Recuerdo por recuperar' : 'Tu foto va aqu\u00ed'}</p>
                    <p className="text-sm font-semibold">{photo.filename ?? 'Agrega im\u00e1genes en public/images'}</p>
                  </div>
                ) : (
                  <motion.img
                    src={photo.src as string}
                    alt={"Nuestro primer año juntos, recuerdo " + (index + 1)}
                    draggable={false}
                    onError={() => {
                      console.warn('[fotos] No se pudo cargar:', photo.filename)
                      setBroken((b) => ({ ...b, [index]: true }))
                    }}
                    initial={{ scale: 1 }}
                    animate={{ scale: reduce ? 1 : 1.045 }}
                    transition={{ duration: INTERVAL / 1000 + 1, ease: 'linear' }}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="relative z-10 mt-8 flex items-center gap-4">
          <button disabled={total < 2} onClick={() => go(-1)} className="btn-primary !px-3 !py-3" aria-label="Foto anterior">
            <ChevronLeft size={22} />
          </button>
          <p className="min-w-[4.5rem] text-center font-extrabold text-wine" aria-live={rotating ? "off" : "polite"}>
            {index + 1} / {total}
          </p>
          <button disabled={total < 2} onClick={() => go(1)} className="btn-primary !px-3 !py-3" aria-label="Foto siguiente">
            <ChevronRight size={22} />
          </button>
        </div>

        {total > 1 && (
          <label className="relative z-10 mt-3 flex items-center gap-2 text-sm font-bold text-wine">
            Ir a la foto
            <select
              className="min-h-11 rounded-xl border border-wine/30 bg-warm px-2 text-wine"
              value={index}
              onChange={(event) => {
                const target = Number(event.currentTarget.value)
                go(target - index)
              }}
            >
              {photos.map((_, position) => <option key={position} value={position}>{position + 1}</option>)}
            </select>
          </label>
        )}
        {total > 1 && (
          <button
            type="button"
            onClick={() => setAutoplay(!rotating)}
            className="relative z-10 mt-3 inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-bold text-wine hover:bg-white/40"
          >
            {rotating ? <Pause size={16} /> : <Play size={16} />}
            {rotating ? 'Pausar carrusel' : 'Activar carrusel'}
          </button>
        )}

        <button onClick={onNext} className="btn-primary relative z-10 mt-10 text-lg">
          {content.memories.button}
        </button>
      </div>
    </Screen>
  )
}
