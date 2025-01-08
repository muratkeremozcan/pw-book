import { test, expect } from '@playwright/test'

test('Modify API responses ', async ({ page }) => {
  await page.route('*/**/api/v1/fruits', async (route) => {
    // Get the response and add to it
    const response = await route.fetch()
    const json = await response.json()
    json.push(
      { name: 'Dragon fruit', id: 11 },
      { name: 'Apple', id: 12 },
      { name: 'Mango', id: 13 }
    )
    // Fulfill using the original response, while patching the response body
    // with the given JSON object.
    await route.fulfill({ response, json })
  })

  await page.goto('https://demo.playwright.dev/api-mocking')
  await expect(page.getByText('Dragon fruit', { exact: true })).toBeVisible()
})
