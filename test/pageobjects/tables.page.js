const { $, $$ } = require("@wdio/globals")
const { expect } = require("chai")

const Page = require("./page")

class TablesPage extends Page {
    get table () {
        return $("#table1")
    }

    get tableColumnHeaders () {
        return $("#table1").$$("th")
    }

    get editButtons () {
        return $$("a[href*=\"edit\"]")
    }

    get deleteButtons () {
        return $$("a[href*=\"delete\"]")
    }

    open () {
        return super.open("tables")
    }

    async assertThePageUrl() {
        const expectedPath = "/tables"
        return super.assertThePageUrl(expectedPath)
    }

    async getTableColumnValues (columnIndex) {
        const tableColumnValues = []
    
        const tableBody = await $$("table")[0].$("tbody")

        for(const row of await tableBody.$$("tr")) {
            tableColumnValues.push(await row.$$("td")[columnIndex].getText())
        }

        return tableColumnValues
    }

    async getTableColumnsNames () {
        const names = []

        const tableHeader = await $$("table")[0].$("thead")
        for(const head of await tableHeader.$$("th")) {
            names.push(await head.getText())
        }

        return names
    }

    // order = 'asc' | 'desc'
    async sortTableByColumnIndex (index, order, name) {
        let expectedColumnValues = await this.getTableColumnValues(index)

        if(name === "Due") {
            expectedColumnValues.sort((a, b) => {
                const numA = parseFloat(a.replace("$", ""))
                const numB = parseFloat(b.replace("$", ""))
                
                return numA - numB
            })
        } else {
            expectedColumnValues.sort((a, b) => a.localeCompare(b))
        }

        if(order === "asc") {
            await this.tableColumnHeaders[index].click()
        } else {
            expectedColumnValues = expectedColumnValues.reverse()
            await this.tableColumnHeaders[index].doubleClick()
        }

        const actualColumnValues = await this.getTableColumnValues(index)
        console.log("exp: ", expectedColumnValues)
        console.log("act: ", actualColumnValues)

        expect(expectedColumnValues).to.deep.equal(actualColumnValues)
    }
}

module.exports = new TablesPage()
