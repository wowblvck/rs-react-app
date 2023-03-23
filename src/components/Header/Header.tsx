import React from 'react';
import logoIcon from '../../assets/icons/logo-icon.png';

import styles from './Header.module.scss';
import effects from '../../scss/common/Effects.module.scss';
import { Link, NavLink } from 'react-router-dom';
import SearchBox from '../SearchBox/SearchBox';
import { routesArray } from '../../App';

import { withRouter, WithRouterProps } from '../../utils/withRouter';
import { LinkData } from '../../interfaces/index';
import classNames from 'classnames';

const links: LinkData[] = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/about',
    name: 'About Us',
  },
];

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
        <h2 className={classNames(styles.pageName, effects.boxShadow)}>{currentPageName}</h2>
        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            {links.map((link, index) => (
              <li key={`${link.name}-${index}`}>
                <NavLink
                  to={link.path}
                  end
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.nav__link} ${effects.linkHover} ${effects.linkHover_active}`
                      : `${styles.nav__link} ${effects.linkHover}`
                  }
                >
                  {link.name}
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
  }
}

export default withRouter(Header);
