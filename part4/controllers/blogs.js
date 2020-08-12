const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const { response } = require('express')

const generateId = () => {
    const ranId = Math.floor((Math.random()*100)+1)
    logger.info('ranId', ranId)
    return ranId
}

blogsRouter.get('/info', async (request, response) => {

    const date = new Date()

    const count = await Blog.estimatedDocumentCount()
    logger.info('count', count)
    response.send(
        `<p>Blogs has ${count} lists <br> ${date}</p>`
    )
})

blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)

})

blogsRouter.get('/:id', async(request, response) => {

    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    }else if (!blog) {
        response.status(404).end()
    }else {
        response.status(400).end()
    }

})

blogsRouter.delete('/:id', async (request, response) => {

    if (!request.token) {
        return response.status(401).json({ error: 'Unauthorized it' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const userid = decodedToken.id
    const blogid = request.params.id

    const blog = await Blog.findById(blogid)

    if ( blog.user.toString() === userid.toString() ) {
        await Blog.deleteOne(blog)
        response.status(204).json(blog)
        logger.info('删除成功')
    }else {
        response.status(400).end()
    }

})

blogsRouter.post('/', async (request, response) => {

    const body = request.body

    if (!request.token) {
        return response.status(401).json({ error: 'Unauthorized it' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (!body.title || !body.url) {
        return response.status(400).json({
            error: 'title or author missing'
        })
    }

    if (!body.likes) {
        body.likes = 0
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    logger.info('添加成功')
    response.json(savedBlog)

})
blogsRouter.put('/:id', async (request, response) => {

    const body = request.body

    if (!body.likes) {
        body.likes = 0
    }

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const opts = {
        new: true,
        runValidators: true
    }

    const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, opts)

    logger.info('替换成功')
    response.json(updateBlog)

})

module.exports = blogsRouter