import { faker } from "@faker-js/faker";

describe("F004 - Ver perfil de staff", () => {

    it("E00402 - Ver perfil desde panel administrativo y modificar nombre", () => {
        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/post.json?key=07dfb270&count=1',
        }).then((response) => {
            const postData = response.body[0];
            const name = postData.title;
            cy.log('Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"');
            cy.loginPage.loginAs(Cypress.env("ADMIN_USERNAME"), Cypress.env("ADMIN_PASSWORD"));


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

    });


    it("E00402 - Ver perfil desde panel administrativo y modificar nombre vacio", () => {
        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/invalidprofile.json?key=07dfb270&count=1',
        }).then((response) => {
            const postData = response.body[0];
    
            cy.log('Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"');
            cy.loginPage.loginAs(Cypress.env("ADMIN_USERNAME"), Cypress.env("ADMIN_PASSWORD"));


            cy.log('And I click in admin setting');
            cy.profileStaff.clickAdminSetting();

            cy.log('When I click your profile');
            cy.profileStaff.clickProfile();

            cy.log('And I edit the name with name empty');
            cy.profileStaff.clearName();

            cy.log('When I click in save');
            cy.profileStaff.clickSave();

            cy.log('I should be on the profile staff section with name "$$name-fullname"');
            cy.contains(postData.error_name).should('exist');
        });
        

    });


});
