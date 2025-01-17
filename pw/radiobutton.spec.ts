import { test, expect } from '@playwright/test'

test('LambdaTest Playground Example  ', async ({ page }) => {
  await page.goto(
    'https://www.lambdatest.com/selenium-playground/radiobutton-demo'
  )

  const radioButton = (label: string) => page.getByLabel(label).first()

  await radioButton('Male').click()
  expect(await radioButton('Male')).toBeChecked()

  await radioButton('Female').click()
  expect(await radioButton('Female')).toBeChecked()
  expect(await radioButton('Female').isChecked()).toBeTruthy() // same thing

  expect(await radioButton('Male')).not.toBeChecked()
  expect(await radioButton('Male').isChecked()).toBeFalsy() // same thing
})

// test burn
