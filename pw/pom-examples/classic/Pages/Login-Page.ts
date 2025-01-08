import type { Page } from '@playwright/test'

export class LoginPage {
  constructor(
    private page: Page,
    public emailInput = page.locator('#input-email'),
    public passwordInput = page.locator('#input-password'),
    public loginButton = page.locator('//input[@value="Login"]')
  ) {}

  async enterEmail(email) {
    await this.emailInput.fill(email)
  }
  async enterPassword(password) {
    await this.passwordInput.fill(password)
  }
  async clickLoginButton() {
    await this.loginButton.click()
  }
}
