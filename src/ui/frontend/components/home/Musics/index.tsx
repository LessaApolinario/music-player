import classNames from 'classnames'
import { formatTime } from '../../../../../core/utils'
import {
  useCurrentMusic,
  useMusics,
  useSelectMusic,
} from '../../../contexts/hooks'
import { AddMusic } from '../AddMusic'
import styles from './styles.module.scss'

interface MusicsProps {
  onClose?: () => void
}

export function Musics({ onClose }: MusicsProps) {
  const musics = useMusics()
  const currentMusic = useCurrentMusic()

  const selectMusic = useSelectMusic()

  function stopCurrentMusicAndSelectMusic(index: number) {
    if (onClose) {
      onClose()
    }

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
      </table>

      <AddMusic />
    </aside>
  )
}
