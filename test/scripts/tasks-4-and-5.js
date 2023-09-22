const { remote } = require("webdriverio");

(async () => {
    const browser = await remote({
        logLevel: "trace",
        capabilities: {
            browserName: "chrome"
        }
    })
    await browser.url("https://the-internet.herokuapp.com/checkboxes")

    const checkbox1 = await browser.$$("input[type=\"checkbox\"]")[0]
    const checkbox2 = await browser.$$("input[type=\"checkbox\"]")[1]

    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const clickCheckboxRandomly = async (checkbox) => {
        const clickCount = getRandomNumber(1, 10)

        for (let i = 0; i < clickCount; i++) {
            await checkbox.click()
        }
        console.log(`clicked the checkbox ${clickCount} times`)
    }

    const performRandomClicksOnCheckboxes = async () => {
        await clickCheckboxRandomly(checkbox1)
        await clickCheckboxRandomly(checkbox2)
    }

    await performRandomClicksOnCheckboxes()
    
    await browser.deleteSession()
})().catch((e) => console.error(e));

(async () => {
    const browser = await remote({
        logLevel: "trace",
        capabilities: {
            browserName: "chrome"
        }
    })
    await browser.url("https://the-internet.herokuapp.com/dropdown")

    const dropdown = await browser.$("#dropdown")
    const availableOptions = await browser.$$("option:not([disabled])")
    const optionsLength = availableOptions.length
    const randomOption = Math.floor(Math.random() * optionsLength)

    await dropdown.click()

    await availableOptions[randomOption].click()
    console.log(`Clicked on option ${randomOption + 1} - ${await availableOptions[randomOption].getText()}`)
    
    await browser.deleteSession()
})().catch((e) => console.error(e))
