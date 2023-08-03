import React, { Component } from 'react';
import styles from './HomeContent.module.scss';
import CardItem from '../CardItem/CardItem';

class HomeContent extends Component {
  render() {
    return (
      <section className={styles.homeContent}>
        <h3 className={styles.homeContent__title}>Find your place</h3>
        <div className={styles.container}>
          <ul className={styles.cardsList}>
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
          </ul>
        </div>
      </section>
    );
  }
}

export default HomeContent;
