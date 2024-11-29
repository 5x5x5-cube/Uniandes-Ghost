import { faker } from "@faker-js/faker";

describe("F004 - Ver perfil de staff", () => {

    it("E00401 - Ver perfil desde panel administrativo", () => {
 
        cy.log('Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"');
        cy.loginPage.loginAs(Cypress.env("ADMIN_USERNAME"),Cypress.env("ADMIN_PASSWORD"));


        cy.log('And I click in admin setting');
        cy.profileStaff.clickAdminSetting();

        cy.log('When I click your profile');
        cy.profileStaff.clickProfile();

        cy.log('Then I should be on the profile staff section');
        cy.profileStaff.verifyProfile();

       
    });

    it("E00402 - Ver perfil desde panel administrativo y modificar nombre", () => {
        const name = faker.word.words();
        cy.log('Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"');
        cy.loginPage.loginAs(Cypress.env("ADMIN_USERNAME"),Cypress.env("ADMIN_PASSWORD"));


        cy.log('And I click in admin setting');
        cy.profileStaff.clickAdminSetting();

        cy.log('When I click your profile');
        cy.profileStaff.clickProfile();

        cy.log('And I edit the name with name "$name-fullname"');
        cy.profileStaff.setName(name);

        cy.log('When I click in save');
        cy.profileStaff.clickSave();

        cy.log('I should be on the profile staff section with name "$$name-fullname"');
        cy.profileStaff.getName(name);

       
    });

    it("E00402 - Ver perfil desde panel administrativo y modificar email con email invalido", () => {
        const name = faker.word.words();
        cy.log('Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"');
        cy.loginPage.loginAs(Cypress.env("ADMIN_USERNAME"),Cypress.env("ADMIN_PASSWORD"));


        cy.log('And I click in admin setting');
        cy.profileStaff.clickAdminSetting();

        cy.log('When I click your profile');
        cy.profileStaff.clickProfile();

        cy.log('And I edit the name with email');
        cy.profileStaff.setEmail(name);

        cy.log('When I click in save');
        cy.profileStaff.clickSave();

        cy.log('I should be on the profile staff section with error email invalid');
        cy.contains("Enter a valid email address").should('exist');

       
    });

    it("E00402 - Ver perfil desde panel administrativo y modificar website con website invalido", () => {
        const name = faker.word.words();
        cy.log('Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"');
        cy.loginPage.loginAs(Cypress.env("ADMIN_USERNAME"),Cypress.env("ADMIN_PASSWORD"));


        cy.log('And I click in admin setting');
        cy.profileStaff.clickAdminSetting();

        cy.log('When I click your profile');
        cy.profileStaff.clickProfile();

        cy.log('And I edit the name with website');
        cy.profileStaff.setWebSite(name);

        cy.log('When I click in save');
        cy.profileStaff.clickSave();

        cy.log('I should be on the profile staff section with error url invalid');
        cy.contains("Enter a valid URL").should('exist');

       
    });


    it("E00402 - Ver perfil desde panel administrativo y modificar clave con clave antigua erronea", () => {
        const password = faker.string.alpha({ length: 15 });
        cy.log('Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"');
        cy.loginPage.loginAs(Cypress.env("ADMIN_USERNAME"),Cypress.env("ADMIN_PASSWORD"));


        cy.log('And I click in admin setting');
        cy.profileStaff.clickAdminSetting();

        cy.log('When I click your profile');
        cy.profileStaff.clickProfile();

        cy.log('And I click change password');
        cy.profileStaff.clickChangePassword();

        cy.log('And I input the old password');
        cy.profileStaff.setOldPassword(password);

        cy.log('And I input the new password');
        cy.profileStaff.setNewPassword(password);

        cy.log('And I input the verify password');
        cy.profileStaff.setVerifyPassword(password);

        cy.log('When I click in change password');
        cy.profileStaff.clickFinalChangePassword();

        cy.log('I should be on the profile staff section with error ');
        cy.contains("Your password is incorrect").should('exist');

       
    });


    it("E00402 - Ver perfil desde panel administrativo y modificar clave con clave nueva vacia", () => {
        const password = faker.string.alpha({ length: 15 });
        cy.log('Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"');
        cy.loginPage.loginAs(Cypress.env("ADMIN_USERNAME"),Cypress.env("ADMIN_PASSWORD"));


        cy.log('And I click in admin setting');
        cy.profileStaff.clickAdminSetting();

        cy.log('When I click your profile');
        cy.profileStaff.clickProfile();

        cy.log('And I click change password');
        cy.profileStaff.clickChangePassword();

        cy.log('And I input the old password');
        cy.profileStaff.setOldPassword(password);

       

        cy.log('When I click in change password');
        cy.profileStaff.clickFinalChangePassword();

        cy.log('I should be on the profile staff section with error ');
        cy.contains("Password must be at least 10 characters long.").should('exist');

       
    });

    it("E00402 - Ver perfil desde panel administrativo y modificar clave con menor a 10 caracteres", () => {
        const password = faker.string.alpha({ length: 9 });
        cy.log('Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"');
        cy.loginPage.loginAs(Cypress.env("ADMIN_USERNAME"),Cypress.env("ADMIN_PASSWORD"));


        cy.log('And I click in admin setting');
        cy.profileStaff.clickAdminSetting();

        cy.log('When I click your profile');
        cy.profileStaff.clickProfile();

        cy.log('And I click change password');
        cy.profileStaff.clickChangePassword();

        cy.log('And I input the old password');
        cy.profileStaff.setOldPassword(password);

        cy.log('And I input the new password');
        cy.profileStaff.setNewPassword(password);

        cy.log('And I input the verify password');
        cy.profileStaff.setVerifyPassword(password);

        cy.log('When I click in change password');
        cy.profileStaff.clickFinalChangePassword();

        cy.log('I should be on the profile staff section with error');
        cy.contains("Password must be at least 10 characters long.").should('exist');

       
    });



    it("E00402 - Ver perfil desde panel administrativo y modificar clave con clave de verificacion diferente a la nueva clave", () => {
        const password = faker.string.alpha({ length: 15 });
        const passwordVerify = faker.string.alpha({ length: 15 });
        cy.log('Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"');
        cy.loginPage.loginAs(Cypress.env("ADMIN_USERNAME"),Cypress.env("ADMIN_PASSWORD"));


        cy.log('And I click in admin setting');
        cy.profileStaff.clickAdminSetting();

        cy.log('When I click your profile');
        cy.profileStaff.clickProfile();

        cy.log('And I click change password');
        cy.profileStaff.clickChangePassword();

        cy.log('And I input the old password');
        cy.profileStaff.setOldPassword(password);

        cy.log('And I input the new password');
        cy.profileStaff.setNewPassword(password);

        cy.log('And I input the verify password');
        cy.profileStaff.setVerifyPassword(passwordVerify);

        cy.log('When I click in change password');
        cy.profileStaff.clickFinalChangePassword();

        cy.log('I should be on the profile staff section with error ');
        cy.contains("Your new passwords do not match").should('exist');

       
    });




});
