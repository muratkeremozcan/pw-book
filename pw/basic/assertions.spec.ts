import { test, expect } from '@playwright/test'
test('hard assertions @regression', async ({ page }) => {
  await page.goto(
    'https://ecommerce-playground.lambdatest.io/index.php?route=account/register'
  )
  const cickPrivacyCheckbox = page.locator("//label[@for='input-agree']")
  await cickPrivacyCheckbox.click()

  //To be checked
  await expect(cickPrivacyCheckbox).toBeChecked()
  const firstName = page.locator("//input[@id='input-firstname']")

  //To be disabled
  await expect(firstName).not.toBeDisabled()
  const continueBtn = page.locator("input[value='Continue']")

  //To be Editable
  await expect(firstName).toBeEditable()

  //To be Enabled
  await expect(continueBtn).toBeEnabled()

  //To be Focused
  const focus = "//input[@id='input-firstname']"
  await page.locator(focus).focus()
  await expect(page.locator(focus)).toBeFocused()

  //To be Visible
  await expect(
    page.locator("aside[id='column-right'] a:nth-child(1)")
  ).toBeVisible()

  await continueBtn.click()

  //To Contain Text
  await expect(
    page.locator(
      "//div[contains(text(),'First Name must be between 1 and 32 characters!')]"
    )
  ).toContainText('First Name must be between 1 and 32 characters!')

  //To Have Attribute
  await expect(page.locator('#input-newsletter-no')).toHaveAttribute(
    'type',
    'radio'
  )

  //To Have Class
  await expect(page.locator('//h1')).toHaveClass('page-title h3')

  //To Have Count
  await expect(page.locator("//input[@class='form-control']")).toHaveCount(6)

  //To Have CSS
  await expect(page.locator('#input-firstname')).toHaveCSS('display', 'block')

  //To Have ID
  await expect(page.locator("//input[@name='firstname']")).toHaveId(
    'input-firstname'
  )

  //To Have Text
  await expect(page.locator("label[for='input-firstname']")).toHaveText(
    'First Name'
  )

  //To Have Value
  await expect(page.locator('#input-newsletter-yes')).toHaveValue('1')

  //To have Title
  await expect(page).toHaveTitle('Register Account')

  //To have URL
  await expect(page).toHaveURL(/register/)
})
test('Soft assertion Example @foo', async ({ page }) => {
  await page.goto(
    'https://ecommerce-playground.lambdatest.io/index.php?route=account/register'
  )
  await page.locator("input[value='Continue']").click()
  const warningMsg = page.locator(
    "//div[contains(text(),'First Name must be between 1 and 32 characters!')]"
  )

  test.fail() // the test is expected to fail (but don't fail it)
  await expect
    .soft(warningMsg)
    .toContainText('First Name must be between 1 and 33 characters!') // change to 33 and the next line still runs with soft assertion
  await expect(page).toHaveTitle('Register Account')
})

/*
other useful utilities / test annotations

test.skip()

test.fail() // the test is expected to fail (but don't fail it)

test.fixme() // a better skip, letting you know to come back to the skipped test

test.slow() // triples the test timeout



*/
