const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        require: true
    },
    author: {
        type: String,
        minlength: 3,
        require: true
    },
    url: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

blogSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Blog', blogSchema)