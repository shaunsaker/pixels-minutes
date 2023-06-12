import { useCallback } from 'react'
import { toast } from 'react-hot-toast'

import { Project, useProjects } from './useProjects'

export const useEditProject = () => {
  const [projects, setProjects] = useProjects()

  const editProject = useCallback(
    (editedProject: Project) => {
      setProjects({
        ...projects,
        [editedProject.id]: editedProject,
      })

      toast.success('Project edited successfully!')
    },
    [projects, setProjects],
  )

  return editProject
}
