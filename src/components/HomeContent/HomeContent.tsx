import React from 'react';
import styles from './HomeContent.module.scss';
import CardItem from '../CardItem/CardItem';
import Button from '../Button/Button';
import SkeletonPlaces from '../SkeletonLoader/SkeletonLoader';
import { PlacesInfo } from '../../interfaces';
import { useGetPlacesQuery } from '../../thunks/places.thunk';
import { ITEMS_PER_PAGE } from '../../constants/settings.config';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '../../store/store';

const HomeContent: React.FC = () => {
  const searchValue = useAppSelector((state) => state.search.searchValue);
  const { data = [], isFetching, isError, refetch } = useGetPlacesQuery(searchValue);

  const skeletons = [...new Array(ITEMS_PER_PAGE)].map((_, index) => (
    <SkeletonPlaces key={index} />
  ));

  const places = isFetching
    ? skeletons
    : data.map((item: PlacesInfo) => <CardItem key={item.id} obj={item} isLoading />);

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
                <ul className={styles.cardsList}>{places}</ul>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default HomeContent;
