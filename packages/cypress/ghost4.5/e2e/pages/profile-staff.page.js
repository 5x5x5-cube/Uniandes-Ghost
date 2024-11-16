import { PageObjectClass } from "./page-object.class";

export class ProfileStaff extends PageObjectClass {
    clickProfile() {
        cy.wait(1000);
        cy.get(
            ".gh-badge.owner"
        ).click();
        cy.wait(1000);
    }

    clickAdminSetting() {
        cy.get(".ember-view.gh-nav-bottom-tabicon").click();
        cy.wait(1000);
    }

    clickStaff() {
        cy.get('a[href="#/staff/"]').click();
        cy.wait(1000);
    }

    clickSave() {
        cy.get(".gh-btn.gh-btn-primary.gh-btn-icon.ember-view").click();
        cy.wait(1000);
    }

    getName(name) {
        cy.get(".gh-canvas-title")
            .invoke("text")
            .then((elementText) => {
                expect(elementText.trim()).to.not.equal(name);
            });
    }

    setName(name) {
        cy.get(".user-name.ember-text-field.gh-input.ember-view").first().clear().type(name,{ force: true });
        cy.wait(1000);
    }

    verifyProfile() {
        cy.get(".gh-btn.gh-btn-default.user-cover-edit > span")
            .invoke("text")
            .then((elementText) => {
                expect(elementText.trim()).to.equal("Change Cover");
            });
    }
}
