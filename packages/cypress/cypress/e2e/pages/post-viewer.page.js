import { PageObjectClass } from "./page-object.class";

export class PostViewerPage extends PageObjectClass {
    navigateToPost(url) {
        cy.visit(`/${url?.toLowerCase()}`);
        cy.wait(1000);
    }

    getPostTitle() {
        return cy.get("h1.gh-article-title");
    }
}
