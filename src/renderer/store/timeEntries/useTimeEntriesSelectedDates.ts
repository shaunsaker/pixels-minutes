import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const atom = atomWithStorage<[(Date | null)?, (Date | null)?, (string | null)?]>(
  'timeEntriesSelectedDates',
  [null, null, null],
)

export const useTimeEntriesSelectedDates = () => useAtom(atom)
