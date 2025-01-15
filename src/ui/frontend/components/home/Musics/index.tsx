import classNames from 'classnames'
import { FaPlus } from 'react-icons/fa6'
import styles from './styles.module.scss'

export function Musics() {
  return (
    <aside className={styles.container}>
      <h2>Lista de músicas</h2>

      <div className={styles.musics}></div>

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
        />
        <FaPlus />
      </label>
    </aside>
  )
}
