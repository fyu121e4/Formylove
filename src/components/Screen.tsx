import type { ReactNode } from 'react'
import FloatingHearts from './FloatingHearts'
import ScrapbookDecorations from './ScrapbookDecorations'

type Props = { children: ReactNode; className?: string; hearts?: boolean; tones?: string[]; heartCount?: number }

/** Pantalla completa con corazones de fondo y scroll interno. */
export default function Screen({ children, className = '', hearts = true, tones, heartCount }: Props) {
  return (
    <div className={`story-screen relative h-full w-full overflow-hidden ${className}`}>
      <ScrapbookDecorations />
      {hearts && <FloatingHearts tones={tones} count={heartCount} />}
      <div className="screen-scroll relative z-10 h-full overflow-y-auto overflow-x-hidden">{children}</div>
    </div>
  )
}
