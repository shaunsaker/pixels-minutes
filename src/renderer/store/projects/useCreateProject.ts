import { useCallback } from 'react'

import { COLORS, Project, useProjects } from './useProjects'

export const useCreateProject = () => {
  const [projects, setProjects] = useProjects()

  const createProject = useCallback(
    (projectId: string) => {
      const project: Project = {
        id: projectId,
        name: projectId,
        color: COLORS[Object.keys(projects).length % COLORS.length],
      }

      setProjects({
        ...projects,
        [projectId]: project,
      })
    },
    [projects, setProjects],
  )

  return createProject
}
