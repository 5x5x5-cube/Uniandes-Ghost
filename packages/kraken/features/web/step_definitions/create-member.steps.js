const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const MembersPage = require('../page_objects/create-member.page-object');

When('I navigate to the Members page', async function () {
  this.membersPage = new MembersPage(this.driver);
  await this.membersPage.navigateToMembers();
});

When('I click on New Member', async function () {
  await this.membersPage.clickNewMember();
});

When('I enter {string} as the member name', async function (name) {
  await this.membersPage.enterMemberName(name);
});

When('I enter {string} as the member email', async function (email) {
  await this.membersPage.enterMemberEmail(email);
});

When('I save the new member', async function () {
  await this.membersPage.saveMember();
});

Then('I should see a success message indicating the member was created', async function () {
  const isSuccessDisplayed = await this.membersPage.isSuccessNotificationDisplayed();
  if (!isSuccessDisplayed) {
    throw new Error('Success notification was not displayed');
  }
});

Then('the member creation URL should be correct', async function () {
  const url = await this.driver.getUrl();
  const urlPattern = /http:\/\/localhost:2368\/ghost\/#\/members\/[a-z0-9]{24}/;
  expect(url).to.match(urlPattern, 'URL does not match the expected member creation pattern');
});

When('I enter a dynamically generated email as the member email', async function () {
  // Generate a dynamic email
  //const memberEmail = `newmember${Date.now()}@example.com`;

  const testPrefix = "andes";
  const randomString = Math.random().toString(36).substring(2, 10);
  const memberEmail = `${testPrefix}_${randomString}@uniandes.edu.co`;

  // Pass the generated email to your page object method
  await this.membersPage.enterMemberEmail(memberEmail);

  // Optionally, you can log the generated email for debugging
  console.log(`Generated member email: ${memberEmail}`);
});

Then('I should see an error indicating the email is required', async function () {
  const emailInput = await this.driver.$('input[name="email"]');
  const parentElement = await emailInput.parentElement();
  const classAttribute = await parentElement.getAttribute('class');

  if (!classAttribute.includes('error')) {
    throw new Error('Email input does not show the error class');
  }

});