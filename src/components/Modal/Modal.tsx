


import React, { ReactNode } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size
}) => {
  if (!isOpen) return null;

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const getModalSizeClass = () => {
    switch (size) {
      case 'sm':
        return styles.modalSm;
      case 'lg':
        return styles.modalLg;
      case 'xl':
        return styles.modalXl;
      default:
        return '';
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={`${styles.modalContainer} ${getModalSizeClass()}`}
        onClick={handleModalClick}
      >
        <div className={styles.modalHeader}>
          <h5 className={styles.modalTitle}>{title}</h5>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className={styles.modalBody}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;