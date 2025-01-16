import { useCallback, useState, type PropsWithChildren } from 'react'
import { MusicsCTX } from '.'

export function MusicsProvider({ children }: PropsWithChildren) {
  const [currentMusic, setCurrentMusic] = useState<File | undefined>()
  const [musics, setMusics] = useState<File[]>([])

  const addMusic = useCallback((music: File) => {
    console.log(music)

    setCurrentMusic(music)
    setMusics((previousMusics) => [music, ...previousMusics])
  }, [])

  const playMusic = useCallback(() => {}, [])

  const pauseMusic = useCallback(() => {}, [])

  const goToNextMusic = useCallback(() => {}, [])

  const goToPreviousMusic = useCallback(() => {}, [])

  return (
    <MusicsCTX.Provider
      value={{
        currentMusic,
        musics,
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
