// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:

import {
    LoginPage,
    PostEditorPage,
    PostListPage,
    PostViewerPage,
    ChangeLanguage,
    TagEditorPage,
    TagListPage,
    MembersPage,
    MemberListPage,
} from "../e2e/pages";
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

before(() => {
    cy.log("Global setup: Setting pages instances");
    cy.loginPage = new LoginPage();
    cy.postEditorPage = new PostEditorPage();
    cy.postListPage = new PostListPage();
    cy.postViewerPage = new PostViewerPage();
    cy.changeLanguage = new ChangeLanguage();
    cy.tagEditorPage = new TagEditorPage();
    cy.tagListPage = new TagListPage();
    cy.membersPage = new MembersPage();
    cy.memberListPage = new MemberListPage();
});

before(() => {
    const adminUsername = Cypress.env("ADMIN_USERNAME");
    const adminPassword = Cypress.env("ADMIN_PASSWORD");

    cy.log(
        `Given I am an admin logged in with email "${adminUsername}" and password "${adminPassword}"`
    );
    cy.loginPage.loginAs(adminUsername, adminPassword);
});
