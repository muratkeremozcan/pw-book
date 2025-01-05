import { test, expect } from '@playwright/test'

test.beforeEach(({ page }) =>
  page.goto('https://www.lambdatest.com/selenium-playground/drag-and-drop-demo')
)

test('drag and drop method 1', async ({ page }) => {
  const drag = page.locator("//span[normalize-space()='Draggable 1']")
  const drop = page.locator('#mydropzone')

  await drag.hover()
  await page.mouse.down()
  await drop.hover()
  await page.mouse.up()

  await expect(
    page.locator('#droppedlist', { hasText: 'Draggable 1' })
  ).toBeVisible()
})

test('drag and drop method 2', async ({ page }) => {
  const dragElement = page.locator("//span[normalize-space()='Draggable 2']")
  const dropArea = page.locator('#mydropzone')

  await dragElement.dragTo(dropArea)

  await expect(
    page.locator('#droppedlist', { hasText: 'Draggable 2' })
  ).toBeVisible()
})
