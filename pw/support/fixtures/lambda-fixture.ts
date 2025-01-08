import { test as base } from '@playwright/test'
import { ProductCartPage } from '../../pom-examples/classic/Pages/Product-Cart-Page'
import { HomePage } from '../../pom-examples/classic/Pages/Home-Page'
import { LoginPage } from '../../pom-examples/classic/Pages/Login-Page'
import { SearchPage } from '../../pom-examples/classic/Pages/Search-Page'
export { expect } from '@playwright/test'

type Methods = {
  HomePage: HomePage
  LoginPage: LoginPage
  ProductCartPage: ProductCartPage
  SearchPage: SearchPage
}

export const test = base.extend<Methods>({
  HomePage: async ({ page }, use) => {
    const homePageFn = new HomePage(page)
    await use(homePageFn)
  },

  LoginPage: async ({ page }, use) => {
    const loginPageFn = new LoginPage(page)
    await use(loginPageFn)
  },

  ProductCartPage: async ({ page }, use) => {
    const productCartPageFn = new ProductCartPage(page)
    await use(productCartPageFn)
  },

  SearchPage: async ({ page }, use) => {
    const searchPageFn = new SearchPage(page)
    await use(searchPageFn)
  }
})
