import classNames from 'classnames'
import type { ChangeEvent } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { useAddMusic } from '../../../contexts/hooks'
import styles from './styles.module.scss'

export function AddMusic() {
  const addMusic = useAddMusic()

  function handleMusicChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (files) {
      const file = files[0]
      addMusic(file)
    }
  }

  return (
    <label
      htmlFor='addMusic'
      className={classNames(styles.container, 'text-primary', 'bg-secondary')}
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
  )
}
