import { test, expect } from '@playwright/test'

test('Search the text HTC Touch HD', async ({ page }) => {
  test.skip()
  const productName = 'HTC Touch HD'
  await page.goto('https://ecommerce-playground.lambdatest.io/')

  await page.locator('span.title', { hasText: 'Mega Menu' }).hover()
  await page.locator('a[title=Desktop]').click()

  await page
    .locator(`div.carousel-item.active > img[title='${productName}']`)
    .click()

  await page.getByRole('button', { name: 'Add to Cart' }).click()

  await page
    .locator('a.btn.btn-primary.btn-block', { hasText: 'View Cart' })
    .click()

  await expect(
    page.locator('td.text-left', { hasText: productName })
  ).toBeVisible()
  await expect(page.locator("div[class$='flex-nowrap'] > input")).toHaveValue(
    '1'
  )
})
