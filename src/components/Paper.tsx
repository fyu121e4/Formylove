import type { ReactNode } from 'react'

type Props = { children: ReactNode; className?: string; tilt?: number; tape?: boolean; torn?: boolean }

/** Hoja de papel estilo scrapbook: renglones, cinta y borde inferior rasgado. */
export default function Paper({ children, className = '', tilt = 0, tape = true, torn = true }: Props) {
  return (
    <div className="letter-sheet relative drop-shadow-[0_14px_22px_rgba(110,35,32,0.3)]" style={{ transform: `rotate(${tilt}deg)` }}>
      <div className={`paper-texture ${torn ? 'torn-bottom' : ''} rounded-t-md px-6 pb-12 pt-10 sm:px-12 ${className}`}>{children}</div>
      {tape && (
        <>
          <span className="tape -top-3 left-6 -rotate-6" />
          <span className="tape -top-3 right-8 rotate-[8deg]" />
        </>
      )}
    </div>
  )
}
