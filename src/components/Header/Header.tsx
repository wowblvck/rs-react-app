import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, matchPath } from 'react-router-dom';
import classNames from 'classnames';

import logoIcon from '../../assets/icons/logo-icon.png';
import styles from './Header.module.scss';
import effects from '../../scss/common/Effects.module.scss';
import SearchBox from '../SearchBox/SearchBox';

import routes from '../../routes/routes';
import Button from '../Button/Button';

const Header: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const currentRoute = routes.find((route) => matchPath(location.pathname, route.path));

  const links = Object.values(routes).filter((route) => route.inNav);

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [location]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        toggleMenu();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
      <nav className={styles.nav} ref={navRef}>
        <button
          className={classNames(styles.hamburger, {
            [styles.hamburger_active]: isOpen,
          })}
          onClick={toggleMenu}
        >
          <span className={styles.hamburger__line}></span>
          <span className={styles.hamburger__line}></span>
          <span className={styles.hamburger__line}></span>
        </button>
        <ul
          className={classNames(styles.nav__list, {
            [styles.nav__list_active]: isOpen,
          })}
        >
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
          <Button>
            <Link className={styles.postLink} to="/post">
              Create Post
            </Link>
          </Button>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
