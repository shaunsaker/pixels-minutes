import dayjs from 'dayjs'
import { useCallback } from 'react'

import { DURATION_FORMAT } from '../../constants'
import { getUniqueId } from '../../utils/getUniqueId'
import { useSendNotification } from '../../utils/useNotification'
import { useProjects } from '../projects/useProjects'
import { TimeEntry, useTimeEntries } from '../timeEntries/useTimeEntries'
import { useCurrentTracking } from './useCurrentTracking'

export const useStopTracking = () => {
  const [currentTracking, setCurrentTracking] = useCurrentTracking()
  const [timeEntries, setTimeEntries] = useTimeEntries()
  const [projects] = useProjects()
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
      title: 'Stopped Tracking',
      body: `You tracked ${duration} for ${projects[currentTracking.projectId].name}.`,
    })

    // send the stop tracking event to ipc so that we can reset the activeProject and detect any new changes
    window.api.onStopTracking()
  }, [currentTracking, projects, sendNotification, setCurrentTracking, setTimeEntries, timeEntries])

  return stopTracking
}
