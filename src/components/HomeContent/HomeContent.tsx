import React, { Component } from 'react';
import styles from './HomeContent.module.scss';
import CardItem from '../CardItem/CardItem';
import { PlacesInfo } from '../../interfaces/Places.interface';
import data from '../../db/db.json';

class HomeContent extends Component {
  render() {
    return (
      <section className={styles.homeContent}>
        <h3 className={styles.homeContent__title}>Find your place</h3>
        <div className={styles.container}>
          <ul className={styles.cardsList}>
            {data.map((item: PlacesInfo) => (
              <CardItem key={item.id} obj={item} />
            ))}
          </ul>
        </div>
      </section>
    );
  }
}

export default HomeContent;
