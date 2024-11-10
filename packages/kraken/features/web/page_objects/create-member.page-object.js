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
 
}

module.exports = MembersPage;

  