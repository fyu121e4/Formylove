import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Volume2, VolumeX, VideoOff } from 'lucide-react'
import Sticker from './Sticker'
import { content, decorations } from '../data/content'

export default function VideoSection() {
  const { video } = content
  const ref = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [blocked, setBlocked] = useState(false)
  const [missing, setMissing] = useState(false)

  // Pausa la decodificacion al desplazar el video fuera de la pantalla.
  useEffect(() => {
    const element = ref.current
    if (!element) return
    let visible = false
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && document.visibilityState === 'visible') {
        void element.play().catch((error: DOMException) => {
          if (visible && error.name !== 'AbortError') setBlocked(true)
        })
      } else {
        element.pause()
      }
    }, { threshold: 0.05 })
    const onVisibility = () => {
      if (document.visibilityState !== 'visible') element.pause()
      else if (visible) void element.play().catch(() => setBlocked(true))
    }
    observer.observe(element)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      element.pause()
    }
  }, [])

  const toggleSound = () => {
    const v = ref.current
    if (!v) return
    const next = !v.muted
    v.muted = next
    setMuted(next)
    if (v.paused) v.play().then(() => setBlocked(false)).catch(() => setBlocked(true))
  }

  const startManually = () => {
    ref.current?.play().then(() => setBlocked(false)).catch(() => undefined)
  }

  return (
    <section className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-4 pt-20">
      <motion.h2
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-center font-script text-4xl font-bold text-wine sm:text-6xl"
      >
        {video.title}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.94, rotate: 0 }}
        animate={{ opacity: 1, scale: 1, rotate: -1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative mt-8 w-full film-frame rounded-md p-3 sm:p-4"
      >
        <span className="tape -top-3 left-6 -rotate-6" />
        <span className="tape -top-3 right-6 rotate-6" />
        <Sticker {...decorations.snoopy} size={76} tilt={-9} className="absolute -bottom-7 -left-3 z-20 sm:-left-12" />
        <Sticker {...decorations.spiderman} size={76} tilt={9} className="absolute -right-3 -top-9 z-20 sm:-right-12" />

        <div
          className="relative mx-auto max-h-[70dvh] w-full overflow-hidden bg-black"
          style={{ aspectRatio: video.aspect }}
        >
          {missing ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-rose-soft to-rose p-6 text-center text-wine">
              <VideoOff size={38} />
              <p className="font-script text-2xl font-bold">Tu video va aquí</p>
              <p className="text-sm font-semibold">Guárdalo como public{video.src} o cambia la ruta en content.ts</p>
            </div>
          ) : (
            <video
              ref={ref}
              src={import.meta.env.BASE_URL + video.src.slice(1)}
              poster={video.poster || undefined}
              loop
              muted
              playsInline
              preload="metadata"
              onError={() => setMissing(true)}
              onPlaying={() => setBlocked(false)}
              className="h-full w-full object-contain"
            />
          )}

          {!missing && blocked && (
            <button
              onClick={startManually}
              className="absolute inset-0 flex items-center justify-center bg-black/35 text-warm"
              aria-label="Reproducir video"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-wine/90 shadow-xl">
                <Play size={36} fill="currentColor" className="ml-1" />
              </span>
            </button>
          )}

          {!missing && (
            <button
              onClick={toggleSound}
              className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-wine/90 px-4 py-2 text-sm font-extrabold text-warm shadow-lg transition hover:scale-105"
              aria-label={muted ? 'Activar sonido' : 'Silenciar video'}
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              {muted ? 'Activar sonido' : 'Silenciar'}
            </button>
          )}
        </div>
      </motion.div>
    </section>
  )
}
