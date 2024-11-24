import DashboardPage from "./pages/dashboard.page";
import StaticPage from "./pages/static-page.page";
import PageListPage from "./pages/page-list.page";

describe("F007 Ghost Admin - Static Page Management", () => {
    it("E00701 - should create, and publish a new static page successfully", () => {
        
        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/page.json?key=07dfb270&count=1',
        }).then((response) => {
            const pageData = response.body[0];
            const pageTitle = pageData.name;
            const pageContent = pageData.text;
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
    });

    it("E00702 - should update, and publish a new static page successfully", () => {

        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/page.json?key=07dfb270&count=1',
        }).then((response) => {
            const pageData = response.body[0];
            const newPageTitle = pageData.name;
            const newPageContent = pageData.text;

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

            

            cy.log("Given: I am on the Pages screen");
            PageListPage.navigateToPublishedPagesList();

            cy.log("When: I select the existing page to edit");
            StaticPage.selectPage();

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
    });
});
