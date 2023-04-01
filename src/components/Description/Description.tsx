import React, { useEffect, useState } from 'react';
import styles from './Description.module.scss';
import SearchBox from '../SearchBox/SearchBox';
import randomBg from '../../utils/bgRandomizer';

const Description: React.FC = () => {
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    const storedImage = sessionStorage.getItem('bgImage');
    if (storedImage) {
      setImage(storedImage);
    } else {
      const newImage = randomBg();
      setImage(newImage);
      sessionStorage.setItem('bgImage', newImage);
    }
  }, []);

  const bgImage = {
    '--img': `url(${image})`,
  } as React.CSSProperties;

  return (
    <section className={styles.description} style={bgImage} data-testid="description">
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
