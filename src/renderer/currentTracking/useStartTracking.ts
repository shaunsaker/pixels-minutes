import dayjs from 'dayjs'
import { useCallback } from 'react'

import { getUniqueId } from '../utils/getUniqueId'
import { CurrentTracking, useCurrentTracking } from './useCurrentTracking'

export const useStartTracking = () => {
  const [_, setCurrentTracking] = useCurrentTracking()

  const startTracking = useCallback(
    (projectId: string) => {
      const newCurrentTracking: CurrentTracking = {
        id: getUniqueId(),
        projectId,
        startedAt: dayjs().toISOString(),
      }

      setCurrentTracking(newCurrentTracking)
    },
    [setCurrentTracking],
  )

  return startTracking
}
