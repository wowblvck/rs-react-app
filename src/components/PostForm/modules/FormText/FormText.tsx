import React, { ReactNode } from 'react';
import styles from './FormText.module.scss';
import classNames from 'classnames';
import FormError from '../../FormError/FormError';

type FormTextProps = {
  area?: boolean;
  disabled?: boolean;
  placeholder?: string;
  children?: ReactNode;
  value?: string;
  textInputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
  error?: string[];
};

export default class FormText extends React.Component<FormTextProps> {
  render() {
    const {
      area,
      disabled = false,
      placeholder,
      children,
      value,
      textInputRef,
      error,
    } = this.props;

    const InputElement = area ? 'textarea' : 'input';

    return (
      <React.Fragment>
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
            ref={textInputRef as React.RefObject<HTMLInputElement & HTMLTextAreaElement>}
          />
          {error !== undefined && <FormError error={error} />}
        </label>
      </React.Fragment>
    );
  }
}
