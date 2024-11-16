import { PageObjectClass } from "./page-object.class";

export class AdminPage extends PageObjectClass {
    constructor() {
        super();
        this.adminPage = "/ghost";
    }

    navigateToAdminPage() {
        cy.visit(this.adminPage);
        cy.wait(1000);
    }

    clickOnLeftMenuOption(option) {
        cy.get(".gh-nav-list a").each(($el) => {
            if ($el.text().includes(option)) {
                cy.wrap($el).click();
            }
        });
    }

    getCurrentPath() {
        return cy.url().then((currentUrl) => {
            const url = new URL(currentUrl);
            return url.hash.substring(2);
        });
    }

    clickAdminSetting() {
        cy.get(".ember-view.gh-nav-bottom-tabicon").click();
    }

    getUnsavedChangesMessage() {
        return cy
            .get('.modal-header h1')
            .invoke("text");
    }
}
