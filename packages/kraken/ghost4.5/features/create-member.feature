Feature: F008 - Crear miembro


@user100 @web
Scenario: E00801 - Crear un nuevo miembro
  Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"
  When I navigate to the Members page
  And I click on New Member
  And I enter "John Doe" as the member name
  And I enter a dynamically generated email as the member email
  And I save the new member
  Then the member creation URL should be correct
