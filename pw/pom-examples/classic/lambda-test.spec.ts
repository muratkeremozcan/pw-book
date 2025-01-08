import { test } from '@playwright/test'
import { LoginPage } from './Pages/Login-Page'
import { HomePage } from './Pages/Home-Page'
import { SearchPage } from './Pages/Search-Page'
import { ProductCartPage } from './Pages/Product-Cart-Page'

import testData from './testData/testData.json'

test('Login and Navigate to My Account', async ({ page }) => {
  const Login = new LoginPage(page)
  const Home = new HomePage(page)
  const Search = new SearchPage(page)
  const ProductCart = new ProductCartPage(page)

  await page.goto(
    'https://ecommerce-playground.lambdatest.io/index.php?route=account/login'
  )

  await Login.enterEmail(testData.data[0].email)
  await Login.enterPassword(testData.data[0].password)
  await Login.clickLoginButton()

  // Validate user logged-in and Can Add/Delete the Product
  await Home.verifyUserLoggedIn(testData.data[0].homePageMessage)
  await Search.selectTheCategory()
  await Search.searchForTheProduct(testData.data[0].searchProduct)
  await ProductCart.addProductIntoCart(testData.data[0].addProductMessage)
  // await ProductCart.removeProductIntoCart()
})
