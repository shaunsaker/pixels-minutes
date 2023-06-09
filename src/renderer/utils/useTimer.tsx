import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

export const useTimer = startTime => {
  const [duration, setDuration] = useState('00:00:00')

  useEffect(() => {
    const duration = dayjs(startTime).fromNow()

    setDuration(duration)

    const intervalId = setInterval(() => {
      const duration = dayjs(startTime).fromNow()

      setDuration(duration)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [startTime])

  return duration
}
