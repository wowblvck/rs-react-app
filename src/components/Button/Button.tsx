import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import effects from '../../scss/common/Effects.module.scss';

type ButtonProps = {
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<ButtonProps> = ({ className, children, onClick, isLoading }) => {
  return (
    <button
      className={classNames(styles.button, className, effects.buttonShadow, {
        [styles.button_disabled]: isLoading,
      })}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <span className={styles.loader}></span> : children}
    </button>
  );
};

export default Button;
