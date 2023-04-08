import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from './SearchBox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSearch } from '../../hooks/useSearch.hook';

type SearchBoxProps = {
  white?: boolean;
  minimize?: boolean;
  className?: string;
  value?: string;
};

const SearchBox: React.FC<SearchBoxProps> = ({ white, minimize, className }) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const { state, dispatch } = useSearch();

  useEffect(() => {
    const currentRef = searchRef.current;
    return () => {
      if (currentRef?.value.length) {
        localStorage.setItem('searchValue', currentRef.value);
      }
    };
  }, []);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchText = searchRef.current?.value?.trim() || '';
    dispatch({ type: 'UPDATE_SEARCH_VALUE', payload: searchText });
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
        <form
          aria-label="search-form"
          className={classNames(styles.searchBar__form, {
            [styles.searchBar__form_minimize]: minimize,
          })}
          onSubmit={handleSearch}
        >
          <input
            aria-label="search-input"
            type="text"
            ref={searchRef}
            defaultValue={state.searchValue}
            className={classNames(styles.searchBar__input, {
              [styles.searchBar__input_white]: white,
              [styles.searchBar__input_minimize]: minimize,
            })}
            placeholder="Search anything..."
          />
        </form>
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
