import React from 'react';
import classNames from 'classnames';
import styles from './SearchBox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

type SearchBoxProps = {
  white?: boolean;
  minimize?: boolean;
  className?: string;
};

type SearchBoxState = {
  searchValue: string;
};

class SearchBox extends React.Component<SearchBoxProps, SearchBoxState> {
  state = {
    searchValue: '',
  };
  componentDidMount() {
    const storedValue = localStorage.getItem('searchValue');
    if (storedValue) {
      this.setState({ searchValue: storedValue });
    }
  }
  componentWillUnmount() {
    if (this.state.searchValue) {
      localStorage.setItem('searchValue', this.state.searchValue);
    }
  }

  onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value.length) {
      const storedValue = localStorage.getItem('searchValue');
      if (storedValue) {
        localStorage.removeItem('searchValue');
      }
    }
    this.setState({ searchValue: value });
  };

  render() {
    const { white, minimize, className } = this.props;
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
            value={this.state.searchValue}
            onChange={this.onChangeValue}
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
  }
}

export default SearchBox;
