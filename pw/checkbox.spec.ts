import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto(
    'https://www.lambdatest.com/selenium-playground/checkbox-demo'
  )
})
test('LambdaTest Playground Example  ', async ({ page }) => {
  const checkbox = page.getByText('Click on check box')
  expect(await checkbox.isChecked()).toBeFalsy()

  await checkbox.click()
  expect(await checkbox.isChecked()).toBeTruthy()

  await checkbox.click()
  expect(await checkbox.isChecked()).toBeFalsy()
})

test('Multiple Check Box Example  ', async ({ page }) => {
  const checkbox = (n: number) => page.getByText(`Option ${n}`).first()

  // with await, you can't use forEach, need to use for await of
  // for...of loop allows you to write async/await code that executes sequential
  for (const n of [1, 2]) {
    expect(await checkbox(n).isChecked()).toBeFalsy()
    await checkbox(n).check()
    expect(await checkbox(n).isChecked()).toBeTruthy()
  }
})
