import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './PopupModal.module.scss';
import { faXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

type PopupModalProps = {
  children: string;
  isVisible: boolean;
  onClose: () => void;
};

const PopupModal: React.FC<PopupModalProps> = ({ children, isVisible, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      const timeout = setTimeout(() => {
        onClose();
      }, 3000);
      return () => {
        clearTimeout(timeout);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isVisible, onClose]);

  return (
    <div
      ref={containerRef}
      className={classNames(styles.container, {
        [styles.container_active]: isVisible,
      })}
    >
      <button className={styles.xmark} onClick={onClose}>
        <FontAwesomeIcon
          icon={faXmark}
          className={styles.xmark__icon}
          style={{ color: '#ffffff' }}
        />
      </button>
      <div className={styles.modal}>
        <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#0ea03a' }} size="2xl" />
        <p className={styles.modal__title}>{children}</p>
      </div>
    </div>
  );
};

export default PopupModal;
