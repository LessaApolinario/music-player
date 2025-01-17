import {
  FaBackwardStep,
  FaCirclePause,
  FaCirclePlay,
  FaForwardStep,
} from 'react-icons/fa6'
import {
  calculateMusicTimerPercentage,
  formatTime,
} from '../../../../core/utils'
import {
  useCurrentMusic,
  useGoToNextMusic,
  useGoToPreviousMusic,
  useIsPlaying,
  usePauseMusic,
  usePlayMusic,
  useStopMusic,
} from '../../../contexts/hooks'
import styles from './styles.module.scss'

export function Player() {
  const currentMusic = useCurrentMusic()
  const isPlaying = useIsPlaying()
  const playMusic = usePlayMusic()
  const pauseMusic = usePauseMusic()
  const stopMusic = useStopMusic()
  const goToNextMusic = useGoToNextMusic()
  const goToPreviousMusic = useGoToPreviousMusic()

  function stopCurrentMusicAndGoToPreviousMusic() {
    stopMusic()
    goToPreviousMusic()
  }

  function stopCurrentMusicAndGoToNextMusic() {
    stopMusic()
    goToNextMusic()
  }

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
            <div
              className='bg-primary'
              style={{
                width: `${calculateMusicTimerPercentage(
                  currentMusic?.audio.currentTime,
                  currentMusic?.audio.duration
                )}%`,
              }}
            ></div>
          </div>
          <span className={styles.totalTime}>
            {formatTime(currentMusic?.audio.duration)}
          </span>
        </div>

        <div className={styles.controls}>
          <FaBackwardStep onClick={stopCurrentMusicAndGoToPreviousMusic} />
          {isPlaying ? (
            <FaCirclePause onClick={pauseMusic} />
          ) : (
            <FaCirclePlay onClick={playMusic} />
          )}
          <FaForwardStep onClick={stopCurrentMusicAndGoToNextMusic} />
        </div>
      </div>
    </div>
  )
}
