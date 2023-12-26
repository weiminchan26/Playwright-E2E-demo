import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import fs from 'fs';

export const SUBSCRIBED_STORAGE_STATE = path.join(__dirname, 'playwright/.auth/subscribed.json');

export const UNSUBSCRIBED_STORAGE_STATE = path.join(__dirname, 'playwright/.auth/unsubscribed.json');

const getToken = (path: string): string => {
  const state = JSON.parse(fs.readFileSync(path, 'utf8'));
  return state['origins'][0].localStorage.find((ls) => ls.name === 'user_token')['value'];
}

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  // forbidOnly: !!process.env.CI,
  // retries: process.env.CI ? 2 : 0,
  workers:  process.env.CI ? 1 : undefined,
  reporter: 'github',
  // reporter: [
  //   ['list', { printSteps: true }]
  //   ['line'],
  //   ['dot'],
  //   ['html'],
  //   ['blob', { outputDir: 'my-report' }],
  //   ['json', {  outputFile: 'test-results.json' }],
  //   ['junit', { outputFile: 'results.xml' }]
  // ],
  use: {
    baseURL: 'https://platform-testing.workmagic.io',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'subscribed_setup', testMatch: /\.*\.subscribed\.setup\.ts/ },
    { name: 'unsubscribed_setup', testMatch: /\.*\.unsubscribed\.setup\.ts/ },
    {
      name: 'subscribed in chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: SUBSCRIBED_STORAGE_STATE,
        extraHTTPHeaders: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${getToken(SUBSCRIBED_STORAGE_STATE)}`,
        }
      },
      testIgnore: ['**/*unsubscribed.spec.ts', '**/setup.ts'],
      dependencies: ['subscribed_setup'],
    },
    {
      name: 'unsubscribed in chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: UNSUBSCRIBED_STORAGE_STATE,
        extraHTTPHeaders: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${getToken(SUBSCRIBED_STORAGE_STATE)}`,
        }
      },
      testMatch: '**/*.unsubscribed.spec.ts',
      dependencies: ['unsubscribed_setup'],
    },

    {
      name: 'subscribed in firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: SUBSCRIBED_STORAGE_STATE,
        extraHTTPHeaders: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${getToken(SUBSCRIBED_STORAGE_STATE)}`,
        }
      },
      testIgnore: ['**/*unsubscribed.spec.ts'],
      dependencies: ['subscribed_setup'],
    },
    {
      name: 'unsubscribed in firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: UNSUBSCRIBED_STORAGE_STATE,
        extraHTTPHeaders: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${getToken(SUBSCRIBED_STORAGE_STATE)}`,
        }
      },
      testMatch: '**/*.unsubscribed.spec.ts',
      dependencies: ['unsubscribed_setup'],
    },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    //   dependencies: ['setup'],
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
