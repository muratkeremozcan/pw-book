import { test, expect } from '@playwright/test'
import isCi from 'is-ci'

// restrict to 1 browser, and consistent viewport
test.use({ browserName: 'chromium', viewport: { width: 1280, height: 720 } })

test.beforeEach(async ({ page }) => {
  await page.goto('https://playwright.dev/')
})

test('Take visual screenshot', async ({ page }) => {
  if (isCi) test.skip() // this is impossible to pass in CI

  // Targeting subsection of the page, full page will rarely match
  // const element = page.locator('.hero__title')

  // we can check th whole page, but it becomes a headache in CI
  await expect(page).toHaveScreenshot({
    mask: [page.getByText('Get started')],
    // in CI, it is a headache to get things right, I guess that's why u get AI services for visual testing...
    maxDiffPixelRatio: 0.2, // Allow up to 20% of pixels to differ
    maxDiffPixels: 500, // Allow up to 500 pixels to differ
    fullPage: true // full page will rarely match...
    // stylePath: './styles/normalize.css' // Apply shared styles
  })
})
