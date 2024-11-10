const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");

When("I close the page published modal", async function () {
    return await this.pageListPageObject.closePublishedPageModal();
});

When("I navigate to the publised pages page", async function () {
    return await this.pageListPageObject.navigateToPublisedPageList();
});

When("I select the page {kraken-string} to edit", async function (pageTitle) {
    return await this.pageListPageObject.clickPageFromList(pageTitle);
});

When(`I set the page title to {kraken-string}`, async function (newTitle) {
    return await this.pageEditorPageObject.setTitle(newTitle);
});

When(`I set the page content to {kraken-string}`, async function (newContent) {
    return await this.pageEditorPageObject.setContent(newContent);
});

When(`I click the "Update" button`, async function () {
    return await this.pageEditorPageObject.clickUpdate();
});
