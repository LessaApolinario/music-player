import { createContext } from 'use-context-selector'
import type { Music } from '../../core/typings/Music'

export interface MusicsProps {
  currentMusic: Music | undefined
  musics: Music[]
  isPlaying: boolean
  addMusic(music: File): void
  playMusic(): void
  pauseMusic(): void
  stopMusic(): void
  goToNextMusic(): void
  goToPreviousMusic(): void
}

export const MusicsCTX = createContext({} as MusicsProps)
