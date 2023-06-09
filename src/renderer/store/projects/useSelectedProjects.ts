import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const atom = atomWithStorage<string[]>('selectedProjects', [])

export const useSelectedProjects = () => useAtom(atom)
