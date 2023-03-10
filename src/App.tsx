import React from 'react';
import './scss/app.scss';
import logoIcon from './assets/icons/logo-icon.png';

function App() {
  return (
    <header className="header">
      <div className="logo">
        <img className="logo__img" alt="Logo" src={logoIcon} />
        <h1 className="logo__title">
          Beautiful
          <br />
          places
        </h1>
      </div>
      <div className="search-bar">
        <div className="search-bar__wrapper">
          <input type="text" className="search-bar__input" placeholder="Search anything..." />
          <button className="search-bar__submit">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <a href="#" className="nav__link">
              Home
            </a>
          </li>
          <li className="nav__item">
            <a href="#" className="nav__link">
              About Us
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default App;
