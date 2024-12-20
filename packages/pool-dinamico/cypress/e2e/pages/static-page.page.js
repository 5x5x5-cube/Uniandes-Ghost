import { PageObjectClass } from "./page-object.class";

class StaticPage extends PageObjectClass {
    navigateToPages() {
        cy.get('a[href="#/pages/"]').first().click();
        cy.url().should("include", "/ghost/#/pages");
    }

    createNewPage(pageTitle, pageContent) {
        cy.get("a[data-test-new-page-button]").click();
        cy.get("textarea.gh-editor-title").type(pageTitle);
        cy.get("[data-koenig-dnd-droppable]").first().click().type(pageContent);
    }

    publishPage() {
        cy.contains("button", "Publish").first().click();
        cy.contains("button", "Continue").first().should("be.visible").click();
        cy.contains("button", "Publish page, right now")
            .first()
            .should("be.visible")
            .click();
    }

    verifyPagePublished() {
        cy.contains("Boom! It's out there. Your page is published.")
            .should("be.visible")
            .and("contain", "Boom! It's out there.");
    }

    selectPage() {
        cy.get(".gh-post-list-cta.edit ").first().click();
    }

    editPageTitle(newTitle) {
        cy.get("textarea.gh-editor-title").clear().type(newTitle);
    }

    editPageContent(newContent) {
        cy.get("[data-koenig-dnd-droppable]")
            .first()
            .click()
            .clear()
            .type(newContent);
    }

    clickNewPageButton() {
        cy.get("a[data-test-new-page-button]").click();
    }

    fillInPageDetails(title, content) {
        cy.get("textarea.gh-editor-title").type(title);
        cy.get("[data-koenig-dnd-droppable]").first().click().type(content);
    }

    savePage() {
        cy.contains("button", "Update").click(); // Click the "Update" button to save
    }

    verifySuccessMessage() {
        cy.contains(".gh-notification-content", "Page updated")
            .should("be.visible")
            .and("contain", "Page updated");
    }
}

export default new StaticPage();
