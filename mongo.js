const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Give user fullstack password to create a connection to the database: node mongo.js password [name [number]]'
  )
  process.exit(1)
}

const password = process.argv[2]
const uri = `mongodb+srv://fullstack:${password}@phonebook.l0vhl.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then((people) => {
    console.log('phonebook:')
    people.forEach((person) => console.log(`${person.name} ${person.number}`))
    mongoose.connection.close()
  })
} else {
  const name = process.argv[3]
  const number = process.argv[4] || ''
  const person = new Person({ name, number })

  person.save().then((res) => {
    console.log(
      `Added ${res.name}${
        number === '' ? number : ` number ${number}`
      } to phonebook`
    )
    mongoose.connection.close()
  })
}
