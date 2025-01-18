import classNames from 'classnames'
import {
  FaBackwardStep,
  FaCirclePause,
  FaCirclePlay,
  FaForwardStep,
} from 'react-icons/fa6'
import {
  calculateMusicTimerPercentage,
  formatTime,
} from '../../../../../core/utils'
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
import playerCover from '../../../assets/img/pexels-thepaintedsquare-1010518.jpg'

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
        <img src={playerCover} alt='' />

        <div className={styles.overlay}></div>
      </div>

      <div className={styles.bottom}>
        <p>{currentMusic?.title ?? ''}</p>

        <div className={styles.timer}>
          <span className={styles.currentTime}>
            {formatTime(currentMusic?.audio.currentTime)}
          </span>
          <div className={classNames('bg-tertiary', styles.progress)}>
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
