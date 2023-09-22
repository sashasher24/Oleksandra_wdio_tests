const Page = require("./page")

class UserPage extends Page {
    async assertThePageUrl(expectedPath) {
        return super.assertThePageUrl(expectedPath)
    }
}

module.exports = new UserPage()
