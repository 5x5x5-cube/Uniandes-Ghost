import { faker } from "@faker-js/faker";

describe("F006 - Crear página estatica", () => {
    /*it("E00601 - Crear página estática", () => {
        const pageTitle = faker.word.words(2);
        const pageUrl = faker.word.words(1);

        // Given
        cy.log(
            'Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"'
        );
        cy.loginPage.loginAs(
            Cypress.env("ADMIN_USERNAME"),
            Cypress.env("ADMIN_PASSWORD")
        );

        cy.log("And I am on the post editor page");
        cy.createPage.visit();

        // When
        cy.log(
            `When I create and publish a page with title "${pageTitle}" and url "${pageUrl}"`
        );
        cy.createPage.createAndPublishPage(pageTitle, pageUrl);

        cy.log(`And I navigate to the page url "${pageUrl}"`);
        cy.createPage.navigateToPage(pageUrl);

        // Then
        cy.log(`Then I should see a page with the post title "${pageTitle}"`);
        cy.createPage.getPageTitle().should("have.text", pageTitle);

        cy.log("And I wait for 2 seconds");
        cy.wait(2000);
    });

    it("E00602 - Crear pagina estatica y no se visualiza en HomePage", () => {
        const pageTitle = faker.word.words(2);
        const pageUrl = faker.word.words(1);

        // Given
        cy.log(
            'Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"'
        );
        cy.loginPage.visit();
        cy.loginPage.loginAs(
            Cypress.env("ADMIN_USERNAME"),
            Cypress.env("ADMIN_PASSWORD")
        );

        cy.log("And I am on the post editor page");
        cy.createPage.visit();

        // When
        cy.log(
            `When I create and publish a page with title "${pageTitle}" and url "${pageUrl}"`
        );
        cy.createPage.createAndPublishPage(pageTitle, pageUrl);

        cy.log(`And I navigate to the homepage`);
        cy.createPage.navigateToHomePage(pageUrl);

        // Then
        cy.log(
            `Then I shouldn't see a page in home page with title "${pageTitle}"`
        );
        cy.createPage.verifyPageInHomePage(pageTitle).then((result) => {
            expect(false).to.equal(result);
        });

        cy.log("And I wait for 2 seconds");
        cy.wait(2000);
    });

    it("E00801 - Crear página estática con título extremadamente largo", () => {
        const pageTitle = faker.lorem.words(100); // long tittle
        const pageUrl = faker.word.words(1);

        // Given
        cy.log(
            'Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"'
        );
        cy.loginPage.loginAs(
            Cypress.env("ADMIN_USERNAME"),
            Cypress.env("ADMIN_PASSWORD")
        );

        cy.log("And I am on the page editor page");
        cy.createPage.visit();

        // When
        cy.log(
            `When I create and publish a page with title "${pageTitle}" and url "${pageUrl}"`
        );
        cy.createPage.createAndPublishPage(pageTitle, pageUrl);

       // Then
       cy.log("Then I should see a validation error message somewhere on the page");
       cy.createPage.getValidationErrorMessage().should(
           "contain.text",
           "Validation failed"
       );
        cy.wait(2000);
    });

    it("E00801 - Crear página con título que contiene caracteres especiales", () => {
        const pageTitle = `${faker.lorem.words(3)} @#$%^&*()!`; // Title with special characters
        const pageUrl = faker.lorem.word(); // Generate a valid URL

        // Given
        cy.log(
            'Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"'
        );
        cy.loginPage.loginAs(
            Cypress.env("ADMIN_USERNAME"),
            Cypress.env("ADMIN_PASSWORD")
        );

        cy.log("And I am on the page editor page");
        cy.createPage.visit();

        // When
        cy.log(
            `When I create and publish a page with title "${pageTitle}" and URL "${pageUrl}"`
        );
        cy.createPage.createAndPublishPage(pageTitle, pageUrl);

        cy.log(`And I navigate to the page url "${pageUrl}"`);
        cy.createPage.navigateToPage(pageUrl);

        // Then
        cy.log(`Then I should see a page with the post title "${pageTitle}"`);
        cy.createPage.getPageTitle().should("have.text", pageTitle);

        cy.log("And I wait for 2 seconds");
        cy.wait(2000);
    });

    it("E00901 - Validar error al crear página con URL que contiene caracteres especiales", () => {
        const pageTitle = faker.lorem.words(3); // Valid title without special characters
        const pageUrl = `${faker.lorem.word()} @#$%^&*()!`; // URL with special characters

        // Given
        cy.log(
            'Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"'
        );
        cy.loginPage.loginAs(
            Cypress.env("ADMIN_USERNAME"),
            Cypress.env("ADMIN_PASSWORD")
        );

        cy.log("And I am on the page editor page");
        cy.createPage.visit();

        // When
        cy.log(
            `When I create and publish a page with title "${pageTitle}" and URL "${pageUrl}"`
        );
        cy.createPage.createAndPublishPage(pageTitle, pageUrl);

        // Then
        cy.log("Then I should see a validation error message somewhere on the page");
        cy.createPage.getValidationErrorMessage().should(
            "contain.text",
            "Validation failed"
        );

        cy.wait(2000);
    });*/

    it("E01001 - Validar error al crear página con URL extremadamente larga", () => {
        const pageTitle = faker.lorem.words(3); // Valid title
        const longUrl = faker.internet.url().repeat(10); // Create an extremely long URL (repeating a valid URL 10 times)

        // Given
        cy.log(
            'Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"'
        );
        cy.loginPage.loginAs(
            Cypress.env("ADMIN_USERNAME"),
            Cypress.env("ADMIN_PASSWORD")
        );

        cy.log("And I am on the page editor page");
        cy.createPage.visit();

        // When
        cy.log(
            `When I create and publish a page with title "${pageTitle}" and URL "${longUrl}"`
        );
        cy.createPage.createAndPublishPage(pageTitle, longUrl);

        // Then
        cy.log("Then I should see a validation error message somewhere on the page");
        cy.createPage.getValidationErrorMessage().should(
            "contain.text",
            "Validation failed"
        );

        cy.wait(2000);
    });
    
});
