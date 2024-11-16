Feature: F009 - Editar miembro


@user200 @web
Scenario: E00901 - Editar un miembro
  Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"
  When I navigate to the Members page
  And I click on the Edit button for the first member
  And I enter "User updated" as the member name
  And I save the updated member
  Then I should see a success notification indicating the member was updated