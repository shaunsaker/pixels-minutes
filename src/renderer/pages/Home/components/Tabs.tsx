import { CalendarDaysIcon, ClockIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { Tab, TabList } from '@tremor/react'
import React, { ReactElement, useState } from 'react'

type TabsProps = {
  render: (activeTab: string) => ReactElement
}

export const Tabs = ({ render }: TabsProps): ReactElement => {
  const [activeTab, setActiveTab] = useState('timer')

  return (
    <>
      <TabList value={activeTab} onValueChange={value => setActiveTab(value)}>
        <Tab value="timer" text="Timer" icon={ClockIcon} />

        <Tab value="timeEntries" text="Time Entries" icon={CalendarDaysIcon} />

        <Tab value="settings" text="Settings" icon={Cog6ToothIcon} />
      </TabList>

      <div className="w-full h-full overflow-auto flex flex-col pt-6 gap-6">
        {render && render(activeTab)}
      </div>
    </>
  )
}
