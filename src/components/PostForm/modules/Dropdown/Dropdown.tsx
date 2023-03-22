import { CountriesInfo } from '../../../../interfaces/Countries.interface';
import React from 'react';
import styles from './Dropdown.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

type DropdownProps = {
  items: CountriesInfo[];
  dropdownRef: React.RefObject<HTMLSelectElement>;
};

export default class Dropdown extends React.Component<DropdownProps> {
  render() {
    const { items, dropdownRef } = this.props;

    return (
      <label className={styles.dropdownSelect}>
        <FontAwesomeIcon icon={faCaretDown} className={styles.dropdownSelect__arrow} />
        <select className={styles.dropdownSelect__list} ref={dropdownRef}>
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
      </label>
    );
  }
}
