import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import { MusicsCTX } from '.'
import type { Music } from '../../core/typings/Music'
import { generateUUID } from '../../core/utils'

export function MusicsProvider({ children }: PropsWithChildren) {
  const [currentMusic, setCurrentMusic] = useState<Music>()
  const [musics, setMusics] = useState<Music[]>([])

  useEffect(() => {
    if (!currentMusic?.audio) return

    const audio = currentMusic.audio

    const updateState = () => {
      setCurrentMusic({
        id: currentMusic.id,
        title: currentMusic.title,
        audio: currentMusic.audio,
      })
    }

    audio.addEventListener('play', updateState)
    audio.addEventListener('pause', updateState)
    audio.addEventListener('timeupdate', updateState)
    audio.addEventListener('ended', updateState)
    audio.addEventListener('canplay', updateState)

    return () => {
      audio.removeEventListener('play', updateState)
      audio.removeEventListener('pause', updateState)
      audio.removeEventListener('timeupdate', updateState)
      audio.removeEventListener('ended', updateState)
      audio.removeEventListener('canplay', updateState)
    }
  }, [currentMusic])

  const isPlaying = useMemo(() => {
    if (!currentMusic) {
      return false
    }

    return (
      currentMusic.audio.currentTime > 0 &&
      !currentMusic.audio.paused &&
      !currentMusic.audio.ended &&
      currentMusic.audio.readyState > 2
    )
  }, [currentMusic])

  const addMusic = useCallback((music: File) => {
    if (music) {
      const musicURL = URL.createObjectURL(music)
      const audio = new Audio(musicURL)

      const newMusic: Music = {
        id: generateUUID(),
        title: music.name,
        audio,
      }

      setCurrentMusic(newMusic)
      setMusics((previousMusics) => [newMusic, ...previousMusics])
    }
  }, [])

  const playMusic = useCallback(() => {
    if (!isPlaying) {
      currentMusic?.audio.play()
    }
  }, [currentMusic, isPlaying])

  const pauseMusic = useCallback(() => {
    if (isPlaying) {
      currentMusic?.audio.pause()
    }
  }, [currentMusic, isPlaying])

  const goToNextMusic = useCallback(() => {
    if (musics.length === 0) {
      console.log('Lista de músicas vazia')
      return
    }

    if (!currentMusic) {
      console.log('Nenhuma música tocando')
      return
    }

    const foundCurrentMusicIndex = musics.findIndex((music) => {
      return music.id === currentMusic.id
    })
    const wasCurrentIndexFound = foundCurrentMusicIndex !== -1

    if (wasCurrentIndexFound) {
      const nextMusicIndex = foundCurrentMusicIndex + 1
      const reachedTheEndOfTheMusicsList = nextMusicIndex > musics.length - 1

      if (reachedTheEndOfTheMusicsList) {
        console.log('Fim da lista')
      } else {
        const nextMusic = musics[nextMusicIndex]
        setCurrentMusic(nextMusic)
      }
    }
  }, [currentMusic, musics])

  const goToPreviousMusic = useCallback(() => {
    if (musics.length === 0) {
      console.log('Lista de músicas vazia')
      return
    }

    if (!currentMusic) {
      console.log('Nenhuma música tocando')
      return
    }

    const foundCurrentMusicIndex = musics.findIndex((music) => {
      return music.id === currentMusic.id
    })
    const wasCurrentIndexFound = foundCurrentMusicIndex !== -1

    if (wasCurrentIndexFound) {
      const previousMusicIndex = foundCurrentMusicIndex - 1
      const reachedTheBeginningOfTheMusicsList = previousMusicIndex < 0

      if (reachedTheBeginningOfTheMusicsList) {
        console.log('Início da lista')
      } else {
        const previousMusic = musics[previousMusicIndex]
        setCurrentMusic(previousMusic)
      }
    }
  }, [currentMusic, musics])

  return (
    <MusicsCTX.Provider
      value={{
        currentMusic,
        musics,
        isPlaying,
        addMusic,
        playMusic,
        pauseMusic,
        goToNextMusic,
        goToPreviousMusic,
      }}
    >
      {children}
    </MusicsCTX.Provider>
  )
}
