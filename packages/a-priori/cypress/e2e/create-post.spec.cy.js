import { faker } from "@faker-js/faker";

describe("F002 - Crear post", () => {
    before(() => {
        const adminUsername = Cypress.env("ADMIN_USERNAME");
        const adminPassword = Cypress.env("ADMIN_PASSWORD");

        cy.log(
            `Given I am an admin logged in with email "${adminUsername}" and password "${adminPassword}"`
        );
        cy.loginPage.loginAs(adminUsername, adminPassword);
    });

    it("E00201 - Crear un post y publicarlo", () => {
        const postTitle = faker.word.words(2);
        const postUrl = faker.word.words(1);

        // Given
        cy.log("Given I am logged in as an admin");
        cy.loginPage.loggedAsAdmin();

        cy.log("And I am on the post editor page");
        cy.postEditorPage.visit();

        // When
        cy.log(
            `When I create and publish a post with title "${postTitle}" and url "${postUrl}"`
        );
        cy.postEditorPage.createAndPublishPost(postTitle, postUrl);

        cy.log(`And I navigate to the post url "${postUrl}"`);
        cy.postViewerPage.navigateToPost(postUrl);

        // Then
        cy.log(`Then I should see a page with the post title "${postTitle}"`);
        cy.postViewerPage.getPostTitle().should("have.text", postTitle);

        cy.log("And I wait for 2 seconds");
        cy.wait(2000);
    });
});
