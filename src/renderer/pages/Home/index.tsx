import { Card } from '@tremor/react'
import dayjs from 'dayjs'
import React, { ReactElement, useCallback, useEffect } from 'react'

import { CurrentTracking, useCurrentTracking } from '../../currentTracking/useCurrentTracking'
import { COLORS, Project, useProjects } from '../../projects/useProjects'
import { useProjectsFolder } from '../../projectsFolder/useProjectsFolder'
import { TimeEntry, useTimeEntries } from '../../timeEntries/useTimeEntries'
import { getUniqueId } from '../../utils/getUniqueId'
import { useRefEventListener } from '../../utils/useRefEventListener'
import { SettingsView } from './components/SettingsView'
import { Tabs } from './components/Tabs'
import { TimeEntriesView } from './components/TimeEntriesView'
import { TimerView } from './components/TimerView'
import { WelcomeView } from './components/WelcomeView'

// tabs for timer, time entries and settings
// ability to stop timer
// stop timer on sleep
// time entries for any given date or range of dates
// grouping of time entries by project
// adding, editing and deleting time entries
// exporting report per project
// branding
export const Home = (): ReactElement => {
  const [currentTracking, setCurrentTracking] = useCurrentTracking()
  const [timeEntries, setTimeEntries] = useTimeEntries()
  const [projects, setProjects] = useProjects()
  const [projectsFolder] = useProjectsFolder()

  const hasProjectsFolder = Boolean(projectsFolder)

  useEffect(
    () => {
      // on application launch or if the projects folder changes, watch it for changes
      if (projectsFolder) {
        try {
          window.api.watchFolder(projectsFolder)
        } catch (error) {
          console.error(error as Error)
        }
      }

      // cleanup is done in watchFolder on invocation so we don't need to return a cleanup function
    },
    // we don't want this effect to run if currentTracking changes
    // eslint-disable-next-line
    [projectsFolder],
  )

  const createProject = useCallback(
    (projectId: string) => {
      const project: Project = {
        id: projectId,
        name: projectId,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }

      setProjects({
        ...projects,
        [projectId]: project,
      })
    },
    [projects, setProjects],
  )

  const startTracking = useCallback(
    (projectId: string) => {
      const newCurrentTracking: CurrentTracking = {
        id: getUniqueId(),
        projectId,
        startedAt: dayjs().toISOString(),
      }

      setCurrentTracking(newCurrentTracking)
    },
    [setCurrentTracking],
  )

  const stopTracking = useCallback(() => {
    if (!currentTracking) {
      throw new Error('Trying to stop a non-existent tracking!')
    }

    const timeEntry: TimeEntry = {
      id: getUniqueId(),
      projectId: currentTracking.projectId,
      startedAt: currentTracking.startedAt,
      stoppedAt: dayjs().toISOString(),
    }

    setTimeEntries({ ...timeEntries, [timeEntry.id]: timeEntry })

    setCurrentTracking(null)
  }, [currentTracking, setCurrentTracking, setTimeEntries, timeEntries])

  // since the listener won't have access to fresh state, we need to handle the cb in a ref
  const handleActiveProjectChangeRef = useRefEventListener((projectId: string) => {
    // if the project does not yet exist, add it
    if (!projects[projectId]) {
      createProject(projectId)
    }

    // if the project changed, stop any existing tracking and start tracking the new project
    if (currentTracking?.projectId !== projectId) {
      if (currentTracking) {
        stopTracking()
      }

      startTracking(projectId)
    }
  })

  useEffect(
    () => {
      // handle active project change events
      if (projectsFolder) {
        window.api.onActiveProjectChange((projectId: string) => {
          handleActiveProjectChangeRef.current(projectId)
        })
      }

      // FIXME: we should somehow add a cleanup function but this is only affected by hot reloading
    },
    // we only want this effect to run once
    // eslint-disable-next-line
    [projectsFolder],
  )

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col justify-center items-center bg-gray-900 p-8">
      <Card
        className="max-w-2xl max-h-full flex flex-col items-center text-center"
        decoration="top"
        decorationColor="blue"
      >
        {!hasProjectsFolder ? (
          <WelcomeView />
        ) : (
          <div className="w-full flex flex-col items-center">
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
