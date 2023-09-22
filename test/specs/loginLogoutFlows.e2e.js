const LoginPage = require('../pageobjects/login.page')
const SecurePage = require('../pageobjects/secure.page')

describe('Login/Logout flows', () => {
    beforeEach(async () => {
        await LoginPage.open()
    })

    it('User should be able to login through the login form', async () => {
        await LoginPage.login('tomsmith', 'SuperSecretPassword!')
        await SecurePage.assertThePageUrl()
        await SecurePage.assertFlashAlertIsDisplayed()
        await SecurePage.assertPageHeadingIsDisplayed()
        await SecurePage.assertLogoutButtonIsDisplayedAndClickable()
    })

    it('User should be able to logout through the login form', async () => {
        await LoginPage.login('tomsmith', 'SuperSecretPassword!')
        await SecurePage.logout()
        await LoginPage.assertThePageUrl()
        await LoginPage.assertFlashAlertIsDisplayed()
    })
})

