import { PageObjectClass } from "./page-object.class";

export class TagEditorPage extends PageObjectClass {
    navigateToTagEditorPage() {
        cy.visit("/ghost/#/tags/new");
        cy.wait(1000);
    }

    createTag(name) {
        this.setName(name);
        this.saveChanges();
    }

    setName(name) {
        const nameInput = cy.get('input[data-test-input="tag-name"]');
        name && nameInput.type(name);
        cy.wait(1000);
    }

    setColor(color) {
        const colorInput = cy.get('input[data-test-input="accentColor"]');
        colorInput.clear();
        color && colorInput.type(color);
        cy.wait(1000);
    }

    setDescription(description) {
        const descriptionInput = cy.get(
            'textarea[data-test-input="tag-description"]'
        );
        descriptionInput.clear();
        description && descriptionInput.type(description);
        cy.wait(1000);
    }

    setSlug(slug) {
        const slugInput = cy.get('input[data-test-input="tag-slug"]');
        slugInput.clear();
        slug && slugInput.type(slug);
        cy.wait(1000);
    }

    saveChanges() {
        cy.get('button[data-test-button="save"]').click();
        cy.wait(1000);
    }

    exitEditor() {
        cy.get('a[data-test-link="tags-back"]').click();
    }

    getErrorMessage(errorMessage) {
        return cy.contains(errorMessage);
    }
}
