import { faker } from "@faker-js/faker";

describe("F009 - Ghost Admin Login and Member Creation", () => {
    it("E00801 - should log in to Ghost admin and create a new member successfully", () => {
        // When the user enters valid login credentials and submits
        cy.log(
            'Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"'
        );
        cy.loginPage.loginAs(
            Cypress.env("ADMIN_USERNAME"),
            Cypress.env("ADMIN_PASSWORD")
        );

        cy.log("Then the user should be redirected to the dashboard");
        cy.wait(5000);
        cy.dashboardPage.verifyDashboard();

        cy.log("Given the user navigates to the Members section");
        cy.dashboardPage.navigateToMembers();

        cy.log("When the user opens the new member form");
        cy.membersPage.openNewMemberForm();
        cy.log("Then the new member form should be displayed");

        const memberName = faker.name.fullName(); 
        const memberEmail = faker.internet.email(); 

        cy.log("Given the user has entered the new member details");
        cy.membersPage.fillMemberDetailsComplete(memberName, memberEmail);

        cy.log("When the user saves the new member");
        cy.membersPage.saveMember();

        cy.wait(500);

        cy.membersPage.verifyMemberCreation();
    });

    it("E00802 - should log in to Ghost admin and create a new member without email, then trigger an error message", () => {
        // When the user enters valid login credentials and submits
        cy.log(
            'Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"'
        );
        cy.loginPage.loginAs(
            Cypress.env("ADMIN_USERNAME"),
            Cypress.env("ADMIN_PASSWORD")
        );

        // Then the user should be redirected to the dashboard
        cy.wait(5000); // Ensure the page loads completely
        cy.dashboardPage.verifyDashboard();

        cy.log("Given the user navigates to the Members section");
        cy.dashboardPage.navigateToMembers();

        cy.log("When the user opens the new member form");
        cy.membersPage.openNewMemberForm();

        cy.log("Then the new member form should be displayed");
        const memberName = faker.name.fullName(); // Generate a random name

        cy.log(
            "Given the user has entered the new member details without an email"
        );
        cy.membersPage.fillMemberDetails(memberName);

        cy.log("When the user saves the new member");
        cy.membersPage.saveMember();

        cy.log("Then an error should be displayed due to missing email");
        cy.membersPage.verifyEmailError();
    });

    it("E00803 - should log in and create a new member with a long name successfully", () => {
        cy.log(
            'Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"'
        );
        cy.loginPage.loginAs(
            Cypress.env("ADMIN_USERNAME"),
            Cypress.env("ADMIN_PASSWORD")
        );
    
        cy.log("Then the user should be redirected to the dashboard");
        cy.wait(5000);
        cy.dashboardPage.verifyDashboard();
    
        cy.log("Given the user navigates to the Members section");
        cy.dashboardPage.navigateToMembers();
    
        cy.log("When the user opens the new member form");
        cy.membersPage.openNewMemberForm();
        cy.log("Then the new member form should be displayed");
    
        const longMemberName = faker.lorem.words(15); // Generate a very long name
        const memberEmail = faker.internet.email();
    
        cy.log("Given the user has entered the new member details with a long name");
        cy.membersPage.fillMemberDetailsComplete(longMemberName, memberEmail);
    
        cy.log("When the user saves the new member");
        cy.membersPage.saveMember();
    
        cy.log("Then the new member should be created successfully");
        cy.membersPage.verifyMemberCreation();
    });
    
});
