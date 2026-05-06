import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  workers: 3,

  reporter: [['html'], ['list']],

  use: {
    baseURL: 'https://www.saucedemo.com',

    // ✅ FIXED
    headless: !!process.env.CI,

    trace: 'on-first-retry',
    actionTimeout: 10000,
    navigationTimeout: 15000,

  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        screenshot: 'on',
        video: 'on',
        trace: 'on',
      },
    },
  ],
});
