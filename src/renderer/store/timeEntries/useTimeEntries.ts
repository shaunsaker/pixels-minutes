import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { useSelectedProjects } from '../projects/useSelectedProjects'

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
  const [selectedProjects] = useSelectedProjects()

  // if any projects are selected return only time entries for those projects
  if (selectedProjects.length > 0) {
    // filter time entries by selected projects
    const filteredTimeEntries = Object.fromEntries(
      Object.entries(timeEntries).filter(([_, timeEntry]) =>
        selectedProjects.includes(timeEntry.projectId),
      ),
    )

    return [filteredTimeEntries, setTimeEntries]
  }

  return [timeEntries, setTimeEntries]
}
