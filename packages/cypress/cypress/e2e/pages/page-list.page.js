import { PageObjectClass } from "./page-object.class";

export class PageListPage extends PageObjectClass {
    postListPage = "/ghost/#/pages";

    visit() {
        cy.visit(this.postListPage);
        cy.wait(1000);
    }

    navigateToPublishedPagesList() {
        cy.visit(`${this.postListPage}?type=published`);
        cy.wait(1000);
    }
}

export default new PageListPage();
