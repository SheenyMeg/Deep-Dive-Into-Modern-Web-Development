const Blog = require('../models/blog')
const User = require('../models/user')
const Login = require('../models/login')

const initialBlogs = [
    {
        title: 'abc',
        author: 'ddd',
        url: 'https...',
        likes: 0
    },
    {
        title: 'dfg',
        author: 'eee',
        url: 'https.f..',
        likes: 3
    },
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'rrr' })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(r => r.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(r => r.toJSON())
}

const loginInDb = async () => {
    const login = await Login.find({})
    return login.map(r => r.toJSON())
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb,
    loginInDb
}