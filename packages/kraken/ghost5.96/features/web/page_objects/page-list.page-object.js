const { faker } = require("@faker-js/faker");

class PageListPageObject {
    pageListPage = "/ghost/#/pages";

    constructor(driver) {
        this.driver = driver;
        this.pageListPage = this.driver.baseUrl + this.pageListPage;
    }

    async navigateToPublisedPageList() {
        await this.driver.url(`${this.pageListPage}?type=published`);
        return await this.driver.pause(1000);
    }

    async clickPageFromList(title) {
        const elements = await this.driver.$$(".posts-list .gh-list-row");

        for (let element of elements) {
            const titleElement = await element.$(".gh-content-entry-title");
            const text = await titleElement.getText();
            if (text.includes(title)) {
                return await element.click();
            }
        }
    }

    async closePublishedPageModal() {
        const element = await this.driver.$(
            'button[data-test-button="close-publish-flow"]'
        );
        await element.click();
        await this.driver.pause(1000);
    }
}

module.exports = { PageListPageObject };
