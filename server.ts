import express from 'express';
import { createServer as createViteServer, ViteDevServer } from 'vite';
import serveStatic from 'serve-static';
import * as dotenv from 'dotenv';
import { DIRS } from './appConfig.js';

dotenv.config();

const PORT = process.env.PORT || 5173;
const isProd = process.env.NODE_ENV === 'production';

let vite: ViteDevServer | undefined;

const createServer = async () => {
  const app = express();

  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    app.use(
      serveStatic(DIRS.OUTPUT_CLIENT, {
        index: false,
      })
    );
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    let renderApp;
    const serverPath = `./server/entry-server.js`;
    try {
      if (!isProd) {
        renderApp = (await vite!.ssrLoadModule('./src/entry-server.tsx')).renderApp;
      } else {
        renderApp = (await import(serverPath)).renderApp;
      }

      await renderApp(url, res);
    } catch (e) {
      if (!isProd) {
        vite!.ssrFixStacktrace(e as Error);
        next(e);
      } else {
        console.log((e as Error).stack);
        res.status(500).end((e as Error).stack);
      }
    }
  });

  return { app, vite };
};

createServer().then(({ app }) => {
  app.listen(PORT, () => {
    console.log(`Server running in localhost on port ${PORT}\nhttp://localhost:${PORT}`);
  });
});
