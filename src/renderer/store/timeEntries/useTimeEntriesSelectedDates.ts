import { atom as jotaiAtom, useAtom } from 'jotai'

const atom = jotaiAtom<[(Date | null)?, (Date | null)?, (string | null)?]>([null, null, null])

export const useTimeEntriesSelectedDates = () => useAtom(atom)
