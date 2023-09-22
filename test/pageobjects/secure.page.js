const { $ } = require('@wdio/globals')
const { expect } = require('chai');

const Page = require('./page');

class SecurePage extends Page {
    get flashAlert () {
        return $('div[data-alert]');
    }

    get pageHeading () {
        return $('h2')
    }

    get logoutButton () {
        return $('=Logout')
    }

    async assertThePageUrl() {
        const expectedUrl = 'https://the-internet.herokuapp.com/secure';
        return super.assertThePageUrl(expectedUrl);
    }

    async assertFlashAlertIsDisplayed () {
        const flashAlert = await this.flashAlert;
        await this.assertElementIsDisplayed(flashAlert);
        const alertText = (await flashAlert.getText()).replace(/\n.*/g, '').trim();
        expect(alertText).to.equal('You logged into a secure area!');
    }

    async assertPageHeadingIsDisplayed () {
        const pageHeading = await this.pageHeading;
        await this.assertElementIsDisplayed(pageHeading);
    }

    async assertLogoutButtonIsDisplayedAndClickable () {
        const logoutButton = await this.logoutButton;

        await this.assertElementIsDisplayed(logoutButton);
        expect(await logoutButton.isClickable()).to.be.true;
    }

    async logout () {
        await (await this.logoutButton).click()
    }
}

module.exports = new SecurePage();
