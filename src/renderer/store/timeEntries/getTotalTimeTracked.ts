import dayjs from 'dayjs'

import { DURATION_FORMAT } from '../../constants'
import { TimeEntries } from './useTimeEntries'

export const getTotalTimeTracked = (timeEntries: TimeEntries) => {
  return dayjs
    .duration(
      Object.values(timeEntries).reduce((total, timeEntry) => {
        return total + dayjs(timeEntry.stoppedAt).diff(dayjs(timeEntry.startedAt))
      }, 0),
    )
    .format(DURATION_FORMAT)
}
