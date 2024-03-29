import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, matchPath } from 'react-router-dom';
import classNames from 'classnames';

import logoIcon from '@/assets/icons/logo-icon.png';
import styles from '@/components/Header/Header.module.scss';
import effects from '@/scss/common/Effects.module.scss';
import SearchBox from '@/components/SearchBox/SearchBox';
import Button from '@/components/Button/Button';

import { routes } from '@/routes/routes';

const Header: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const currentRoute = routes.find((route) => matchPath(location.pathname, route.path));

  const links = Object.values(routes).filter((route) => route.nav);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
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
        {currentRoute ? currentRoute.name : '404'}
      </h2>
      <nav className={styles.nav} ref={navRef}>
        <button
          aria-label="burger-menu"
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
          aria-label="nav-menu"
        >
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
