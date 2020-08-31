const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)

const loginSchema = new mongoose.Schema({
    token: String,
    username: String,
    name: String
})

loginSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

loginSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Login', loginSchema)