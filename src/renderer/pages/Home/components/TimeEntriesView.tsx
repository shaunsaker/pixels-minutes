import { RectangleStackIcon } from '@heroicons/react/24/outline'
import {
  DateRangePicker,
  Metric,
  MultiSelectBox,
  MultiSelectBoxItem,
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
import { useTimeEntriesSelectedDates } from '../../../store/timeEntries/useTimeEntriesSelectedDates'
import { useTimeEntriesSelectedProjects } from '../../../store/timeEntries/useTimeEntriesSelectedProjects'

// export report to pdf
// adding, editing and deleting time entries
export const TimeEntriesView = (): ReactElement => {
  const [timeEntries] = useTimeEntries()
  const [projects] = useProjects()
  const [selectedProjects, setSelectedProjects] = useTimeEntriesSelectedProjects()
  const [selectedDates, setSelectedDates] = useTimeEntriesSelectedDates()

  const hasTimeEntries = Object.keys(timeEntries).length > 0

  return (
    <>
      <div className="flex items-center gap-4">
        <MultiSelectBox
          placeholder="Select Project(s)"
          icon={RectangleStackIcon}
          value={selectedProjects}
          onValueChange={value => setSelectedProjects(value)}
        >
          {Object.values(projects).map(project => (
            <MultiSelectBoxItem key={project.id} value={project.id}>
              {project.name}
            </MultiSelectBoxItem>
          ))}
        </MultiSelectBox>

        <DateRangePicker
          value={selectedDates}
          enableYearPagination
          onValueChange={value => setSelectedDates(value)}
        />
      </div>

      <div>
        <Text>Total Time Tracked</Text>

        <Metric>
          {
            // @ts-expect-error FIXME: something wrong in the useTimeEntries hook
            getTotalTimeTracked(timeEntries)
          }
        </Metric>
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

        {hasTimeEntries && (
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
        )}
      </Table>

      {!hasTimeEntries && <Text>No time entries to show.</Text>}
    </>
  )
}
