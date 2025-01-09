import { test, type BrowserContext } from '@playwright/test'

const email1 = 'ncrmeet1@yopmail.com'
const pw1 = 'Test@1234'

const email2 = 'lambdatestnew@yopmail.com'
const pw2 = 'Lambda123'

const domain1 = 'automationexercise.com'
const domain2 = 'ecommerce-playground.lambdatest.io'

// Utility function to set cookie consent
async function giveCookieConsent(context: BrowserContext, domainName: string) {
  const cookies = [
    {
      name: 'CookieConsentClosed',
      value: 'accepted',
      domain: domainName,
      path: '/',
      expires: Math.floor(Date.now() / 1000) + 3600, // Expiration in seconds (1 hour)
      httpOnly: false,
      secure: true
    }
  ]
  await context.addCookies(cookies)
}

test('Multi window', async ({ browser }) => {
  // First context with cookie consent
  const firstContext = await browser.newContext()
  await giveCookieConsent(firstContext, domain1) // Set consent for the first domain
  const firstPage = await firstContext.newPage()

  await firstPage.goto('https://automationexercise.com/login')
  await firstPage
    .locator('form')
    .filter({ hasText: 'Login' })
    .getByPlaceholder('Email Address')
    .fill(email1)
  await firstPage.getByPlaceholder('Password').fill(pw1)
  await firstPage.getByRole('button', { name: 'Login' }).click()

  // Second context with cookie consent
  const secondContext = await browser.newContext()
  await giveCookieConsent(secondContext, domain2) // Set consent for the second domain
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

  // Observe pages (only in debug mode with npm run pw:open-debug)
  await firstPage.pause()
  await secondPage.pause()

  // Clean up
  await firstPage.close()
  await secondPage.close()
})
