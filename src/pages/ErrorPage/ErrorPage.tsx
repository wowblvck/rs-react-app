import React from 'react';
import styles from './ErrorPage.module.scss';
import errorImage from '../../assets/img/error-page-image.svg';
import { Link } from 'react-router-dom';

class ErrorPage extends React.Component {
  render() {
    return (
      <section className={styles.errorPage}>
        <div className={styles.errorPage__content}>
          <img className={styles.errorPage__image} src={errorImage} alt="Error Image" />
          <p className={styles.errorPage__title}>Whoops!</p>
          <p className={styles.errorPage__subtitle}>We can’t seem the page you are looking for</p>
          <Link to="/">
            <button className={styles.errorPage__button}>Return Home</button>
          </Link>
        </div>
      </section>
    );
  }
}

export default ErrorPage;
