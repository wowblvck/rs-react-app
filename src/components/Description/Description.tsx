import React from 'react';
import styles from './Description.module.scss';
import SearchBox from '../SearchBox/SearchBox';

class Description extends React.Component {
  render() {
    return (
      <section className={styles.description}>
        <div className={styles.descriptionContent}>
          <h2 className={styles.descriptionContent__title}>Beautiful Places</h2>
          <p className={styles.descriptionContent__subtitle}>
            Discover new beautiful places for you.
          </p>
          <SearchBox className={styles.descriptionContent__searchBar} white />
        </div>
      </section>
    );
  }
}

export default Description;
