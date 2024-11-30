import { PageObjectClass } from "./page-object.class";

export class SetMetadataPage extends PageObjectClass {
    metadataTitle =
        'input:not([placeholder="Thoughts, stories and ideas."])[type="text"]';
    metadataDescription = 'input[placeholder="Thoughts, stories and ideas."]';
    searchEngineMetadataContainer = 'div[data-testid="metadata"]';
    xMetadataContainer = 'div[data-testid="twitter"]';
    facebookMetadataContainer = 'div[data-testid="facebook"]';

    updateSearchEngineMetadata(title, description) {
        this.setMetadata(
            title,
            description,
            this.searchEngineMetadataContainer
        );
        cy.wait(1000);
        this.clickSaveMetadataButton(this.searchEngineMetadataContainer);
        cy.wait(1000);
    }

    getSavedSearchEngineMetadataButton() {
        return this.getSavedMetadataButton(this.searchEngineMetadataContainer);
    }

    updateXMetadata(title, description) {
        this.setMetadata(title, description, this.xMetadataContainer);
        cy.wait(1000);
        this.clickSaveMetadataButton(this.xMetadataContainer);
        cy.wait(1000);
    }

    getSavedXMetadataButton() {
        return this.getSavedMetadataButton(this.xMetadataContainer);
    }

    updateFacebookMetadata(title, description) {
        this.setMetadata(title, description, this.facebookMetadataContainer);
        cy.wait(1000);
        this.clickSaveMetadataButton(this.facebookMetadataContainer);
        cy.wait(1000);
    }

    getSavedFacebookMetadataButton() {
        return this.getSavedMetadataButton(this.facebookMetadataContainer);
    }

    setMetadata(title, description, metadataContainer) {
        cy.get(`${metadataContainer} button`).contains("Edit").click();
        cy.wait(1000);
        cy.get(`${metadataContainer} ${this.metadataTitle}`)
            .clear()
            .type(title);
        cy.wait(1000);
        cy.get(`${metadataContainer} ${this.metadataDescription}`)
            .clear()
            .type(description);
    }

    clickSaveMetadataButton(metadataContainer) {
        cy.get(`${metadataContainer} button`).contains("Save").click();
    }

    getSavedMetadataButton(metadataContainer) {
        return cy.get(`${metadataContainer} button`).contains("Saved");
    }
}
