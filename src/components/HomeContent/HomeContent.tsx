import React from 'react';
import styles from './HomeContent.module.scss';
import CardItem from '../CardItem/CardItem';
import { PlacesInfo } from '../../interfaces/Places.interface';

interface HomeContentState {
  items: PlacesInfo[];
}

export const fetchPlaces = async (): Promise<PlacesInfo[]> => {
  try {
    const response = await fetch('/db.json');
    return await response.json();
  } catch (e) {
    throw new Error(`Error while loading database: ${e}`);
  }
};

class HomeContent extends React.Component<object, HomeContentState> {
  state = {
    items: [],
  };
  componentDidMount = async () => {
    const data = await fetchPlaces();
    this.setState({ items: data });
  };

  render() {
    return (
      <section className={styles.homeContent} data-testid="home-content">
        <h3 className={styles.homeContent__title}>Find your place</h3>
        <div className={styles.container}>
          <ul className={styles.cardsList}>
            {this.state.items.map((item: PlacesInfo) => (
              <CardItem key={item.id} obj={item} />
            ))}
          </ul>
        </div>
      </section>
    );
  }
}

export default HomeContent;
