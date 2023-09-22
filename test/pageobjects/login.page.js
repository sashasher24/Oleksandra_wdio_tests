const { $ } = require('@wdio/globals')
const { expect } = require('chai');

const Page = require('./page');

class LoginPage extends Page {
    get inputUsername () {
        return $('input[name="username"]');
    }

    get inputPassword () {
        return $('input[name="password"]');
    }

    get btnSubmit () {
        return $('button[type="submit"]');
    }

    get flashAlert () {
        return $('div[data-alert]');
    }

    async login (username, password) {
        const inputUsername = await this.inputUsername;
        const inputPassword = await this.inputPassword;
        const btnSubmit = await this.btnSubmit;

        await this.assertElementIsDisplayed(inputUsername);
        await this.assertElementIsDisplayed(inputPassword);
        await this.assertElementIsDisplayed(btnSubmit);

        await inputUsername.setValue(username);
        await inputPassword.setValue(password);
        await btnSubmit.click();
    }

    open () {
        return super.open('login');
    }

    async assertThePageUrl() {
        const expectedUrl = 'https://the-internet.herokuapp.com/login';
        return super.assertThePageUrl(expectedUrl);
    }

    async assertFlashAlertIsDisplayed () {
        const flashAlert = await this.flashAlert;
        await this.assertElementIsDisplayed(flashAlert);
        const alertText = (await flashAlert.getText()).replace(/\n.*/g, '').trim();
        expect(alertText).to.equal('You logged out of the secure area!');
    }
}

module.exports = new LoginPage();
