import { test } from '../../support/fixtures/all-fixtures'
import testData from '../classic/testData/testData.json'

test('Login and Navigate to My Account', async ({
  LoginPage,
  HomePage,
  ProductCartPage,
  SearchPage,
  page
}) => {
  await page.goto(
    'https://ecommerce-playground.lambdatest.io/index.php?route=account/login'
  )

  await LoginPage.enterEmail(testData.data[0].email)
  await LoginPage.enterPassword(testData.data[0].password)
  await LoginPage.clickLoginButton()

  // Validate user logged-in and Can Add/Delete the Product
  await HomePage.verifyUserLoggedIn(testData.data[0].homePageMessage)
  await SearchPage.selectTheCategory()
  await SearchPage.searchForTheProduct(testData.data[0].searchProduct)
  await ProductCartPage.addProductIntoCart(testData.data[0].addProductMessage)
  await ProductCartPage.removeProductIntoCart()
})
