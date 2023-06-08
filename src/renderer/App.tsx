import { FolderIcon } from '@heroicons/react/24/outline'
import {
  Metric,
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
import React from 'react'
import { useCallback } from 'react'
import { ReactElement } from 'react'

import { Ipc } from '../common/ipc'
import { Project } from './projects/models'
import { useProjectsFolder } from './projectsFolder/useProjectsFolder'
import { TimeEntry } from './timeEntries/models'
import { getFolderFromPath } from './utils/getFolderFromPath'

// logic
// seeing what application was open
// time entries for any given date
// grouping of time entries by project
// adding, editing and deleting time entries
// exporting report per project
// branding
export const App = (): ReactElement => {
  const [projectsFolder, setProjectsFolder] = useProjectsFolder()
  const hasProjectsFolder = Boolean(projectsFolder)

  const isTracking = true

  const projects: Record<string, Project> = {
    '1': {
      id: '1',
      name: 'pixels-minutes',
      color: 'blue',
      createdAt: '2021-08-01T00:00:00.000Z',
      updatedAt: '2021-08-01T00:00:00.000Z',
    },
    '2': {
      id: '2',
      name: 'fat-buck',
      color: 'pink',
      createdAt: '2021-08-01T00:00:00.000Z',
      updatedAt: '2021-08-01T00:00:00.000Z',
    },
  }

  const timeEntries: Record<string, TimeEntry> = {
    '1': {
      id: '1',
      projectId: '1',
      startedAt: '2021-08-01T00:00:00.000Z',
      stoppedAt: '2021-08-01T00:02:00.000Z',
    },
    '2': {
      id: '2',
      projectId: '1',
      startedAt: '2021-08-01T00:02:00.000Z',
      stoppedAt: '2021-08-01T00:04:00.000Z',
    },
    '3': {
      id: '3',
      projectId: '2',
      startedAt: '2021-08-01T00:04:00.000Z',
      stoppedAt: '2021-08-01T00:08:00.000Z',
    },
  }
  const hasTimeEntries = Object.keys(timeEntries).length > 0

  const onSelectProjectsFolderClick = useCallback(async () => {
    const { canceled, filePaths } = (await window.electron.ipcRenderer.invoke(
      Ipc.selectFolder,
    )) as Electron.OpenDialogReturnValue

    if (!canceled) {
      setProjectsFolder(filePaths[0])
    }
  }, [setProjectsFolder])

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-900 p-8">
      <Card className="max-w-xl text-center flex flex-col overflow-auto">
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
          <div className="flex justify-center items-center gap-4">
            <Subtitle>
              📂 Tracking Time In <b>{getFolderFromPath(projectsFolder)}</b>
            </Subtitle>

            <Button
              icon={FolderIcon}
              variant="light"
              size="xs"
              onClick={onSelectProjectsFolderClick}
            >
              Change
            </Button>
          </div>
        )}

        {!hasProjectsFolder && (
          <Button className="mt-4" icon={FolderIcon} onClick={onSelectProjectsFolderClick}>
            Select Projects folder
          </Button>
        )}

        {isTracking && (
          <div className="mt-6 bg-gray-50 rounded border p-2">
            <Subtitle>⏰ Active Project Timer</Subtitle>

            <Title className="mt-2">
              <b>pixels-minutes</b>
            </Title>

            <Metric className="mt-2">
              <b>00:12:23</b>
            </Metric>
          </div>
        )}

        {hasTimeEntries && (
          <div className="mt-6">
            <Subtitle>Today's Time Entries</Subtitle>

            <Table className="mt-2">
              <TableHead>
                <TableRow>
                  <TableHeaderCell></TableHeaderCell>

                  <TableHeaderCell>Project</TableHeaderCell>

                  <TableHeaderCell>Started</TableHeaderCell>

                  <TableHeaderCell>Stopped</TableHeaderCell>

                  <TableHeaderCell>Duration</TableHeaderCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {Object.values(timeEntries).map(timeEntry => {
                  const project = projects[timeEntry.projectId]

                  return (
                    <TableRow key={timeEntry.id}>
                      <TableCell>
                        <div className={`w-4 h-4 rounded-full bg-${project.color}-500`}></div>
                      </TableCell>

                      <TableCell>{project.name}</TableCell>

                      <TableCell>{dayjs(timeEntry.startedAt).format('HH:mm:ss')}</TableCell>

                      <TableCell>{dayjs(timeEntry.stoppedAt).format('HH:mm:ss')}</TableCell>

                      <TableCell>
                        {dayjs
                          .duration(dayjs(timeEntry.stoppedAt).diff(timeEntry.startedAt))
                          .format('HH:mm:ss')}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  )
}
