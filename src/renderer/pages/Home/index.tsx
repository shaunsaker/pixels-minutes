import { Card } from '@tremor/react'
import React, { ReactElement } from 'react'

import logomark from '../../assets/logomark.svg'
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
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-slate-900 print:bg-white p-8 print:p-0">
      <Card
        className="relative overflow-hidden max-w-3xl h-full flex flex-col items-center text-center print:overflow-visible"
        style={{ minHeight: 480, boxShadow: 'none' }}
      >
        <img
          className="absolute top-6 left-6 w-10 h-10"
          src={logomark}
          alt="Pixels Minutes Logomark"
        />

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
