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
  const [audioState, setAudioState] = useState({
    currentTime: 0,
    paused: true,
    ended: false,
    readyState: 0,
  })

  useEffect(() => {
    if (!currentMusic?.audio) return

    const audio = currentMusic.audio

    const updateState = () => {
      setAudioState({
        currentTime: audio.currentTime,
        paused: audio.paused,
        ended: audio.ended,
        readyState: audio.readyState,
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
    if (!currentMusic) return false
    return (
      audioState.currentTime > 0 &&
      !audioState.paused &&
      !audioState.ended &&
      audioState.readyState > 2
    )
  }, [audioState, currentMusic])

  useEffect(() => {
    console.log('isPlaying: ', isPlaying)
  }, [isPlaying])

  const addMusic = useCallback((music: File) => {
    const musicURL = URL.createObjectURL(music)
    const audio = new Audio(musicURL)

    const newMusic: Music = {
      id: generateUUID(),
      title: music.name,
      audio,
    }

    setCurrentMusic(newMusic)
    setMusics((previousMusics) => [newMusic, ...previousMusics])
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

  const goToPreviousMusic = useCallback(() => {}, [])

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
