import React, { ReactNode, useEffect, useState } from 'react';
import { FieldError, Path, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import styles from '@/components/PostForm/modules/DatePicker/DatePicker.module.scss';
import FormError from '@/components/PostForm/FormError/FormError';
import { FormValues } from '@/types';

type DatePickerProps = {
  children?: ReactNode;
  error?: FieldError | undefined;
  register: UseFormRegister<FormValues>;
  name: Path<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  reset: boolean;
};

const dateFormat = 'DD/MM/YYYY';

const DatePicker = ({ children, error, register, name, setValue, reset }: DatePickerProps) => {
  const [date, setDate] = useState('');

  useEffect(() => {
    if (reset) {
      setDate('');
    }
  }, [reset]);

  const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formatDate = moment(value).format(dateFormat);
    setDate(formatDate);
    setValue(name, value, { shouldValidate: true });
  };

  return (
    <label>
      <span className={styles.datePicker__title}>{children}</span>
      <div className={styles.datePicker__wrapper}>
        <input type="text" className={styles.datePicker__text} disabled value={date} />
        <div className={styles.datePicker__dateForm}>
          <FontAwesomeIcon
            className={styles.datePicker__icon}
            icon={faCalendarDays}
            style={{ fontSize: '24px' }}
          />
          <input
            aria-label={name}
            type="date"
            {...register(name)}
            className={styles.datePicker__input}
            onChange={handleDate}
          />
        </div>
      </div>
      {error && <FormError>{error.message}</FormError>}
    </label>
  );
};

export default DatePicker;
