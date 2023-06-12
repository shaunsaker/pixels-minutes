import { Text, TextInput } from '@tremor/react'
import React, { ReactElement, ReactNode, useState } from 'react'

import { Dialog } from '../../../../../components/Dialog'
import { useEditProject } from '../../../../../store/projects/useEditProject'
import { COLORS, Project } from '../../../../../store/projects/useProjects'

type EditProjectDialogProps = {
  project: Project
  children: ReactNode
}

export const EditProjectDialog = ({ project, children }: EditProjectDialogProps): ReactElement => {
  const [projectName, setProjectName] = useState(project.name)
  const [projectColor, setProjectColor] = useState(project.color)
  const editProject = useEditProject()

  return (
    <Dialog
      title={`Editing Project ${project.name}`}
      trigger={children}
      confirmText="Save"
      onConfirmClick={() => editProject({ id: project.id, name: projectName, color: projectColor })}
    >
      <div>
        <Text>Name</Text>

        <TextInput
          className="mt-2"
          placeholder="Enter your project's name..."
          value={projectName}
          onChange={event => setProjectName(event.target.value)}
        />
      </div>

      <div className="mt-4">
        <Text>Color</Text>

        <div className="mt-2 flex justify-center flex-wrap gap-2">
          {COLORS.map(color => (
            <div
              key={color}
              className={`w-10 h-10 rounded-full cursor-pointer bg-${color}-500 ${
                color === projectColor ? `border-4 border-${color}-300` : 'border-transparent'
              } hover:bg-${color}-400 transition-colors`}
              onClick={() => setProjectColor(color)}
            />
          ))}
        </div>
      </div>
    </Dialog>
  )
}
