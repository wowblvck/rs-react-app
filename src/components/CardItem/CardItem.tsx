import React, { useState } from 'react';
import styles from './CardItem.module.scss';
import effects from '../../scss/common/Effects.module.scss';
import { PlacesInfo } from '../../interfaces/index';
import { getDayBetweenDates } from '../../utils/functions';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import CardPopup from '../CardPopup/CardPopup';
import ShareOptions from '../ShareOptions/ShareOptions';

type CardItemProps = {
  obj: PlacesInfo;
  isLoading: boolean;
};

const CardItem: React.FC<CardItemProps> = ({ obj, isLoading }) => {
  const { country, location, image, description, author, date, category } = obj;
  const [showPopup, setShowPopup] = useState(false);

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <li
      className={classNames(styles.cardItem, effects.boxShadow)}
      data-testid="card-item"
      onClick={handlePopup}
    >
      <div className={styles.cardItem__imageContainer}>
        <div className={styles.cardItem__tag}>
          <FontAwesomeIcon icon={faTag} style={{ color: 'white' }} />
          <span>{category}</span>
        </div>
        <img className={styles.cardItem__image} src={image} alt={`Card Image`} />
      </div>
      <div className={styles.cardItem__content}>
        <div className={styles.cardItem__header}>
          <p className={styles.cardItem__country}>{country}</p>
          <p className={styles.cardItem__date}>{getDayBetweenDates(date)}</p>
        </div>
        <p className={styles.cardItem__location}>{location}</p>
        <p className={styles.cardItem__description}>{description}</p>
        <div className={styles.cardItem__userInfo}>
          <div className={styles.cardItem__userProfile}>
            <img className={styles.cardItem__userImage} src={author.avatar} alt="Profile Photo" />
            <p className={styles.cardItem__userName}>
              {author.first_name}
              <br />
              {author.last_name}
            </p>
          </div>
          <ShareOptions />
        </div>
      </div>
      {isLoading && <CardPopup isVisible={showPopup} obj={obj} onClose={handlePopup} />}
    </li>
  );
};

export default CardItem;
