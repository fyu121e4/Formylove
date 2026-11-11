import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import Screen from './Screen'
import Paper from './Paper'
import Sticker from './Sticker'
import { TulipCluster } from './TulipDecorations'
import { useTypewriter } from '../hooks/useTypewriter'
import { content, decorations } from '../data/content'

export default function LoveLetter({ onNext }: { onNext: () => void }) {
  const { letter } = content
  const full = letter.paragraphs.join('\n\n')
  const { shown, done, skip } = useTypewriter(full, 28)

  return (
    <Screen className="bg-gradient-to-b from-cream to-rose-soft" tones={['#F4B6C2', '#8B2E29', '#F8D7DC']} heartCount={14}>
      <div className="relative mx-auto flex min-h-full max-w-3xl flex-col items-center px-4 pb-32 pt-20">
        <TulipCluster className="absolute bottom-0 left-0" scale={1.1} />
        <TulipCluster className="absolute bottom-0 right-0" />

        <div className="relative z-10 w-full">
          <Sticker {...decorations.snoopy} size={92} tilt={8} className="absolute -right-2 -top-12 z-20 sm:-right-10" />
          <Sticker {...decorations.spiderman} size={80} tilt={-8} className="absolute -left-2 bottom-4 z-20 hidden sm:-left-12 sm:block" />

          <motion.div initial={{ opacity: 0, y: 30, rotate: -3 }} animate={{ opacity: 1, y: 0, rotate: -0.6 }} transition={{ duration: 0.9 }}>
            <Paper>
              <h2 className="mb-6 text-center font-script text-4xl font-bold text-wine sm:text-5xl">{letter.title}</h2>

              <div className="mb-5 flex justify-end">
                <button
                  type="button"
                  onClick={skip}
                  disabled={done}
                  className="min-h-11 rounded-full border border-wine/25 bg-rose-soft px-5 py-2 font-body text-base font-bold text-wine disabled:opacity-60"
                >
                  {done ? 'Carta completa' : letter.skipButton}
                </button>
              </div>

              {/* El texto completo, invisible, reserva el alto para que nada salte mientras se escribe. */}
              <div className="letter-copy relative font-script text-2xl leading-8 text-wine-deep">
                <p className="invisible whitespace-pre-line" aria-hidden>{full}</p>
                <p className="absolute inset-0 whitespace-pre-line" aria-label={full}>
                  {shown}
                  {!done && <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-1 animate-pulse bg-wine" />}
                </p>
              </div>

              <div className="mt-8 min-h-[5rem] text-right font-script text-2xl text-wine">
                {done && (
                  <div>
                    <p>{letter.signature}</p>
                    <p className="text-3xl font-bold">{letter.from}</p>
                  </div>
                )}
              </div>
            </Paper>
          </motion.div>
        </div>

        <button onClick={onNext} className="btn-primary relative z-10 mt-10 text-lg">
          <Heart size={18} fill="currentColor" /> {letter.button}
        </button>
      </div>
    </Screen>
  )
}
