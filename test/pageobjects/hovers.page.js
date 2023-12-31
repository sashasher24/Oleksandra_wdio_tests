const { $, $$ } = require("@wdio/globals")
const { browser } = require("@wdio/globals")

const Page = require("./page")

class HoversPage extends Page {
    get userElements () {
        return $$(".figure")
    }

    get viewProfileButtons () {
        return $$("div.figure a[href^=\"/users/\"]")
    }

    get viewProfileButton () {
        return $("=View profile")
    }

    open () {
        return super.open("hovers")
    }

    async assertThePageUrl() {
        const expectedPath = "/hovers"
        return super.assertThePageUrl(expectedPath)
    }

    async hoverOverUserCard (index) {
        await browser.pause(1000)
        await this.userElements[index].moveTo()
    }
}

module.exports = new HoversPage()
