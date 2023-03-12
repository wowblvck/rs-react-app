import React from 'react';
import logoIcon from '../../assets/icons/logo-icon.png';

import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import SearchBox from '../SearchBox/SearchBox';
class Header extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <Link to="/">
          <div className={styles.logo}>
            <img className={styles.logo__img} alt="Logo" src={logoIcon} />
            <h1 className={styles.logo__title}>
              Beautiful
              <br />
              places
            </h1>
          </div>
        </Link>
        <SearchBox minimize />
        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            <li>
              <Link to="/" className={styles.nav__link}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={styles.nav__link}>
                About Us
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
