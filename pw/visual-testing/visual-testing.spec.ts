import { test, expect } from '@playwright/test'

test.beforeEach(({ page }) => page.goto('https://playwright.dev/'))
test('Basic Visual Testing', async ({ page }) => {
  await expect(page).toHaveScreenshot('visual-partial.png')
})

test('Take the visual of full page', async ({ page }) => {
  await expect(page).toHaveScreenshot('visual-full.png', { fullPage: true })
})

test('Take visual of full page with masking the button', async ({ page }) => {
  await expect(page).toHaveScreenshot('visual-mask.png', {
    fullPage: true,
    mask: [page.getByText('Get started')]
  })
})

test('Take visual with masking top section of the site', async ({ page }) => {
  await expect(page).toHaveScreenshot('visual-mask-top-section.png', {
    mask: [page.getByText('Get started')]
  })
})

test('Take visual with maxDiffPixels', async ({ page }) => {
  await expect(page).toHaveScreenshot({ maxDiffPixels: 100 })
})
