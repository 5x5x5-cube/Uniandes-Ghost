const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const MembersPage = require('../page_objects/member.page-object');

// When: Click on the Edit button for the first member
When('I click on the Edit button for the first member', async function () {
    // Open the first member for editing
    this.membersPage = new MembersPage(this.driver);
    await this.membersPage.openFirstMemberForEditing();
});

// When: Update the member name
When('I update the member name to {string}', async function (newName) {
    // Update the member name using the page object method
    await MembersPage.updateMemberName(newName);
});

// When: Update the member email
When('I update the member email to {string}', async function (newEmail) {
    // Update the member email using the page object method
    await MembersPage.updateMemberEmail(newEmail);
});

// When: Save the updated member
When('I save the updated member', async function () {
    // Save the updated member using the page object method
    await this.membersPage.saveMember();
 
});

// Then: Verify success notification for member update
Then('I should see a success notification indicating the member was updated', async function () {
    // Verify that the success notification appears after saving
    await this.membersPage.verifyEditSuccess();
  

});
