import { CountriesInfo } from '../../../../interfaces/index';
import React from 'react';
import styles from './Dropdown.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import FormError from '../../FormError/FormError';
import { FieldError, UseFormRegister, Path } from 'react-hook-form';
import { FormValues } from '../../../../types';

type DropdownProps = {
  name: Path<FormValues>;
  items: CountriesInfo[];
  error: FieldError | undefined;
  register: UseFormRegister<FormValues>;
};

const Dropdown = ({ items, error, name, register }: DropdownProps) => {
  return (
    <label className={styles.dropdownSelect}>
      <div className={styles.dropdownSelect__wrapper}>
        <FontAwesomeIcon icon={faCaretDown} className={styles.dropdownSelect__arrow} />
        <select
          aria-label={name}
          {...register(name)}
          className={styles.dropdownSelect__list}
          defaultValue={''}
        >
          <option className={styles.dropdownSelect__option} value="" disabled>
            Choose country:
          </option>
          {items &&
            items.map((country: CountriesInfo, index: number) => (
              <option
                className={styles.dropdownSelect__option}
                key={`${country.code}-${index}`}
                value={country.name}
              >
                {country.emoji} {country.name}
              </option>
            ))}
        </select>
      </div>
      {error && <FormError>{error.message}</FormError>}
    </label>
  );
};

export default Dropdown;
