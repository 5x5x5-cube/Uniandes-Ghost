import { dataPool } from "../fixtures/create-member";

describe("F009 - Ghost Admin Login and Member Creation", () => {
    dataPool.forEach(({ test, name, email }) => {
        it("E00801 - should log in to Ghost admin and create a new member successfully", () => {
            // Given
            cy.log("Given I am logged in as an admin");
            cy.loginPage.loggedAsAdmin();

            cy.log("When I navigate to the create members page");
            cy.membersPage.navigateToCreateMembersPage();

            cy.log(`And I set a name ${name}`);
            cy.membersPage.setName(name);

            cy.log(`And I set a email ${email}`);
            cy.membersPage.setEmail(email);

            cy.log("And I save the changes ");
            cy.membersPage.saveMember();

            if (test.outcome === "success") {
                cy.log("And I navigate to the Member list page");
                cy.memberListPage.navigateToMemberListPage();

                // Then
                cy.log(
                    `Then I should see the new member email "${test.assert_text}"`
                );
                cy.memberListPage
                    .getMemberFromList(test.assert_text)
                    .should(test.assert_type);
            } else if (test.outcome === "error") {
                // Then
                cy.log("Then I should see an error message");
                cy.membersPage
                    .getErrorMessage(test.assert_text)
                    .should(test.assert_type);
            }
        });
    });
    // it("E00802 - should log in to Ghost admin and create a new member without email, then trigger an error message", () => {
    //     // When the user enters valid login credentials and submits
    //     cy.log(
    //         'Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"'
    //     );
    //     cy.loginPage.loginAs(
    //         Cypress.env("ADMIN_USERNAME"),
    //         Cypress.env("ADMIN_PASSWORD")
    //     );

    //     // Then the user should be redirected to the dashboard
    //     cy.wait(5000); // Ensure the page loads completely
    //     cy.dashboardPage.verifyDashboard();

    //     cy.log("Given the user navigates to the Members section");
    //     cy.dashboardPage.navigateToMembers();

    //     cy.log("When the user opens the new member form");
    //     cy.membersPage.openNewMemberForm();

    //     cy.log("Then the new member form should be displayed");
    //     const memberName = "New Member Cypress";

    //     cy.log(
    //         "Given the user has entered the new member details without an email"
    //     );
    //     cy.membersPage.fillMemberDetails(memberName);

    //     cy.log("When the user saves the new member");
    //     cy.membersPage.saveMember();

    //     cy.log("Then an error should be displayed due to missing email");
    //     cy.membersPage.verifyEmailError();
    // });
});
