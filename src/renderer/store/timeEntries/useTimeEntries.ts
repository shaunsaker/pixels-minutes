import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { useTimeEntriesSelectedDates } from './useTimeEntriesSelectedDates'
import { useTimeEntriesSelectedProjects } from './useTimeEntriesSelectedProjects'

export type TimeEntry = {
  id: string
  projectId: string
  startedAt: string
  stoppedAt: string
}

export type TimeEntries = Record<string, TimeEntry>

const atom = atomWithStorage<TimeEntries>('timeEntries', {})

const useTimeEntriesAtom = () => useAtom(atom)

export const useTimeEntries = () => {
  const [timeEntries, setTimeEntries] = useTimeEntriesAtom()
  const [selectedProjects] = useTimeEntriesSelectedProjects()
  const [selectedDates] = useTimeEntriesSelectedDates()

  let filteredTimeEntries = timeEntries

  // if any projects are selected return only time entries for those projects
  if (selectedProjects.length > 0) {
    // filter time entries by selected projects
    filteredTimeEntries = Object.fromEntries(
      Object.entries(timeEntries).filter(([_, timeEntry]) =>
        selectedProjects.includes(timeEntry.projectId),
      ),
    )
  }

  // if any dates are selected return only time entries for those dates
  if (selectedDates.some(value => value)) {
    let [startDate, endDate] = selectedDates // TODO: SS these don't seem to be working

    // when the dates are selected, they are based on the current time when they are selected
    // so we need to manually set them to the start and end of the day
    if (startDate) {
      // @ts-expect-error FIXME:
      startDate = dayjs(startDate).startOf('day')
    }

    if (endDate) {
      // @ts-expect-error FIXME:
      endDate = dayjs(endDate).endOf('day')
    }

    // filter time entries by selected dates
    filteredTimeEntries = Object.fromEntries(
      Object.entries(filteredTimeEntries).filter(([_, timeEntry]) => {
        if (!startDate && !endDate) return true

        const startedAt = dayjs(timeEntry.startedAt).startOf('day')
        const stoppedAt = dayjs(timeEntry.stoppedAt).endOf('day')

        let endDateToUse = endDate

        // if only the start date is selected then the endDate is end of that day
        // NOTE: it's not possible to select the endDate without the startDate
        if (startDate && !endDateToUse) {
          // @ts-expect-error FIXME:
          endDateToUse = dayjs(startDateToUse).endOf('day')
        }

        const isStartedAtSameOrAfterStartDate =
          startedAt.isSame(startDate) || startedAt.isAfter(startDate)
        const isStoppedAtSameOrBeforeEndDate =
          stoppedAt.isSame(endDateToUse) || stoppedAt.isBefore(endDateToUse)

        return (
          (!startDate || isStartedAtSameOrAfterStartDate) &&
          (!endDateToUse || isStoppedAtSameOrBeforeEndDate)
        )
      }),
    )
  }

  // reverse sort the time entries
  filteredTimeEntries = Object.fromEntries(
    Object.entries(filteredTimeEntries).sort((a, b) => {
      const aStartedAt = dayjs(a[1].startedAt)
      const bStartedAt = dayjs(b[1].startedAt)

      if (aStartedAt.isBefore(bStartedAt)) return 1
      if (aStartedAt.isAfter(bStartedAt)) return -1
      return 0
    }),
  )

  return [filteredTimeEntries, setTimeEntries]
}
