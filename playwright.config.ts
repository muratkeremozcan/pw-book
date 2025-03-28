import { defineConfig, devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './pw',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 5 : 3,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // use blob for sharding in CI, later it is converted to html
  // for local use list, but in debug mode give the html report too
  reporter: process.env.CI
    ? 'blob'
    : process.env.PW_HTML_REPORT
      ? [['list'], ['html']]
      : 'list',
  // reporter: [['json', { outputFile: 'results.json' }]],

  timeout: 15000,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    video: 'retain-on-failure'
  },
  // for visual testing, Ensure snapshots are platform-agnostic
  snapshotPathTemplate:
    '{testDir}/{testFileDir}/snapshots/{testFileName}/{testName}-{arg}{ext}',

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },

    // Only enable Google Chrome when multi-browser is explicitly enabled
    ...(process.env.PW_MULTI_BROWSER === 'true' ? [
      {
        name: 'google-chrome',
        use: { ...devices['Desktop Chrome'], channel: 'chrome' }
      }
    ] : [])

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] }
    // }

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] }
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] }
    // }

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // }
  ]

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
})

/*

  // potential setup for runners with higher resources
  const os = require('os')
  const isCI = process.env.CI === 'true'

  const config = {
    workers: isCI ? Math.min(os.cpus().length, 4) : undefined, // Limit to 4 workers in CI
  };

  */
