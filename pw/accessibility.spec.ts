import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.beforeEach(({ page }) =>
  page.goto('https://www.thetesttribe.com/my-account/edit-account/')
)

test('Scan the Complete Page', async ({ page }) => {
  const scanResults = await new AxeBuilder({ page }).analyze()
  expect(scanResults.violations.length).toBeGreaterThan(0)
})

test('Include and exclude', async ({ page }) => {
  const scanResults = await new AxeBuilder({ page })
    .include('#woocommerce-login-nonce')
    .include('#password')
    .include('#username')
    .exclude('[data-id="tab1"]')
    .analyze()
  expect(scanResults.violations).toEqual([])
})

test('Disable Rules, Partial Page, tags', async ({ page }) => {
  const scanResults = await new AxeBuilder({ page })
    .include('.woocommerce')
    .include('#customer_login')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .disableRules(['region'])
    .analyze()
  expect(scanResults.violations.length).toBeGreaterThan(0)
})

test('test aria snapshot', async ({ page }) => {
  await expect(page.locator('body')).toMatchAriaSnapshot(`
    - navigation "Menu":
      - list:
        - listitem: Community 
        - listitem: Events 
        - listitem: Workshops 
        - listitem:
          - link "Courses "
        - listitem:
          - link "Membership "
        - listitem: About 
        - listitem:
          - link ""
    `)
})
