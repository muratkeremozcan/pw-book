import { test, expect, Page } from '@playwright/test'

test.describe('Example to demonstrate handling the various Alert in Playwright', () => {
  const button = (page: Page, text: string) =>
    page.locator('p').filter({ hasText: text }).getByRole('button')

  test.beforeEach(({ page }) =>
    page.goto(
      'https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo'
    )
  )

  test('Handling JS Alert - Standard Alert', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(await dialog.message()).toEqual('I am an alert box!')
      await dialog.accept()
    })

    await button(page, 'JavaScript AlertsClick Me').click()
  })

  test('Confirm Alert + Cancel', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(await dialog.message()).toEqual('Press a button!')
      await dialog.dismiss()
    })

    await button(page, 'Confirm box:Click Me').click()
    await page.getByText('You pressed Cancel!').waitFor()
  })

  test('Confirm Alert + Ok', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(await dialog.message()).toEqual('Press a button!')
      await dialog.accept()
    })

    await button(page, 'Confirm box:Click Me').click()
    await page.getByText('You pressed OK!').waitFor()
  })

  test('Enter Data in Input text in prompt:', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(await dialog.message()).toEqual('Please enter your name')
      await dialog.accept('LambdaTest')
    })

    await button(page, 'Prompt box:Click Me').click()
    await page.getByText("You have entered 'LambdaTest' !").waitFor()
  })
})
