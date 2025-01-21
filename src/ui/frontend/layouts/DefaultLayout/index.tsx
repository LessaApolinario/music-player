import classNames from 'classnames'
import { Outlet } from 'react-router-dom'
import { useWindowWidth } from '../../hooks/useWindowWidth'
import styles from './styles.module.scss'

export function DefaultLayout() {
  const { isMobileScreen } = useWindowWidth()

  return (
    <div className={classNames(styles.container, 'bg-secondary')}>
      <header className={styles.mainHeader}>
        <h1 className='text-primary'>Music player from 2007</h1>
        {isMobileScreen && (
          <button className={styles.showMusics}>Visualizar músicas</button>
        )}
      </header>
      <Outlet />
    </div>
  )
}
