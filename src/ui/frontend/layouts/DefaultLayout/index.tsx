import classNames from 'classnames'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Modal } from '../../components/base/Modal/Modal'
import { Musics } from '../../components/home/Musics'
import { useWindowWidth } from '../../hooks/useWindowWidth'
import styles from './styles.module.scss'

export function DefaultLayout() {
  const { isMobileScreen } = useWindowWidth()
  const [isMusicsModalOpen, setIsMusicsModalOpen] = useState(false)

  function openMusicsModal() {
    setIsMusicsModalOpen(true)
  }

  function closeMusicsModal() {
    setIsMusicsModalOpen(false)
  }

  return (
    <div className={classNames(styles.container, 'bg-secondary')}>
      <header className={styles.mainHeader}>
        <h1 className='text-primary'>Music player from 2007</h1>
        {isMobileScreen && (
          <button className={styles.showMusics} onClick={openMusicsModal}>
            Visualizar músicas
          </button>
        )}
      </header>
      <Outlet />

      {isMobileScreen && (
        <Modal
          isOpen={isMusicsModalOpen}
          onClose={closeMusicsModal}
          className={classNames(styles.musicsModal, 'bg-secondary')}
        >
          <Musics />
        </Modal>
      )}
    </div>
  )
}
