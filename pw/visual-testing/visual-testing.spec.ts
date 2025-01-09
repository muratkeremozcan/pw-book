import { test, expect } from '@playwright/test'

test.beforeEach(({ page }) => page.goto('https://playwright.dev/'))

// the options are optional and nice for customization
test('Take visual of full page with masking the button', async ({ page }) => {
  await expect(page).toHaveScreenshot('visual-mask.png', {
    fullPage: true,
    mask: [page.getByText('Get started')],
    maxDiffPixels: 400
  })
})
