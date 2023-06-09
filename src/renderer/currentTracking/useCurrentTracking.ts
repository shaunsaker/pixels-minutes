import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export type CurrentTracking = {
  id: string
  projectId: string
  startedAt: string
}

const atom = atomWithStorage<CurrentTracking | null>('currentTracking', null)

export const useCurrentTracking = () => useAtom(atom)
