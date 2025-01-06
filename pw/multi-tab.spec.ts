import { test, expect } from '@playwright/test'

test('Multi tab', async ({ context }) => {
  const page = await context.newPage()
  await page.goto('https://the-internet.herokuapp.com/windows')

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    await page.locator('//a[normalize-space()="Click Here"]').click()
  ])

  await newPage.waitForLoadState()
  expect(await newPage.title()).toBe('New Window')

  await newPage.close()
  expect(await page.title()).toBe('The Internet')
})
