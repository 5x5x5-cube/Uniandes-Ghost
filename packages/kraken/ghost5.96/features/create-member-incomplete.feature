Feature: F008 - Crear miembro


@user200 @web
Scenario: E00802 - Crear un nuevo miembro con informacion incompleta
  Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"
  When I navigate to the Members page
  And I click on New Member
  And I enter "John Doe 2" as the member name
  And I save the new member
  Then I should see an error indicating the email is required