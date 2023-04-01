import React from 'react';
import styles from './Checkbox.module.scss';
import FormError from '../../FormError/FormError';
import { FieldError, UseFormRegister, Path } from 'react-hook-form';
import { FormValues } from '../../../../types';

type CheckboxProps = {
  name: Path<FormValues>;
  error: FieldError | undefined;
  register: UseFormRegister<FormValues>;
  children: string;
};

const CheckboxForm = ({ name, error, register, children }: CheckboxProps) => {
  return (
    <label className={styles.checkBox__label}>
      {children}
      <input aria-label={name} {...register(name)} type="checkbox" />
      <span className={styles.checkBox__checkmark}></span>
      {error && <FormError>{error.message}</FormError>}
    </label>
  );
};

export default CheckboxForm;
