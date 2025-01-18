import { test, expect } from '@playwright/test'

test('Iframe', async ({ page }) => {
  await page.goto('https://www.lambdatest.com/selenium-playground/iframe-demo/')

  const textArea = await page
    .frameLocator('[src="./contant"]')
    .locator('//div[@class="rsw-ce"]')
  await textArea.fill('foo')
  await expect(textArea).toHaveText('foo')
})
