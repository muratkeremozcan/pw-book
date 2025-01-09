import { test, expect } from '@playwright/test'
import fs from 'node:fs'

test('Download Multiple files', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/download')

  // Select the first two file links dynamically
  const fileLinks = await page.locator('.example a').elementHandles()

  // Get the first two elements' text content
  const filesToDownload = await Promise.all(
    fileLinks.slice(0, 2).map((fileLink) => fileLink.textContent())
  )

  for (const fileName of filesToDownload) {
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator(`text=${fileName}`).click()
    ])

    // save the file to a directory
    const suggestedFileName = download.suggestedFilename()
    const filePath = 'downloads/' + suggestedFileName
    await download.saveAs(filePath)

    expect(fs.existsSync(filePath)).toBeTruthy()
  }
})
