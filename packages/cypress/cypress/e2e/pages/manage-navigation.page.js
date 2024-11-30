import { PageObjectClass } from "./page-object.class";

export class ManageNavigationPage extends PageObjectClass {
    navigationContainer = 'div[data-testid="navigation"]';
    navigationModal = 'section[data-testid="navigation-modal"]';
    navigationItem = 'div[data-testid="new-navigation-item"]';
    itemLabel = `input[placeholder="New item label"]`;
    metadataDescription = `input[placeholder="Thoughts, stories and ideas."]`;

    createNewNavigationItem(label, url) {
        cy.get(`${this.navigationContainer} button`)
            .contains("Customize")
            .click();
        cy.wait(1000);
        this.setNewItemLabel(label);
        cy.wait(1000);
        this.setNewItemUrl(url);
        cy.wait(1000);
        this.clickSaveNavigationButton();
        cy.wait(1000);
    }

    setNewItemLabel(label) {
        cy.get(`${this.navigationModal} ${this.navigationItem}`)
            .find(this.itemLabel)
            .clear()
            .type(label);
    }

    setNewItemUrl(url) {
        cy.get(`${this.navigationModal} ${this.navigationItem}`)
            .contains("URL")
            .parent()
            .find("input")
            .clear()
            .type(url);
    }

    clickSaveNavigationButton() {
        cy.get(this.navigationModal).find("button").contains("Save").click();
    }
}
