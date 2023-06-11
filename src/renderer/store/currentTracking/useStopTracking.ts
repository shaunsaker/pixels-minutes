import dayjs from 'dayjs'
import { useCallback } from 'react'

import { DURATION_FORMAT } from '../../constants'
import { getUniqueId } from '../../utils/getUniqueId'
import { useSendNotification } from '../../utils/useNotification'
import { TimeEntry, useTimeEntries } from '../timeEntries/useTimeEntries'
import { useCurrentTracking } from './useCurrentTracking'

export const useStopTracking = () => {
  const [currentTracking, setCurrentTracking] = useCurrentTracking()
  const [timeEntries, setTimeEntries] = useTimeEntries()
  const sendNotification = useSendNotification()

  const stopTracking = useCallback(() => {
    if (!currentTracking) {
      throw new Error('Trying to stop a non-existent tracking!')
    }

    const stoppedAt = dayjs().toISOString()

    const timeEntry: TimeEntry = {
      id: getUniqueId(),
      projectId: currentTracking.projectId,
      startedAt: currentTracking.startedAt,
      stoppedAt,
    }

    setTimeEntries({ ...timeEntries, [timeEntry.id]: timeEntry })

    setCurrentTracking(null)

    const duration = dayjs
      .duration(dayjs(stoppedAt).diff(dayjs(currentTracking.startedAt)))
      .format(DURATION_FORMAT)

    sendNotification({
      title: 'Tracking stopped',
      body: `You tracked ${duration} for ${currentTracking.projectId}.`,
    })
  }, [currentTracking, sendNotification, setCurrentTracking, setTimeEntries, timeEntries])

  return stopTracking
}
