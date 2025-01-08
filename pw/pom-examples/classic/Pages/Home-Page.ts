import type { Page, Locator } from '@playwright/test'
import { expect } from '@playwright/test'

export class HomePage {
  constructor(
    private page: Page,
    public myAccountLink: Locator = page.locator('text=My Account')
  ) {}

  async verifyUserLoggedIn(content: string) {
    const homePageTextAfterLogin = await this.page
      .getByText('Change your password')
      .textContent()
    expect(homePageTextAfterLogin).toContain(content)
  }
}
