import React, { MouseEvent, useEffect, useState } from 'react';
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
import { createPortal } from 'react-dom';
import { useGetPlaceQuery } from '../../thunks/places.thunk';

type CardPopupProps = {
  itemId: number;
  onClose: () => void;
};

const CardPopup: React.FC<CardPopupProps> = ({ itemId, onClose }) => {
  const { data, isLoading, isFetching } = useGetPlaceQuery(itemId);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
      setZoom(false);
    };
  }, []);

  const handleOutside = (event: MouseEvent) => {
    event.stopPropagation();
    if (event.target !== event.currentTarget) return;
    onClose();
    setZoom(false);
  };

  const handleZoom = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setZoom(!zoom);
  };

  return createPortal(
    <div className={styles.popupOverlay} onClick={handleOutside}>
      {isLoading && <span className={styles.loader}></span>}
      {!isFetching && data && (
        <div className={styles.popupContainer} data-testid="card-popup">
          <button className={styles.xmark} onClick={onClose} aria-label="button-close">
            <FontAwesomeIcon
              icon={faXmark}
              className={styles.xmark__icon}
              style={{ color: '#ffffff' }}
            />
          </button>
          <div className={styles.popupHeader}>
            <p className={styles.popupHeader__location}>{data.location}</p>
            <p className={styles.popupHeader__country}>{data.country}</p>
          </div>
          <hr className={styles.popupHeader__line} />
          <div
            data-testid="card-image-container"
            className={classNames(styles.imageContainer, {
              [styles.imageContainer_zoom]: zoom,
            })}
          >
            <img
              aria-label="card-image"
              src={data.image}
              alt={`${data.location} Image`}
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
            <p className={styles.content__description}>{data.description}</p>
            <ul className={styles.infoList}>
              <li className={styles.infoList__item}>
                <FontAwesomeIcon icon={faTag} style={{ color: 'black' }} size="lg" />
                <span>{data.category}</span>
              </li>
              <li className={styles.infoList__item}>
                <FontAwesomeIcon icon={faCalendarDays} size="lg" />
                <span>{getDayBetweenDates(data.date)}</span>
              </li>
            </ul>
            <div className={styles.userProfile}>
              <img
                className={styles.userProfile__image}
                src={data.author.avatar}
                alt="Profile Photo"
              />
              <p className={styles.userProfile__name}>
                {data.author.first_name} {data.author.last_name}
              </p>
            </div>
            <ShareOptions className={styles.shareOptions} size={40} />
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};

export default CardPopup;
