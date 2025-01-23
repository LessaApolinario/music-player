import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Modal } from '../../components/base/Modal/Modal'
import { Musics } from '../../components/home/Musics'
import { useWindowWidth } from '../../hooks/useWindowWidth'
import styles from './styles.module.scss'
import { useAutoPlay } from '../../contexts/hooks'

export function DefaultLayout() {
  const { isMobileScreen } = useWindowWidth()
  const autoPlay = useAutoPlay()
  const [isMusicsModalOpen, setIsMusicsModalOpen] = useState(false)

  useEffect(() => {
    autoPlay()
  }, [autoPlay])

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
          <Musics onClose={closeMusicsModal} />
        </Modal>
      )}
    </div>
  )
}
