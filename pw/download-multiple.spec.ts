import { test, expect } from '@playwright/test'
import isCi from 'is-ci'
import fs from 'node:fs'

test('Download Multiple files', async ({ page }) => {
  if (isCi) test.skip()

  await page.goto('https://the-internet.herokuapp.com/download')

  const downloadFiles = ['TestData.xlsx', 'dummy.txt']

  for (const fileName of downloadFiles) {
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
