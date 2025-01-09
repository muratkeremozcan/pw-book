import { test, expect } from '@playwright/test'

// restrict to 1 browser, and consistent viewport
test.use({ browserName: 'chromium', viewport: { width: 1280, height: 720 } })

test.beforeEach(async ({ page }) => {
  await page.goto('https://playwright.dev/')
})

test('Take visual screenshot', async ({ page }) => {
  // Targeting subsection of the page, full page will rarely match
  const element = page.locator('.hero__title')

  // we can check th whole page, but it becomes a headache in CI
  await expect(element).toHaveScreenshot('visual-subsection.png', {
    mask: [page.getByText('Get started')],
    scale: 'css',
    maxDiffPixelRatio: 0.5 // in CI, it is a headache to get things right, I guess that's why u get AI services for visual testing...
    // maxDiffPixels: 400,
    // fullPage: true, // full page will rarely match...
    // stylePath: './styles/normalize.css' // Apply shared styles
  })
})
