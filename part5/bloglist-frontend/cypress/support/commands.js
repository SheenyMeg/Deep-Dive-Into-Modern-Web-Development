Cypress.Commands.add('createUser', ({ username, name, password }) => {
  cy.request('POST', 'http://localhost:3001/users', {
    username, name, password
  })

  cy.visit('http://localhost:3000')
})
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    localStorage.setItem('loggedName', JSON.stringify(body.username))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: 'http://localhost:3001/blogs',
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  }).then(({ body }) => {
    const loggedSortBlogJSON = window.localStorage.getItem('loggedSortBlogs')
    if (loggedSortBlogJSON) {
      const blog = JSON.parse(loggedSortBlogJSON)
      const addBlog = blog.concat(body)
      localStorage.setItem('loggedSortBlogs', JSON.stringify(addBlog))
    } else {
      localStorage.setItem('loggedSortBlogs', JSON.stringify( [body] ))
    }
    cy.visit('http://localhost:3000')
  })
})