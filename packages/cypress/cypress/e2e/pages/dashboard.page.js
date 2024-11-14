import { PageObjectClass } from "./page-object.class";

export class DashboardPage extends PageObjectClass {
    verifyDashboard() {
        cy.url().should("include", "/ghost/#/dashboard");
        cy.get(".gh-nav").should("be.visible");
    }

    navigateToMembers() {
        cy.get('a[href="#/members/"]').first().click();
    }

    navigateToPagesList() {
        cy.get('a[href="#/pages/"]').click();
        cy.wait(1000);
    }
}

export default new DashboardPage();
