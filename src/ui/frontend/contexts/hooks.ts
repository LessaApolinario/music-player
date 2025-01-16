import { useContextSelector } from 'use-context-selector'
import { MusicsCTX } from '.'

export function useCurrentMusic() {
  return useContextSelector(MusicsCTX, (ctx) => ctx.currentMusic)
}

export function useMusics() {
  return useContextSelector(MusicsCTX, (ctx) => ctx.musics)
}

export function useIsPlaying() {
  return useContextSelector(MusicsCTX, (ctx) => ctx.isPlaying)
}

export function useAddMusic() {
  return useContextSelector(MusicsCTX, (ctx) => ctx.addMusic)
}

export function usePlayMusic() {
  return useContextSelector(MusicsCTX, (ctx) => ctx.playMusic)
}

export function usePauseMusic() {
  return useContextSelector(MusicsCTX, (ctx) => ctx.pauseMusic)
}

export function useStopMusic() {
  return useContextSelector(MusicsCTX, (ctx) => ctx.stopMusic)
}

export function useGoToNextMusic() {
  return useContextSelector(MusicsCTX, (ctx) => ctx.goToNextMusic)
}

export function useGoToPreviousMusic() {
  return useContextSelector(MusicsCTX, (ctx) => ctx.goToPreviousMusic)
}
