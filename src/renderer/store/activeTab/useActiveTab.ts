import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export enum Tab {
  Timer = 'timer',
  TimeEntries = 'timeEntries',
  Projects = 'projects',
  Settings = 'settings',
}

const atom = atomWithStorage<Tab>('activeTab', Tab.Timer)

export const useActiveTab = () => useAtom(atom)
