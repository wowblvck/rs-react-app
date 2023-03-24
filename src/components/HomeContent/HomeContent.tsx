import React from 'react';
import styles from './HomeContent.module.scss';
import CardItem from '../CardItem/CardItem';
import { PlacesInfo } from '../../interfaces/index';
import { fetchPlaces } from '../../thunks';

interface HomeContentState {
  items: PlacesInfo[];
}

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
