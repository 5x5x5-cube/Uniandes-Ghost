import { faker } from "@faker-js/faker";

describe("F002 - Crear post", () => {
    const adminUsername = Cypress.env("ADMIN_USERNAME");
    const adminPassword = Cypress.env("ADMIN_PASSWORD");

    it("E00201 - Crear un post y publicarlo", () => {
        const postTitle = faker.word.words(2);
        const postUrl = faker.word.words(1);

        // Given
        cy.log(
            `Given I am an admin logged in with email "${adminUsername}" and password "${adminPassword}"`
        );
        cy.loginPage.loginAs(adminUsername, adminPassword);

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

    it("E00202 - Crear un borrador de un post", () => {
        const postTitle = faker.word.words(2);

        // Given
        cy.log(
            `Given I am an admin logged in with email "${adminUsername}" and password "${adminPassword}"`
        );
        cy.loginPage.loginAs(adminUsername, adminPassword);

        cy.log("And I am on the post editor page");
        cy.postEditorPage.visit();

        // When
        cy.log(`When I type a post title "${postTitle}"`);
        cy.postEditorPage.setTitle(postTitle);

        cy.log("And I click on the return arrow");
        cy.postEditorPage.clickReturnArrow();

        cy.log("And I wait for 3 seconds");
        cy.wait(3000);

        // Then
        cy.log(
            `Then I should see a post "${postTitle}" in the post list flagged as draft`
        );
        cy.postListPage.visit();
        const post = cy.postListPage.getPostFromList(postTitle);
        cy.postListPage.getPostStatus(post).should("contain.text", "Draft");

        cy.log("And I wait for 2 seconds");
        cy.wait(2000);
    });

    it("E00203 - Crear un post con caracteres especiales en el título", () => {
        const postTitle = faker.helpers.replaceSymbols("Título !@#$%^&*()?");
        const postUrl = faker.word.words(1);

        // Given
        cy.log(
            `Given I am an admin logged in with email "${adminUsername}" and password "${adminPassword}"`
        );
        cy.loginPage.loginAs(adminUsername, adminPassword);

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

    it("E00204 - Crear un post con una fecha de publicación pasada", () => {
        const postTitle = faker.word.words(2);
        const postUrl = faker.word.words(1);
        const postDate = faker.date.past();

        // Given
        cy.log(
            `Given I am an admin logged in with email "${adminUsername}" and password "${adminPassword}"`
        );
        cy.loginPage.loginAs(adminUsername, adminPassword);

        cy.log("And I am on the post editor page");
        cy.postEditorPage.visit();

        // When
        cy.log(
            `When I create and publish a post with title "${postTitle}", url "${postUrl}" and date "${postDate}"`
        );
        cy.postEditorPage.createAndPublicPostWithPreviousData(
            postTitle,
            postUrl,
            postDate
        );

        cy.log(`And I navigate to the post url "${postUrl}"`);
        cy.postViewerPage.navigateToPost(postUrl);

        // Then
        cy.log(`Then I should see a page with the post title "${postTitle}"`);
        cy.postViewerPage.getPostTitle().should("have.text", postTitle);

        cy.log("And I wait for 2 seconds");
        cy.wait(2000);
    });

    it("E00205 - Crear un post con una fecha de publicación futura", () => {
        const postTitle = faker.word.words(2);
        const postUrl = faker.word.words(1);
        const postDate = faker.date.future();

        // Given
        cy.log(
            `Given I am an admin logged in with email "${adminUsername}" and password "${adminPassword}"`
        );
        cy.loginPage.loginAs(adminUsername, adminPassword);

        cy.log("And I am on the post editor page");
        cy.postEditorPage.visit();

        // When
        cy.log(
            `When I create and publish a post with title "${postTitle}", url "${postUrl}" and date "${postDate}"`
        );
        cy.postEditorPage.createAndPublicPostWithPreviousData(
            postTitle,
            postUrl,
            postDate
        );

        cy.log(`And I navigate to the post url "${postUrl}"`);
        cy.postViewerPage.navigateToPost(postUrl);

        // Then
        cy.log(`Then I should see a page with the post title "${postTitle}"`);
        cy.postViewerPage.getPostTitle().should("have.text", postTitle);

        cy.log("And I wait for 2 seconds");
        cy.wait(2000);
    });

    it("E00206 - Error al crear un post sin autor", () => {
        const postTitle = faker.word.words(2);
        const postUrl = faker.word.words(1);

        // Given
        cy.log(
            `Given I am an admin logged in with email "${adminUsername}" and password "${adminPassword}"`
        );
        cy.loginPage.loginAs(adminUsername, adminPassword);

        cy.log("And I am on the post editor page");
        cy.postEditorPage.visit();

        // When
        cy.log(
            `When I create and publish a post with title "${postTitle}" and url "${postUrl}"`
        );
        cy.postEditorPage.createPost(postTitle, postUrl);

        cy.log("And I click the Settings button");
        cy.postEditorPage.clickSettings();

        cy.log("And I remove the author");
        cy.postEditorPage.removeAuthor();

        cy.log("And I click the Settings button");
        cy.postEditorPage.clickSettings();

        cy.log("And I click the Publish button");
        cy.postEditorPage.clickEditorButton("Publish");

        // Then
        cy.log("Then I should see an error message");
        cy.postEditorPage
            .getErrorMessage(
                "Validation failed: At least one author is required."
            )
            .should("be.visible");

        cy.log("And I wait for 2 seconds");
        cy.wait(2000);
    });

    it("E00207 - Crear un post con extracto", () => {
        const postTitle = faker.word.words(2);
        const postUrl = faker.word.words(1);
        const postExcerpt = faker.string.sample(30);

        // Given
        cy.log(
            `Given I am an admin logged in with email "${adminUsername}" and password "${adminPassword}"`
        );
        cy.loginPage.loginAs(adminUsername, adminPassword);

        cy.log("And I am on the post editor page");
        cy.postEditorPage.visit();

        // When
        cy.log(
            `When I create and publish a post with title "${postTitle}" and url "${postUrl}"`
        );
        cy.postEditorPage.createPost(postTitle, postUrl);

        cy.log("And I click the Settings button");
        cy.postEditorPage.clickSettings();

        cy.log("And I write an excerpt");
        cy.postEditorPage.setExcerpt(postExcerpt);

        cy.log("And I click the Settings button");
        cy.postEditorPage.clickSettings();

        cy.log("And I publish the post");
        cy.postEditorPage.publishPost();

        cy.log(`And I navigate to the post url "${postUrl}"`);
        cy.postViewerPage.navigateToPost(postUrl);

        // Then
        cy.log(`Then I should see a page with the post title "${postTitle}"`);
        cy.postViewerPage.getPostTitle().should("have.text", postTitle);

        cy.log("And I wait for 2 seconds");
        cy.wait(2000);
    });

    it("E00208 - Error al crear un post con extracto demasiado largo", () => {
        const postTitle = faker.word.words(2);
        const postUrl = faker.word.words(1);
        const postExcerpt = faker.string.sample(301);

        // Given
        cy.log(
            `Given I am an admin logged in with email "${adminUsername}" and password "${adminPassword}"`
        );
        cy.loginPage.loginAs(adminUsername, adminPassword);

        cy.log("And I am on the post editor page");
        cy.postEditorPage.visit();

        // When
        cy.log(
            `When I create and publish a post with title "${postTitle}" and url "${postUrl}"`
        );
        cy.postEditorPage.createPost(postTitle, postUrl);

        cy.log("And I click the Settings button");
        cy.postEditorPage.clickSettings();

        cy.log("And I write an excerpt");
        cy.postEditorPage.setExcerpt(postExcerpt);

        cy.log("And I click the Settings button");
        cy.postEditorPage.clickSettings();

        cy.log("And I click the Publish button");
        cy.postEditorPage.clickEditorButton("Publish");

        // Then
        cy.log("Then I should see an error message");
        cy.postEditorPage
            .getErrorMessage(
                "Validation failed: Excerpt cannot be longer than 300 characters."
            )
            .should("be.visible");

        cy.log("And I wait for 2 seconds");
        cy.wait(2000);
    });

    it("E00209 - Crear un post con acceso a un tier de pago sin especificar el tier", () => {
        const postTitle = faker.word.words(2);
        const postUrl = faker.word.words(1);

        // Given
        cy.log(
            `Given I am an admin logged in with email "${adminUsername}" and password "${adminPassword}"`
        );
        cy.loginPage.loginAs(adminUsername, adminPassword);

        cy.log("And I am on the post editor page");
        cy.postEditorPage.visit();

        // When
        cy.log(
            `When I create and publish a post with title "${postTitle}" and url "${postUrl}"`
        );
        cy.postEditorPage.createPost(postTitle, postUrl);

        cy.log("And I click the Settings button");
        cy.postEditorPage.clickSettings();

        cy.log("And I set the post access to a paid tier");
        cy.postEditorPage.setPostAccess("Specific tier(s)");

        cy.log("And I remove the selected tier");
        cy.postEditorPage.removeSelectedTier();

        cy.log("And I click the Settings button");
        cy.postEditorPage.clickSettings();

        cy.log("And I publish the post");
        cy.postEditorPage.publishPost();

        cy.log(`And I navigate to the post url "${postUrl}"`);
        cy.postViewerPage.navigateToPost(postUrl);

        // Then
        cy.log(`Then I should see a page with the post title "${postTitle}"`);
        cy.postViewerPage.getPostTitle().should("have.text", postTitle);

        cy.log("And I wait for 2 seconds");
        cy.wait(2000);
    });
});
