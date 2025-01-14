import classNames from 'classnames'
import styles from './styles.module.scss'

export function HomePage() {
  return (
    <main
      className={classNames(styles.container, 'bg-secondary', 'text-primary')}
    >
      HomePage
    </main>
  )
}
