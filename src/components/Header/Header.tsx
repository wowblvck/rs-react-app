import React from 'react';
import logoIcon from '../../assets/icons/logo-icon.png';

import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
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
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? `${styles.nav__link} ${styles.nav__link_active}` : styles.nav__link
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                end
                className={({ isActive }) =>
                  isActive ? `${styles.nav__link} ${styles.nav__link_active}` : styles.nav__link
                }
              >
                About Us
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
