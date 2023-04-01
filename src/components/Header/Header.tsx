import React from 'react';
import { Link, NavLink, useLocation, matchPath } from 'react-router-dom';
import classNames from 'classnames';

import logoIcon from '../../assets/icons/logo-icon.png';
import styles from './Header.module.scss';
import effects from '../../scss/common/Effects.module.scss';
import SearchBox from '../SearchBox/SearchBox';

import routes from '../../routes/routes';

const Header: React.FC = () => {
  const location = useLocation();

  const currentRoute = routes.find((route) => matchPath(location.pathname, route.path));

  const links = Object.values(routes).filter((route) => route.inNav);

  return (
    <header className={styles.header} data-testid="header">
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
      <h2 className={classNames(styles.pageName, effects.boxShadow)}>
        {currentRoute ? currentRoute.title : '404'}
      </h2>
      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          {links.map((link, index) => (
            <li key={`${link.key}-${index}`}>
              <NavLink
                to={link.path}
                end
                className={({ isActive }) =>
                  isActive
                    ? `${styles.nav__link} ${effects.linkHover} ${effects.linkHover_active}`
                    : `${styles.nav__link} ${effects.linkHover}`
                }
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <button className={classNames(styles.postButton, effects.buttonShadow)}>
        <Link className={styles.postLink} to="/post">
          Create Post
        </Link>
      </button>
    </header>
  );
};

export default Header;
