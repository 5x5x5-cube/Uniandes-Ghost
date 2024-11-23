import DashboardPage from "./pages/dashboard.page";
import StaticPage from "./pages/static-page.page";
import PageListPage from "./pages/page-list.page";
import { faker } from '@faker-js/faker';

describe("F007 Ghost Admin - Static Page Management", () => {

    const pageTitle = faker.company.catchPhrase(); 
    const pageContent = faker.lorem.paragraphs(2); 

    it("E00701 - should create, and publish a new static page successfully", () => {

        cy.log(
            'Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"'
        );
        cy.loginPage.loginAs(
            Cypress.env("ADMIN_USERNAME"),
            Cypress.env("ADMIN_PASSWORD")
        );

        cy.log("Then the user should be redirected to the dashboard");
        cy.wait(5000);
        DashboardPage.verifyDashboard();

        DashboardPage.navigateToPagesList();

        cy.log('When I click on the "New Page" button and fill page details');
        StaticPage.clickNewPageButton();
        StaticPage.fillInPageDetails(pageTitle, pageContent);

        cy.log(
            "Then: I should be able to publish the page and verify page has been published"
        );
        StaticPage.publishPage();
        StaticPage.verifyPagePublished();
    });

    it("E00702 - should update, and publish a new static page successfully", () => {
        cy.log(
            'Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"'
        );
        cy.loginPage.loginAs(
            Cypress.env("ADMIN_USERNAME"),
            Cypress.env("ADMIN_PASSWORD")
        );

        cy.log("Then the user should be redirected to the dashboard");
        cy.wait(5000);
        DashboardPage.verifyDashboard();

        const existingPageTitle = pageTitle;
        const newPageTitle = faker.company.catchPhrase(); 
        const newPageContent = faker.lorem.paragraphs(2); 

        cy.log("Given: I am on the Pages screen");
        PageListPage.navigateToPublishedPagesList();

        cy.log("When: I select the existing page to edit");
        StaticPage.selectPage(existingPageTitle);

        cy.log("And: I edit the page title and content");
        StaticPage.editPageTitle(newPageTitle);
        StaticPage.editPageContent(newPageContent);

        cy.log("Then: I should be able to publish the changes");
        StaticPage.savePage();

        cy.log(
            "And: I should see a success message confirming the page is published"
        );
        StaticPage.verifySuccessMessage();
    });

    it("E00703 - should create a static page with special characters in the title", () => {
        const specialCharTitle = faker.helpers.replaceSymbols("#!@%&*()[]{}<>?");
        const pageContent = faker.lorem.paragraphs(2);

        cy.log(
            'Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"'
        );
        cy.loginPage.loginAs(
            Cypress.env("ADMIN_USERNAME"),
            Cypress.env("ADMIN_PASSWORD")
        );

        cy.log("Then the user should be redirected to the dashboard");
        cy.wait(5000);
        DashboardPage.verifyDashboard();

        DashboardPage.navigateToPagesList();

        cy.log('When I click on the "New Page" button and fill page details with special characters in the title');
        StaticPage.clickNewPageButton();
        StaticPage.fillInPageDetails(specialCharTitle, pageContent);

        cy.log(
            "Then: I should be able to publish the page and verify page has been published"
        );
        StaticPage.publishPage();
        StaticPage.verifyPagePublished();
    });
    
});
