import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  /* Run tests in parallel */
  fullyParallel: true,

  /* Fail if test.only is left */
  forbidOnly: !!process.env.CI,

  /* Retry failed tests (important for stability) */
  retries: process.env.CI ? 2 : 1,

  /* Workers */
  workers: process.env.CI ? 1 : 2,

  /* Reports */
  reporter: [
    ['html'],
    ['list']
  ],

  use: {
    /* 🔥 IMPORTANT: Base URL (clean code) */
    baseURL: 'https://www.saucedemo.com',

   
    /* Trace for debugging */
    trace: 'on',

    /* Action timeout */
    actionTimeout: 10000,
  },

  /* Browser configurations */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
         headless: false,
         screenshot: 'on',
          video: 'on',
       },
    },
   
  ],
});
