import { expect } from '@playwright/test'
import type { Page } from '@playwright/test'

export class LoginPage {
  constructor(
    private page: Page,
    public usernameField = page.getByPlaceholder('Email'),
    public passwordField = page.getByPlaceholder('Password'),
    public loginButton = page.locator('[data-id="submit-login-btn"]'),
    public dropDown = page.locator('[alt="DropDown Button"]'),
    public logOut = page.locator('[data-id="nav-dropdown-logout"]')
  ) {}
  openLoginPage = () => this.page.goto('https://talent500.co/auth/signin')

  async loginIntoSite(username: string, password: string) {
    await this.usernameField.fill(username)
    await this.passwordField.fill(password)
    await this.loginButton.click()
  }

  async homePageContent(content: string) {
    const text = await this.page
      .locator('//a[contains(text(),"Discover jobs")]')
      .textContent()
    expect(text).toContain(content)
  }

  async logOutFromSite() {
    await this.dropDown.click()
    await this.logOut.click()
  }

  async homePageContentAfterLogout(content: string) {
    const homePageTextAfterLogout = await this.page
      .locator('//h2[normalize-space()="Opportunities favor the bold"]')
      .textContent()
    expect(homePageTextAfterLogout).toContain(content)
  }
}
