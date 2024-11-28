import { PageObjectClass } from "./page-object.class";
import { faker } from "@faker-js/faker";

export class PostEditorPage extends PageObjectClass {
    postEditorPage = "/ghost/#/editor/post";

    visit() {
        cy.visit(this.postEditorPage);
        cy.wait(1000);
    }

    createPost(title, url) {
        this.setTitle(title);
        this.setContent(faker.lorem.paragraph());
        cy.wait(1000);
        this.clickSettings();
        cy.wait(1000);
        this.setUrl(url);
        cy.wait(1000);
        this.clickSettings();
    }

    publishPost() {
        this.clickEditorButton("Publish");
        cy.wait(1000);
        this.clickContinue();
        cy.wait(1000);
        this.clickConfirmPublish();
    }

    createAndPublishPost(title, url) {
        this.createPost(title, url);
        cy.wait(1000);
        this.publishPost();
        cy.wait(1000);
    }

    createAndPublicPostWithPreviousData(title, url, date) {
        this.createPost(title, url);
        cy.wait(1000);
        this.clickSettings();
        cy.wait(1000);
        this.setDate(date);
        cy.wait(1000);
        this.clickSettings();
        cy.wait(1000);
        this.publishPost();
        cy.wait(1000);
    }

    setTitle(title) {
        cy.get("textarea[data-test-editor-title-input]").type(title);
    }

    setContent(content) {
        const data = cy.get(
            'div[data-secondary-instance="false"] p[data-koenig-dnd-droppable="true"]'
        );
        data.click().type(content);
    }

    setDate(date) {
        const formattedDate = new Date(date).toISOString().split("T")[0];
        const dateInput = cy.get(
            "input[data-test-date-time-picker-date-input]"
        );
        dateInput.clear();
        dateInput.type(formattedDate, { force: true });

        const formattedTime = new Date(date)
            .toISOString()
            .split("T")[1]
            .split(".")[0];
        const timeInput = cy.get(
            "input[data-test-date-time-picker-time-input]"
        );
        timeInput.clear();
        timeInput.type(formattedTime, { force: true });
    }

    clickSettings() {
        cy.get("button[title='Settings']").click();
    }

    setUrl(url) {
        const urlInput = cy.get("input#url");
        urlInput.clear({ force: true });
        urlInput.type(url, { force: true });
    }

    setExcerpt(excerpt) {
        const excerptInput = cy.get("textarea#custom-excerpt");
        excerptInput.clear();
        excerptInput.type(excerpt, {
            force: true,
            parseSpecialCharSequences: false,
        });
    }

    removeAuthor() {
        const currentAuthor = cy.get(
            `div#author-list span[aria-label="remove element"]`
        );
        currentAuthor.click();
    }

    setPostAccess(postAccess) {
        const selector = cy.get('select[data-test-select="post-visibility"]');
        selector.select(postAccess);
    }

    removeSelectedTier() {
        cy.get(
            'div[data-test-visibility-segment-select] span[aria-label="remove element"]'
        ).click();
    }

    clickEditorButton(buttonName) {
        cy.get(`button.gh-btn-editor>span`).contains(buttonName).click();
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

    getErrorMessage(message) {
        return cy.contains(message);
    }
}
