import { Table, TableBody, TableCell, TableRow, Text } from '@tremor/react'
import React, { ReactElement } from 'react'

import { useCurrentTracking } from '../../../currentTracking/useCurrentTracking'
import { useProjects } from '../../../projects/useProjects'
import { useTimer } from '../../../utils/useTimer'

export const TimerView = (): ReactElement => {
  const [currentTracking] = useCurrentTracking()
  const [projects] = useProjects()
  const duration = useTimer(currentTracking?.startedAt)

  return (
    <div className="w-full flex flex-col items-center">
      {currentTracking ? (
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>🎯 Active Project</TableCell>

              <TableCell>
                <b>{projects[currentTracking.projectId].name}</b>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>⏱️ Started</TableCell>

              <TableCell>
                <b>{duration}</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <Text className="mt-2">
          Not currently tracking. Tracking will start automatically when you edit any of your
          project files.
        </Text>
      )}
    </div>
  )
}
