import dayjs from 'dayjs'

import { DURATION_FORMAT } from '../../constants'

export type TimeEntry = {
  id: string
  projectId: string
  startedAt: string
  stoppedAt: string
}

export type TimeEntries = Record<string, TimeEntry>

export const getTotalTimeTracked = (timeEntries: TimeEntries) => {
  return dayjs
    .duration(
      Object.values(timeEntries).reduce((total, timeEntry) => {
        return total + dayjs(timeEntry.stoppedAt).diff(dayjs(timeEntry.startedAt))
      }, 0),
    )
    .format(DURATION_FORMAT)
}
