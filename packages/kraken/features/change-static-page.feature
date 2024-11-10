Feature: F007 - Manage Static Page

@user1 @web
Scenario: E00702 - Update and publish an existing static page
  Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"
  And I am on the page editor page
  And I create and publish a page with title "$name_post-title" and url "$name_post-url"
  And I close the page published modal
  And I navigate to the publised pages page
  When I select the page "$$name_post-title" to edit 
  And I click the "Edit" editor button in the Page editor
  And I set the page title to "$name_updated-post-title"
  And I set the page content to "$name_updated-post-content"
  And I click the "Update" editor button in the Page editor
  And I navigate to the page url "$$name_post-url"
  Then I should see a page with the page title "$$name_updated-post-title"
  And I wait for 2 seconds
