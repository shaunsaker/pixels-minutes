import React, { ReactElement } from 'react'

import { Color } from '../store/projects/useProjects'

type ProjectColorProps = { color: Color }

export const ProjectColor = ({ color }: ProjectColorProps): ReactElement => {
  return <div className={`w-4 h-4 rounded-full bg-${color}-500`}></div>
}
