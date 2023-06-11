import dayjs from 'dayjs'
import { useCallback } from 'react'

import { getUniqueId } from '../../utils/getUniqueId'
import { useSendNotification } from '../../utils/useNotification'
import { CurrentTracking, useCurrentTracking } from './useCurrentTracking'

export const useStartTracking = () => {
  const [_, setCurrentTracking] = useCurrentTracking()
  const sendNotification = useSendNotification()

  const startTracking = useCallback(
    (projectId: string) => {
      const newCurrentTracking: CurrentTracking = {
        id: getUniqueId(),
        projectId,
        startedAt: dayjs().toISOString(),
      }

      setCurrentTracking(newCurrentTracking)

      sendNotification({
        title: 'Tracking started',
        body: `You are now tracking time for ${projectId}.`,
      })
    },
    [sendNotification, setCurrentTracking],
  )

  return startTracking
}
