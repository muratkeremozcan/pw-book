import { test, expect } from '@playwright/test'

test('Nested iframe ', async ({ page }) => {
  await page.goto(
    'https://www.lambdatest.com/selenium-playground/nested-frames/'
  )

  // nested iframe
  const bottomFrame = page.frameLocator('[name="frame-bottom"]')

  const middleFrame = bottomFrame.frameLocator('[name="frame-middle"]')
  const rightFrame = bottomFrame.frameLocator('[name="frame-right"]')
  const leftFrame = bottomFrame.frameLocator('[name="frame-left"]')

  // with nested calls, await in the beginning
  await expect(middleFrame.locator('body')).toHaveText('Middle')
  await expect(rightFrame.locator('body')).toHaveText('Right')
  await expect(leftFrame.locator('body')).toHaveText('Left')

  /////////////

  // single iframe
  const topFrame = page.frameLocator('[name="frame-top"]')

  expect(await topFrame.locator('body')).toHaveText('Top')
})
