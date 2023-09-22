const { expect } = require('chai');

const HoversPage = require('../pageobjects/hovers.page')
const UserPage = require('../pageobjects/userPage.page')

describe('Hovers page profiles', async () => {
    beforeEach(async () => {
        await HoversPage.open()
        await HoversPage.assertThePageUrl()
    })

    it(`'View Profile' button should not be displayed by default`, async () => {
        for (const btn of await HoversPage.viewProfileButtons) {
            expect(await btn.isDisplayed()).to.equal(false);
        }
        await HoversPage.hoverOverUserCard(0);
        expect(await HoversPage.viewProfileButtons[0].isDisplayed()).to.equal(true);
    })

    it(`'View Profile' button should be displayed for each profile on hover`, async () => {
        for (const [index, ] of (await HoversPage.userElements).entries()) {
            expect(await HoversPage.viewProfileButtons[index].isDisplayed()).to.equal(false);
            await HoversPage.hoverOverUserCard(index);
            expect(await HoversPage.viewProfileButtons[index].isDisplayed()).to.equal(true);
        }
    })

    it(`Can click 'View Profile' button for each profile`, async () => {
        const userElements = await HoversPage.userElements;

        for (const [index, ] of userElements.entries()) {
            const viewProfileBtn = await userElements[index].$('a');
            const expectedPath = await viewProfileBtn.getAttribute('href');
            
            await HoversPage.hoverOverUserCard(index);
            await viewProfileBtn.waitForDisplayed();
            await viewProfileBtn.click();
            await UserPage.assertThePageUrl(expectedPath);

            await browser.url('https://the-internet.herokuapp.com/hovers');
        }
    })
})