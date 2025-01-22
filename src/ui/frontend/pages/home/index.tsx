import classNames from 'classnames'
import { Musics } from '../../components/home/Musics'
import { Player } from '../../components/home/Player'
import { useWindowWidth } from '../../hooks/useWindowWidth'
import styles from './styles.module.scss'

export function HomePage() {
  const { isMobileScreen } = useWindowWidth()

  return (
    <main
      className={classNames(styles.container, 'bg-secondary', 'text-primary')}
    >
      {!isMobileScreen && <Musics />}
      <Player />
    </main>
  )
}
