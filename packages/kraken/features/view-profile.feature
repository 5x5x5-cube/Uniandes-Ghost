Feature: F004 - View Profile Staff

@user9 @web
Scenario: View Profile Staff
  Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"
  And I wait for 2 seconds
  And I click in admin setting
  And I wait for 4 seconds
  And I click your profile
  And I wait for 2 seconds
  Then I should be on the profile staff section


