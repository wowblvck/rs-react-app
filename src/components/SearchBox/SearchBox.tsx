import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './SearchBox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

type SearchBoxProps = {
  white?: boolean;
  minimize?: boolean;
  className?: string;
};

const SearchBox: React.FC<SearchBoxProps> = ({ white, minimize, className }) => {
  const [searchValue, setSearchValue] = useState<string>(() => {
    const storedValue = localStorage.getItem('searchValue');
    return storedValue || '';
  });

  useEffect(() => {
    if (searchValue) {
      localStorage.setItem('searchValue', searchValue);
    } else {
      localStorage.removeItem('searchValue');
    }
  }, [searchValue]);

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  return (
    <div
      aria-label="Search"
      className={classNames(styles.searchBar, className, {
        [styles.searchBar_minimize]: minimize,
      })}
    >
      <div
        className={classNames(styles.searchBar__wrapper, {
          [styles.searchBar__wrapper_white]: white,
          [styles.searchBar__wrapper_minimize]: minimize,
        })}
      >
        <input
          type="text"
          value={searchValue}
          onChange={onChangeValue}
          className={classNames(styles.searchBar__input, {
            [styles.searchBar__input_white]: white,
            [styles.searchBar__input_minimize]: minimize,
          })}
          placeholder="Search anything..."
        />
        <button
          className={classNames(styles.searchBar__submit, {
            [styles.searchBar__submit_white]: white,
            [styles.searchBar__submit_minimize]: minimize,
          })}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
