const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const Login = require('../models/login')

const bcrypt = require('bcrypt')
const { request } = require('express')
const { loginInDb, initialBlogs } = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await Login.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()

    const newUser = {
        username: 'supertest',
        name: 'test',
        password: 'test'
    }
    await api
        .post('/users')
        .send(newUser)

    const userLogin = {
        username: newUser.username,
        password: newUser.password
    }

    await api
        .post('/login')
        .send(userLogin)

})

describe('GET JSON', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

})
describe('Two lists', () => {
    test('there are two lists',  async () => {
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('The first author', () => {
    test('the first list is about author', async () => {
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[0].author).toBe('ddd')
    })
})

describe('A specific author', () => {
    test('a specific author is within the returned blogs', async () => {
        const blogsAtEnd = await helper.blogsInDb()
        const authors = blogsAtEnd.map(b => b.author)
        expect(authors).toContain('eee')
    })
})

describe('Add a new blog', () => {
    test('a valid blog list can be added', async () => {

        const loginInDbEnd = await helper.loginInDb()
        const tokens = loginInDbEnd.map(r => r.token)
        const token = tokens[0]

        const newList = {
            title: 'data structure',
            author: 'ChengJie',
            url: 'https//4004',
            likes: 6
        }

        await api
            .post('/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newList)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const authors = blogsAtEnd.map(b => b.author)
        expect(authors).toContain('ChengJie')
    })
})

describe('401 Unauthorized it', () => {
    test('response 401 if add blog failed', async () => {
        const newList = {
            title: 'data structure',
            author: 'ChengJie',
            url: 'https//4004',
            likes: 6
        }
        const token = ''
        const resultBlog =  await api
            .post('/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newList)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        expect(resultBlog.body.error).toContain('Unauthorized it')
    })
})

describe('No title not add', () => {
    test('blog list without title is not added', async () => {

        const loginInDbEnd = await helper.loginInDb()
        const tokens = loginInDbEnd.map(r => r.token)
        const token = tokens[0]

        const newList = {
            author: 'ChengJie',
            likes: 6
        }

        await api
            .post('/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newList)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('View a specific blog', () => {
    test('a specific blog can be viewed', async () => {

        const blogsAtStart = await helper.blogsInDb()
        const blogToView = blogsAtStart[0]

        const resultBlog = await api
            .get(`/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(resultBlog.body).toEqual(blogToView)
    })
})

describe('blog does not exist', () => {
    test('fails with statuscode 404 if blog does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()

        console.log(validNonexistingId)

        await api
            .get(`/blogs/${validNonexistingId}`)
            .expect(404)
    })
})

describe('Delete a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const loginInDbEnd = await helper.loginInDb()
        const tokens = loginInDbEnd.map(r => r.token)
        const token = tokens[0]

        const newBlog = {
            title: 'delete test',
            author: 'delete',
            url: 'https//4004',
            likes: 6
        }

        await api
            .post('/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)

        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[2]

        await api
            .delete(`/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(blogsAtEnd.length)

        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('Named is id', () => {
    test('Unique identifier if is named id', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToView = blogsAtStart[0]

        const resultBlog = await api
            .get(`/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(resultBlog.body.id).toBeDefined()
    })
})

describe('likes default 0', () => {
    test('likes default value is 0 if missing like attributes', async () => {
        const newList = {
            title: 'uuu',
            author: 'ChengJie',
            url: 'http....999'
        }

        const blogsAtStart = await helper.blogsInDb()

        const blogToView = blogsAtStart[0]

        const putBlog = await api
            .put(`/blogs/${blogToView.id}`)
            .send(newList)
            .expect(200)

        expect(putBlog.body.likes).toBe(0)

        const loginInDbEnd = await helper.loginInDb()
        const tokens = loginInDbEnd.map(r => r.token)
        const token = tokens[0]

        await api
            .post('/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newList)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        const postId = blogsAtEnd.length - 1

        expect(blogsAtEnd[postId].likes).toBe(0)
    })
})

describe('invaild id', () => {
    test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .get(`/blogs/${invalidId}`)
            .expect(400)

        const loginInDbEnd = await helper.loginInDb()
        const tokens = loginInDbEnd.map(r => r.token)
        const token = tokens[0]

        await api
            .delete(`/blogs/${invalidId}}`)
            .set('Authorization', `bearer ${token}`)
            .expect(400)
    })
})

describe('update blog info', () => {
    test('put a blog list info', async () => {
        const newList = {
            title: 'update',
            author: 'ChengJie',
            url: 'http....999',
            likes: 10
        }

        const blogsAtStart = await helper.blogsInDb()

        const blogToPut = blogsAtStart[0]

        const putBlog = await api
            .put(`/blogs/${blogToPut.id}`)
            .send(newList)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        const blogToPutted = blogsAtEnd[0]

        expect(putBlog.body).toEqual(blogToPutted)
    })
})

describe('initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const loginInDbEnd = await helper.loginInDb()
        const tokens = loginInDbEnd.map(r => r.token)
        const token = tokens[0]

        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/users')
            .set('Authorization', `bearer ${token}`)
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const loginInDbEnd = await helper.loginInDb()
        const tokens = loginInDbEnd.map(r => r.token)
        const token = tokens[0]

        const result = await api
            .post('/users')
            .set('Authorization', `bearer ${token}`)
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll( () => {
    mongoose.connection.close()
})

