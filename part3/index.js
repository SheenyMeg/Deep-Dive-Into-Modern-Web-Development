require('dotenv').config()
const express = require('express')
const Person = require('./models/Person')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use( morgan( 'tiny' ) )
morgan.token('requestBody', function(req,res) {return JSON.stringify(req.body) || '-'
})
morgan.format('post-req', ':method :url :status :res[content-length] - :response-time ms :requestBody')
app.use(morgan('post-req'))

const generateId = () => {
    const ranId = Math.floor((Math.random()*100)+1)
    console.log('ranId', ranId)
    return ranId
}

app.get('/info', (request, response) => {

    const date = new Date()

    Person
        .estimatedDocumentCount()
        .then(count => {
            console.log('count', count)
            response.send(
                `<p>Phonebook has info for ${count} people</p>
        <p>${date}</p>`
            )
        })

})

app.get('/persons', (request, response) => {
    Person
        .find({})
        .then(person => {
            response.json(person)
        })
})

app.get('/persons/:id', (request, response, next) => {
    Person
        .findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            }else {
                response.status(404).end()
            }
        })
        .catch(error => {next(error)})
})

app.delete('/persons/:id', (request, response, next) => {

    Person
        .findByIdAndRemove(request.params.id)
        .then(result => {
            console.log('删除成功')
            response.json(result)
            response.status(204).end()
        })
        .catch(error => next(error))

})

app.post('/persons', (request, response, next) => {

    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number,
        id: generateId()
    })

    person
        .save()
        .then(savePerson => savePerson.toJSON())
        .then(saveAndFormatedPerson => {
            console.log('添加成功')
            response.json(saveAndFormatedPerson)
        })
        .catch(error => next(error))

})
app.put('/persons/:id', (request, response, next) => {

    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }
    const opts = {
        new: true,
        runValidators: true
    }

    Person
        .findByIdAndUpdate(request.params.id, person, opts, function(err) {
            if(err) {
                console.log(err)
            }
            return
        }
        )
        .then(updatePerson => {
            console.log('替换成功')
            response.json(updatePerson)
        })
        .catch(error => next(error))

})

const errorHandler = (error, request, response, next) => {

    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'CastError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
app.use(errorHandler)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
