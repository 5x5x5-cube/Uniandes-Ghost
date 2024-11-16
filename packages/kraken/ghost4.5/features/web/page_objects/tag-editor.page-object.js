const { faker } = require("@faker-js/faker");

class TagEditorPageObject {
    tagEditorPage = "/ghost/#/tags/new";

    constructor(driver) {
        this.driver = driver;
        this.tagEditorPage = this.driver.baseUrl + this.tagEditorPage;
    }

    async navigateToTagEditorPage() {
        await this.driver.url(this.tagEditorPage);
        return await this.driver.pause(1000);
    }

    async createTag(name) {
        await this.setName(name);
        return await this.saveChanges();
    }

    async setName(name) {
        const element = await this.driver.$(
            '#tag-name'
        );
        await element.setValue(name);
        return await this.driver.pause(1000);
    }

    async saveChanges() {
        const element = await this.driver.$('.gh-btn.gh-btn-primary.gh-btn-icon.ember-view');
        await element.click();
        return await this.driver.pause(1000);
    }

    async clickTagViewLink() {
        const element = await this.driver.$(".gh-view-tag-link");
        await element.click();
        return await this.driver.pause(1000);
    }

    async exitEditor() {
        const element = await this.driver.$('a[href="#/dashboard/"]');
        await element.click();
        return await this.driver.pause(1000);
    }
}

module.exports = { TagEditorPageObject };
