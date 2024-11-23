describe("F009 - Ghost Admin Login and Member Creation", () => {
    it("E00801 - should log in to Ghost admin and create a new member successfully", () => {
        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/member.json?key=07dfb270&count=1',
        }).then((response) => {
            const memberData = response.body[0];
            const memberName = memberData.name;
            const memberEmail =memberData.email;
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

            

            cy.log("Given the user has entered the new member details");
            cy.membersPage.fillMemberDetailsComplete(memberName, memberEmail);

            cy.log("When the user saves the new member");
            cy.membersPage.saveMember();

            cy.wait(500);

            cy.membersPage.verifyMemberCreation();
        });
    });

    it("E00802 - should log in to Ghost admin and create a new member without email, then trigger an error message", () => {
        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/member.json?key=07dfb270&count=1',
        }).then((response) => {
            const memberData = response.body[0];
            const memberName = memberData.name;

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

            cy.log(
                "Given the user has entered the new member details without an email"
            );
            cy.membersPage.fillMemberDetails(memberName);

            cy.log("When the user saves the new member");
            cy.membersPage.saveMember();

            cy.log("Then an error should be displayed due to missing email");
            cy.membersPage.verifyEmailError();
        });
    });


    it("E00802 - should log in to Ghost admin and create a new member invalid email, then trigger an error message", () => {
        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/member.json?key=07dfb270&count=1',
        }).then((response) => {
            const memberData = response.body[0];
            const memberName = memberData.name;
            const email = memberData.invalid_email;
            
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

            cy.log(
                "Given the user has entered the new member details without an email"
            );
            cy.membersPage.fillMemberDetailsComplete(memberName, email);


            cy.log("When the user saves the new member");
            cy.membersPage.saveMember();

            cy.log("Then an error should be displayed due to missing email");
            cy.contains(memberData.error_invalid_email).should('be.visible');
        });
    });
});
