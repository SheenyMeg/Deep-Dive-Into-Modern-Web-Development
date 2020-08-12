const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const Login = require('../models/login')
const logger = require('../utils/logger')
const { response } = require('express')

loginRouter.get('/', async (request, response) => {
    const logins = await Login
        .find({})
    response.json(logins)
})

loginRouter.delete('/', async (request, response) => {
    await Login.deleteMany({})
})

loginRouter.post('/', async (request, response) => {
    const body = request.body

    // const logined = await Login.findOne({ username: body.username })

    // if (logined) {
    //     logger.error('用户已登录')
    //     return response.status(400).json({
    //         error: 'user already logined'
    //     })
    // }

    const user = await User.findOne({ username: body.username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    const Token = new Login({
        token: token,
        username: user.username,
        name: user.name
    })

    const saveToken = await Token.save()

    response
        .status(200)
        .json(saveToken)
    logger.info('登录成功')

})

module.exports = loginRouter