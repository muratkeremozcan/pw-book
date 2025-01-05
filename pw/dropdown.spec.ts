import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto(
    'https://www.lambdatest.com/selenium-playground/select-dropdown-demo'
  )
})

test('LambdaTest Playground Example  ', async ({ page }) => {
  const dropdown = page.locator('#select-demo')

  await dropdown.click()

  // 5 ways to select dropdown items

  await dropdown.selectOption('Monday')

  await dropdown.selectOption({ index: 2 })

  await dropdown.selectOption({ value: 'Wednesday' })

  await dropdown.selectOption({ label: 'Thursday' })

  await page.selectOption('#select-demo', 'Friday')
})

test('LambdaTest Playground Example multi-select', async ({ page }) => {
  // 2 ways to do it
  await page.selectOption('#multi-select', ['Pennsylvania', 'Texas', 'Florida'])

  await page.locator('#multi-select').selectOption(['Ohio', 'Texas', 'Florida'])
})
