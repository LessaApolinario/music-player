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

export function calculateMusicTimerPercentage(
  currentTime?: number,
  duration?: number
) {
  if (duration === 0 || currentTime === 0) {
    return 0
  }

  if (!currentTime || !duration) {
    return 0
  }

  return (currentTime / duration) * 100
}
