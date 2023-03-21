import { CountriesInfo } from '../../interfaces/Countries.interface';
import React from 'react';
import styles from './Dropdown.module.scss';
import classNames from 'classnames';

type DropdownProps = {
  items: CountriesInfo[];
  dropdownRef: React.RefObject<HTMLSelectElement>;
};

export default class Dropdown extends React.Component<DropdownProps> {
  render() {
    const { items } = this.props;

    return (
      <div className={styles.dropdownSelect}>
        <i className={classNames('fa-solid fa-caret-down', styles.dropdownSelect__arrow)}></i>
        <select className={styles.dropdownSelect__list} ref={this.props.dropdownRef}>
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
    );
  }
}
