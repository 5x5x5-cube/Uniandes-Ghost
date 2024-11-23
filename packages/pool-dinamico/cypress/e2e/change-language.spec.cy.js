describe("F004 - Configurar lenguaje de publicación", () => {
    it("E00501 - Modificar lenguaje de ghost", () => {
        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/language.json?key=07dfb270&count=1',
        }).then((response) => {
            const languageData = response.body[0];
            cy.log('Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"');
            cy.loginPage.loginAs(Cypress.env("ADMIN_USERNAME"), Cypress.env("ADMIN_PASSWORD"));

            cy.log('And I click in admin setting');
            cy.changeLanguage.clickAdminSetting();

            cy.log('And I click in edit language');
            cy.changeLanguage.clickEditLanguage();

            cy.log(`And I edit language "${languageData.language}"`);
            cy.changeLanguage.editLanguage(languageData.language);

            cy.log('When I click in save language');
            cy.changeLanguage.saveLanguage();

            cy.log('And I navegate to home page');
            cy.changeLanguage.navigateToHomePage();

            // Then
            cy.log(`I verify the language "${languageData.language}"`);
            cy.changeLanguage.verifyLanguage(languageData.language);
        });
    });



    it("E00502 - Modificar lenguaje con espacios en blanco", () => {

        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/language.json?key=07dfb270&count=1',
        }).then((response) => {
            const languageData = response.body[0];

            cy.log('Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"');
            cy.loginPage.loginAs(Cypress.env("ADMIN_USERNAME"), Cypress.env("ADMIN_PASSWORD"));

            cy.log('And I click in admin setting');
            cy.changeLanguage.clickAdminSetting();

            cy.log('And I click in edit language');
            cy.changeLanguage.clickEditLanguage();

            cy.log(`And I edit language "${languageData.language}"`);
            cy.changeLanguage.editLanguage(languageData.language);

            cy.log('When I click in save language');
            cy.changeLanguage.saveLanguage();

            cy.log('And I navegate to home page');
            cy.changeLanguage.navigateToHomePage();

            // Then
            cy.log(`I verify the language "${languageData.language}  "`);
            cy.changeLanguage.verifyLanguage(languageData.language);
        });
    });


});
