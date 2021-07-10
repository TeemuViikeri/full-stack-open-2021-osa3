require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

// Create an Express application
const app = express()

// Use a json-parser middleware to parse JSON requests into JavaScript objects
// Populates request with body object in req.body
app.use(express.json())

// Serve static frontend build for Express
app.use(express.static('build'))

// Use CORS enabling middleware
app.use(cors())

// Create new token for logging
morgan.token('data', (req) => JSON.stringify(req.body))

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
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

// Route for adding a new person
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  // Create an object of the new person
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  // Add person to the phonebook
  person
    .save()
    .then((returnedPerson) => {
      console.log(returnedPerson)
      res.status(201).json(returnedPerson)
    })
    .catch((error) => next(error))
})

// Route for changing person's property
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  // Create a person object for updating
  const newPerson = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, newPerson, { new: true })
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.status(200).send(updatedPerson)
      } else {
        const person = new Person({ ...newPerson })
        person.save().then((returnedPerson) => {
          res.status(201).send(returnedPerson)
        })
      }
    })
    .catch((error) => next(error))
})

// Route for deleting a single person
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((person) => {
      if (person) {
        res.status(204).end()
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

// Route for unknown endpoints
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

// Custom router for handling errors
const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ message: 'Malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: error.message })
  }

  // Send error(s) to Express' default error handler
  next(error)
}

app.use(errorHandler)

// Use PORT environment variable inserted by Heroku in production or use 3001 during dev
const PORT = process.env.PORT || 3001

// Runs a server that listens to PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
