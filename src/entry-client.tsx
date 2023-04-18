import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureAppStore from './store/store';

const store = configureAppStore(window.__PRELOADED_STATE__);

delete window.__PRELOADED_STATE__;

const rootElement = document.getElementById('root');
if (typeof document !== 'undefined' && rootElement) {
  hydrateRoot(
    rootElement,
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}
