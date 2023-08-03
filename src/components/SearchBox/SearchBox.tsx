import React from 'react';
import classNames from 'classnames';
import styles from './SearchBox.module.scss';

type SearchBoxProps = {
  white?: boolean;
  minimize?: boolean;
  className?: string;
};

class SearchBox extends React.Component<SearchBoxProps> {
  render() {
    const { white, minimize, className } = this.props;
    return (
      <div
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
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBox;
