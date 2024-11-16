Feature: F009 - Editar miembro


@user200 @web
Scenario: E00902 - Editar un miembro con información incompleta
  Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"
  When I navigate to the Members page
  And I click on the Edit button for the first member
  And I enter "user200web" as the member email
  And I save the updated member
  Then I should see an error indicating the email is invalid