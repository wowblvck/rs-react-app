import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '@/components/PopupModal/PopupModal.module.scss';
import { faXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { createPortal } from 'react-dom';

type PopupModalProps = {
  children: string;
  onClose: () => void;
};

const PopupModal: React.FC<PopupModalProps> = ({ children, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    const timeout = setTimeout(() => {
      onClose();
    }, 3000);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return createPortal(
    <div ref={containerRef} className={styles.container} aria-label="form-modal">
      <button className={styles.xmark} onClick={onClose} aria-label="form-modal-close">
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
    </div>,
    document.body
  );
};

export default PopupModal;
