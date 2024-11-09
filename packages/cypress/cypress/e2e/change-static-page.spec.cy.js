import DashboardPage from './pages/dashboard.page';
import StaticPage from './pages/static-page.page';

describe('Ghost Admin - Static Page Management', () => {
    
     it('should create, and publish a new static page successfully', () => {

     const pageTitle = 'About Us';
     const pageContent = 'This is the About Us page content for our site.';
    
      cy.log('Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"');
      cy.loginPage.loginAs(Cypress.env("ADMIN_USERNAME"),Cypress.env("ADMIN_PASSWORD"));
      
      cy.log('Then the user should be redirected to the dashboard');
      cy.wait(5000);
      DashboardPage.verifyDashboard();

      DashboardPage.navigateToPagesList();

      cy.log('When I click on the "New Page" button and fill page details');
      StaticPage.clickNewPageButton();
      StaticPage.fillInPageDetails(pageTitle, pageContent);

      cy.log('Then: I should be able to publish the page and verify page has been published');
      StaticPage.publishPage();
      StaticPage.verifyPagePublished();
 
     
    });

    it('should update, and publish a new static page successfully', () => {

    cy.log('Given I am an admin logged in with email "<ADMIN_USERNAME>" and password "<ADMIN_PASSWORD>"');
    cy.loginPage.loginAs(Cypress.env("ADMIN_USERNAME"),Cypress.env("ADMIN_PASSWORD"));
    
    cy.log('Then the user should be redirected to the dashboard');
    cy.wait(5000);
    DashboardPage.verifyDashboard();

    const existingPageTitle = 'About Us'; 
    const newPageTitle = 'About Us - Updated'; 
    const newPageContent = 'This is the updated About Us page content.';

    cy.log('Given: I am on the Pages screen');
    DashboardPage.navigateToPagesList();

    cy.log('When: I select the existing page to edit');
    StaticPage.selectPage(existingPageTitle); 

    cy.log('And: I edit the page title and content');
    StaticPage.editPageTitle(newPageTitle); 
    StaticPage.editPageContent(newPageContent); 

    cy.log('Then: I should be able to publish the changes');
    StaticPage.publishPage(); 

    cy.log('And: I should see a success message confirming the page is published');
    StaticPage.verifyPagePublished(); 


    });
  });
  