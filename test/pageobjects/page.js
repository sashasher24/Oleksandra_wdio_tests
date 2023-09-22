const { browser } = require('@wdio/globals')
const { expect } = require('chai');

module.exports = class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        return browser.url(`https://the-internet.herokuapp.com/${path}`)
    }

    async assertThePageUrl(expectedUrl) {
        const currentUrl = await browser.getUrl();
        expect(currentUrl).to.equal(expectedUrl);
    }

    async assertElementIsDisplayed(element) {
        expect(await element.isDisplayed()).to.be.true;
    }
}
