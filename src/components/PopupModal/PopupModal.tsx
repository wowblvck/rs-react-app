import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './PopupModal.module.scss';
import { faXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

type PopupModalProps = {
  children: string;
  isVisible: boolean;
  togglePopup: () => void;
};

class PopupModal extends React.Component<PopupModalProps> {
  private modal: React.RefObject<HTMLDivElement> = React.createRef();
  private timerId: ReturnType<typeof setTimeout> | null = null;

  componentDidMount() {
    window.addEventListener('mousedown', this.handleWindowClick);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleWindowClick);
  }

  componentDidUpdate(prevProps: Readonly<PopupModalProps>) {
    if (prevProps.isVisible !== this.props.isVisible) {
      if (this.props.isVisible) {
        this.timerId = setTimeout(this.props.togglePopup, 3000);
      } else if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
    }
  }

  handleWindowClick = (event: MouseEvent) => {
    const { isVisible, togglePopup } = this.props;

    if (isVisible && !this.modal.current?.contains(event.target as Node)) {
      togglePopup();
    }
  };

  render() {
    const { children, isVisible, togglePopup } = this.props;

    return (
      <div
        className={classNames(styles.container, {
          [styles.container_active]: isVisible,
        })}
        ref={this.modal}
      >
        <button onClick={togglePopup} className={styles.xmark}>
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
  }
}

export default PopupModal;
