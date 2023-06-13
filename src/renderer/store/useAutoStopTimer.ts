import dayjs from 'dayjs'
import { useEffect } from 'react'

import { useCurrentTracking } from './currentTracking/useCurrentTracking'
import { useStopTracking } from './currentTracking/useStopTracking'
import { useAutoStopTime } from './settings/useAutoStopTime'
import { useTimeLastActive } from './useTimeLastActive'

export const useAutoStopTimer = () => {
  const [autoStopTime] = useAutoStopTime()
  const [timeLastActive] = useTimeLastActive()
  const stopTracking = useStopTracking()
  const [currentTracking] = useCurrentTracking()

  useEffect(() => {
    const interval = setInterval(() => {
      if (!currentTracking) return

      const diff = dayjs().diff(timeLastActive, 'millisecond')

      if (diff > autoStopTime) {
        stopTracking()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [autoStopTime, currentTracking, stopTracking, timeLastActive])
}
