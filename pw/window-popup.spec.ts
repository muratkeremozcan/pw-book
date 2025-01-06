import { test, expect } from '@playwright/test'

test('Click on Twitter Button to open Window Based Popup ', async ({
  page
}) => {
  await page.goto(
    'https://www.lambdatest.com/selenium-playground/window-popup-modal-demo'
  )
  const [windowPopup] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator("[title='Follow @Lambdatesting on Twitter']").click()
  ])

  await windowPopup.waitForLoadState()
  expect(await windowPopup.title()).toBe('Profile / X')

  windowPopup.close()
  expect(await page.title()).toBe(
    'Selenium Grid Online | Run Selenium Test On Cloud'
  )
})

test('Click on Facebook Button to open Window Based Popup ', async ({
  page
}) => {
  await page.goto(
    'https://www.lambdatest.com/selenium-playground/window-popup-modal-demo'
  )
  const [windowPopup] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator("[title='Follow @Lambdatesting on Facebook']").click()
  ])
  await windowPopup.waitForLoadState()

  expect(await windowPopup.title()).toBe('LambdaTest | Facebook')

  windowPopup.close()
  expect(await page.title()).toBe(
    'Selenium Grid Online | Run Selenium Test On Cloud'
  )
})
