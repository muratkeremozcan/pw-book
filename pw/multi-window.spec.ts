import { test } from '@playwright/test'

const email1 = 'ncrmeet1@yopmail.com'
const pw1 = 'Test@1234'

const email2 = 'lambdatestnew@yopmail.com'
const pw2 = 'Lambda123'

test('Multi window', async ({ browser }) => {
  // Define the URL pattern for the cookie consent script
  const cookieConsentScriptPattern = '**/cookie-consent.js'

  const firstContext = await browser.newContext()
  // Block consent script for the first context
  await firstContext.route(cookieConsentScriptPattern, (route) => route.abort())

  const firstPage = await firstContext.newPage()

  await firstPage.goto('https://automationexercise.com/login')
  await firstPage
    .locator('form')
    .filter({ hasText: 'Login' })
    .getByPlaceholder('Email Address')
    .fill(email1)
  await firstPage.getByPlaceholder('Password').fill(pw1)
  await firstPage.getByRole('button', { name: 'Login' }).click()

  const secondContext = await browser.newContext()
  // Block consent script for the second context
  await secondContext.route(cookieConsentScriptPattern, (route) =>
    route.abort()
  )

  const secondPage = await secondContext.newPage()
  await secondPage.goto(
    'https://ecommerce-playground.lambdatest.io/index.php?route=account/login'
  )
  await secondPage.getByPlaceholder('E-Mail Address').fill(email2)
  await secondPage.getByPlaceholder('Password').fill(pw2)
  await secondPage.getByRole('button', { name: 'Login' }).click()

  ////////
  firstPage.bringToFront()
  await firstPage.locator('//a[@href="/products"]').click()

  // observe pages (only in debug mode with npm run pw:open-debug)
  await firstPage.pause()
  await secondPage.pause()

  // clean up
  await firstPage.close()
  await secondPage.close()
})
