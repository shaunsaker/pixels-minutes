import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

export const useSnackbarOnMessage = () => {
  useEffect(() => {
    // listen for any ipc messages and render snackbars accordingly
    window.api.onMessage(({ message, type }) => {
      if (type === 'success') {
        toast.success(message)
      }

      if (type === 'error') {
        toast.error(message)
      }
    })
  }, [])
}
