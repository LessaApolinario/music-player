import classNames from 'classnames'
import { useMemo, useRef, type FormEvent } from 'react'
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
import playerCover from '../../../assets/img/pexels-thepaintedsquare-1010518.jpg'
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
  const progressRef = useRef<HTMLInputElement>(null)

  const sliderValue = useMemo<number>(() => {
    return calculateMusicTimerPercentage(
      currentMusic?.audio.currentTime,
      currentMusic?.audio.duration
    )
  }, [currentMusic?.audio.currentTime, currentMusic?.audio.duration])

  function stopCurrentMusicAndGoToPreviousMusic() {
    stopMusic()
    goToPreviousMusic()
  }

  function stopCurrentMusicAndGoToNextMusic() {
    stopMusic()
    goToNextMusic()
  }

  function handleDragMusicTimer(event: FormEvent) {
    event.preventDefault()

    if (progressRef.current && currentMusic?.audio.duration) {
      const newTime =
        (Number(progressRef.current.value) / 100) * currentMusic.audio.duration
      currentMusic.audio.currentTime = newTime
    }
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
              className={styles.progressBar}
              style={{ width: `${sliderValue}%` }}
            ></div>
            <input
              ref={progressRef}
              type='range'
              min='0'
              max='100'
              step='0.1'
              value={sliderValue || 0}
              onInput={handleDragMusicTimer}
            />
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
