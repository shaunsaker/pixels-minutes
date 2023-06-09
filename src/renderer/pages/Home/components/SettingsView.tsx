import { FolderIcon } from '@heroicons/react/24/outline'
import { Button, Table, TableBody, TableCell, TableRow } from '@tremor/react'
import React, { ReactElement } from 'react'

import { useProjectsFolder } from '../../../store/projectsFolder/useProjectsFolder'
import { useSelectProjectsFolder } from '../../../store/projectsFolder/useSelectProjectsFolder'
import { getFolderFromPath } from '../../../utils/getFolderFromPath'

// TODO: SS convert into table
export const SettingsView = (): ReactElement => {
  const [projectsFolder] = useProjectsFolder()
  const selectProjectsFolder = useSelectProjectsFolder()

  return (
    <div className="w-full flex flex-col items-center">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>📂 Tracking Time In</TableCell>

            <TableCell>
              <b>{getFolderFromPath(projectsFolder)}</b>
            </TableCell>

            <TableCell>
              <Button className="ml-4" icon={FolderIcon} size="xs" onClick={selectProjectsFolder}>
                Change
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
