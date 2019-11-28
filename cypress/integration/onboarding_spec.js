// load type definitions that come with Cypress module
/// <reference types="cypress" />
describe('Onboarding', function () {
  function skip(){
    cy.get('#hideOnboardingPage').click({ force: true })
  }
  it('Enables weather tracking from onboarding', function () {
    cy.loginWithAccessTokenIfNecessary('/#/app/settings', true)
    cy.visit('/#/app/onboarding')
    cy.log("Waiting for connectors to populate...");
    cy.wait(15000);
    skip();
    skip();
    skip();
    skip();
    skip();
    cy.get("#enableWeatherTrackingButton").click({force: true})
    cy.log("Wait for weather connector from API...")
    cy.get('#postal-code-input', {timeout: 15000})
        .type('62025', { force: true })
    cy.get('body > div.popup-container.popup-showing.active > div > div.popup-buttons > button.button.ng-binding.button-positive')
        .click({ force: true })
    cy.get("#circle-page-title").contains("Import");
    cy.toastContains("Connecting")
  })
  it('Creates new use and anxiety reminder during onboarding', function () {
    cy.visit('/')
    cy.disableSpeechAndSkipIntro()
    cy.get('#signUpButton').click({ force: true })
    cy.enterNewUserCredentials()
    cy.get('#goToReminderSearchFromOnboarding', { timeout: 30000 }).click({ force: true })
    cy.wait(5000)
    cy.get('#variable-search-box').click({ force: true })
    cy.get('#variable-search-box').type('Anxiety', { force: true })
    cy.get('#variable-search-box').type('{enter}', { force: true })
    cy.get('#search-cancel-button').click({ force: true })
    skip()
    cy.get('#goToReminderSearchFromOnboarding').click({ force: true })
    cy.get('#variable-search-box').click({ force: true })
    cy.get('#variable-search-box').type('Back Pain', { force: true })
    cy.get('#search-cancel-button').click({ force: true })
    skip()
    skip()
    skip()
    skip()
    skip()
    skip()
    cy.get('#goToInboxButton').click({ force: true })
    cy.get('#hideHelpInfoCardButton').click({ force: true })
  })
})
