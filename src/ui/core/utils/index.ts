import { v7 as uuidv7 } from 'uuid'

export function generateUUID() {
  return uuidv7()
}

export function formatTime(seconds?: number) {
  if (!seconds) {
    return '00:00'
  }

  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}
