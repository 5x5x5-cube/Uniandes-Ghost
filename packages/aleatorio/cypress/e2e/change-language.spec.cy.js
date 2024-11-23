// Import faker
const { faker } = require('@faker-js/faker');

describe("F004 - Configurar lenguaje de publicación", () => {
    it("E00501 - Modificar lenguaje de Ghost", () => {
        // Generate dynamic data (example)
        const randomLanguage = faker.helpers.arrayElement(["es", "en", "fr", "de", "it"]); 

        cy.log('Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"');
        cy.loginPage.loginAs(Cypress.env("ADMIN_USERNAME"), Cypress.env("ADMIN_PASSWORD"));

        cy.log('And I click in admin setting');
        cy.changeLanguage.clickAdminSetting();

        cy.log('And I click in edit language');
        cy.changeLanguage.clickEditLanguage();

        cy.log(`And I edit language "${randomLanguage}"`);
        cy.changeLanguage.editLanguage(randomLanguage);

        cy.log('When I click in save language');
        cy.changeLanguage.saveLanguage();

        cy.log('And I navigate to home page');
        cy.changeLanguage.navigateToHomePage();

        // Then
        cy.log(`I verify the language "${randomLanguage}"`);
        cy.changeLanguage.verifyLanguage(randomLanguage);
    });
});
