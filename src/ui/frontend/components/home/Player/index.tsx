import {
  FaBackwardStep,
  FaCirclePause,
  FaCirclePlay,
  FaForwardStep,
} from 'react-icons/fa6'
import {
  useCurrentMusic,
  useGoToNextMusic,
  useGoToPreviousMusic,
  useIsPlaying,
  usePauseMusic,
  usePlayMusic,
} from '../../../contexts/hooks'
import styles from './styles.module.scss'
import { formatTime } from '../../../../core/utils'

export function Player() {
  const currentMusic = useCurrentMusic()
  const isPlaying = useIsPlaying()
  const playMusic = usePlayMusic()
  const pauseMusic = usePauseMusic()
  const goToNextMusic = useGoToNextMusic()
  const goToPreviousMusic = useGoToPreviousMusic()

  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        <img
          src='https://images.unsplash.com/photo-1735299362091-33c94b71a758?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt=''
        />

        <div className={styles.overlay}></div>
      </div>

      <div className={styles.bottom}>
        <p>{currentMusic?.title ?? ''}</p>

        <div className={styles.timer}>
          <span className={styles.currentTime}>
            {formatTime(currentMusic?.audio.currentTime)}
          </span>
          <div className={styles.progress}>
            <div className='bg-primary'></div>
          </div>
          <span className={styles.totalTime}>
            {formatTime(currentMusic?.audio.duration)}
          </span>
        </div>

        <div className={styles.controls}>
          <FaBackwardStep onClick={goToPreviousMusic} />
          {isPlaying ? (
            <FaCirclePause onClick={pauseMusic} />
          ) : (
            <FaCirclePlay onClick={playMusic} />
          )}
          <FaForwardStep onClick={goToNextMusic} />
        </div>
      </div>
    </div>
  )
}
