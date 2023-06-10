import { CalendarDaysIcon, ClockIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { Tab as TabPrimitive, TabList } from '@tremor/react'
import React, { ReactElement } from 'react'

import { Tab } from '../../../constants'
import { useActiveTab } from '../../../store/activeTab/useActiveTab'

type TabsProps = {
  render: (activeTab: string) => ReactElement
}

export const Tabs = ({ render }: TabsProps): ReactElement => {
  const [activeTab, setActiveTab] = useActiveTab()

  return (
    <>
      <TabList
        className="print:hidden"
        value={activeTab}
        onValueChange={value => setActiveTab(value as Tab)}
      >
        <TabPrimitive value={Tab.Timer} text="Timer" icon={ClockIcon} />

        <TabPrimitive value={Tab.TimeEntries} text="Time Entries" icon={CalendarDaysIcon} />

        <TabPrimitive value={Tab.Settings} text="Settings" icon={Cog6ToothIcon} />
      </TabList>

      <div className="w-full h-full overflow-auto flex flex-col pt-6 gap-6">
        {render && render(activeTab)}
      </div>
    </>
  )
}
