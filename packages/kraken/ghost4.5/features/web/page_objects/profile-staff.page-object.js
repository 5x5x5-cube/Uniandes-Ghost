class ProfileStaffPageObject {
    
    constructor(driver) {
        this.driver = driver;
    }


    async clickProfile() {
        const element = await this.driver.$(".gh-badge.owner");
        return await element.click();
    }

    async clickSave() {
        const element = await this.driver.$(".gh-btn.gh-btn-primary.gh-btn-icon.ember-view");
        return await element.click();
    }

    async getOwnerSection() {
        const element = await this.driver.$(".gh-btn.gh-btn-default.user-cover-edit > span");
        return await element.getText();
    }

    async getName() {
        const element = await this.driver.$(
            '.gh-canvas-title'
        );
        return await element.getText();
    }

    async setName(name) {
        const element = await this.driver.$(
            '.user-name.ember-text-field.gh-input.ember-view'
        );
        await element.clearValue();
        return await element.setValue(name);
    }

}

module.exports = { ProfileStaffPageObject };
