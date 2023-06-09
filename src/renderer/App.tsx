import { FolderIcon } from '@heroicons/react/24/outline'
import {
  Subtitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from '@tremor/react'
import { Button } from '@tremor/react'
import { Card } from '@tremor/react'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { useCallback } from 'react'
import { ReactElement } from 'react'

import { Timer } from './components/Timer'
import { CurrentTracking, useCurrentTracking } from './currentTracking/useCurrentTracking'
import { COLORS, Project, useProjects } from './projects/useProjects'
import { useProjectsFolder } from './projectsFolder/useProjectsFolder'
import { TimeEntry, useTimeEntries } from './timeEntries/useTimeEntries'
import { getFolderFromPath } from './utils/getFolderFromPath'
import { getUniqueId } from './utils/getUniqueId'
import { useRefEventListener } from './utils/useRefEventListener'

// tabs for timer, time entries and settings
// ability to stop timer
// stop timer on sleep
// time entries for any given date or range of dates
// grouping of time entries by project
// adding, editing and deleting time entries
// exporting report per project
// branding
export const App = (): ReactElement => {
  const [currentTracking, setCurrentTracking] = useCurrentTracking()
  const [timeEntries, setTimeEntries] = useTimeEntries()
  const [projects, setProjects] = useProjects()
  const [projectsFolder, setProjectsFolder] = useProjectsFolder()

  const hasTimeEntries = Object.keys(timeEntries).length > 0
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

  const onSelectProjectsFolderClick = useCallback(async () => {
    const { canceled, filePaths } =
      (await window.api.selectFolder()) as Electron.OpenDialogReturnValue

    if (!canceled) {
      setProjectsFolder(filePaths[0])
    }
  }, [setProjectsFolder])

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col justify-center items-center bg-gray-900 p-8">
      <Card className="max-w-2xl max-h-full flex flex-col items-center text-center">
        {!hasProjectsFolder && (
          <>
            <Title>
              Welcome to <b>Pixels Minutes</b> 🎨⏱️
            </Title>

            <Subtitle>
              The ingenious automated time tracker designed specifically for creative professionals.
            </Subtitle>

            <Text className="mt-4">
              Simply choose the folder where you store all your projects, and let Pixel Minutes do
              the rest.
            </Text>
          </>
        )}

        {hasProjectsFolder && (
          <div className="flex flex-col items-center">
            <Subtitle>📂 Tracking Time In</Subtitle>

            <div className="mt-2 ml-2 flex items-center">
              <Title>{getFolderFromPath(projectsFolder)}</Title>

              <Button
                className="ml-4"
                icon={FolderIcon}
                variant="light"
                size="xs"
                onClick={onSelectProjectsFolderClick}
              >
                Change
              </Button>
            </div>
          </div>
        )}

        {!hasProjectsFolder ? (
          <Button className="mt-4" icon={FolderIcon} onClick={onSelectProjectsFolderClick}>
            Select Projects folder
          </Button>
        ) : (
          <>
            <div className="mt-6 max-w-lg w-full bg-gray-50 rounded border p-2">
              <Subtitle>🎯 Active Project</Subtitle>

              {currentTracking ? (
                <>
                  <Title>{projects[currentTracking.projectId].name}</Title>

                  <Timer className="mt-2" startTime={currentTracking.startedAt} />
                </>
              ) : (
                <Text className="mt-2">
                  Not currently tracking. Tracking will start automatically when you edit any of
                  your project files.
                </Text>
              )}
            </div>

            <div className="mt-6 flex flex-col overflow-hidden">
              <Subtitle>🗓️ Today's Time Entries</Subtitle>
              {hasTimeEntries ? (
                <Table className="mt-2 flex-1 overflow-auto">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell className="bg-white dark:bg-gray-900"></TableHeaderCell>

                      <TableHeaderCell className="bg-white dark:bg-gray-900">
                        Project
                      </TableHeaderCell>

                      <TableHeaderCell className="bg-white dark:bg-gray-900">Date</TableHeaderCell>

                      <TableHeaderCell className="bg-white dark:bg-gray-900">
                        Started
                      </TableHeaderCell>

                      <TableHeaderCell className="bg-white dark:bg-gray-900">
                        Stopped
                      </TableHeaderCell>

                      <TableHeaderCell className="bg-white dark:bg-gray-900">
                        Duration
                      </TableHeaderCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {Object.values(timeEntries)
                      .sort((a, b) => (dayjs(b.stoppedAt).isAfter(a.stoppedAt) ? 1 : -1))
                      .map(timeEntry => {
                        const project = projects[timeEntry.projectId]

                        if (!project) {
                          return null
                        }

                        return (
                          <TableRow key={timeEntry.id}>
                            <TableCell>
                              <div className={`w-4 h-4 rounded-full bg-${project.color}-500`}></div>
                            </TableCell>

                            <TableCell>{project.name}</TableCell>

                            <TableCell>
                              {dayjs(timeEntry.stoppedAt).format('DD MMM YYYY')}
                            </TableCell>

                            <TableCell>{dayjs(timeEntry.startedAt).format('HH:mm')}</TableCell>

                            <TableCell>{dayjs(timeEntry.stoppedAt).format('HH:mm')}</TableCell>

                            <TableCell>
                              {dayjs
                                .duration(dayjs(timeEntry.stoppedAt).diff(timeEntry.startedAt))
                                .format('HH:mm')}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              ) : (
                <Text className="mt-2">No time entries to show.</Text>
              )}
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
