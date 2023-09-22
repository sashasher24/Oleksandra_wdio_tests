const { expect } = require('chai');

const Page = require('./page');

class UserPage extends Page {
    async assertThePageUrl(expectedPath) {
        const expectedUrl = `https://the-internet.herokuapp.com${expectedPath}`;
        return super.assertThePageUrl(expectedUrl);
    }
}

module.exports = new UserPage();
