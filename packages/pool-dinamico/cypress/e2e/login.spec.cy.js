describe("F012 - Login feature", () => {
    const adminUsername = Cypress.env("ADMIN_USERNAME");
    const adminPassword = Cypress.env("ADMIN_PASSWORD");

    it("E01201 - Inicio de sesion exitoso", () => {
        // Given
        cy.log("Given I am on the login page");
        cy.loginPage.visit();

        // When
        cy.log(`When I enter email "${adminUsername}"`);
        cy.loginPage.enterEmail(Cypress.env("ADMIN_USERNAME"));

        cy.log(`And I enter password "${adminPassword}"`);
        cy.loginPage.enterPassword(Cypress.env("ADMIN_PASSWORD"));

        cy.log("And I click next Sign In");
        cy.loginPage.clickSignIn();

        // Then
        cy.log('Then I should be on the "dashboard" section');
        cy.url().should("include", "/dashboard");
    });

    it("E01201 - Inicio de sesion con contrasena incorrecta", () => {
        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/login.json?key=07dfb270&count=1',
        }).then((response) => {
            const loginData = response.body[0];

            // Given
            cy.log("Given I am on the login page");
            cy.loginPage.visit();

            // When
            cy.log(`When I enter email "${Cypress.env("ADMIN_USERNAME")}"`);
            cy.loginPage.enterEmail(Cypress.env("ADMIN_USERNAME"));

            cy.log("And I enter a wrong password");
            cy.loginPage.enterPassword(loginData.password);

            cy.log("And I click next Sign In");
            cy.loginPage.clickSignIn();

            // Then
            cy.log("Then an error message is shown");
            cy.contains("Your password is incorrect.").should("be.visible");

            cy.log("And a retry button is shown");
            cy.contains("Retry").should("be.visible");
        });
    });


    it("E01201 - Inicio de sesion con email incorrecto", () => {
        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/login.json?key=07dfb270&count=1',
        }).then((response) => {
            const loginData = response.body[0];

            // Given
            cy.log("Given I am on the login page");
            cy.loginPage.visit();

            // When
            cy.log(`When I enter email "${loginData.email}"`);
            cy.loginPage.enterEmail(loginData.email);

            cy.log("And I enter a wrong password");
            cy.loginPage.enterPassword(loginData.password);

            cy.log("And I click next Sign In");
            cy.loginPage.clickSignIn();

            // Then
            cy.log("Then an error message is shown");
            cy.contains("There is no user with that email address").should("be.visible");

            cy.log("And a retry button is shown");
            cy.contains("Retry").should("be.visible");
        });
    });
});
