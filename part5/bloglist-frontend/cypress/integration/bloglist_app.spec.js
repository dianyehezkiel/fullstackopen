// bloglist_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login to Application')
    cy.contains('username')
    cy.contains('password')
    cy.get('#username-input').should('be.visible')
    cy.get('#password-input').should('be.visible')
    cy.get('#login-button').contains('Login')
  })
})