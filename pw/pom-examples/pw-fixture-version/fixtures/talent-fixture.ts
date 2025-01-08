import { test as base } from '@playwright/test'
import { LoginPage } from '../../classic/Pages/Login-Page-Talent-500'

type Methods = {
  LoginPage: LoginPage
}

export const test = base.extend<Methods>({
  LoginPage: async ({ page }, use) => {
    const loginPageFn = new LoginPage(page)
    await use(loginPageFn)
  }
})

export { expect } from '@playwright/test'
