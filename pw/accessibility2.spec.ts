import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.beforeEach(({ page }) =>
  page.goto('https://www.thetesttribe.com/my-account/edit-account/')
)

// this one seems to not have axe violations
test('Include Login Button ONLY', async ({ page }) => {
  const scanResults = await new AxeBuilder({ page })
    .include('#woocommerce-login-nonce')
    .analyze()
  expect(scanResults.violations).toEqual([])
})

// this one seems to not have axe violations
test('Include Email Address Field ONLY', async ({ page }) => {
  const scanResults = await new AxeBuilder({ page })
    .include('#username')
    .analyze()
  expect(scanResults.violations).toEqual([])
})

// this one seems to not have axe violations
test('Include Password Field ONLY', async ({ page }) => {
  const scanResults = await new AxeBuilder({ page })
    .include('#password')
    .analyze()
  expect(scanResults.violations).toEqual([])
})

test('Scan only the Username text field of the Login Credentials Screen, Exclude certain sections', async ({
  page
}) => {
  const scanResults = await new AxeBuilder({ page })
    .include('#username')
    .exclude('[data-id="tab1"]')
    .analyze()
  expect(scanResults.violations).toEqual([])
})

test('Disable Rules login_credentials', async ({ page }) => {
  const scanResults = await new AxeBuilder({ page })
    .disableRules(['region'])
    .analyze()
  expect(scanResults.violations.length).toBeGreaterThan(0)
})
