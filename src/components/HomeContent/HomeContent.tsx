import React, { useEffect, useState } from 'react';
import styles from './HomeContent.module.scss';
import CardItem from '../CardItem/CardItem';
import Button from '../Button/Button';
import SkeletonPlaces from '../SkeletonLoader/SkeletonLoader';
import { PlacesInfo } from '../../interfaces/index';
import { getPlaces } from '../../thunks';
import { ITEMS_PER_PAGE } from '../../constants/settings.config';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const HomeContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState<PlacesInfo[]>([]);
  const [update, setUpdate] = useState(false);

  const skeletons = [...new Array(ITEMS_PER_PAGE)].map((_, index) => (
    <SkeletonPlaces key={index} />
  ));
  const places = items.map((item: PlacesInfo) => <CardItem key={item.id} obj={item} isLoading />);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const response = await getPlaces();
        setItems(response);
        setError(false);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPlaces();
  }, [update]);

  const handleRefresh = () => setUpdate(!update);

  return (
    <section className={styles.homeContent} data-testid="home-content">
      <div className={styles.container}>
        {error ? (
          <div className={styles.errorContainer}>
            <FontAwesomeIcon icon={faCircleExclamation} style={{ color: '#ff0000' }} size="2xl" />
            <p className={styles.errorTitle}>Something went wrong. Please try again!</p>
            <Button onClick={handleRefresh} className={styles.errorButton}>
              Try again
            </Button>
          </div>
        ) : (
          <>
            <h3 className={styles.homeContent__title}>Find your place</h3>
            <ul className={styles.cardsList}>{isLoading && !error ? skeletons : places}</ul>
          </>
        )}
      </div>
    </section>
  );
};

export default HomeContent;
