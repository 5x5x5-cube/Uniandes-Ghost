import { PageObjectClass } from "./page-object.class";

export class LoginPage extends PageObjectClass {
    visit() {
        cy.visit("/ghost/#/signin");
        cy.wait(1000);
    }

    enterEmail(email) {
        cy.get('input[name="identification"]').type(email);
        cy.wait(1000);
    }

    enterPassword(password) {
        cy.get('input[name="password"]').type(password);
        cy.wait(1000);
    }

    clickSignIn() {
        cy.get('button[type="submit"]').click();
        cy.wait(1000);
    }

    loginAs(email, password) {
        this.visit();
        this.enterEmail(email);
        this.enterPassword(password);
        this.clickSignIn();
    }
}
