import React, { ReactNode } from 'react';
import styles from './FormText.module.scss';
import classNames from 'classnames';

type FormTextProps = {
  area?: boolean;
  disabled?: boolean;
  placeholder?: string;
  children?: ReactNode;
  value?: string;
  textInputRef?: React.RefObject<HTMLInputElement> | React.RefObject<HTMLTextAreaElement>;
};

export default class FormText extends React.Component<FormTextProps> {
  render() {
    const { area, disabled = false, placeholder, children, value, textInputRef } = this.props;

    const InputElement = area ? 'textarea' : 'input';

    return (
      <label>
        <span className={styles.textInput__title}>{children}</span>
        <InputElement
          type={!area ? 'text' : undefined}
          className={classNames(styles.textInput, {
            [styles.textInput_area]: area,
          })}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          ref={textInputRef}
        />
      </label>
    );
  }
}
