type TulipProps = { color?: string; size?: number; delay?: number; className?: string }

export function Tulip({ color = '#F4B6C2', size = 90, delay = 0, className = '' }: TulipProps) {
  return (
    <svg
      viewBox="0 0 60 120"
      width={size}
      height={size * 2}
      className={`animate-sway ${className}`}
      style={{ animationDelay: `${delay}s` }}
      aria-hidden
    >
      <path d="M30 118 C29 92 32 72 30 48" stroke="#5E8C61" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M30 112 C10 104 5 84 8 66 C22 72 30 90 30 112Z" fill="#6FA172" />
      <path d="M30 104 C48 98 54 80 51 64 C38 70 31 86 30 104Z" fill="#5E8C61" />
      <path d="M15 20 C12 40 21 53 30 53 C39 53 48 40 45 20 L37 29 L30 12 L23 29 Z" fill={color} />
      <path d="M23 29 L30 12 L37 29 C37 44 23 44 23 29Z" fill="#FFFAF5" opacity="0.35" />
    </svg>
  )
}

/** Tres tulipanes agrupados. Posiciónalo con className (absolute, bottom-0, etc.). */
export function TulipCluster({ className = '', scale = 1 }: { className?: string; scale?: number }) {
  return (
    <div className={`pointer-events-none flex items-end ${className}`} aria-hidden>
      <Tulip size={44 * scale} color="#EE8FA5" delay={0.4} className="-mr-2" />
      <Tulip size={56 * scale} color="#F4B6C2" delay={0} />
      <Tulip size={40 * scale} color="#F8D7DC" delay={1} className="-ml-2" />
    </div>
  )
}

export default TulipCluster
