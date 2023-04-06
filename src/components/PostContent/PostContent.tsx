import React, { useEffect, useState } from 'react';
import styles from './PostContent.module.scss';
import { PlacesInfo } from '../../interfaces/index';
import CardItem from '../CardItem/CardItem';

interface PostContentProps {
  items: PlacesInfo[];
}

const PostContent: React.FC<PostContentProps> = ({ items }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (items.length) {
      setIsLoading(true);
    }
  }, [items]);

  return (
    <section className={styles.postContent} data-testid="post-content">
      {!items.length ? (
        <h3 className={styles.postContent__title}>Posts not created!</h3>
      ) : (
        <div className={styles.container}>
          <ul className={styles.cardsList}>
            {items.map((item: PlacesInfo) => (
              <CardItem key={item.id} obj={item} isLoading={isLoading} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default PostContent;
