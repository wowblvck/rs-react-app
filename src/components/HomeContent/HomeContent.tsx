import React, { useEffect, useState } from 'react';
import styles from './HomeContent.module.scss';
import Button from '../Button/Button';
import { PlacesInfo } from '../../interfaces';
import { useGetPlacesQuery } from '../../thunks/places.thunk';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '../../store/store';
import { ITEMS_PER_PAGE } from '../../constants/settings.config';
import SkeletonPlaces from '../SkeletonLoader/SkeletonLoader';
import CardItem from '../CardItem/CardItem';

const HomeContent: React.FC = () => {
  const searchValue = useAppSelector((state) => state.search.searchValue);
  const [inputValue, setInputValue] = useState('');
  const { data = [], isFetching, isError, refetch } = useGetPlacesQuery(inputValue);

  useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);

  const skeletons = [...new Array(ITEMS_PER_PAGE)].map((_, index) => (
    <SkeletonPlaces key={index} />
  ));

  const places = data.map((item: PlacesInfo) => <CardItem key={item.id} obj={item} />);

  const handleRefresh = () => refetch();

  return (
    <section className={styles.homeContent} data-testid="home-content">
      <div className={styles.container}>
        {isError ? (
          <div className={styles.errorContainer}>
            <FontAwesomeIcon icon={faCircleExclamation} style={{ color: '#ff0000' }} size="2xl" />
            <p className={styles.errorTitle}>Something went wrong. Please try again!</p>
            <Button onClick={handleRefresh} className={styles.errorButton}>
              Try again
            </Button>
          </div>
        ) : (
          <>
            {!places.length && !isFetching ? (
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
                <ul className={styles.cardsList}>{isFetching ? skeletons : places}</ul>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default HomeContent;
