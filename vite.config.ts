/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import macrosPlugin from 'vite-plugin-babel-macros';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { DEFAULT_OPTIONS } from './imageOptimization.config.js';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { configDefaults } from 'vitest/config';
import { resolve } from 'path';
import { DIRS } from './appConfig';

export default defineConfig({
  plugins: [
    react({ fastRefresh: false }),
    macrosPlugin(),
    ViteImageOptimizer(DEFAULT_OPTIONS),
    splitVendorChunkPlugin(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.ts',
    coverage: {
      provider: 'c8',
      all: true,
      exclude: [
        ...configDefaults.exclude,
        '**/server.ts',
        '**/entry-client.tsx',
        '**/entry-server.tsx',
        '**/*.d.ts',
        'src/types/*',
        'src/interfaces/*',
        'src/constants/*',
        'src/thunks/*',
        'src/tests/*',
        'babel-plugin-macros.config.js',
        'imageOptimization.config.js',
        '**/vite.server.config.ts',
        '**/appConfig.ts',
      ],
    },
  },
  server: {
    origin: 'http://127.0.0.1:5173',
  },
  build: {
    outDir: DIRS.OUTPUT_CLIENT,
    rollupOptions: {
      input: resolve('./src/entry-client.tsx'),
      output: {
        entryFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
});
