import { test, expect } from '@playwright/test'

// Restrict to Chrome only
test.use({ browserName: 'chromium' })

// the options are optional and nice for customization
test('Take visual of full page with masking the button', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  const element = page.locator('.hero__title') // Targeting subsection of the page

  // we can check th whole page, but it becomes a headache in CI
  await expect(element).toHaveScreenshot('visual-subsection.png', {
    // fullPage: true,
    mask: [page.getByText('Get started')],
    maxDiffPixels: 400
  })
})
