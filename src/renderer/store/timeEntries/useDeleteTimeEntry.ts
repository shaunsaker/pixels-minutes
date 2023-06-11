import { useCallback } from 'react'

import { useTimeEntries } from './useTimeEntries'

export const useDeleteTimeEntry = () => {
  const [timeEntries, setTimeEntries] = useTimeEntries()

  const deleteTimeEntry = useCallback(
    (timeEntryId: string) => {
      const newTimeEntries = { ...timeEntries }

      delete newTimeEntries[timeEntryId]

      setTimeEntries(newTimeEntries)
    },
    [setTimeEntries, timeEntries],
  )

  return deleteTimeEntry
}
