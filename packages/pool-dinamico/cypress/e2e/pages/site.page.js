import { PageObjectClass } from "./page-object.class";

export class SitePage extends PageObjectClass {
    navigateToSitePage() {
        cy.visit("/");
    }

    getSiteTitle() {
        return cy.title();
    }
}
