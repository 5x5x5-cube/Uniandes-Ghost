describe("F009 - Ghost Admin Login and Member Creation", () => {
    it("E00801 - should log in to Ghost admin and create a new member successfully", () => {
        // Given
        cy.log(
            'Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"'
        );
        cy.loginPage.loginAs(
            Cypress.env("ADMIN_USERNAME"),
            Cypress.env("ADMIN_PASSWORD")
        );

        // When
        cy.log("When I navigate to the create members page");
        cy.membersPage.navigateToCreateMembersPage();

        const memberName = "New Member Cypress";
        const memberEmail = `newmember${Date.now()}@example.com`;

        cy.log("And the user has entered the new member details");
        cy.membersPage.fillMemberDetailsComplete(memberName, memberEmail);

        cy.log("And the user saves the new member");
        cy.membersPage.saveMember();

        cy.wait(500);

        // Then
        cy.log("Then the new member should be created successfully");
        cy.membersPage.verifyMemberCreation();
    });

    it("E00802 - should log in to Ghost admin and create a new member without email, then trigger an error message", () => {
        const memberName = "New Member Cypress";

        // Given
        cy.log(
            'Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"'
        );
        cy.loginPage.loginAs(
            Cypress.env("ADMIN_USERNAME"),
            Cypress.env("ADMIN_PASSWORD")
        );

        // When
        cy.log("When I navigate to the create members page");
        cy.membersPage.navigateToCreateMembersPage();

        cy.log(
            "And the user has entered the new member details without an email"
        );
        cy.membersPage.fillMemberDetails(memberName);

        cy.log("And the user saves the new member");
        cy.membersPage.saveMember();

        cy.log("Then an error should be displayed due to missing email");
        cy.membersPage.verifyEmailError();
    });
});
