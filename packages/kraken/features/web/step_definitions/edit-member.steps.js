const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const MembersPage = require('../page_objects/member.page-object');


When('I click on the Edit button for the first member', async function () {
    const firstMemberEmail = await this.driver.$('.gh-members-list-email');
    await firstMemberEmail.click();
});
  
When('I update the member name to {string}', async function (newName) {
    await this.driver.$('#member-name').setValue(newName); // Replace with actual selector for member name input
});

When('I update the member email to {string}', async function (newEmail) {
    await this.driver.$('#member-email').setValue(newEmail); // Replace with actual selector for member email input
});

When('I save the updated member', async function () {
    await this.driver.$('.gh-btn-primary').click(); // Adjust selector if needed for the Save button
});

Then('I should see a success notification indicating the member was updated', async function () {
    const saveButton = await this.driver.$('button.gh-btn-primary');
    await saveButton.waitForDisplayed();
    const isGreen = await saveButton.getAttribute('class').then(classes => classes.includes('gh-btn-green'));
    const buttonText = await saveButton.getText();

    if (!isGreen || !buttonText.includes('Saved')) {
        throw new Error('Save confirmation not displayed correctly');
    }
});