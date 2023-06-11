import { useCallback } from 'react'

import logomark128 from '../assets/logomark-128.png'

export const useSendNotification = () => {
  const sendNotification = useCallback(async ({ title, body }: { title: string; body: string }) => {
    const permissionResult = await Notification.requestPermission()

    if (permissionResult !== 'granted') {
      // fail silently
      return
    }

    new Notification(title, { icon: logomark128, body })
  }, [])

  return sendNotification
}
