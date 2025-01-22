import type { PropsWithChildren } from 'react'
import { IoClose } from 'react-icons/io5'
import styles from './styles.module.scss'
import classNames from 'classnames'

interface ModalProps {
  isOpen: boolean
  className?: string
  onClose: () => void
}

export function Modal({
  isOpen,
  onClose,
  className,
  children,
}: PropsWithChildren<ModalProps>) {
  if (!isOpen) {
    return <></>
  }

  return (
    <div className={classNames(styles.container, className ?? '')}>
      <header>
        <IoClose onClick={onClose} />
      </header>

      {children}
    </div>
  )
}
