describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/testing/reset')
    cy.createUser({ username: 'front', name: 'cypress', password: 'test' })
  })
  it('Login form is shown', function() {
    cy.contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('front')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('front logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('front')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('#error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'front logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'front', password: 'test' })
    })

    it('A blog can be created', function() {
      cy.contains('create new').click()

      cy.get('#title').type('cypress test add blog')
      cy.get('#author').type('cypress')
      cy.get('#url').type('http://cypress/addblog')

      cy.get('#create-blog').click()

      cy.get('#success')
        .should('contain', 'A new blog cypress test add blog created by front')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    describe('And blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'like blog test 1',
          author: 'like test 1',
          url: 'http://cypress/liketest1',
          likes: 1
        })

        cy.createBlog({
          title: 'like blog test 2',
          author: 'like test 2',
          url: 'http://cypress/liketest2',
        })
      })
      it('Can like blog', function () {
        cy.contains('like blog test 1').parent().find('#view').click()
        cy.contains('like blog test 1').parent().find('#like').click()
        cy.contains('like blog test 1').parent().find('.testLike')
          .should('contain', '2')

        cy.contains('like blog test 2').parent().find('#view').click()
        cy.contains('like blog test 2').parent().find('#like').click()
        cy.contains('like blog test 2').parent().find('.testLike')
          .should('contain', '1')
      })
      it('Blogs are sorted by likes', function () {
        cy.get('.view-button').then(buttons => {
          for (let i=0; i<buttons.length; i++) {
            cy.wrap(buttons[i]).click()
          }
        })
        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).contains('Likes: 1')
          cy.wrap(blogs[1]).contains('Likes: 0')
        })
      })

      it('Creator can delete blog', function () {
        cy.contains('like blog test 1').parent().find('#view').click()
        cy.contains('like blog test 1').parent().find('#remove').click()
        cy.get('#success')
          .should('contain', 'Success removed like blog test 1 by front')
      })
    })
  })

})