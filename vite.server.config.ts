/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import { resolve } from 'path';
import { DIRS } from './appConfig';

import baseConfig from './vite.config';

export default defineConfig({
  ...baseConfig,
  build: {
    outDir: DIRS.OUTPUT_SERVER,
    rollupOptions: {
      input: resolve('./src/entry-server.tsx'),
      output: {
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
});
