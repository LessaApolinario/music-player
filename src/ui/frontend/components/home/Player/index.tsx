import {
  FaBackwardStep,
  FaCirclePause,
  FaCirclePlay,
  FaForwardStep,
} from 'react-icons/fa6'
import styles from './styles.module.scss'

export function Player() {
  const isPlaying = true

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
        <p>Song de Artist</p>

        <div className={styles.timer}>
          <span className={styles.currentTime}>00:00</span>
          <div className={styles.progress}>
            <div className='bg-primary'></div>
          </div>
          <span className={styles.totalTime}>3:40</span>
        </div>

        <div className={styles.controls}>
          <FaBackwardStep />
          {isPlaying ? <FaCirclePlay /> : <FaCirclePause />}
          <FaForwardStep />
        </div>
      </div>
    </div>
  )
}
