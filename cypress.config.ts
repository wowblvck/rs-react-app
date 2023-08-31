import { defineConfig } from 'cypress';
//@ts-ignore
import coverage from '@cypress/code-coverage/task';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      coverage(on, config);
      return config;
    },
    baseUrl: 'http://localhost:5173',
  },
  video: false,
  screenshotOnRunFailure: false,
  pageLoadTimeout: 60000,
});
