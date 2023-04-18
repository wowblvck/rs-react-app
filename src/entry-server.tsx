import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { Provider } from 'react-redux';
import App from './App';
import { StaticRouter } from 'react-router-dom/server';
import configureAppStore, { RootState } from './store/store';
import placesApi from './thunks/places.thunk';
import { Response } from 'express';

const isProd = process.env.NODE_ENV === 'production';

export const renderApp = async (url: string, res: Response) => {
  const store = configureAppStore();

  store.dispatch(placesApi.endpoints.getPlaces.initiate(''));

  await Promise.all(store.dispatch(placesApi.util.getRunningQueriesThunk()));

  const initialState = store.getState();

  const stream = renderToPipeableStream(
    <Document
      html={
        <StaticRouter location={url}>
          <Provider store={store}>
            <App />
          </Provider>
        </StaticRouter>
      }
      preloadedState={initialState}
    />,
    {
      onShellReady: () => {
        stream.pipe(res);
      },
      onAllReady: () => {
        store.dispatch(placesApi.util.resetApiState());
        res.end();
      },
    }
  );
};

type DocumentProps = {
  html: React.ReactElement;
  preloadedState: RootState;
};

const Document: React.FC<DocumentProps> = ({ html, preloadedState }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        {isProd && <link rel="stylesheet" href="./assets/entry-client.css" />}
        <title>Beautiful Places</title>
      </head>
      <body>
        <div id="root">{html}</div>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
              /</g,
              '\\u003c'
            )}`,
          }}
        ></script>
        <script
          type="module"
          src={isProd ? './assets/entry-client.js' : './src/entry-client.tsx'}
        ></script>
      </body>
    </html>
  );
};
