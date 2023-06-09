import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export type TimeEntry = {
  id: string
  projectId: string
  startedAt: string
  stoppedAt: string
}

const atom = atomWithStorage<Record<string, TimeEntry>>('timeEntries', {})

export const useTimeEntries = () => useAtom(atom)
