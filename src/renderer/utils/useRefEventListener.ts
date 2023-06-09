import { useRef } from 'react'

export function useRefEventListener(fn) {
  const fnRef = useRef(fn)
  fnRef.current = fn
  return fnRef
}
