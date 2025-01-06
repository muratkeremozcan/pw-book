import { test } from '@playwright/test'

test('Handling Shadow DOM', async ({ page }) => {
  await page.goto('https://www.lambdatest.com/selenium-playground/shadow-dom')

  await page.locator('input[name="username"]').fill('Murat')
  await page
    .locator('shadow-signup-form input[name="email"]')
    .fill('test@qaautomationlabs.com')

  await page.locator('input[name="password"]').fill('qa@!test')
  await page.locator('input[name="confirm_password"]').fill('qa@!test')

  await page.getByRole('button', { name: 'Submit' }).click()
})
