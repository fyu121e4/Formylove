import { useEffect, useRef, useState } from 'react'
import { motion, useIsPresent, useReducedMotion } from 'framer-motion'
import { Heart, Play, VideoOff } from 'lucide-react'
import { content } from '../data/content'

export default function HarveyVideo({ playing }: { playing: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [blocked, setBlocked] = useState(false)
  const [failed, setFailed] = useState(false)
  const present = useIsPresent()
  const reduce = useReducedMotion()
  const { video } = content

  useEffect(() => {
    const element = ref.current
    if (!element) return
    let cancelled = false
    if (playing && present) {
      element.muted = true
      void element.play().catch((error: DOMException) => {
        if (!cancelled && error.name !== 'AbortError') setBlocked(true)
      })
    } else {
      element.pause()
      if (!present && element.readyState) element.currentTime = 0
    }
    return () => {
      cancelled = true
      element.pause()
    }
  }, [playing, present])

  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduce ? 0 : -8 }}
      transition={{ duration: reduce ? 0 : 0.35 }}
      className="film-frame relative mx-auto mt-12 max-w-2xl p-3 sm:p-5"
    >
      <span className="tape -top-2 left-5 -rotate-6" />
      <div className="relative grid min-h-40 place-items-center overflow-hidden rounded-sm bg-wine-deep">
        <video
          ref={ref}
          src={import.meta.env.BASE_URL + video.src.slice(1)}
          muted
          loop
          playsInline
          preload="metadata"
          className="max-h-[65svh] w-full object-contain"
          hidden={failed}
          onPlaying={() => setBlocked(false)}
          onError={() => setFailed(true)}
        />
        {failed && (
          <p className="flex items-center gap-2 p-5 text-sm text-warm" role="status">
            <VideoOff size={20} /> No se pudo cargar public{video.src}.
          </p>
        )}
        {!failed && blocked && playing && present && (
          <button className="btn-soft absolute" onClick={() => {
            const element = ref.current
            if (element) void element.play().catch(() => setBlocked(true))
          }}>
            <Play size={17} /> Iniciar video
          </button>
        )}
      </div>
      <figcaption className="flex items-center justify-between gap-3 px-1 pt-2 font-script text-2xl font-bold text-wine">
        {video.title}
        <Heart size={20} fill="currentColor" aria-hidden="true" />
      </figcaption>
    </motion.figure>
  )
}
