export class DashboardPage {
    verifyDashboard() {
        cy.url().should("include", "/ghost/#/dashboard");
        cy.get(".gh-nav").should("be.visible");
    }

    navigateToMembers() {
        cy.get('a[href="#/members/"]').first().click();
    }

    navigateToPagesList() {
      cy.get('a[href="#/pages/"]').click();
    }
  }
  
  export default new DashboardPage();



