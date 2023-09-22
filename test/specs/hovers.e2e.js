const { expect } = require("chai")
const { browser } = require("@wdio/globals")

const { BASE_URL } = require("../../utils/constants")

const HoversPage = require("../pageobjects/hovers.page")
const UserPage = require("../pageobjects/userPage.page")

describe("Hovers page profiles", async () => {
    beforeEach(async () => {
        await HoversPage.open()
        await HoversPage.assertThePageUrl()
    })

    it("'View Profile' button should be displayed for each profile on hover", async () => {
        for (const [index, ] of (await HoversPage.userElements).entries()) {
            expect(await HoversPage.viewProfileButtons[index].isDisplayed()).to.equal(false)
            await HoversPage.hoverOverUserCard(index)
            expect(await HoversPage.viewProfileButtons[index].isDisplayed()).to.equal(true)
        }
    })

    it("Can click 'View Profile' button for each profile", async () => {
        const userElements = await HoversPage.userElements

        for (const [index, ] of userElements.entries()) {
            const viewProfileBtn = await userElements[index].$("a")
            const expectedPath = await viewProfileBtn.getAttribute("href")
            
            await HoversPage.hoverOverUserCard(index)
            await viewProfileBtn.waitForDisplayed()
            await viewProfileBtn.click()
            await UserPage.assertThePageUrl(expectedPath)

            await browser.url(`${BASE_URL}/hovers`)
        }
    })
})