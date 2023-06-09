import dayjs from 'dayjs'
import { useCallback } from 'react'

import { TimeEntry, useTimeEntries } from '../timeEntries/useTimeEntries'
import { getUniqueId } from '../utils/getUniqueId'
import { useCurrentTracking } from './useCurrentTracking'

export const useStopTracking = () => {
  const [currentTracking, setCurrentTracking] = useCurrentTracking()
  const [timeEntries, setTimeEntries] = useTimeEntries()

  const stopTracking = useCallback(() => {
    if (!currentTracking) {
      throw new Error('Trying to stop a non-existent tracking!')
    }

    const timeEntry: TimeEntry = {
      id: getUniqueId(),
      projectId: currentTracking.projectId,
      startedAt: currentTracking.startedAt,
      stoppedAt: dayjs().toISOString(),
    }

    setTimeEntries({ ...timeEntries, [timeEntry.id]: timeEntry })

    setCurrentTracking(null)
  }, [currentTracking, setCurrentTracking, setTimeEntries, timeEntries])

  return stopTracking
}
