import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.beforeEach(({ page }) =>
  page.goto('https://www.thetesttribe.com/my-account/edit-account/')
)

// these all seem to fail accessibility checks
test('Scan the Complete Page', async ({ page }) => {
  const scanResults = await new AxeBuilder({ page }).analyze()
  expect(scanResults.violations.length).toBeGreaterThan(0)
})

test('Scan the Partial Page Include Login Credentials Section', async ({
  page
}) => {
  const scanResults = await new AxeBuilder({ page })
    .include('.woocommerce')
    .analyze()
  expect(scanResults.violations.length).toBeGreaterThan(0)
})

test('Scan the Complete Page related to WCAG A or AA violations', async ({
  page
}) => {
  const scanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()
  expect(scanResults.violations.length).toBeGreaterThan(0)
})

test("Scan the Complete Page related to WCAG A or AA violations with disabling the rule 'region'", async ({
  page
}) => {
  const scanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .disableRules(['region'])
    .analyze()
  expect(scanResults.violations.length).toBeGreaterThan(0)
})

test('Include Customer Login Credentials', async ({ page }) => {
  const scanResults = await new AxeBuilder({ page })
    .include('#customer_login')
    .analyze()
  expect(scanResults.violations.length).toBeGreaterThan(0)
})
