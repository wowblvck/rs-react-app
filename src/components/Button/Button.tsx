import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import effects from '../../scss/common/Effects.module.scss';

type ButtonProps = {
  className?: string;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ className, children }) => {
  return (
    <button className={classNames(styles.button, className, effects.buttonShadow)}>
      {children}
    </button>
  );
};

export default Button;
