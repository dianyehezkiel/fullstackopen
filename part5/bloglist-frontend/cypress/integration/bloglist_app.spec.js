// bloglist_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const newUser = {
      username: 'dianyehezkiel',
      name: 'Dian Yehezkiel',
      password: 'pa55word'
    }
    cy.request('POST', 'http://localhost:3003/api/users', newUser)

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

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username-input').type('dianyehezkiel', { delay: 100 })
      cy.get('#password-input').type('pa55word', { delay: 100 })
      cy.get('#login-button').click()

      cy.contains('Welcome back, Dian Yehezkiel')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username-input').type('dianyehezkiel', { delay: 100 })
      cy.get('#password-input').type('wrong', { delay: 100 })
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Incorrect Username or Password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
})