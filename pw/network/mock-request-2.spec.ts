import { test, expect } from '@playwright/test'

test("mocks a fruit and doesn't call api", async ({ page }) => {
  await page.route('*/**/api/v1/fruits', (route) =>
    route.fulfill({
      json: [
        { name: 'Lucuma', id: 11 },
        { name: 'Guava', id: 12 },
        { name: 'Kiwi', id: 13 },
        { name: 'Peach', id: 14 },
        { name: 'Fig', id: 15 }
      ]
    })
  )

  await page.goto('https://demo.playwright.dev/api-mocking')
  await expect(page.getByText('Guava')).toBeVisible()
})
