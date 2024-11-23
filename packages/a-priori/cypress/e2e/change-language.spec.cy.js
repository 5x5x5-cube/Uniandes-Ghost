import { dataPool } from "../fixtures/change-language";

describe("F004 - Configurar lenguaje de publicación", () => {
    dataPool.forEach(({ test, language }) => {
        it("E00501 - Modificar lenguaje de ghost", () => {
            cy.log(test.description);

            // Given
            cy.log("Given I am logged in as an admin");
            cy.loginPage.loggedAsAdmin();

            cy.log("And I navigate to the admin settings page");
            cy.changeLanguage.navigateToSettings();

            cy.log("And I click in edit language");
            cy.changeLanguage.clickEditLanguage();

            cy.log(`And I edit language "${language}"`);
            cy.changeLanguage.editLanguage(language);

            cy.log("When I click in save language");
            cy.changeLanguage.saveLanguage();

            if (test.outcome === "success") {
                cy.log("And I navegate to home page");
                cy.changeLanguage.navigateToHomePage();

                // Then
                cy.log(`I verify the language "${test.assert_text}"`);
                cy.changeLanguage.verifyLanguage(test.assert_text);
            } else {
                // Then
                cy.log("I should see an error message");
                cy.changeLanguage.verifyErrorMessage(test.assert_text);
            }
        });
    });
});
