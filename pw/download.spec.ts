import { test, expect } from '@playwright/test'
import fs from 'node:fs'

test('Download a Single file ', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/download')

  // it is like compose order
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('text=LambdaTest.txt').click()
  ])

  // save the file to a directory
  const fileName = download.suggestedFilename()
  const filePath = `downloads/${fileName}`

  await download.saveAs(filePath)
  expect(await fs.existsSync(filePath)).toBeTruthy()

  // check the file content
  const fileContent = fs.readFileSync(filePath, 'utf8')

  let parsedContent
  try {
    parsedContent = JSON.parse(fileContent)
  } catch (err) {
    throw new Error('Failed to parse JSON content of the file')
  }

  expect(Array.isArray(parsedContent)).toBeTruthy()
  // Perform additional checks on the array of objects
  expect(parsedContent.length).toBeGreaterThan(0)
  parsedContent.forEach((item) => {
    expect(item).toHaveProperty('_id')
    expect(item).toHaveProperty('request')
    expect(item.request).toHaveProperty('url')
    expect(item).toHaveProperty('response')
    expect(item.response).toHaveProperty('status')
  })
})
