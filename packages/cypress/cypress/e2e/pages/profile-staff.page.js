import { PageObjectClass } from "./page-object.class";

export class ProfileStaff extends PageObjectClass {
    clickProfile() {
        cy.wait(1000);
        cy.get(
            ".relative.inline-flex.select-none.items-center.justify-center.overflow-hidden.rounded-full.align-middle"
        ).click();
        cy.wait(1000);
    }

    clickAdminSetting() {
        cy.get(".ember-view.gh-nav-bottom-tabicon").click();
        cy.wait(1000);
    }

    clickSave() {
        cy.get("button.cursor-pointer.bg-black.text-white").click();
        cy.wait(1000);
    }

    getName(name) {
        cy.get("h1.text-white")
            .invoke("text")
            .then((elementText) => {
                expect(elementText.trim()).to.equal(name);
            });
    }

    setName(name) {
        cy.get("input.bg-transparent").eq(0).clear().type(name);
        cy.wait(1000);
    }

    setEmail(name) {
        cy.get("input.bg-transparent").eq(1).clear().type(name);
        cy.wait(1000);
    }

    setSlug(name) {
        cy.get("input.bg-transparent").eq(2).clear().type(name);
        cy.wait(1000);
    }

    setWebSite(name) {
        cy.get("input.bg-transparent").eq(4).clear().type(name);
        cy.wait(1000);
    }

    setLocation(name) {
        cy.get("input.bg-transparent").eq(3).clear().type(name);
        cy.wait(1000);
    }

    setFacebook(name) {
        cy.get("input.bg-transparent").eq(5).clear().type(name);
        cy.wait(1000);
    }

    setTwitter(name) {
        cy.get("input.bg-transparent").eq(6).clear().type(name);
        cy.wait(1000);
    }

    setOldPassword(name) {
        cy.get('input[type="password"]').eq(0).clear().type(name);
        cy.wait(1000);
    }

    setNewPassword(name) {
        cy.get('input[type="password"]').eq(1).clear().type(name);
        cy.wait(1000);
    }

    setVerifyPassword(name) {
        cy.get('input[type="password"]').eq(2).clear().type(name);
        cy.wait(1000);
    }

    clickChangePassword() {
        cy.get(".is-not-editing > button.cursor-pointer.bg-grey-100.text-black").click();
        cy.wait(1000);
    }

    clickFinalChangePassword() {
        cy.get(".is-not-editing > button.cursor-pointer.bg-red.text-white").click();
        cy.wait(1000);
    }

    verifyProfile() {
        cy.get(".text-md.font-semibold.capitalize.text-white")
            .invoke("text")
            .then((elementText) => {
                expect(elementText.trim()).to.equal("owner");
            });
    }
}
