/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import macrosPlugin from 'vite-plugin-babel-macros';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { DEFAULT_OPTIONS } from './imageOptimization.config';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react(), macrosPlugin(), ViteImageOptimizer(DEFAULT_OPTIONS)],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.ts',
    coverage: {
      provider: 'c8',
      all: true,
      exclude: [
        ...configDefaults.exclude,
        '**/main.tsx',
        '**/*.d.ts',
        'src/types/*',
        'src/interfaces/*',
        'src/constants/*',
        'src/thunks/*',
        'src/tests/*',
        'babel-plugin-macros.config.js',
        'imageOptimization.config.ts',
      ],
    },
  },
});
