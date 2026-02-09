import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  timeout: 30 * 1000,
  testDir: './tests',
  fullyParallel: true,
  retries:1,
  workers: 1,

  reporter: [
    ['html'],
    ['allure-playwright'],
    ['list']
  ],

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },         // Set Default Viewport Size for Consistency
    ignoreHTTPSErrors: true,                        // Ignore SSL Errors if Necessary
    permissions: ['geolocation'],                   // Set Necessary Permissions for Geolocation-Based Tests
  },

  //grep: /@master/,

  projects: [
   {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

  ],


});
