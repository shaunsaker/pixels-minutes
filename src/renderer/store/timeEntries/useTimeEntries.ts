import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export type TimeEntry = {
  id: string
  projectId: string
  startedAt: string
  stoppedAt: string
}

export type TimeEntries = Record<string, TimeEntry>

const atom = atomWithStorage<TimeEntries>('timeEntries', {})

export const useTimeEntries = () => useAtom(atom)
