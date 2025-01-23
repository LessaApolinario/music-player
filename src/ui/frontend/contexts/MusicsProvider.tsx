import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import { MusicsCTX } from '.'
import type { Music } from '../../../core/typings/Music'
import { generateUUID } from '../../../core/utils'
import { useNotification } from '../hooks/useNotification'

export function MusicsProvider({ children }: PropsWithChildren) {
  const [currentMusic, setCurrentMusic] = useState<Music>()
  const [musics, setMusics] = useState<Music[]>([])
  const { notify } = useNotification()

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

      newMusic.audio.play()
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

  const stopMusic = useCallback(() => {
    if (isPlaying && currentMusic?.audio) {
      currentMusic?.audio.pause()
      currentMusic.audio.currentTime = 0
    }
  }, [isPlaying, currentMusic?.audio])

  const goToNextMusic = useCallback(() => {
    if (musics.length === 0) {
      notify('Lista de músicas vazia')
      return
    }

    if (!currentMusic) {
      notify('Nenhuma música tocando')
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
        notify('Fim da lista')
      } else {
        const nextMusic = musics[nextMusicIndex]
        nextMusic.audio.play()
        setCurrentMusic(nextMusic)
      }
    }
  }, [currentMusic, musics, notify])

  const goToPreviousMusic = useCallback(() => {
    if (musics.length === 0) {
      notify('Lista de músicas vazia')
      return
    }

    if (!currentMusic) {
      notify('Nenhuma música tocando')
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
        notify('Início da lista')
      } else {
        const previousMusic = musics[previousMusicIndex]
        previousMusic.audio.play()
        setCurrentMusic(previousMusic)
      }
    }
  }, [currentMusic, musics, notify])

  const selectMusic = useCallback(
    (currentMusicIndex: number) => {
      const wasMusicFound = currentMusicIndex !== -1
      if (wasMusicFound) {
        const foundMusic = musics[currentMusicIndex]
        const isCurrentMusic = currentMusic?.id === foundMusic.id

        if (isCurrentMusic) {
          notify('Música já selecionada')
        } else {
          stopMusic()
          setCurrentMusic(foundMusic)
          foundMusic.audio.play()
        }
      }
    },
    [musics, currentMusic?.id, stopMusic, notify]
  )

  const autoPlay = useCallback(() => {
    const currentMusicHasEnded =
      currentMusic?.audio.currentTime === currentMusic?.audio.duration
    const lastMusic = musics[musics.length - 1]
    const reachedTheEndOfMusicsList = currentMusic?.id === lastMusic?.id
    const hasMoreThanOneMusic = musics.length > 1

    if (
      hasMoreThanOneMusic &&
      currentMusicHasEnded &&
      !reachedTheEndOfMusicsList
    ) {
      stopMusic()
      goToNextMusic()
    }
  }, [
    musics,
    stopMusic,
    goToNextMusic,
    currentMusic?.id,
    currentMusic?.audio.currentTime,
    currentMusic?.audio.duration,
  ])

  return (
    <MusicsCTX.Provider
      value={{
        currentMusic,
        musics,
        isPlaying,
        addMusic,
        playMusic,
        pauseMusic,
        stopMusic,
        goToNextMusic,
        goToPreviousMusic,
        selectMusic,
        autoPlay,
      }}
    >
      {children}
    </MusicsCTX.Provider>
  )
}
