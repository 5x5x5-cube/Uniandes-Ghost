import { PageObjectClass } from "./page-object.class";

export class TagListPage extends PageObjectClass {
    navigateToTagListPage() {
        cy.visit("/ghost/#/tags");
        cy.wait(1000);
    }

    getTagFromList(tagName) {
        return cy
            .get(".gh-tags-list-item")
            .contains(".gh-tag-list-name", tagName)
            .parents(".gh-tags-list-item");
    }
}
