import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const atom = atomWithStorage<string>('projectsFolder', '')

export const useProjectsFolder = () => useAtom(atom)
