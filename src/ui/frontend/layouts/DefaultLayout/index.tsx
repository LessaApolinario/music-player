import { Outlet } from 'react-router-dom'

import styles from './styles.module.scss'
import classNames from 'classnames'

export function DefaultLayout() {
  return (
    <div
      className={classNames(styles.container, 'bg-secondary', 'text-primary')}
    >
      <header className={styles.mainHeader}>
        <h1>Music player from 2007</h1>
      </header>
      <Outlet />
      <footer className={styles.mainFooter}>
        <h2>Controles</h2>

        <div className={styles.grid}></div>
      </footer>
    </div>
  )
}
