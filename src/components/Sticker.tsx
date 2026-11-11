import { useState } from 'react'

type Props = {
  src: string
  emoji: string
  label: string
  size?: number
  tilt?: number
  className?: string
}

/** Sticker estilo scrapbook. Si la imagen no existe, muestra un emoji de reemplazo. */
export default function Sticker({ src, emoji, label, size = 96, tilt = -6, className = '' }: Props) {
  const [failed, setFailed] = useState(false)
  return (
    <div
      className={`pointer-events-none select-none rounded-2xl sticker-paper overflow-hidden p-1.5 ${className}`}
      style={{ width: size, height: size, transform: `rotate(${tilt}deg)` }}
    >
      {failed ? (
        <div
          className="flex h-full w-full items-center justify-center rounded-xl border-2 border-dashed border-rose bg-cream"
          style={{ fontSize: size * 0.5 }}
          role="img"
          aria-label={label}
        >
          {emoji}
        </div>
      ) : (
        <img src={import.meta.env.BASE_URL + src.slice(1)} alt={label} onError={() => setFailed(true)} className="h-full w-full rounded-xl object-contain object-center" draggable={false} />
      )}
    </div>
  )
}
