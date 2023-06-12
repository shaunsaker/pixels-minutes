import dayjs from 'dayjs'
import { useCallback } from 'react'

import { getUniqueId } from '../../utils/getUniqueId'
import { useSendNotification } from '../../utils/useNotification'
import { useProjects } from '../projects/useProjects'
import { CurrentTracking, useCurrentTracking } from './useCurrentTracking'

export const useStartTracking = () => {
  const [_, setCurrentTracking] = useCurrentTracking()
  const [projects] = useProjects()
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
        title: 'Started Tracking',
        body: `You are now tracking time for ${projects[projectId].name}.`,
      })
    },
    [projects, sendNotification, setCurrentTracking],
  )

  return startTracking
}
