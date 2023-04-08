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
import { useSearch } from '../../hooks/useSearch.hook';

const HomeContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState<PlacesInfo[]>([]);
  const [update, setUpdate] = useState(false);
  const { state } = useSearch();

  const skeletons = [...new Array(ITEMS_PER_PAGE)].map((_, index) => (
    <SkeletonPlaces key={index} />
  ));
  const places = items.map((item: PlacesInfo) => <CardItem key={item.id} obj={item} isLoading />);

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await getPlaces(state.searchValue);
        setItems(response);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlaces();
  }, [state, update]);

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
            {!items.length && !isLoading ? (
              <div className={styles.errorContainer}>
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  style={{ color: '#ff0000' }}
                  size="2xl"
                />
                <p className={styles.errorTitle}>Places not found. Refine your search!</p>
              </div>
            ) : (
              <>
                <h3 className={styles.homeContent__title}>Find your place</h3>
                <ul className={styles.cardsList}>{isLoading && !error ? skeletons : places}</ul>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default HomeContent;
