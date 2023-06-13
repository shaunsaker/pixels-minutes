import { ClockIcon, FolderIcon } from '@heroicons/react/24/outline'
import { Button, Table, TableBody, TableCell, TableRow } from '@tremor/react'
import dayjs from 'dayjs'
import React, { ReactElement } from 'react'

import { DURATION_FORMAT } from '../../../../constants'
import { useAutoStopTime } from '../../../../store/settings/useAutoStopTime'
import { useProjectsFolder } from '../../../../store/settings/useProjectsFolder'
import { useSelectProjectsFolder } from '../../../../store/settings/useSelectProjectsFolder'
import { getFolderFromPath } from '../../../../utils/getFolderFromPath'
import { EditAutoStopTimeDialog } from './components/EditAutoStopTimeDialog'

export const SettingsView = (): ReactElement => {
  const [projectsFolder] = useProjectsFolder()
  const selectProjectsFolder = useSelectProjectsFolder()
  const [autoStopTime] = useAutoStopTime()

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>Track time in</TableCell>

          <TableCell>
            <b>{getFolderFromPath(projectsFolder)}</b>
          </TableCell>

          <TableCell>
            <Button className="ml-4" icon={FolderIcon} size="xs" onClick={selectProjectsFolder}>
              Change
            </Button>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Automatically stop timer after period of inactivity of</TableCell>

          <TableCell>
            <b>{dayjs.duration(autoStopTime).format(DURATION_FORMAT)}</b>
          </TableCell>

          <TableCell>
            <EditAutoStopTimeDialog>
              <Button className="ml-4" icon={ClockIcon} size="xs">
                Change
              </Button>
            </EditAutoStopTimeDialog>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
