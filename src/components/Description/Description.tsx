import React from 'react';
import styles from './Description.module.scss';
import SearchBox from '../SearchBox/SearchBox';
import { randomBg } from '../../utils/bgRandomizer';

type DescriptionState = {
  image: string;
};

class Description extends React.Component<object, DescriptionState> {
  state = {
    image: '',
  };
  componentDidMount() {
    const storedImage = sessionStorage.getItem('bgImage');
    if (storedImage) {
      this.setState({ image: storedImage });
    } else {
      const newImage = randomBg();
      this.setState({ image: newImage });
      sessionStorage.setItem('bgImage', newImage);
    }
  }

  render() {
    const bgImage = {
      '--img': `url(${this.state.image}`,
    } as React.CSSProperties;

    return (
      <section className={styles.description} style={bgImage}>
        <div className={styles.descriptionContent}>
          <h2 className={styles.descriptionContent__title}>Beautiful Places</h2>
          <p className={styles.descriptionContent__subtitle}>
            Discover new beautiful places for you.
          </p>
          <SearchBox className={styles.descriptionContent__searchBar} white />
        </div>
      </section>
    );
  }
}

export default Description;
