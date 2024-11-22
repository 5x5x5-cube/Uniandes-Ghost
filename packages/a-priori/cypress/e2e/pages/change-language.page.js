import { PageObjectClass } from "./page-object.class";

export class ChangeLanguage extends PageObjectClass {
    navigateToHomePage() {
        cy.visit("/");
    }

    navigateToSettings() {
        cy.visit("/ghost/#/settings");
        cy.wait(1000);
    }

    getLanguage(language) {
        cy.get("#identification").type(language);
        cy.wait(1000);
    }

    clickEditLanguage() {
        cy.get(
            "#publication-language + .flex.items-start.justify-between.gap-4 div div button"
        ).click();
        cy.wait(1000);
    }

    editLanguage(language) {
        const languageInput = cy
            .get('input[placeholder="Site language"]')
            .first();

        languageInput.clear();
        language && languageInput.type(language);
        cy.wait(1000);
    }

    saveLanguage() {
        cy.get(
            "#publication-language + .flex.items-start.justify-between.gap-4 div div .bg-green"
        ).click();
        cy.wait(1000);
    }

    clickAdminSetting() {
        cy.get(".ember-view.gh-nav-bottom-tabicon").click();
        cy.wait(1000);
    }

    verifyLanguage(language) {
        cy.get("html")
            .invoke("attr", "lang")
            .then((lang) => {
                expect(lang).to.equal(language);
            });
    }

    verifyErrorMessage(errorMessage) {
        cy.get(`[data-testid="publication-language"]`).should(
            "contain.text",
            errorMessage
        );
    }
}
