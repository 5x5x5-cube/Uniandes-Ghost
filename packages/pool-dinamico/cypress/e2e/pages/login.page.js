import { PageObjectClass } from "./page-object.class";

export class LoginPage extends PageObjectClass {
    visit() {
        cy.visit("/ghost/#/signin");
        cy.wait(1000);
    }

    enterEmail(email) {
        cy.get("#identification").type(email);
        cy.wait(1000);
    }

    enterPassword(password) {
        cy.get("#password").type(password);
        cy.wait(1000);
    }

    clickSignIn() {
        cy.get("#ember5").click();
        cy.wait(1000);
    }

    loginAs(email, password) {
        this.visit();
        this.enterEmail(email);
        this.enterPassword(password);
        this.clickSignIn();
    }
}
