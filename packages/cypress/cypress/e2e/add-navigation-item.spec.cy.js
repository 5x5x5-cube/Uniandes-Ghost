import { faker } from "@faker-js/faker";

describe("F014 - Gestionar navegación", () => {
    before(() => {
        const adminUsername = Cypress.env("ADMIN_USERNAME");
        const adminPassword = Cypress.env("ADMIN_PASSWORD");

        cy.log(
            `Given I am an admin logged in with email "${adminUsername}" and password "${adminPassword}"`
        );
        cy.loginPage.loginAs(adminUsername, adminPassword);
    });

    it("E01401 - Crear un nuevo item de navegación", () => {
        const label = faker.lorem.words(3);
        const url = faker.internet.url();

        // Given
        cy.log(`Given I am an admin logged as admin`);
        cy.loginPage.loggedAsAdmin();

        cy.log("And I navigate to the admin settings");
        cy.settingsPage.navigateToSettingsPage();

        // When
        cy.log("When I add a new navigation item");
        cy.manageNavigationPage.createNewNavigationItem(label, url);

        cy.log("And I navigate to the Site page");
        cy.sitePage.navigateToSitePage();

        // Then
        cy.log("Then I should find the navigation link");
        cy.sitePage.getLinkByText(label).should("exist");
    });

    it("E01402 - Crear un nuevo item con solo espacios vacios", () => {
        const label = "    ";
        const url = faker.internet.url();

        // Given
        cy.log(`Given I am an admin logged as admin`);
        cy.loginPage.loggedAsAdmin();

        cy.log("And I navigate to the admin settings");
        cy.settingsPage.navigateToSettingsPage();

        // When
        cy.log("When I add a new navigation item");
        cy.manageNavigationPage.createNewNavigationItem(label, url);

        cy.log("And I navigate to the Site page");
        cy.sitePage.navigateToSitePage();

        // Then
        cy.log("Then I should find the navigation link");
        cy.sitePage.getLinkByText(label).should("exist");
    });

    it("E01403 - Crear un nuevo item con solo URL inválida", () => {
        const label = faker.lorem.words(3);
        const url = faker.string.sample(10);

        // Given
        cy.log(`Given I am an admin logged as admin`);
        cy.loginPage.loggedAsAdmin();

        cy.log("And I navigate to the admin settings");
        cy.settingsPage.navigateToSettingsPage();

        // When
        cy.log("When I add a new navigation item");
        cy.manageNavigationPage.createNewNavigationItem(label, url);

        cy.log("And I navigate to the Site page");
        cy.sitePage.navigateToSitePage();

        // Then
        cy.log("Then I should find the navigation link");
        cy.sitePage.getLinkByText(label).should("exist");
    });
});
