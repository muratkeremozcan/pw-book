import { test } from '@playwright/test'
import { LoginPage } from './Pages/Login-Page-Talent-500'

test('Login test', async ({ page }) => {
  const Login = new LoginPage(page)

  await Login.openLoginPage()
  await Login.loginIntoSite('applitoolsautomation@yopmail.com', 'Test@123')
  await Login.homePageContent('Discover jobs')
  await Login.logOutFromSite()
  await Login.homePageContentAfterLogout('Opportunities favor the bold')
})
