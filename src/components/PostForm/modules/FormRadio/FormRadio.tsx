import React from 'react';
import { FieldError, UseFormRegister, Path } from 'react-hook-form';
import styles from '@/components/PostForm/modules/FormRadio/FormRadio.module.scss';
import FormError from '@/components/PostForm/FormError/FormError';
import { FormValues } from '@/types';

type FormRadioProps = {
  items: Array<string>;
  name: Path<FormValues>;
  error?: FieldError | undefined;
  register: UseFormRegister<FormValues>;
};

const RadioForm = ({ items, name, error, register }: FormRadioProps) => {
  return (
    <div>
      <ul className={styles.formList}>
        {items.map((item, index) => (
          <li key={`${item}-${index}`} className={styles.formList__item}>
            <label className={styles.formList__label}>
              <input aria-label={name} {...register(name)} type="radio" value={item} />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
      {error && <FormError>{error.message}</FormError>}
    </div>
  );
};

export default RadioForm;
