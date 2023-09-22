const { assert, expect } = require("chai")

const TablesPage = require("../pageobjects/tables.page")

describe("Tables page tests", async () => {
    const sortOrders = ["asc", "desc"]
    
    beforeEach(async () => {
        await TablesPage.open()
        await TablesPage.assertThePageUrl()
    })

    it("The table should be displayed", async () => {
        const isDisplayed = await TablesPage.table.isDisplayed()
        assert.isTrue(isDisplayed, "Table is not displayed")
    })

    it("Table column`s headers should be clickable", async () => {
        const headers = await TablesPage.tableColumnHeaders
    
        for (let i = 0; i < headers.length; i++) {
            const header = headers[i]
            const isClickable = await header.isDisplayed() && await header.isEnabled()
            const errorMessage = `Column header at index ${i} with text "${await header.getText()}" is not clickable.`
            
            if (!isClickable) {
                console.error(errorMessage)
            }

            assert.isTrue(isClickable, errorMessage)
        }
    })

    it("`Edit` buttons should be clickable", async () => {
        const buttons = await TablesPage.editButtons

        for(const [index, button] of buttons.entries()) {
            const isClickable = await button.isDisplayed() && await button.isEnabled()
            assert.isTrue(isClickable, `Edit button #${index + 1} is not clickable`)
        }
    })

    it("`Delete` buttons should be clickable", async () => {
        const buttons = await TablesPage.deleteButtons

        for(const [index, button] of buttons.entries()) {
            const isClickable = await button.isDisplayed() && await button.isEnabled()
            assert.isTrue(isClickable, `Delete button #${index + 1} is not clickable`)
        }
    })

    it("Headers have correct values", async () => {
        const expectedHeaders = ["Last Name", "First Name", "Email", "Due", "Web Site", "Action"]
        const actualHeaders = await TablesPage.getTableColumnsNames()

        expect(actualHeaders).to.eql(expectedHeaders)
    })

    sortOrders.forEach(order => {
        it(`User should be able to sort the table by each column in ${order} order`, async () => {
            const columnsNames = await TablesPage.getTableColumnsNames()
            for(const [index, name] of columnsNames.entries()) {
                await TablesPage.getTableColumnValues(index)
                await TablesPage.sortTableByColumnIndex(index, order, name)
            }
        })
    })
})