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
        cy.get('#tag-name').type(name);
        cy.wait(1000);
    }

    saveChanges() {
        cy.get('.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click();
        cy.wait(1000);
    }

    exitEditor() {
        cy.get('.gh-canvas-title > a[href="#/tags/"]').click();
    }
}
