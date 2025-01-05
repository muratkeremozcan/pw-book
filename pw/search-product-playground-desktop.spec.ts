import { test, expect } from '@playwright/test'

test('LambdaTest Playground Example  ', async ({ page }) => {
  await page.goto(
    'https://www.lambdatest.com/selenium-playground/simple-form-demo'
  )
  await expect(page.getByText('Single Input Field')).toBeVisible()
  await expect(
    page.getByText('Single Input Field', { exact: true })
  ).toBeVisible()

  await page.getByPlaceholder('Please enter first value').fill('1')
  await page.getByPlaceholder('Please enter second value').fill('2')
  await expect(page.getByRole('button', { name: 'Get Sum' })).toBeVisible()

  await page.getByRole('button', { name: 'Get Sum' }).click()
  await expect(page.locator('#addmessage')).toHaveText('3')
})
