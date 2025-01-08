import { test } from './fixtures/talent-fixture'

test('Login test', async ({ LoginPage }) => {
  await LoginPage.openLoginPage()
  await LoginPage.loginIntoSite('applitoolsautomation@yopmail.com', 'Test@123')
  await LoginPage.homePageContent('Discover jobs')
  await LoginPage.logOutFromSite()
  await LoginPage.homePageContentAfterLogout('Opportunities favor the bold')
})
