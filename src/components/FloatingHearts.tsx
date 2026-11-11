import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Heart, Sparkle } from 'lucide-react'

type Props = { count?: number; tones?: string[]; className?: string }

const DEFAULT_TONES = ['#F4B6C2', '#F8D7DC', '#FFFAF5']
const rand = (a: number, b: number) => a + Math.random() * (b - a)

export default function FloatingHearts({ count = 18, tones = DEFAULT_TONES, className = '' }: Props) {
  const reduce = useReducedMotion()
  const palette = tones.join(',')
  const { hearts, stars } = useMemo(() => {
    const colors = palette.split(',')
    const small = typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches)
    const n = small ? Math.min(4, count) : count
    return {
      hearts: Array.from({ length: n }, (_, i) => ({
        id: i,
        left: rand(0, 100),
        size: rand(10, 34),
        dur: rand(14, 28),
        delay: -rand(0, 28),
        drift: rand(-70, 70),
        o: rand(0.25, 0.65),
        down: i % 5 === 0,
        tone: colors[i % colors.length],
      })),
      stars: Array.from({ length: small ? 2 : 12 }, (_, i) => ({
        id: i,
        left: rand(3, 97),
        top: rand(4, 96),
        size: rand(8, 16),
        delay: rand(0, 4),
      })),
    }
  }, [count, palette])

  if (reduce) return null

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute will-change-transform"
          style={
            {
              left: `${h.left}%`,
              [h.down ? 'top' : 'bottom']: '-40px',
              '--drift': `${h.drift}px`,
              '--o': h.o,
              opacity: 0,
              animation: `${h.down ? 'float-down' : 'float-up'} ${h.dur}s linear ${h.delay}s infinite`,
            } as CSSProperties
          }
        >
          {h.down
            ? <span className="floating-petal" style={{ width: h.size * 0.5, height: h.size * 0.75, backgroundColor: h.tone }} />
            : <Heart size={h.size} fill={h.tone} color={h.tone} />}
        </span>
      ))}
      {stars.map((s) => (
        <span
          key={`s${s.id}`}
          className="animate-twinkle absolute text-warm"
          style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `${s.delay}s` }}
        >
          <Sparkle size={s.size} fill="currentColor" />
        </span>
      ))}
    </div>
  )
}
