import { faker } from "@faker-js/faker";

describe("F013 - Configurar metadata del sitio", () => {
    before(() => {
        const adminUsername = Cypress.env("ADMIN_USERNAME");
        const adminPassword = Cypress.env("ADMIN_PASSWORD");

        cy.log(
            `Given I am an admin logged in with email "${adminUsername}" and password "${adminPassword}"`
        );
        cy.loginPage.loginAs(adminUsername, adminPassword);
    });

    it("E01301 - Configurar metadata para motores de busqueda", () => {
        const title = faker.lorem.words(3);
        const description = faker.lorem.words(10);

        // Given
        cy.log(`Given I am an admin logged as admin`);
        cy.loginPage.loggedAsAdmin();

        cy.log("And I navigate to the admin settings");
        cy.settingsPage.navigateToSettingsPage();

        // When
        cy.log("When I update the search engine metadata");
        cy.setMetadataPage.updateSearchEngineMetadata(title, description);

        // Then
        cy.log("Then I verify the metadata was saved");
        cy.setMetadataPage.getSavedSearchEngineMetadataButton().should("exist");
    });

    it("E01302 - Error al configurar metadata para motores de busqueda con espacios vacios", () => {
        const title = "        ";
        const description = "                 ";

        // Given
        cy.log(`Given I am an admin logged as admin`);
        cy.loginPage.loggedAsAdmin();

        cy.log("And I navigate to the admin settings");
        cy.settingsPage.navigateToSettingsPage();

        // When
        cy.log("When I update the search engine metadata");
        cy.setMetadataPage.updateSearchEngineMetadata(title, description);

        // Then
        cy.log("Then I verify the metadata was saved");
        cy.setMetadataPage.getSavedSearchEngineMetadataButton().should("exist");
    });

    it("E01303 - Configurar metadata para X", () => {
        const title = faker.lorem.words(3);
        const description = faker.lorem.words(10);

        // Given
        cy.log(`Given I am an admin logged as admin`);
        cy.loginPage.loggedAsAdmin();

        cy.log("And I navigate to the admin settings");
        cy.settingsPage.navigateToSettingsPage();

        // When
        cy.log("When I update the X metadata");
        cy.setMetadataPage.updateXMetadata(title, description);

        // Then
        cy.log("Then I verify the X metadata was saved");
        cy.setMetadataPage.getSavedXMetadataButton().should("exist");
    });

    it("E01304 - Error al configurar metadata para X con espacios vacios", () => {
        const title = "        ";
        const description = "                 ";

        // Given
        cy.log(`Given I am an admin logged as admin`);
        cy.loginPage.loggedAsAdmin();

        cy.log("And I navigate to the admin settings");
        cy.settingsPage.navigateToSettingsPage();

        // When
        cy.log("When I update the X metadata");
        cy.setMetadataPage.updateXMetadata(title, description);

        // Then
        cy.log("Then I verify the X metadata was saved");
        cy.setMetadataPage.getSavedXMetadataButton().should("exist");
    });

    it("E01305 - Configurar metadata para Facebook", () => {
        const title = faker.lorem.words(3);
        const description = faker.lorem.words(10);

        // Given
        cy.log(`Given I am an admin logged as admin`);
        cy.loginPage.loggedAsAdmin();

        cy.log("And I navigate to the admin settings");
        cy.settingsPage.navigateToSettingsPage();

        // When
        cy.log("When I update the Facebook metadata");
        cy.setMetadataPage.updateFacebookMetadata(title, description);

        // Then
        cy.log("Then I verify the Facebook metadata was saved");
        cy.setMetadataPage.getSavedFacebookMetadataButton().should("exist");
    });

    it("E01306 - Error al configurar metadata para Facebook con espacios vacios", () => {
        const title = "        ";
        const description = "                 ";

        // Given
        cy.log(`Given I am an admin logged as admin`);
        cy.loginPage.loggedAsAdmin();

        cy.log("And I navigate to the admin settings");
        cy.settingsPage.navigateToSettingsPage();

        // When
        cy.log("When I update the Facebook metadata");
        cy.setMetadataPage.updateFacebookMetadata(title, description);

        // Then
        cy.log("Then I verify the Facebook metadata was saved");
        cy.setMetadataPage.getSavedFacebookMetadataButton().should("exist");
    });
});
