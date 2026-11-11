import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/** Revela el texto y detiene el temporizador al leer todo. */
export function useTypewriter(text: string, speed = 28) {
  const reduce = useReducedMotion()
  const [n, setN] = useState(0)
  const timer = useRef<number | null>(null)

  const stop = () => {
    if (timer.current !== null) {
      window.clearInterval(timer.current)
      timer.current = null
    }
  }

  useEffect(() => {
    if (reduce) {
      setN(text.length)
      return
    }

    setN(0)
    let position = 0
    timer.current = window.setInterval(() => {
      position = Math.min(position + 1, text.length)
      setN(position)
      if (position === text.length) stop()
    }, speed)
    return stop
  }, [text, speed, reduce])

  const skip = () => {
    stop()
    setN(text.length)
  }

  return {
    shown: reduce ? text : text.slice(0, n),
    done: Boolean(reduce) || n >= text.length,
    skip,
  }
}
