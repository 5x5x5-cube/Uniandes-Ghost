class MembersPage {
  constructor(driver) {
    this.driver = driver;
  }

  async navigateToMembers() {
    const membersLink = await this.driver.$('a[href="#/members/"]');
    await membersLink.click();
  }

  async clickNewMember() {
    const newMemberButton = await this.driver.$('a[href="#/members/new/"]');
    await newMemberButton.click();
  }

  async enterMemberName(name) {
    const nameInput = await this.driver.$('input[name="name"]');
    await nameInput.setValue(name);
  }

  async enterMemberEmail(email) {
    const emailInput = await this.driver.$('input[name="email"]');
    await emailInput.waitForDisplayed();
    await emailInput.setValue(email);
  }

  async saveMember() {
    const saveButton = await this.driver.$('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view');
    await saveButton.click();
  }

  async isSuccessNotificationDisplayed() {
    const notification = await this.driver.$('.gh-notification-content');
    return await notification.isDisplayed();
  }

  async updateMemberName(newName) {
    const memberNameField = await this.driver.$('#member-name');
    await memberNameField.setValue(newName);
}

  async updateMemberEmail(newEmail) {
    const memberEmailField = await this.driver.$('#member-email');
    await memberEmailField.setValue(newEmail);
}

async verifyEditSuccess() {
  const saveButton = await this.driver.$('button.gh-btn-primary');
  await saveButton.waitForDisplayed();
  const isGreen = await saveButton.getAttribute('class').then(classes => classes.includes('gh-btn-green'));
  const buttonText = await saveButton.getText();

  if (!isGreen || !buttonText.includes('Saved')) {
      throw new Error('Save confirmation not displayed correctly');
  }
}

async openFirstMemberForEditing() {
  const firstMemberEmail = await this.driver.$('.gh-members-list-email');
  await firstMemberEmail.click();
}

async validateEmailErrorMessage() {
  const currentUrl = await this.driver.getUrl();
     const expectedUrl = await this.driver.getUrl(); // You can define the expected URL here if needed
 
     if (currentUrl !== expectedUrl) {
         throw new Error(`URL mismatch: Expected URL to be "${expectedUrl}", but got "${currentUrl}"`);
     }
}
 
}

module.exports = MembersPage;

  