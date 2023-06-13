import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const atom = atomWithStorage('autoStopTime', 1000 * 60 * 5)

export const useAutoStopTime = () => useAtom(atom)
