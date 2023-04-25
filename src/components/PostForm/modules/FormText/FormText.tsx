import React, { ReactNode } from 'react';
import { FieldError, UseFormRegister, Path } from 'react-hook-form';
import classNames from 'classnames';
import styles from '@/components/PostForm/modules/FormText/FormText.module.scss';
import FormError from '@/components/PostForm/FormError/FormError';
import { FormValues } from '@/types';

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
          aria-label={name}
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
