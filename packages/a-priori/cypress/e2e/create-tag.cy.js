import { dataPool } from "../fixtures/create-tag";

describe("F010 - Crear tag", () => {
    dataPool.forEach(({ test, name, description, color, slug }) => {
        it("E01001 - Crear una nueva etiqueta", () => {
            cy.log(test.description);

            // Given
            cy.log("Given I am logged in as an admin");
            cy.loginPage.loggedAsAdmin();

            cy.log("And I am in the Tag editor page");
            cy.tagEditorPage.navigateToTagEditorPage();

            // When
            cy.log(`When I set a tag "${name}"`);
            cy.tagEditorPage.setName(name);

            cy.log(`And I set a color "${color}"`);
            cy.tagEditorPage.setColor(color);

            cy.log(`And I set a slug "${slug}"`);
            cy.tagEditorPage.setSlug(slug);

            cy.log(`And I set a description "${description}"`);
            cy.tagEditorPage.setDescription(description);

            cy.log("And I save the changes");
            cy.tagEditorPage.saveChanges();

            if (test.outcome === "success") {
                cy.log("And I navigate to the Tag list page");
                cy.tagListPage.navigateToTagListPage();

                // Then
                cy.log(
                    `Then I should see the new tag name "${test.assert_text}"`
                );
                cy.tagListPage
                    .getTagFromList(test.assert_text)
                    .should(test.assert_type);

                cy.log("And I wait for 2 seconds");
                cy.wait(2000);
            } else if (test.outcome === "error") {
                // Then
                cy.log("Then I should see an error message");
                cy.tagEditorPage
                    .getErrorMessage(test.assert_text)
                    .should(test.assert_type);
            }
        });
    });
});
