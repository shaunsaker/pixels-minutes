import { Card } from '@tremor/react'
import React, { ReactElement } from 'react'

import { useProjectsFolder } from '../../store/settings/useProjectsFolder'
import { SettingsView } from './components/SettingsView'
import { Tabs } from './components/Tabs'
import { TimeEntriesView } from './components/TimeEntriesView'
import { TimerView } from './components/TimerView'
import { WelcomeView } from './components/WelcomeView'

export const Home = (): ReactElement => {
  const [projectsFolder] = useProjectsFolder()

  const hasProjectsFolder = Boolean(projectsFolder)

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-900 print:bg-white p-8">
      <Card
        className="overflow-hidden max-w-3xl h-full flex flex-col items-center text-center print:overflow-visible print:border-none print:shadow-none "
        decoration="top"
        decorationColor="blue"
        style={{ minHeight: 480 }}
      >
        {!hasProjectsFolder ? (
          <WelcomeView />
        ) : (
          <div className="w-full h-full flex flex-col items-center">
            <Tabs
              render={activeTab => {
                if (activeTab === 'timeEntries') {
                  return <TimeEntriesView />
                }

                if (activeTab === 'settings') {
                  return <SettingsView />
                }

                return <TimerView />
              }}
            />
          </div>
        )}
      </Card>
    </div>
  )
}
