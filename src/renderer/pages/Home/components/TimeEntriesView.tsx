import {
  ArrowRightOnRectangleIcon,
  RectangleStackIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import {
  Button,
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
  Title,
} from '@tremor/react'
import dayjs from 'dayjs'
import React, { ReactElement, useCallback } from 'react'
import { toast } from 'react-hot-toast'

import { AlertDialog } from '../../../components/AlertDialog'
import { DATE_FORMAT, DURATION_FORMAT, TIME_FORMAT, WEBSITE_URL } from '../../../constants'
import { useProjects } from '../../../store/projects/useProjects'
import { getTotalTimeTracked } from '../../../store/timeEntries/getTotalTimeTracked'
import { useDeleteTimeEntry } from '../../../store/timeEntries/useDeleteTimeEntry'
import { TimeEntry, useTimeEntries } from '../../../store/timeEntries/useTimeEntries'
import { useTimeEntriesSelectedDates } from '../../../store/timeEntries/useTimeEntriesSelectedDates'
import { useTimeEntriesSelectedProjects } from '../../../store/timeEntries/useTimeEntriesSelectedProjects'

export const TimeEntriesView = (): ReactElement => {
  const [timeEntries] = useTimeEntries()
  const [projects] = useProjects()
  const [selectedProjects, setSelectedProjects] = useTimeEntriesSelectedProjects()
  const [selectedDates, setSelectedDates] = useTimeEntriesSelectedDates()
  const deleteTimeEntry = useDeleteTimeEntry()

  const hasTimeEntries = Object.keys(timeEntries).length > 0
  const timeEntriesArray = Object.values(timeEntries) as TimeEntry[]

  // the start date is the selected date or the first time entry if any
  const startDate = selectedDates[0]
    ? dayjs(selectedDates[0]).format(DATE_FORMAT)
    : timeEntriesArray[timeEntriesArray.length - 1]
    ? dayjs(timeEntriesArray[timeEntriesArray.length - 1].startedAt).format(DATE_FORMAT)
    : ''

  // similarly for the end date
  const endDate = selectedDates[1]
    ? dayjs(selectedDates[1]).format(DATE_FORMAT)
    : timeEntriesArray[0]
    ? dayjs(timeEntriesArray[0].stoppedAt).format(DATE_FORMAT)
    : ''

  const onDeleteTimeEntry = useCallback(
    (timeEntryId: string) => {
      deleteTimeEntry(timeEntryId)

      toast.success('Time entry deleted successfully!')
    },
    [deleteTimeEntry],
  )

  const onExportClick = useCallback(() => {
    window.api.exportPdf()
  }, [])

  return (
    <>
      <div className="print:hidden flex items-center gap-4">
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

      <Title className="hidden print:block">
        {startDate} - {endDate}
      </Title>

      <div>
        <Text>Total Time Tracked</Text>

        <Metric>
          {
            // @ts-expect-error FIXME: something wrong in the useTimeEntries hook
            getTotalTimeTracked(timeEntries)
          }
        </Metric>
      </div>

      <Table className="print:overflow-visible">
        <TableHead>
          <TableRow>
            <TableHeaderCell className="bg-white dark:bg-gray-900"></TableHeaderCell>

            <TableHeaderCell className="bg-white dark:bg-gray-900">Project</TableHeaderCell>

            <TableHeaderCell className="bg-white dark:bg-gray-900">Date</TableHeaderCell>

            <TableHeaderCell className="bg-white dark:bg-gray-900">Started</TableHeaderCell>

            <TableHeaderCell className="bg-white dark:bg-gray-900">Stopped</TableHeaderCell>

            <TableHeaderCell className="bg-white dark:bg-gray-900">Duration</TableHeaderCell>

            <TableHeaderCell className="bg-white dark:bg-gray-900 print:hidden"></TableHeaderCell>
          </TableRow>
        </TableHead>

        {hasTimeEntries && (
          <TableBody>
            {Object.values(timeEntries).map(timeEntry => {
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

                  <TableCell className="print:hidden">
                    <AlertDialog
                      title="Are you absolutely sure?"
                      description="This action cannot be undone. This will permanently delete your time entry."
                      onConfirmClick={() => onDeleteTimeEntry(timeEntry.id)}
                    >
                      <Button size="xs" icon={TrashIcon} variant="light" color="red">
                        Delete
                      </Button>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        )}
      </Table>

      {!hasTimeEntries && <Text>No time entries to show.</Text>}

      <div className="print:hidden flex-1 flex flex-col justify-end items-end">
        <Button icon={ArrowRightOnRectangleIcon} disabled={!hasTimeEntries} onClick={onExportClick}>
          Export Pdf
        </Button>
      </div>

      <div className="hidden print:block">
        <Text className="text-center">
          Powered by automated time tracking with{' '}
          <a href={WEBSITE_URL} className="underline">
            Pixels Minutes
          </a>
        </Text>
      </div>
    </>
  )
}
