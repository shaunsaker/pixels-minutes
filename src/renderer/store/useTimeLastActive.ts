import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const atom = atomWithStorage('timeLastActive', '')

export const useTimeLastActive = () => useAtom(atom)
