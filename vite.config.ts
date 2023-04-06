/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import macrosPlugin from 'vite-plugin-babel-macros';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { DEFAULT_OPTIONS } from './imageOptimization.config';
import { defineConfig } from 'vite';
import autoprefixer = require('autoprefixer');
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), macrosPlugin(), ViteImageOptimizer(DEFAULT_OPTIONS)],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    coverage: {
      provider: 'c8',
      all: true,
      exclude: [
        ...configDefaults.exclude,
        '**/main.tsx',
        '**/*.d.ts',
        'src/types/*',
        'src/interfaces/*',
        'src/utils/test-utils.tsx',
        'babel-plugin-macros.config.js',
        'imageOptimization.config.ts',
        'postcss.config.js',
      ],
    },
  },
});
