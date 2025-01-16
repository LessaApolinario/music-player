import { createContext } from 'use-context-selector'

export interface MusicsProps {
  currentMusic: File | undefined
  musics: File[]
  addMusic(music: File): void
  playMusic(): void
  pauseMusic(): void
  goToNextMusic(): void
  goToPreviousMusic(): void
}

export const MusicsCTX = createContext({} as MusicsProps)
