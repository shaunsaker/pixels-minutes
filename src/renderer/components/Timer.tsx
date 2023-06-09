import { Subtitle, Title } from '@tremor/react'
import React, { ReactElement } from 'react'

import { useTimer } from '../utils/useTimer'

type TimerProps = {
  className?: string
  startTime: string
}

export const Timer = ({ className = '', startTime }: TimerProps): ReactElement => {
  const duration = useTimer(startTime)

  return (
    <div className={`${className}`}>
      <Subtitle>⏱️ Started</Subtitle>

      <Title>{duration}</Title>
    </div>
  )
}
