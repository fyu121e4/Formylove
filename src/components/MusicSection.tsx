import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, Music2, Pause, Play, SkipBack, SkipForward } from 'lucide-react'
import Screen from './Screen'
import Sticker from './Sticker'
import HarveyVideo from './HarveyVideo'
import VinylRecord from './VinylRecord'
import type { VinylMode } from './VinylRecord'
import { Tulip, TulipCluster } from './TulipDecorations'
import { songs } from '../data/songs'
import { content, decorations } from '../data/content'

const ROOM_TONES = ['#F4B6C2', '#F8D7DC', '#FFFAF5']

const mediaUrl = (path: string) => import.meta.env.BASE_URL + path.slice(1)

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s <= 0) return '0:00'
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

function Cover({ src, className = '' }: { src: string; className?: string }) {
  const [failed, setFailed] = useState(false)
  return failed ? (
    <div className={`flex items-center justify-center bg-gradient-to-br from-rose to-wine text-warm ${className}`}>
      <Music2 size={20} />
    </div>
  ) : (
    <img src={mediaUrl(src)} alt="" onError={() => setFailed(true)} className={`object-cover ${className}`} />
  )
}

export default function MusicSection({ onNext }: { onNext: () => void }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const active = useRef(0)
  const request = useRef(0)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [showHarvey, setShowHarvey] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [error, setError] = useState('')
  const [durations, setDurations] = useState<Record<string, number>>({})
  const song = songs[index]
  const mode: VinylMode = playing ? 'playing' : 'paused'

  // Lee la duración de cada canción sin reproducirla.
  useEffect(() => {
    const probes = songs.map((s) => {
      const a = new Audio()
      a.preload = 'metadata'
      a.onloadedmetadata = () => setDurations((d) => ({ ...d, [s.id]: a.duration }))
      a.src = mediaUrl(s.file)
      return a
    })
    return () => probes.forEach((a) => { a.onloadedmetadata = null; a.removeAttribute('src'); a.load() })
  }, [])

  const start = (audio: HTMLAudioElement) => {
    const id = ++request.current
    setError('')
    void audio.play().catch((reason: DOMException) => {
      if (id !== request.current || reason.name === 'AbortError') return
      setPlaying(false)
      setError(reason.name === 'NotAllowedError'
        ? 'Pulsa Reproducir para iniciar la canción.'
        : 'No se pudo reproducir public' + songs[active.current].file + '.')
    })
  }

  const select = (next: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    active.current = next
    setIndex(next)
    setPlaying(false)
    setShowHarvey(false)
    setTime(0)
    setDuration(0)
    audio.src = mediaUrl(songs[next].file)
    start(audio)
  }

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) start(audio)
    else {
      ++request.current
      audio.pause()
    }
  }

  const step = (delta: number) => select((active.current + delta + songs.length) % songs.length)

  return (
    <Screen className={showHarvey ? "music-room music-room-harvey" : "music-room"} tones={ROOM_TONES} heartCount={14}>
      <audio
        ref={audioRef}
        src={mediaUrl(songs[0].file)}
        preload="metadata"
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
        onDurationChange={(event) => {
          const seconds = event.currentTarget.duration
          setDuration(Number.isFinite(seconds) ? seconds : 0)
        }}
        onPlaying={(event) => {
          if (event.currentTarget.paused) return
          setPlaying(true)
          if (songs[active.current].id === 'harvey') setShowHarvey(true)
        }}
        onWaiting={() => setPlaying(false)}
        onPause={(event) => { if (event.currentTarget.paused) setPlaying(false) }}
        onEnded={(event) => { if (event.currentTarget.ended) step(1) }}
        onError={() => {
          setPlaying(false)
          setError('No se pudo cargar public' + songs[active.current].file + '.')
        }}
      />

      <div className="relative mx-auto min-h-full max-w-6xl px-4 pb-20 pt-20">
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center font-script text-4xl font-bold text-warm sm:text-5xl"
        >
          {content.music.title}
        </motion.h2>

        <div className="mt-9 grid items-start gap-10 md:grid-cols-2">
          {/* Disco + decoraciones */}
          <div className="relative mx-auto w-full max-w-md px-5 py-4 sm:px-10">
            <Sticker {...decorations.snoopy} size={88} tilt={-8} className="absolute left-0 top-0 z-20" />
            <Sticker {...decorations.spiderman} size={88} tilt={8} className="absolute bottom-6 right-0 z-20" />
            <Tulip size={40} className="absolute -left-1 bottom-0 z-20" />
            <Tulip size={34} color="#F8D7DC" delay={1.2} className="absolute left-12 bottom-0 z-20" />
            <div className="turntable">
              <VinylRecord mode={mode} label={song.title} />
            </div>
            <span aria-hidden="true" className="absolute -right-1 top-10 animate-twinkle text-3xl text-rose-soft">✧</span>
          </div>

          {/* Reproductor */}
          <div className="player-panel rounded-3xl p-4 sm:p-6">
            <div className="flex items-center gap-4">
              <Cover key={song.id} src={song.cover} className="h-20 w-20 shrink-0 rounded-xl shadow-lg sm:h-24 sm:w-24" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-rose">{playing ? 'Sonando ahora' : 'Canción actual'}</p>
                <h3 className="truncate font-script text-3xl font-bold text-warm">{song.title}</h3>
                <p className="truncate text-sm font-semibold text-rose-soft">{song.artist}</p>
              </div>
            </div>

            <div className="mt-5">
              <input
                type="range"
                min={0}
                max={duration || 1}
                step={0.1}
                value={Math.min(time, duration || 1)}
                onChange={(e) => { const a = audioRef.current; if (a) a.currentTime = Number(e.target.value); setTime(Number(e.target.value)) }}
                aria-label="Progreso de la canción"
                disabled={!duration}
                className="h-2 w-full cursor-pointer rounded-full accent-rose"
                style={{ background: `linear-gradient(to right, #F4B6C2 ${duration ? (time / duration) * 100 : 0}%, rgba(255,250,245,.25) 0)` }}
              />
              <div className="mt-1 flex justify-between text-xs font-bold text-rose-soft">
                <span>{fmt(time)}</span>
                <span>{fmt(duration)}</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-center gap-5">
              <button onClick={() => step(-1)} className="rounded-full p-2 text-warm transition hover:bg-white/15" aria-label="Canción anterior"><SkipBack size={24} /></button>
              <button onClick={toggle} className="btn-soft !h-16 !w-16 !rounded-full !p-0" aria-label={playing ? 'Pausar' : 'Reproducir'}>
                {playing ? <Pause size={30} fill="currentColor" /> : <Play size={30} fill="currentColor" className="ml-1" />}
              </button>
              <button onClick={() => step(1)} className="rounded-full p-2 text-warm transition hover:bg-white/15" aria-label="Canción siguiente"><SkipForward size={24} /></button>
            </div>

            <label className="mt-4 flex items-center gap-3 text-sm font-bold text-rose-soft">
              Volumen
              <input type="range" min={0} max={1} step={0.01} value={volume}
                className="min-w-0 flex-1 accent-rose"
                onChange={(event) => {
                  const value = Number(event.currentTarget.value)
                  const audio = audioRef.current
                  if (audio) {
                    audio.volume = value
                    audio.muted = value === 0
                  }
                  setVolume(value)
                }}
              />
            </label>

            {error && (
              <p className="mt-3 flex items-start gap-2 rounded-xl bg-black/25 p-3 text-sm font-semibold text-rose-soft" role="alert">
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </p>
            )}

            <ul className="mt-5 space-y-1.5" aria-label="Lista de canciones">
              {songs.map((s, i) => {
                const current = i === index
                return (
                  <li key={s.id}>
                    <div
                      className={`flex items-center gap-3 rounded-2xl p-2 transition ${current ? 'bg-rose/25' : 'hover:bg-white/10'}`}
                      aria-current={current ? 'true' : undefined}
                    >
                      <Cover src={s.cover} className="h-11 w-11 shrink-0 rounded-lg" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-bold text-warm">{s.title}</p>
                        <p className="truncate text-xs font-semibold text-rose-soft">{s.artist}</p>
                      </div>
                      {current && playing && (
                        <span className="flex h-4 items-end gap-0.5 text-rose" aria-label="Sonando">
                          <span className="eq-bar" /><span className="eq-bar" style={{ animationDelay: '.2s' }} /><span className="eq-bar" style={{ animationDelay: '.4s' }} />
                        </span>
                      )}
                      <span className="w-10 text-right text-xs font-bold text-rose-soft">
                        {durations[s.id] ? fmt(durations[s.id]) : '--:--'}
                      </span>
                      <button
                        onClick={() => current ? toggle() : select(i)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose text-wine transition hover:scale-110"
                        aria-label={current && playing ? `Pausar ${s.title}` : `Reproducir ${s.title}`}
                      >
                        {current && playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <AnimatePresence>
          {showHarvey && <HarveyVideo key="harvey-video" playing={playing} />}
        </AnimatePresence>

        <div className="relative mt-12 flex justify-center">
          <button onClick={onNext} className="btn-soft text-lg">{content.music.button}</button>
        </div>
        <TulipCluster className="absolute bottom-0 right-0 hidden sm:flex" />
      </div>
    </Screen>
  )
}
