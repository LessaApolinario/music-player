import classNames from 'classnames'
import { Player } from '../../components/home/Player'
import styles from './styles.module.scss'

export function HomePage() {
  return (
    <main
      className={classNames(styles.container, 'bg-secondary', 'text-primary')}
    >
      <Player />
    </main>
  )
}
