import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import effects from '../../scss/common/Effects.module.scss';

type ButtonProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<ButtonProps> = ({ className, children, onClick }) => {
  return (
    <button
      className={classNames(styles.button, className, effects.buttonShadow)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
