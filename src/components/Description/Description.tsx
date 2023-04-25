import React from 'react';
import styles from '@/components/Description/Description.module.scss';
import SearchBox from '@/components/SearchBox/SearchBox';

const Description: React.FC = () => {
  return (
    <section className={styles.description} data-testid="description">
      <div className={styles.descriptionContent}>
        <h2 className={styles.descriptionContent__title}>Beautiful Places</h2>
        <p className={styles.descriptionContent__subtitle}>
          Discover new beautiful places for you.
        </p>
        <SearchBox className={styles.descriptionContent__searchBar} white />
      </div>
    </section>
  );
};

export default Description;
