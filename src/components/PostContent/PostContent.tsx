import React from 'react';
import styles from '@/components/PostContent/PostContent.module.scss';
import { PlacesInfo } from '@/interfaces';
import CardItem from '@/components/CardItem/CardItem';
import { useAppSelector } from '@/store/store';

const PostContent: React.FC = () => {
  const items = useAppSelector((state) => state.formPlaces.items);

  return (
    <section className={styles.postContent} data-testid="post-content">
      {!items.length ? (
        <h3 className={styles.postContent__title}>Posts not created!</h3>
      ) : (
        <div className={styles.container}>
          <ul className={styles.cardsList}>
            {items.map((item: PlacesInfo) => (
              <CardItem key={item.id} obj={item} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default PostContent;
