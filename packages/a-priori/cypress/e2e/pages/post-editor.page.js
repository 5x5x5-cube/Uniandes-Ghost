import { PageObjectClass } from "./page-object.class";

export class PostEditorPage extends PageObjectClass {
    postEditorPage = "/ghost/#/editor/post";

    visit() {
        cy.visit(this.postEditorPage);
        cy.wait(1000);
    }

    publishPost() {
        this.clickEditorButton("Publish");
        cy.wait(1000);
        this.clickContinue();
        cy.wait(1000);
        this.clickConfirmPublish();
        cy.wait(1000);
    }

    setTitle(title) {
        const titleInput = cy.get("textarea[data-test-editor-title-input]");
        titleInput.clear();
        title &&
            titleInput.type(title, {
                parseSpecialCharSequences: false,
            });
    }

    setContent(content) {
        const data = cy.get(
            'div[data-secondary-instance="false"] p[data-koenig-dnd-droppable="true"]'
        );
        data.click().clear();
        content && data.click().type(content);
    }

    clickSettings() {
        cy.get("button[title='Settings']").click();
    }

    setUrl(url) {
        this.clickSettings();
        cy.wait(1000);
        const urlInput = cy.get("input#url");
        urlInput.clear({ force: true });
        url && urlInput.type(url, { force: true });
        this.clickSettings();
        cy.wait(1000);
    }

    getEditorButton(buttonName) {
        return cy.get(`button.gh-btn-editor>span`).contains(buttonName);
    }

    assertEditorButton(buttonText, assertion) {
        this.getEditorButton(buttonText).should(assertion);
    }

    clickEditorButton(buttonName) {
        this.getEditorButton(buttonName).click();
    }

    clickContinue() {
        cy.get(`button.gh-btn-black>span`)
            .contains("Continue, final review →")
            .click();
    }

    clickConfirmPublish() {
        cy.get(`button[data-test-button="confirm-publish"]`).click();
    }

    clickBookmarkLink() {
        cy.get("a[data-test-complete-bookmark]").click();
    }

    clickReturnArrow() {
        cy.get('a[data-test-link="posts"]').click();
    }
}
