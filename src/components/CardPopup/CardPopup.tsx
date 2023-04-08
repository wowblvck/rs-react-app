import React, { MouseEvent, useEffect, useState } from 'react';
import { PlacesInfo } from '../../interfaces';
import styles from './CardPopup.module.scss';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faMagnifyingGlassPlus,
  faTag,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';
import { getDayBetweenDates } from '../../utils/functions';
import ShareOptions from '../ShareOptions/ShareOptions';

type CardPopupProps = {
  obj: PlacesInfo;
  isVisible: boolean;
  onClose: () => void;
};

const CardPopup: React.FC<CardPopupProps> = ({ isVisible, obj, onClose }) => {
  const { location, country, image, description, category, date, author } = obj;
  const [zoom, setZoom] = useState(false);

  const handleOutside = (event: MouseEvent) => {
    event.stopPropagation();
    if (event.target !== event.currentTarget) return;
    onClose();
    setZoom(false);
  };

  useEffect(() => {
    return () => {
      setZoom(false);
    };
  }, [isVisible]);

  const handleZoom = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!zoom) {
      setZoom(true);
    } else {
      setZoom(false);
    }
  };

  return (
    <div
      className={classNames(styles.popupOverlay, {
        [styles.popupOverlay_active]: isVisible,
      })}
      onClick={handleOutside}
    >
      <div className={styles.popupContainer}>
        <button className={styles.xmark} onClick={onClose} aria-label="button-close">
          <FontAwesomeIcon
            icon={faXmark}
            className={styles.xmark__icon}
            style={{ color: '#ffffff' }}
          />
        </button>
        <div className={styles.popupHeader}>
          <p className={styles.popupHeader__location}>{location}</p>
          <p className={styles.popupHeader__country}>{country}</p>
        </div>
        <hr className={styles.popupHeader__line} />
        <div
          className={classNames(styles.imageContainer, {
            [styles.imageContainer_zoom]: zoom,
          })}
        >
          <img
            src={image}
            alt={`${location} Image`}
            className={classNames(styles.imageContainer__image, {
              [styles.imageContainer__image_zoom]: zoom,
            })}
          />
          <div
            aria-label="zoom-container"
            className={classNames(styles.imageContainer__overlay, {
              [styles.imageContainer__overlay_zoom]: zoom,
            })}
            onClick={handleZoom}
          >
            {!zoom && (
              <>
                <FontAwesomeIcon icon={faMagnifyingGlassPlus} size="xl" />
                Click to Zoom In
              </>
            )}
          </div>
        </div>
        <div className={styles.content}>
          <p className={styles.content__description}>{description}</p>
          <ul className={styles.infoList}>
            <li className={styles.infoList__item}>
              <FontAwesomeIcon icon={faTag} style={{ color: 'black' }} size="lg" />
              <span>{category}</span>
            </li>
            <li className={styles.infoList__item}>
              <FontAwesomeIcon icon={faCalendarDays} size="lg" />
              <span>{getDayBetweenDates(date)}</span>
            </li>
          </ul>
          <div className={styles.userProfile}>
            <img className={styles.userProfile__image} src={author.avatar} alt="Profile Photo" />
            <p className={styles.userProfile__name}>
              {author.first_name} {author.last_name}
            </p>
          </div>
          <ShareOptions className={styles.shareOptions} size={40} />
        </div>
      </div>
    </div>
  );
};

export default CardPopup;
