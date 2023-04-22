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
import istanbul from 'vite-plugin-istanbul';

export default defineConfig({
  plugins: [
    react({ fastRefresh: false }),
    macrosPlugin(),
    ViteImageOptimizer(DEFAULT_OPTIONS),
    splitVendorChunkPlugin(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/tests/setupTests.ts',
    coverage: {
      all: true,
      provider: 'c8',
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      reportsDirectory: 'coverage/unit',
      exclude: [
        ...configDefaults.exclude,
        'src/server.ts',
        'src/entry-client.tsx',
        'src/entry-server.tsx',
        'src/*.d.ts',
        'src/types/**/*',
        'src/interfaces/**/*',
        'src/constants/**/*',
        'src/thunks/**/*',
        'src/tests/*',
      ],
    },
  },
  build: {
    outDir: DIRS.OUTPUT_CLIENT,
    sourcemap: true,
    rollupOptions: {
      input: resolve('./src/entry-client.tsx'),
      output: {
        entryFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
});
