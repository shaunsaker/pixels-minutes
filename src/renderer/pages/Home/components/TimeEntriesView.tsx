import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from '@tremor/react'
import dayjs from 'dayjs'
import React, { ReactElement } from 'react'

import { useProjects } from '../../../projects/useProjects'
import { useTimeEntries } from '../../../timeEntries/useTimeEntries'

export const TimeEntriesView = (): ReactElement => {
  const [timeEntries] = useTimeEntries()
  const [projects] = useProjects()

  const hasTimeEntries = Object.keys(timeEntries).length > 0

  return (
    <div className="flex flex-col overflow-hidden">
      {hasTimeEntries ? (
        <Table className="mt-2 flex-1 overflow-auto">
          <TableHead>
            <TableRow>
              <TableHeaderCell className="bg-white dark:bg-gray-900"></TableHeaderCell>

              <TableHeaderCell className="bg-white dark:bg-gray-900">Project</TableHeaderCell>

              <TableHeaderCell className="bg-white dark:bg-gray-900">Date</TableHeaderCell>

              <TableHeaderCell className="bg-white dark:bg-gray-900">Started</TableHeaderCell>

              <TableHeaderCell className="bg-white dark:bg-gray-900">Stopped</TableHeaderCell>

              <TableHeaderCell className="bg-white dark:bg-gray-900">Duration</TableHeaderCell>
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

                    <TableCell>{dayjs(timeEntry.stoppedAt).format('DD MMM YYYY')}</TableCell>

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
  )
}
