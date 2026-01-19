// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  testMatch: '**/*.spec.js',
  use: {
    // ÄNDERUNG 1: Benutze 127.0.0.1 statt localhost
    baseURL: 'http://127.0.0.1:8080',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npx http-server . -p 8080',
    // ÄNDERUNG 2: Benutze 127.0.0.1 statt localhost
    url: 'http://127.0.0.1:8080',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    // ÄNDERUNG 3: Ignoriere SSL Fehler und stelle sicher, dass stdout ignoriert wird
    ignoreHTTPSErrors: true,
  }
});