import { test, expect } from '@playwright/test'

test('LambdaTest Playground Example  ', async ({ page }) => {
  await page.goto(
    'https://www.lambdatest.com/selenium-playground/simple-form-demo'
  )
  await expect(page.getByText('Single Input Field')).toBeVisible()
  expect(
    await page.getByText('Single Input Field', { exact: true })
  ).toBeVisible()

  await page.getByPlaceholder('Please enter first value').fill('1')
  await page.getByPlaceholder('Please enter second value').fill('2')
  expect(page.getByRole('button', { name: 'Get Sum' })).toBeVisible()

  await page.getByRole('button', { name: 'Get Sum' }).click()
  expect(await page.locator('#addmessage')).toHaveText('3')
})
