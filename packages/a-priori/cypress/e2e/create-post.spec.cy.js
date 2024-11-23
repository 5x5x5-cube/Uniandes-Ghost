import { dataPool } from "../fixtures/create-post";

describe("F002 - Crear post", () => {
    dataPool.forEach(({ test, title, content, url_word }) => {
        it("E00201 - Crear un post y publicarlo", () => {
            cy.log(test.description);

            const postTitle = title;
            const postUrl = url_word;
            const postContent = content;

            // Given
            cy.log("Given I am logged in as an admin");
            cy.loginPage.loggedAsAdmin();

            cy.log("And I am on the post editor page");
            cy.postEditorPage.visit();

            // When
            cy.log(`When I set a title "${postTitle}"`);
            cy.postEditorPage.setTitle(postTitle);

            cy.log(`And I set a conent "${postContent}"`);
            cy.postEditorPage.setContent(postContent);

            cy.log(`And I set a URL "${postUrl}"`);
            cy.postEditorPage.setUrl(postUrl);

            if (test.outcome === "success") {
                cy.log(`And I pubish the post`);
                cy.postEditorPage.publishPost();

                // Then
                cy.log("Then I should see a success message");
                cy.postListPage
                    .getModalContent()
                    .contains(test.assert_text)
                    .should(test.assert_type);
            } else if (test.outcome === "error") {
                // Then
                cy.log("Then I should not see publish button");
                cy.postEditorPage.assertEditorButton(
                    test.assert_text,
                    test.assert_type
                );
            }

            cy.log("And I wait for 2 seconds");
            cy.wait(2000);
        });
    });
});
