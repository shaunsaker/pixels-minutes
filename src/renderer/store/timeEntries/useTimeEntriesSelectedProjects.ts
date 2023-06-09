import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const atom = atomWithStorage<string[]>('timeEntriesSelectedProjects', [])

export const useTimeEntriesSelectedProjects = () => useAtom(atom)
