import { toast } from 'react-toastify'

export function useNotification() {
  function notify(message: string) {
    toast(message, {
      type: 'default',
      position: 'bottom-center',
      theme: 'dark',
    })
  }

  return {
    notify,
  }
}
