import { PageObjectClass } from "./page-object.class";

export class MemberListPage extends PageObjectClass {
    navigateToMemberListPage() {
        cy.visit("/ghost/#/members");
        cy.wait(1000);
    }

    getMemberFromList(memberName) {
        return cy
            .get(".gh-members-list-name-container")
            .contains(".gh-members-list-name", memberName);
    }
}
