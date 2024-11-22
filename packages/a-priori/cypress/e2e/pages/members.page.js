import { PageObjectClass } from "./page-object.class";

export class MembersPage extends PageObjectClass {
    navigateToCreateMembersPage() {
        cy.visit("/ghost/#/members/new");
        cy.wait(1000);
    }

    openNewMemberForm() {
        cy.get('a[href="#/members/new/"]').click();
        cy.url().should("include", "/#/members/new");
    }

    fillMemberDetailsComplete(name, email) {
        cy.get('input[name="name"]').type(name);
        cy.get('input[name="email"]').type(email);
    }

    setName(name) {
        const nameInput = cy.get('input[name="name"]');
        nameInput.clear();
        name && nameInput.type(name);
    }

    setEmail(email) {
        const emailInput = cy.get('input[name="email"]');
        emailInput.clear();
        email && emailInput.type(email),
            {
                parseSpecialCharSequences: false,
            };
    }

    saveMember() {
        cy.get("button.gh-btn-primary").click();
        cy.wait(1000);
    }

    getErrorMessage(errorMessage) {
        return cy.contains(errorMessage);
    }

    verifyMemberCreation() {
        // Validate the URL using a regular expression pattern
        cy.url().should(
            "match",
            /http:\/\/localhost:2368\/ghost\/#\/members\/[a-z0-9]{24}/
        );
    }

    verifyEmailError() {
        cy.get('input[name="email"]').parent().should("have.class", "error");
    }

    openMember(memberName) {
        cy.log("When I open the member to edit");
        cy.contains(".gh-list-data", memberName).click();
    }

    editMemberDetails(newName, newEmail) {
        cy.log("When I edit the member details");
        cy.get('input[name="name"]').clear().type(newName);
        cy.get('input[name="email"]').clear().type(newEmail);
        cy.get("button.gh-btn-primary").click();
    }

    verifyEditSuccess() {
        cy.log("Then the changes should be saved successfully");
        cy.get("button.gh-btn-primary")
            .should("have.class", "gh-btn-green")
            .and("contain", "Saved");
    }

    verifyUpdatedMemberInList(newName) {
        cy.log("Then I should see the updated member in the list");
        cy.get('a[href="#/members/"]').first().click();
        cy.contains(".gh-list-data", newName).should("exist");
    }

    clearEmail() {
        cy.log("When I clear the email field");
        cy.get('input[name="email"]').clear();
    }
}
