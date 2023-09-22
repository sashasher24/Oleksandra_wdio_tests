const { assert } = require('chai')

const TablesPage = require('../pageobjects/tables.page')

describe('Tables page tests', async () => {
    const sortOrders = ['asc', 'desc']
    beforeEach(async () => {
        await TablesPage.open()
        await TablesPage.assertThePageUrl()
    })

    it(`The table should be displayed`, async () => {
        const isDisplayed = await TablesPage.table.isDisplayed();
        assert.isTrue(isDisplayed, 'Table is not displayed');
    })

    it('Table column`s headers should be clickable', async () => {
        const headers = await TablesPage.tableColumnHeaders;
    
        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            const isClickable = await header.isDisplayed() && await header.isEnabled();
            const errorMessage = `Column header at index ${i} with text "${await header.getText()}" is not clickable.`
            
            if (!isClickable) {
                console.error(errorMessage);
            }

            assert.isTrue(isClickable, errorMessage);
        }
    })

    sortOrders.forEach(order => {
        it(`User should be able to sort the table by each column in ${order} order`, async () => {
            const columnsNames = await TablesPage.getTableColumnsNames()
            for(const [index, name] of columnsNames.entries()) {
                await TablesPage.getTableColumnValues(index)
                await TablesPage.sortTableByColumnIndex(index, order, name)
            }
        })
    });
})