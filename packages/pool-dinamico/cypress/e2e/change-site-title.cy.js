import { faker } from "@faker-js/faker";

describe("F001 - Modificar titulo del sitio", () => {
    const adminUsername = Cypress.env("ADMIN_USERNAME");
    const adminPassword = Cypress.env("ADMIN_PASSWORD");

    it("E00101 - Modificación titulo de sitio web", () => {
        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/site.json?key=07dfb270&count=1',
        }).then((response) => {
            const postData = response.body[0];
            const siteTitle = postData.site;

            // Given
            cy.log(
                `Given I am an admin logged in with email "${adminUsername}" and password "${adminPassword}"`
            );
            cy.loginPage.loginAs(adminUsername, adminPassword);

            cy.settingsPage.navigateToSettingsPage();
            cy.log("And I am in the Settings page");

            // When
            cy.log("When I click the edit title and description option");
            cy.settingsPage.clickEditTitleAndDescription();

            cy.log(`And I modify the title to "${siteTitle}"`);
            cy.settingsPage.setSiteTitle(siteTitle);

            cy.log("And I click the save title button");
            cy.settingsPage.clickSaveTitleButton();

            cy.log("And I wait for 1 seconds");
            cy.wait(1000);

            cy.log("And I navigate to Site page");
            cy.sitePage.navigateToSitePage();

            cy.log("And I wait for 1 seconds");
            cy.wait(1000);

            // Then
            cy.log(`Then the site name should be "${siteTitle}"`);
            cy.sitePage.getSiteTitle().should("eq", siteTitle);

            cy.log("And I wait for 2 seconds");
            cy.wait(2000);
        });
    });

    it("E00101 - Modificación titulo de sitio web naughty", () => {
        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/site.json?key=07dfb270&count=1',
        }).then((response) => {
            const postData = response.body[0];
            const siteTitle = postData.naughty;

            // Given
            cy.log(
                `Given I am an admin logged in with email "${adminUsername}" and password "${adminPassword}"`
            );
            cy.loginPage.loginAs(adminUsername, adminPassword);

            cy.settingsPage.navigateToSettingsPage();
            cy.log("And I am in the Settings page");

            // When
            cy.log("When I click the edit title and description option");
            cy.settingsPage.clickEditTitleAndDescription();

            cy.log(`And I modify the title to "${siteTitle}"`);
            cy.settingsPage.setSiteTitle(siteTitle);

            cy.log("And I click the save title button");
            cy.settingsPage.clickSaveTitleButton();

            cy.log("And I wait for 1 seconds");
            cy.wait(1000);

            cy.log("And I navigate to Site page");
            cy.sitePage.navigateToSitePage();

            cy.log("And I wait for 1 seconds");
            cy.wait(1000);

            // Then
            cy.log(`Then the site name should be "${siteTitle}"`);
            cy.sitePage.getSiteTitle().should("eq", siteTitle);

            cy.log("And I wait for 2 seconds");
            cy.wait(2000);
        });
    });


    it("E00103 - Mostrar un modal al salir de configuraciones sin guardar cambios en el título", () => {

        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/site.json?key=07dfb270&count=1',
        }).then((response) => {
            const siteData = response.body[0];

            cy.log(
                `Given I am an admin logged in with email "${adminUsername}" and password "${adminPassword}"`
            );
            cy.loginPage.loginAs(adminUsername, adminPassword);

            cy.settingsPage.navigateToSettingsPage();
            cy.log("And I am in the Settings page");

            // When
            cy.log("When I click the edit title and description option");
            cy.settingsPage.clickEditTitleAndDescription();

            cy.log(`And I modify the title to "${siteData.site}"`);
            cy.settingsPage.setSiteTitle(siteData.site);

            cy.log("And I click the exit Settings button");
            cy.settingsPage.clickExitSettingsButton();

            cy.log("And I wait for 1 seconds");
            cy.wait(1000);

            // Then
            cy.log("Then I should see the unsaved changes modal");
            cy.settingsPage.getUnsavedChangesModal().should("exist");

            cy.log("And I wait for 2 seconds");
            cy.wait(2000);
        });
    });
});
