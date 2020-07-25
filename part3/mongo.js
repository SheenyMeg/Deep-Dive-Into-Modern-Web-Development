const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const dbname = 'phonebook'
const url = `mongodb+srv://fullstack:${password}@clusterfullstack.yci1z.mongodb.net/${dbname}?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('person', personSchema)

const persons = new Person({
    name: `${name}`,
    number: `${number}`,
})

if ( process.argv.length === 3 ) {
    Person
        .find({})
        .then(result => {
            console.log(`${dbname}:`)
            result.forEach(person => {
                console.log(
                    `${person.name} ${person.number}`
                )
            })
            mongoose.connection.close()
        })
}

if ( process.argv.length === 5 ) {
    persons.save().then(result => {
        console.log(`added ${name} ${number} to phonebook`)
        console.log('person saved!')
        mongoose.connection.close()
    })
}
