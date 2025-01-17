import classNames from 'classnames'
import { type ChangeEvent } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { formatTime } from '../../../../core/utils'
import {
  useAddMusic,
  useCurrentMusic,
  useMusics,
  useSelectMusic,
} from '../../../contexts/hooks'
import styles from './styles.module.scss'

export function Musics() {
  const musics = useMusics()
  const currentMusic = useCurrentMusic()
  const addMusic = useAddMusic()
  const selectMusic = useSelectMusic()

  function handleMusicChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (files) {
      const file = files[0]
      addMusic(file)
    }
  }

  function stopCurrentMusicAndSelectMusic(index: number) {
    selectMusic(index)
  }

  return (
    <aside className={styles.container}>
      <h2>Lista de músicas</h2>

      <table className={styles.musics}>
        <thead>
          <tr>
            <th className='text-primary bg-tertiary'>#</th>
            <th className='text-primary bg-tertiary'>Arquivo</th>
            <th className='text-primary bg-tertiary'>Duração</th>
          </tr>
        </thead>
        <div className={styles.tbodyContainer}>
          <tbody>
            {musics.map((music, index) => {
              return (
                <tr
                  className={classNames(styles.music, {
                    [styles.current]: currentMusic?.id === music.id,
                  })}
                  key={music.id}
                  onDoubleClick={() => stopCurrentMusicAndSelectMusic(index)}
                >
                  <td>{index + 1}</td>
                  <td>{music.title}</td>
                  <td>{formatTime(music.audio.duration)}</td>
                </tr>
              )
            })}
          </tbody>
        </div>
      </table>

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
