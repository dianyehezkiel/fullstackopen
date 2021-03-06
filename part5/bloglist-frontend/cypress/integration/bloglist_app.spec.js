// bloglist_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({
      username: 'dianyehezkiel',
      name: 'Dian Yehezkiel',
      password: 'pa55word'
    })
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
      cy.get('#username-input').type('dianyehezkiel')
      cy.get('#password-input').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Incorrect Username or Password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'dianyehezkiel', password: 'pa55word' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#blog-form').should('be.visible')

      cy.get('#title-input').type('This is a new blog created by cypress')
      cy.get('#author-input').type('Cypress')
      cy.get('#url-input').type('https://cypress.io')
      cy.get('#create-button').click()

      cy.contains('This is a new blog created by cypress Cypress')
    })

    describe('A blog exist', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Creating a blog with cypress',
          author: 'Cypress',
          url: 'https://cypress.io'
        })
      })

      it('A blog can be liked', function() {
        cy.contains('Creating a blog with cypress Cypress')
          .contains('view')
          .click()

        cy.contains('likes 0')

        cy.contains('like')
          .click()

        cy.contains('likes 1')
      })

      it('A blog can be removed by creator', function() {
        cy.contains('Creating a blog with cypress Cypress')
          .contains('view')
          .click()

        cy.contains('remove')
          .click()

        cy.get('.blog-head')
          .contains('Creating a blog with cypress Cypress')
          .should('not.be.exist')
      })

      it('A blog\'s remove button hidden from user that not create it', function() {
        cy.contains('Logout')
          .click()

        cy.createUser({
          username: 'otheruser',
          name: 'Other User',
          password: 'otherpassword'
        })
        cy.login({ username: 'otheruser', password: 'otherpassword' })

        cy.contains('Creating a blog with cypress Cypress')
          .contains('view')
          .click()

        cy.get('.blog-detail')
          .contains('remove')
          .should('have.css', 'display', 'none')
      })

      it('Blogs ordered according to likes (descending)', function() {
        cy.createBlog({
          title: 'Another blog',
          author: 'Cypress',
          url: 'https://cypress.io'
        })

        cy.contains('Another blog Cypress')
          .contains('view')
          .click()

        cy.contains('Another blog Cypress')
          .parent()
          .contains('like')
          .click()
        cy.wait(2000)

        cy.get('.blog').eq(0).should('contain', 'Another blog Cypress')
        cy.get('.blog').eq(1).should('contain', 'Creating a blog with cypress Cypress')

        cy.contains('Another blog Cypress')
          .contains('hide')
          .click()

        cy.contains('Creating a blog with cypress Cypress')
          .contains('view')
          .click()

        cy.contains('Creating a blog with cypress Cypress')
          .parent()
          .contains('like')
          .click()
        cy.wait(2000)

        cy.contains('Creating a blog with cypress Cypress')
          .parent()
          .contains('like')
          .click()
        cy.wait(2000)

        cy.get('.blog').eq(0).should('contain', 'Creating a blog with cypress Cypress')
        cy.get('.blog').eq(1).should('contain', 'Another blog Cypress')
      })
    })
  })
})