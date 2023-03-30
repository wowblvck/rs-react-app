import React, { ReactNode } from 'react';
import styles from './FormText.module.scss';
import classNames from 'classnames';
import { FieldError, UseFormRegister, Path } from 'react-hook-form';
import FormError from '../../FormError/FormError';
import { FormValues } from '../../PostForm';

type FormTextProps = {
  name: Path<FormValues>;
  area?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: string | undefined;
  children?: ReactNode;
  error?: FieldError | undefined;
  register: UseFormRegister<FormValues>;
};

const FormText = ({
  name,
  area = false,
  disabled = false,
  placeholder,
  children,
  value,
  error,
  register,
}: FormTextProps) => {
  const InputElement = area ? 'textarea' : 'input';

  return (
    <>
      <label>
        <span className={styles.textInput__title}>{children}</span>
        <InputElement
          type={!area ? 'text' : undefined}
          {...register(name)}
          className={classNames(styles.textInput, {
            [styles.textInput_area]: area,
          })}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
        />
        {error && <FormError>{error.message}</FormError>}
      </label>
    </>
  );
};

export default FormText;
