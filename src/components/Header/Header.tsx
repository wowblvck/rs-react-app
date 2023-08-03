import React from 'react';
import logoIcon from '../../assets/icons/logo-icon.png';

import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import SearchBox from '../SearchBox/SearchBox';
import { routesArray } from '../../App';

import { withRouter, WithRouterProps } from '../../utils/withRouter';

class Header extends React.Component<WithRouterProps> {
  getPageName = () => {
    const { pathname } = this.props.location;

    const matchingRoute = routesArray
      .flatMap((route) => route.children)
      .find((childRoute) => {
        if (childRoute.path === pathname.substring(1)) {
          return true;
        } else if (!childRoute.hasOwnProperty('path') && pathname === '/') {
          return true;
        } else if (childRoute.path === '*') {
          return true;
        }
        return false;
      });

    return matchingRoute?.name;
  };
  render() {
    const currentPageName = this.getPageName();

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
        <h2 className={styles.pageName}>{currentPageName}</h2>
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

export default withRouter(Header);
