import { Text, TextInput } from '@tremor/react'
import dayjs from 'dayjs'
import React, { ReactElement, ReactNode, useCallback, useEffect, useState } from 'react'

import { Dialog } from '../../../../../components/Dialog'
import { useAutoStopTime } from '../../../../../store/settings/useAutoStopTime'

type EditAutoStopTimeDialogProps = {
  children: ReactNode
}

export const EditAutoStopTimeDialog = ({ children }: EditAutoStopTimeDialogProps): ReactElement => {
  const [autoStopTime, setAutoStopTime] = useAutoStopTime()
  const [hours, setHours] = useState('0')
  const [minutes, setMinutes] = useState('0')
  const [seconds, setSeconds] = useState('0')

  useEffect(() => {
    const duration = dayjs.duration(autoStopTime)
    const hours = duration.hours()
    const minutes = duration.minutes()
    const seconds = duration.seconds()

    setHours(hours.toString())
    setMinutes(minutes.toString())
    setSeconds(seconds.toString())
  }, [autoStopTime])

  const onSaveClick = useCallback(() => {
    const duration = dayjs.duration({
      hours: parseInt(hours),
      minutes: parseInt(minutes),
      seconds: parseInt(seconds),
    })

    setAutoStopTime(duration.asMilliseconds())
  }, [hours, minutes, seconds, setAutoStopTime])

  return (
    <Dialog
      title={`Editing Setting: Auto Stop Time`}
      trigger={children}
      confirmText="Save"
      onConfirmClick={onSaveClick}
    >
      <div className="flex justify-center items-center gap-4">
        <div className="flex items-center gap-2">
          <TextInput
            className="min-w-0 w-16"
            placeholder="HH"
            value={hours}
            onChange={event => setHours(event.target.value)}
          />

          <Text>h</Text>
        </div>

        <div className="flex items-center gap-2">
          <TextInput
            className="min-w-0 w-16"
            placeholder="MM"
            value={minutes}
            onChange={event => setMinutes(event.target.value)}
          />

          <Text>m</Text>
        </div>

        <div className="flex items-center gap-2">
          <TextInput
            className="min-w-0 w-16"
            placeholder="SS"
            value={seconds}
            onChange={event => setSeconds(event.target.value)}
          />

          <Text>s</Text>
        </div>
      </div>
    </Dialog>
  )
}
