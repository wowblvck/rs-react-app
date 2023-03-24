import { CountriesInfo } from '../../../../interfaces/index';
import React from 'react';
import styles from './Dropdown.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import FormError from '../../FormError/FormError';

type DropdownProps = {
  items: CountriesInfo[];
  dropdownRef: React.RefObject<HTMLSelectElement>;
  error?: string[];
};

export default class Dropdown extends React.Component<DropdownProps> {
  render() {
    const { items, dropdownRef, error } = this.props;

    return (
      <label className={styles.dropdownSelect}>
        <div className={styles.dropdownSelect__wrapper}>
          <FontAwesomeIcon icon={faCaretDown} className={styles.dropdownSelect__arrow} />
          <select className={styles.dropdownSelect__list} ref={dropdownRef} defaultValue={'none'}>
            <option className={styles.dropdownSelect__option} value="none" disabled>
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
        {error !== undefined && <FormError error={error} />}
      </label>
    );
  }
}
