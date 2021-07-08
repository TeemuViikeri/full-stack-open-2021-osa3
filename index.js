require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

// Hard coded array of persons in the phonebook
let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
]

// Create an Express application
const app = express()

// Use a json-parser middleware to parse JSON requests into JavaScript objects
app.use(express.json())

// Serve static frontend build for Express
app.use(express.static('build'))

// Use CORS enabling middleware
app.use(cors())

// Create new token for logging
morgan.token('data', (req, res) => JSON.stringify(req.body))

// Use morgan logger middleware
// Logs in tiny + data token format
// tiny format outputs ':method :url :status :res[content-length] - :response-time ms'
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
)

// Route for getting all persons in the phonebook
app.get('/api/persons', (req, res) => {
  Person.find({}).then((people) => res.json(people))
})

// Route for sending info of amount of people in the phonebook and current time
app.get('/info', (req, res) => {
  Person.find({}).then((people) => {
    const info = `<div>Phonebook has info for ${people.length} people</div>`
    const time = `<div>${new Date()}</div>`
    res.send(`${info}${time}`)
  })
})

// Route for showing a single number
app.get('/api/persons/:id', (req, res) => {
  // Id in request is a string, conver to Number!
  const id = Number(req.params.id)
  const person = persons.find((p) => p.id === id)

  if (person) {
    res.status(200).json(person)
  } else {
    res.status(404).end()
  }
})

// Generates a random id number between 1 and 99999999
const generateId = () => {
  return Math.floor(Math.random() * 99999999 + 1)
}

// Route for adding a new person
app.post('/api/persons', (req, res) => {
  const body = req.body

  Person.find({}).then((people) => {
    // Function for checking if the person exists
    const personExistsAlready = people.some(
      (person) => person.name === body.name
    )

    // Send an error message if request doesn't include a name, a number or the person exists already
    if (!body.name) {
      return res.status(400).json({
        message: 'name missing',
      })
    } else if (!body.number) {
      return res.status(400).json({
        message: 'number missing',
      })
    } else if (personExistsAlready) {
      return res.status(400).json({
        message: 'person with given name already exists',
      })
    }

    // Create an object of the new person
    const person = new Person({
      name: body.name,
      number: body.number,
    })

    // Add person to the phonebook
    person.save().then((returnedPerson) => {
      console.log(
        `Added ${returnedPerson.name}${
          returnedPerson.number === ''
            ? returnedPerson.number
            : ` number ${returnedPerson.number}`
        } to phonebook`
      )
    })

    res.status(200).json(person)
  })
})

// Route for changing person's  property
app.put('/api/persons/:id', (req, res) => {
  // Id in request is a string, conver to Number!
  const id = Number(req.params.id)
  const body = req.body

  // Function for checking if person with given id exists in the phonebook
  const personExists = persons.some((p) => p.id === id)

  // Either modify existing person or add a new one
  if (personExists) {
    persons = persons.map((p) => (p.id === id ? body : p))
    res.status(200).send(body)
  } else {
    persons = persons.concat(body)
    res.status(201).send(body)
  }
})

// Route for deleting a single person
app.delete('/api/persons/:id', (req, res) => {
  // Id in request is a string, conver to Number!
  const id = Number(req.params.id)

  // Function for checking if person with given id exists in the phonebook
  const personExists = persons.some((p) => p.id === id)

  // Delete person from phonebook if the person exists
  if (personExists) {
    persons = persons.filter((p) => p.id !== id)
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

// Route for unknown endpoints
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

// Use unknownEndpoint route
app.use(unknownEndpoint)

// Use PORT environment variable inserted by Heroku in production or use 3001 during dev
const PORT = process.env.PORT || 3001
// Runs a server that listens to PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
