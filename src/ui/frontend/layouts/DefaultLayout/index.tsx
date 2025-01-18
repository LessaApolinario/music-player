import classNames from 'classnames'
import { Outlet } from 'react-router-dom'
import styles from './styles.module.scss'

export function DefaultLayout() {
  return (
    <div
      className={classNames(styles.container, 'bg-secondary', 'text-primary')}
    >
      <header className={styles.mainHeader}>
        <h1>Music player from 2007</h1>
      </header>
      <Outlet />
    </div>
  )
}
