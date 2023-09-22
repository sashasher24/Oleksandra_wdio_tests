const { browser } = require("@wdio/globals")
const { expect } = require("chai")

const { BASE_URL } = require("../../utils/constants")

module.exports = class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        return browser.url(`${BASE_URL}/${path}`)
    }

    async assertThePageUrl(expectedPath) {
        const currentUrl = await browser.getUrl()
        expect(currentUrl).to.equal(`${BASE_URL}${expectedPath}`)
    }

    async assertElementIsDisplayed(element) {
        expect(await element.isDisplayed()).to.be.true
    }
}
