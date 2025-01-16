import classNames from 'classnames'
import { type ChangeEvent } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { formatTime } from '../../../../core/utils'
import {
  useAddMusic,
  useCurrentMusic,
  useMusics,
} from '../../../contexts/hooks'
import styles from './styles.module.scss'

export function Musics() {
  const musics = useMusics()
  const currentMusic = useCurrentMusic()
  const addMusic = useAddMusic()

  function handleMusicChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (files) {
      const file = files[0]
      addMusic(file)
    }
  }

  return (
    <aside className={styles.container}>
      <h2>Lista de músicas</h2>

      <div className={styles.musics}>
        {musics.map((music, index) => {
          return (
            <div
              className={classNames(styles.music, {
                [styles.current]: currentMusic?.id === music.id,
              })}
              key={music.id}
            >
              <p>{index + 1}</p>
              <p>{music.title}</p>
              <p>{formatTime(music.audio.duration)}</p>
            </div>
          )
        })}
      </div>

      <label
        htmlFor='addMusic'
        className={classNames(styles.addMusic, 'text-primary', 'bg-secondary')}
      >
        Adicionar música
        <input
          id='addMusic'
          type='file'
          placeholder='Adicionar música'
          accept='audio/mp3,audio/*;capture=microphone'
          onChange={handleMusicChange}
        />
        <FaPlus />
      </label>
    </aside>
  )
}
