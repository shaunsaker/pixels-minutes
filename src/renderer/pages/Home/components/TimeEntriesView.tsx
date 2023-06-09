import {
  Metric,
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

import { DATE_FORMAT, DURATION_FORMAT, TIME_FORMAT } from '../../../constants'
import { useProjects } from '../../../store/projects/useProjects'
import { getTotalTimeTracked } from '../../../store/timeEntries/getTotalTimeTracked'
import { useTimeEntries } from '../../../store/timeEntries/useTimeEntries'

// persist active tab
// view time entries per project
// view time entries for any given date or range of dates
// adding, editing and deleting time entries
// export report to ?
export const TimeEntriesView = (): ReactElement => {
  const [timeEntries] = useTimeEntries()
  const [projects] = useProjects()
  const hasTimeEntries = Object.keys(timeEntries).length > 0

  return (
    <>
      {hasTimeEntries ? (
        <>
          <div>
            <Text>Total Time Tracked</Text>

            <Metric>{getTotalTimeTracked(timeEntries)}</Metric>
          </div>

          <Table>
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

                      <TableCell>{dayjs(timeEntry.stoppedAt).format(DATE_FORMAT)}</TableCell>

                      <TableCell>{dayjs(timeEntry.startedAt).format(TIME_FORMAT)}</TableCell>

                      <TableCell>{dayjs(timeEntry.stoppedAt).format(TIME_FORMAT)}</TableCell>

                      <TableCell>
                        {dayjs
                          .duration(dayjs(timeEntry.stoppedAt).diff(timeEntry.startedAt))
                          .format(DURATION_FORMAT)}
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </>
      ) : (
        <Text className="mt-2">No time entries to show.</Text>
      )}
    </>
  )
}
