import { Heart, RotateCcw } from 'lucide-react'
import Paper from './Paper'
import { content } from '../data/content'

export default function FinalLetter({ onRestart }: { onRestart: () => void }) {
  const { final } = content

  return (
    <section className="final-letter relative mx-auto w-full max-w-3xl px-4 pb-24 pt-16">
      <h2 className="mb-8 text-center font-script text-4xl font-bold text-wine sm:text-5xl">
        {final.title}
      </h2>

      <Paper>
        <div className="letter-copy font-script text-2xl leading-8 text-wine-deep">
          {final.paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-8">{paragraph}</p>
          ))}
        </div>

        <div className="my-6 rounded-2xl bg-rose-soft/70 px-4 py-5 text-center text-wine">
          <Heart size={20} fill="currentColor" className="mx-auto mb-3" aria-hidden="true" />
          <p className="font-script text-3xl font-bold leading-snug sm:text-4xl">
            {final.highlight}
          </p>
        </div>

        <div className="mt-6 text-right font-script text-2xl text-wine">
          <p>{final.signature}</p>
          <p className="text-3xl font-bold">{final.from}</p>
        </div>
      </Paper>

      <div className="mt-10 flex justify-center">
        <button onClick={onRestart} className="btn-primary">
          <RotateCcw size={18} /> {final.restart}
        </button>
      </div>
    </section>
  )
}
