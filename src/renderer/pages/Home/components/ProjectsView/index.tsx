import { TrashIcon } from '@heroicons/react/24/outline'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from '@tremor/react'
import React, { ReactElement } from 'react'

import { ProjectColor } from '../../../../components/ProjectColor'
import { useProjects } from '../../../../store/projects/useProjects'
import { EditProjectDialog } from './components/EditProjectDialog'

export const ProjectsView = (): ReactElement => {
  const [projects] = useProjects()

  const hasProjects = Object.keys(projects).length > 0

  return (
    <>
      {hasProjects ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell className="bg-white dark:bg-gray-900">Color</TableHeaderCell>

              <TableHeaderCell className="bg-white dark:bg-gray-900">Name</TableHeaderCell>

              <TableHeaderCell className="bg-white dark:bg-gray-900"></TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.values(projects).map(project => {
              return (
                <TableRow key={project.id}>
                  <TableCell>
                    <ProjectColor color={project.color} />
                  </TableCell>

                  <TableCell>{project.name}</TableCell>

                  <TableCell className="text-right">
                    <EditProjectDialog project={project}>
                      <Button size="xs" icon={TrashIcon} variant="light">
                        Edit
                      </Button>
                    </EditProjectDialog>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      ) : (
        <Text className="max-w-lg self-center">
          No projects to show. Projects will be shown here automatically when you edit any of your
          project files.
        </Text>
      )}
    </>
  )
}
