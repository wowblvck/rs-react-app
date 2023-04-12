import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './PopupModal.module.scss';
import { faXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

type PopupModalProps = {
  children: string;
  isVisible: boolean;
};

const PopupModal: React.FC<PopupModalProps> = ({ children, isVisible }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setVisible(false);
      }
    };
    if (isVisible) {
      setVisible(true);
      document.addEventListener('mousedown', handleClickOutside);
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => {
        clearTimeout(timeout);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className={classNames(styles.container, {
        [styles.container_active]: visible,
      })}
    >
      <button className={styles.xmark} onClick={() => setVisible(false)}>
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
