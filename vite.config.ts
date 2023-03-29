/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import macrosPlugin from 'vite-plugin-babel-macros';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), macrosPlugin()],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
  },
});
