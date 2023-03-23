import React from 'react';
import styles from './CardItem.module.scss';
import effects from '../../scss/common/Effects.module.scss';
import { PlacesInfo } from '../../interfaces/index';
import { getDayBetweenDates } from '../../utils/functions';
import classNames from 'classnames';

type CardItemProps = {
  obj: PlacesInfo;
};

class CardItem extends React.Component<CardItemProps> {
  render() {
    const { country, location, image, description, author, date } = this.props.obj;

    return (
      <li className={classNames(styles.cardItem, effects.boxShadow)} data-testid="card-item">
        <div className={styles.cardItem__imageContainer}>
          <img className={styles.cardItem__image} src={image} alt="Card Image - Istanbul" />
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
            <div className={styles.cardItem__options}>
              <svg
                className={styles.cardItem__like}
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="31" height="31" rx="4" fill="white" />
                <path
                  d="M15.5 25.15C15.19 25.15 14.89 25.11 14.64 25.02C10.82 23.71 4.75 19.06 4.75 12.19C4.75 8.68998 7.58 5.84998 11.06 5.84998C12.75 5.84998 14.33 6.50998 15.5 7.68998C16.67 6.50998 18.25 5.84998 19.94 5.84998C23.42 5.84998 26.25 8.69998 26.25 12.19C26.25 19.07 20.18 23.71 16.36 25.02C16.11 25.11 15.81 25.15 15.5 25.15ZM11.06 7.34998C8.41 7.34998 6.25 9.51998 6.25 12.19C6.25 19.02 12.82 22.82 15.13 23.61C15.31 23.67 15.7 23.67 15.88 23.61C18.18 22.82 24.76 19.03 24.76 12.19C24.76 9.51998 22.6 7.34998 19.95 7.34998C18.43 7.34998 17.02 8.05998 16.11 9.28998C15.83 9.66998 15.19 9.66998 14.91 9.28998C13.98 8.04998 12.58 7.34998 11.06 7.34998Z"
                  fill="#1F1F1F"
                />
              </svg>
              <svg
                className={styles.cardItem__share}
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="31" height="31" rx="4" fill="white" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24.75 22.5C24.75 21.2574 23.7426 20.25 22.5 20.25C21.2574 20.25 20.25 21.2574 20.25 22.5C20.25 23.7426 21.2574 24.75 22.5 24.75C23.7426 24.75 24.75 23.7426 24.75 22.5ZM22.5 18.75C24.5711 18.75 26.25 20.4289 26.25 22.5C26.25 24.5711 24.5711 26.25 22.5 26.25C20.4289 26.25 18.75 24.5711 18.75 22.5C18.75 22.0741 18.821 21.6647 18.9519 21.2831L11.5549 17.6754C10.875 18.6285 9.76005 19.25 8.5 19.25C6.42893 19.25 4.75 17.5711 4.75 15.5C4.75 13.4289 6.42893 11.75 8.5 11.75C9.51477 11.75 10.4354 12.1531 11.1105 12.8078C11.1238 12.8003 11.1374 12.7932 11.1513 12.7864L18.7915 9.06002C18.7642 8.87732 18.75 8.69032 18.75 8.5C18.75 6.42893 20.4289 4.75 22.5 4.75C24.5711 4.75 26.25 6.42893 26.25 8.5C26.25 10.5711 24.5711 12.25 22.5 12.25C21.1537 12.25 19.9732 11.5406 19.3117 10.4752L11.9633 14.0593C12.148 14.5029 12.25 14.9895 12.25 15.5C12.25 15.7758 12.2202 16.0446 12.1637 16.3034L19.7164 19.9871C20.4027 19.2274 21.3956 18.75 22.5 18.75ZM8.5 13.25C9.74264 13.25 10.75 14.2574 10.75 15.5C10.75 16.7426 9.74264 17.75 8.5 17.75C7.25736 17.75 6.25 16.7426 6.25 15.5C6.25 14.2574 7.25736 13.25 8.5 13.25ZM22.5 6.25C23.7426 6.25 24.75 7.25736 24.75 8.5C24.75 9.74264 23.7426 10.75 22.5 10.75C21.2574 10.75 20.25 9.74264 20.25 8.5C20.25 7.25736 21.2574 6.25 22.5 6.25Z"
                  fill="#1F1F1F"
                />
              </svg>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default CardItem;
