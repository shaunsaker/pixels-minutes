import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { Tab } from '../../constants'

const atom = atomWithStorage<Tab>('activeTab', Tab.Timer)

export const useActiveTab = () => useAtom(atom)
