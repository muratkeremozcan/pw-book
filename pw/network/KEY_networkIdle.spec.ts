import { test, expect } from '@playwright/test'

test("mocks a fruit and doesn't call api", async ({ page }) => {
  //login and reach orders page
  await page.goto('https://rahulshettyacademy.com/client')
  await page.locator('#userEmail').fill('anshika@gmail.com')
  await page.locator('#userPassword').fill('Iamking@000')
  await page.locator("[value='Login']").click()
  await page.waitForLoadState('networkidle')
  await page.locator('.card-body b').first().waitFor()

  await page.locator("button[routerlink*='myorders']").click()

  await page.route(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
    (route) =>
      route.fulfill({
        // @ts-expect-error ok
        url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f88ww4b053f6765465b6'
      })
  )
  await page.locator("button:has-text('View')").first().click()
  await expect(page.locator('p').last()).toHaveText('Automation Practice')
})
