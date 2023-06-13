import {
  CalendarDaysIcon,
  ClockIcon,
  Cog6ToothIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline'
import { Tab as TabPrimitive, TabList } from '@tremor/react'
import React, { ReactElement } from 'react'

import { Tab, useActiveTab } from '../../../store/useActiveTab'

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

        <TabPrimitive value={Tab.Projects} text="Projects" icon={RectangleStackIcon} />

        <TabPrimitive value={Tab.Settings} text="Settings" icon={Cog6ToothIcon} />
      </TabList>

      <div className="w-full h-full overflow-auto print:overflow-visible flex flex-col pt-6 gap-6">
        {render && render(activeTab)}
      </div>
    </>
  )
}
