import { StopIcon } from '@heroicons/react/24/outline'
import { Button, Table, TableBody, TableCell, TableRow, Text } from '@tremor/react'
import React, { ReactElement } from 'react'

import { useCurrentTracking } from '../../../store/currentTracking/useCurrentTracking'
import { useStopTracking } from '../../../store/currentTracking/useStopTracking'
import { useProjects } from '../../../store/projects/useProjects'
import { useTimer } from '../../../utils/useTimer'

export const TimerView = (): ReactElement => {
  const [currentTracking] = useCurrentTracking()
  const [projects] = useProjects()
  const duration = useTimer(currentTracking?.startedAt)
  const stopTracking = useStopTracking()

  return (
    <div className="w-full flex flex-col items-center">
      {currentTracking ? (
        <>
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

          <Button className="mt-4" icon={StopIcon} onClick={stopTracking}>
            Stop Tracking
          </Button>
        </>
      ) : (
        <Text className="max-w-lg">
          Not currently tracking. Tracking will start automatically when you edit any of your
          project files.
        </Text>
      )}
    </div>
  )
}
