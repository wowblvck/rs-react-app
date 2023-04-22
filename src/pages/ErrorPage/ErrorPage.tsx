import React from 'react';
import styles from './ErrorPage.module.scss';
import effects from '../../scss/common/Effects.module.scss';
import errorImage from '../../assets/img/error-page-image.svg';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const ErrorPage: React.FC = () => {
  return (
    <section className={styles.errorPage} data-testid="error-page">
      <div className={styles.errorPage__content}>
        <img className={styles.errorPage__image} src={errorImage} alt="Error Image" />
        <p className={styles.errorPage__title}>Whoops!</p>
        <p className={styles.errorPage__subtitle}>We can’t seem the page you are looking for</p>
        <Link to="/">
          <button className={classNames(styles.errorPage__button, effects.buttonShadow)}>
            Return Home
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
