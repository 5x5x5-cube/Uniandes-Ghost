class LoginPageObject {
    loginPage = "/ghost/#/signin";

    constructor(driver) {
        this.driver = driver;
        this.loginPage = this.driver.baseUrl + this.loginPage;
    }

    async navigateToLogin() {
        await this.driver.url(this.loginPage);
        return await this.driver.pause(2000);
    }

    async setEmail(email) {
        const element = await this.driver.$('input[name="identification"]');
        return await element.setValue(email);
    }

    async setPassword(password) {
        const element = await this.driver.$('input[name="password"]');
        return await element.setValue(password);
    }

    async clickSignIn() {
        const element = await this.driver.$('button[type="submit"]');
        return await element.click();
    }

    async getErrorMessage() {
        const element = await this.driver.$(".main-error");
        return await element.getText();
    }

    async getRetryButton() {
        const element = await this.driver.$("#ember5 > span");
        return await element.getText();
    }

    async loginAs(email, password) {
        await this.navigateToLogin();
        await this.setEmail(email);
        await this.setPassword(password);
        await this.clickSignIn();
        return await this.driver.pause(2000);
    }
}

module.exports = { LoginPageObject };
