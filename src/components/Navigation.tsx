import { ArrowLeft } from 'lucide-react'
import { content } from '../data/content'

type Props = { step: number; max: number; onGo: (n: number) => void }

/** Indicador de progreso + botón para volver. Solo se puede saltar a momentos ya visitados. */
export default function Navigation({ step, max, onGo }: Props) {
  return (
    <nav
      className="story-navigation fixed left-1/2 top-3 z-50 flex -translate-x-1/2 items-center rounded-full bg-wine/90 shadow-lg"
      aria-label="Progreso de la historia"
    >
      <button
        onClick={() => onGo(step - 1)}
        className="flex h-11 w-11 items-center justify-center rounded-full text-warm transition hover:bg-white/15"
        aria-label="Volver al momento anterior"
      >
        <ArrowLeft size={18} />
      </button>
      <ol className="flex items-center">
        {content.stepNames.map((name, i) => {
          const reachable = i <= max
          return (
            <li key={name}>
              <button
                disabled={!reachable}
                onClick={() => onGo(i)}
                aria-label={`${name}${i === step ? ' (actual)' : ''}`}
                aria-current={i === step ? 'step' : undefined}
                className="flex h-11 w-11 items-center justify-center rounded-full"
              >
                <span aria-hidden="true" className={`block h-2.5 rounded-full transition-all ${
                  i === step ? 'w-7 bg-rose' : reachable ? 'w-2.5 bg-rose-soft/80 hover:bg-rose' : 'w-2.5 bg-white/25'
                }`}
                />
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
