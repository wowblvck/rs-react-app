import React, { useEffect, useState } from 'react';
import styles from './HomeContent.module.scss';
import CardItem from '../CardItem/CardItem';
import { PlacesInfo } from '../../interfaces/index';
import { fetchPlaces } from '../../thunks';

const HomeContent: React.FC = () => {
  const [items, setItems] = useState<Array<PlacesInfo>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPlaces();
      if (data.length) {
        setItems(data);
      }
    };
    fetchData();
  }, []);

  return (
    <section className={styles.homeContent} data-testid="home-content">
      <h3 className={styles.homeContent__title}>Find your place</h3>
      <div className={styles.container}>
        <ul className={styles.cardsList}>
          {items.map((item: PlacesInfo) => (
            <CardItem key={item.id} obj={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HomeContent;
