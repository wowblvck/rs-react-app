import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { renderToPipeableStream, RenderToPipeableStreamOptions } from 'react-dom/server';
import App from './App';

function render(url: string, options?: RenderToPipeableStreamOptions) {
  return renderToPipeableStream(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
    options
  );
}

export default render;
